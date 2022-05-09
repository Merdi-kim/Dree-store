import Router from 'next/router'
import styles from '../styles/StoreCard.module.css'
function StoreCard() {

  const goToSpecificStoreHandler = () => {
    Router.push('/store/1')
  }

  return (
    <div className={styles.storeCard} onClick={goToSpecificStoreHandler}>
      <img src="https://ugtechmag.com/wp-content/uploads/2020/04/Odukar-Store-ugtechmag.jpeg" alt="" />
      <span>Electronics</span>
      <h3>TMP store</h3>
    </div>
  )
}

export default StoreCard