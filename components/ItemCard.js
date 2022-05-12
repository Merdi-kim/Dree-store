import styles from '../styles/ItemCard.module.css'

function ItemCard() {
  return (
    <div className={styles.itemCard}>
        <img src="https://media.smallbiztrends.com/2015/10/opening-your-first-retail-store.jpg" alt="" />
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.sit amet consectetur adipisicing</p>
        <button>Purchase</button>
        <span>0.5 ETH</span>
    </div>
  )
}

export default ItemCard