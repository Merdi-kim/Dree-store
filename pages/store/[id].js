import Link from 'next/link'
import ItemCard from '../../components/ItemCard'
import styles from '../../styles/Store.module.css'

function Store() {

  const itemsInStore = Array(55).fill({
    img:'https://media.smallbiztrends.com/2015/10/opening-your-first-retail-store.jpg',
    description:'Lorem ipsum dolor, sit amet consectetur adipisicing elit.sit amet consectetur adipisicing',
    price:0.5
  })

  return (
    <div className={styles.store}>
        <nav>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6VsHnK9L_CT0G0x9NyasJ57zTXbJ0igcC2Q&usqp=CAU" alt="logo" />
          <span>TMP electronics</span>
          <Link href='/post-item'>New item</Link>
        </nav>

        <div className={styles.itemsList}>
            { itemsInStore?.map(({img, description, price}) => <ItemCard key={1} img={img} description={description} price={price} />) }
        </div>
    </div>
  )
}

export default Store