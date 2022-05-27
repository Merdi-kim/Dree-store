import Link from 'next/link'
import { useState, useEffect} from 'react'
import { useAccount } from 'wagmi'
import ItemCard from '../../components/ItemCard'
import { useSelector } from 'react-redux'
import { useMoralisQuery } from 'react-moralis'
import styles from '../../styles/Store.module.css'

function Store() {

  const [storeItems, setStoreItems] = useState([])

  const { storeInfo } = useSelector(data => data)

  const { data } = useAccount()
  const owner = data?.address

  const { fetch } = useMoralisQuery(
    "Items",
    (query) => query.includeAll(),
    [],
    {autoFetch:true}
  )

  const getAllStoreItems = async() => {
    const simpleData = await fetch()
    const transformedData = simpleData?.map(data => data.attributes)
    setStoreItems(transformedData)
  }

  useEffect(() => {
    getAllStoreItems()
  }, [])

  return (
    <div className={styles.store}>
        <nav>
          <img src={storeInfo.image} alt="logo" />
          <span>{storeInfo.name}</span>
          { owner == storeInfo.storeOwner && <Link href='/post-item'>New item</Link>}
        </nav>

        <div className={styles.itemsList}>
            { storeItems?.map(({itemId, metadata, orders, price, storeId}) => <ItemCard key={itemId} id={itemId} cid={metadata} orders={orders} storeId={storeId} price={price} />) }
        </div>
    </div>
  )
}

export default Store