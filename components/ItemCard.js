import { useState, useEffect } from 'react'
import { useContract, useSigner } from 'wagmi'
import { ethers } from 'ethers'
import { Web3Storage } from 'web3.storage'
import axios from 'axios'
import Store from '../artifacts/contracts/Store.sol/StoreContract.json'
import { address } from '../helpers/contractAddress'
import styles from '../styles/ItemCard.module.css'

function ItemCard({ cid, id, orders, storeId, price }) {

  const { data: signer, isError, isLoading } = useSigner()
  const storageKey = process.env.NEXT_PUBLIC_STORAGE_KEY 
  const storage = new Web3Storage({token:storageKey})
  const [cardData, setCardData] = useState({
    usdPrice:0
  })

  const storeContract = useContract({
    addressOrName: address,
    contractInterface: Store.abi,
    signerOrProvider: signer
  })

  const getMetadata = async() => {
    const res = await storage.get(cid)
    if (res.ok) {
      const [metadataFile, imageFile] = await res.files()
      const image = `https://ipfs.io/ipfs/${imageFile.cid}`
      const {data} = await axios.get(`https://ipfs.io/ipfs/${metadataFile.cid}`)
      let usdPrice = await storeContract.getLatestPrice()
      usdPrice = Number(usdPrice?._hex / 10**8).toFixed(2)
      setCardData({
        image,
        ...data,
        usdPrice
      })
    }
  }

  const formattedPrice = ethers.utils.formatEther(price)

  useEffect(() => {
    getMetadata()
  },[])

  const purchaseItem = async() => {
    const priceToEther = ethers.utils.parseEther(formattedPrice)
    const tx = await storeContract.buyItem(Number(storeId._hex), id, {value: priceToEther}) 
    const txxx = await tx.wait()
    console.log(txxx)
  }

  return (
    <div className={styles.itemCard}>
        <img src={cardData?.image} alt=""/>
        <h4>{cardData?.name}</h4>
        <p>{cardData?.description}</p>
        <button onClick={purchaseItem}>Purchase</button>
        {<span>{ Number(formattedPrice * cardData?.usdPrice).toFixed(3)} $</span>}
    </div>
  )
}

export default ItemCard