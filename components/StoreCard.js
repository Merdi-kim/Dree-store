import Router from 'next/router'
import { useState, useEffect } from 'react'
import { Web3Storage } from 'web3.storage'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import styles from '../styles/StoreCard.module.css'


function StoreCard({ id, cid, category, storeOwner }) {

  const [cardData, setCardData] = useState(null)
  const dispatch = useDispatch()

  const storageKey = process.env.NEXT_PUBLIC_STORAGE_KEY 
  const storage = new Web3Storage({token:storageKey})

  const getMetadata = async() => {
    const res = await storage.get(cid)
    if (!res.ok) {
      console.log('not okay')
    }
    const [metadataFile, imageFile] = await res.files()
    const image = `https://ipfs.io/ipfs/${imageFile.cid}`
    const {data} = await axios.get(`https://ipfs.io/ipfs/${metadataFile.cid}`)
    setCardData({
      image,
      ...data
    })
  }

  useEffect(() => {
    getMetadata()
  },[])
 
  
  const goToSpecificStoreHandler = () => {
    dispatch({
      type:'goToStore',
      storeInfo: {
        name:cardData?.name,
        image:cardData?.image,
        id: Number(id._hex),
        storeOwner
      }
    })
    Router.push(`/store/${Number(id._hex)}`)
  }
  
  return (
    <div className={styles.storeCard} onClick={goToSpecificStoreHandler}>
      <img src={ cardData?.image } alt="" />
      <span>{ category }</span>
      <h3>{ cardData?.name }</h3>
    </div>
  )
}

export default StoreCard