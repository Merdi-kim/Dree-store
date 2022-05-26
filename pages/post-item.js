import { useContract, useSigner } from 'wagmi'
import { storeData } from '../lib/storage'
import Store from '../artifacts/contracts/Store.sol/StoreContract.json'
import styles from '../styles/Form.module.css'
import { useState } from 'react'
import Router from 'next/router'

function PostItem() {

  const [itemData, setItemData] = useState({
    name:'',
    description:'',
  })
  const [file, setFile] = useState([])

  const { data: signer, isError, isLoading } = useSigner()
  const storeContract = useContract({
    addressOrName: '0x4c9C43F681b61B9162a191DAC9712D5493919DFb',
    contractInterface: Store.abi,
    signerOrProvider: signer
  })
    
  const postItem = async(e) => {
    e.preventDefault()
    const blob = new Blob([JSON.stringify(itemData)], { type: 'application/json' })
    const files = [
      file[0],
      new File([blob], `${itemData.name}.json`)
    ]
    const cid = await storeData(files)
    const tx = await storeContract.postItem(cid, itemData.name,1, 6)
    await tx.wait()
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