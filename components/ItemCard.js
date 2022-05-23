import styles from '../styles/ItemCard.module.css'

function ItemCard({ img, description, price }) {
  return (
    <div className={styles.itemCard}>
        <img src={img} alt="" />
        <p>{description}</p>
        <button>Purchase</button>
        <span>{price} ETH</span>
    </div>
  )
}

export default ItemCard