import Router from 'next/router'
import styles from '../styles/StoreCard.module.css'
function StoreCard({ img, description, name, id }) {

  const goToSpecificStoreHandler = () => {
    Router.push(`/store/${id}`)
  }

  return (
    <div className={styles.storeCard} onClick={goToSpecificStoreHandler}>
      <img src={ img } alt="" />
      <span>{ description }</span>
      <h3>{ name }</h3>
    </div>
  )
}

export default StoreCard