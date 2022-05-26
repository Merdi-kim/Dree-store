import Link from 'next/link'
import { useState, useEffect} from 'react'
import { useAccount } from 'wagmi'
import { getItems } from '../../graph/graphResponses'
import ItemCard from '../../components/ItemCard'
import { useSelector } from 'react-redux'
import styles from '../../styles/Store.module.css'

function Store() {

  const [storeItems, setStoreItems] = useState([])

  const { storeInfo } = useSelector(data => data)

  const { data } = useAccount()
  const owner = data?.address

  const getAllStoreItems = async() => {
    const { postedItems } = await getItems()
    setStoreItems( postedItems )
  }

  useEffect(() => {
    getAllStoreItems()
  }, [])

  return (
    <div className={styles.store}>
        <nav>
          <img src={storeInfo.image} alt="logo" />
          <span>{storeInfo.name}</span>
          <Link href='/post-item'>New item</Link>
        </nav>

        <div className={styles.itemsList}>
            { storeItems?.map(({img, description, price}) => <ItemCard key={1} img={img} description={description} price={price} />) }
        </div>
    </div>
  )
}

export default Store