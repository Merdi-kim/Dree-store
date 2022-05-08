import styles from '../styles/ItemCard.module.css'

function ItemCard() {
  return (
    <div className={styles.itemCard}>
        <img src="https://ugtechmag.com/wp-content/uploads/2020/04/Odukar-Store-ugtechmag.jpeg" alt="" />
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.sit amet consectetur adipisicing elit sit amet consectetur adipisicing elit</p>
        <button>Purchase</button>
    </div>
  )
}

export default ItemCard