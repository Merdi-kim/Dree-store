import styles from '../../styles/Store.module.css'
import ItemCard from '../../components/ItemCard'

function Store() {
  return (
    <div className={styles.store}>
        <nav>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6VsHnK9L_CT0G0x9NyasJ57zTXbJ0igcC2Q&usqp=CAU" alt="logo" />
          <span>TMP electronics</span>
        </nav>
        <div className={styles.itemsList}>
            <ItemCard/>
            <ItemCard/>
            <ItemCard/>
            <ItemCard/>
            <ItemCard/>
            <ItemCard/>
            <ItemCard/>
            <ItemCard/>
            <ItemCard/>
            <ItemCard/>
        </div>
    </div>
  )
}

export default Store