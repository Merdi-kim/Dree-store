import Router from 'next/router'
import styles from '../styles/StoreCard.module.css'
function StoreCard({ img, description, name }) {

  const goToSpecificStoreHandler = () => {
    Router.push('/store/1')
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