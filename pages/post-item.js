import { useState } from 'react'
import { useContract, useSigner } from 'wagmi'
import { useSelector } from 'react-redux'
import { storeData } from '../lib/storage'
import Store from '../artifacts/contracts/Store.sol/StoreContract.json'
import { address } from '../helpers/contractAddress'
import { useNewMoralisObject } from "react-moralis";
import { ethers } from 'ethers'
import styles from '../styles/Form.module.css'
import Router from 'next/router'

function PostItem() {

  const [itemData, setItemData] = useState({
    name:'',
    description:'',
    price:0
  })
  const [file, setFile] = useState([])
  const { storeInfo } = useSelector(data => data)
  const { save } = useNewMoralisObject("Items");

  const { data: signer, isError, isLoading } = useSigner()
  const storeContract = useContract({
    addressOrName: address,
    contractInterface: Store.abi,
    signerOrProvider: signer
  })

  //if (!storeInfo.id) return Router.push('/')
    
  const postItem = async(e) => {
    e.preventDefault()
    const blob = new Blob([JSON.stringify(itemData)], { type: 'application/json' })
    const files = [
      file[0],
      new File([blob], `${itemData.name}.json`)
    ]
    const cid = await storeData(files)
    const transformedPrice = new ethers.utils.parseEther(itemData.price)
    const tx = await storeContract.postItem(cid, itemData.name,storeInfo.id, transformedPrice)
    const {events} = await tx.wait()
    console.log(events)
    const [storeId, itemId, metadata, price, orders, listingStatus ] =events[0].args
    const dataToSave = {
      storeId,
      itemId,
      metadata,
      price,
      orders,
      listingStatus
    };

    save(dataToSave, {
      onSuccess: (store) => {
        Router.push(`/store/${storeId}`)
      },
      onError: (error) => {
        console.log("Failed to create new object, with error code: " + error.message);
      },
    });
    Router.push('/')
  }

  return (
        <div className={styles.container}>
          <div className={styles.store}>
          <h2>Upload your item here !</h2>
          <form onSubmit={postItem}>
            <fieldset>
              <label htmlFor="">Name</label>
              <input type="text" placeholder='e.g: Iphone 13pro max' onChange={(e) => setItemData({...itemData, name: e.target.value})} />
            </fieldset>
            <fieldset>
              <label htmlFor="">Description</label>
              <input type="text" placeholder='eg:The coolest iphone' onChange={(e) => setItemData({...itemData, description:e.target.value})} />
            </fieldset>
            <fieldset>
              <label htmlFor="">Price</label>
              <input type="text" placeholder='eg:Price in matic' onChange={(e) => setItemData({...itemData, price:e.target.value})} />
            </fieldset>
            <fieldset>
              <label htmlFor="store">Item picture</label>
              <input type='file' onChange={(e) => setFile(e.target.files)}/>
            </fieldset>
            
          <button type='submit'>Upload</button>
            
          </form>
        </div>
        </div>
    )
}

export default PostItem