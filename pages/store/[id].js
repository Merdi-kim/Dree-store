import Link from 'next/link'
import { useState, useEffect} from 'react'
import { getItems } from '../../graph/graphResponses'
import ItemCard from '../../components/ItemCard'
import styles from '../../styles/Store.module.css'

function Store() {

  const [storeItems, setStoreItems] = useState([])

  const getAllStoreItems = async() => {
    const { postedItems } = await getItems()
    setStoreItems( postedItems )
  }

  useEffect(() => {
    getAllStoreItems()
  }, [])
   

  console.log(storeItems)

  return (
    <div className={styles.store}>
        <nav>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6VsHnK9L_CT0G0x9NyasJ57zTXbJ0igcC2Q&usqp=CAU" alt="logo" />
          <span>TMP electronics</span>
          <Link href='/post-item'>New item</Link>
        </nav>

        <div className={styles.itemsList}>
            { storeItems?.map(({img, description, price}) => <ItemCard key={1} img={img} description={description} price={price} />) }
        </div>
    </div>
  )
}

export default Store