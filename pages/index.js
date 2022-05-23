import Head from 'next/head'
import Link from 'next/link'
import StoreCard from '../components/StoreCard'
import styles from '../styles/Home.module.css'

export default function Home() {

  const stores = Array(88).fill({
    img:'https://ugtechmag.com/wp-content/uploads/2020/04/Odukar-Store-ugtechmag.jpeg',
    description:'Electronics devices',
    name:'TMP store'
  })

  return (
    <div>
      <Head>
        <title>Dree store | Home</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.container}>
          <nav>
            <img src="https://blog.hubspot.com/hubfs/ecommerce-software.jpg" alt="" />
            <Link href='/create-store'>New store</Link>
          </nav>
          <div className={styles.caroussel}>
            <section>
              <p>Shop on the decentralized web</p> 
              <button>Connect wallet</button>
            </section>
            <img src="/images/dree-store.gif" alt="" />
          </div>
        </div>
        <div>
          <div className={styles.categories}>
            <span>Categories</span>
            <section>
              <button>Electronics</button>
              <button>Clothes</button>
              <button>Shoes</button>
              <button>Photography</button>
              <button>Others</button>
            </section>
          </div>
          <div className={styles.stores}>
            {stores?.map(({img, description, name}) => <StoreCard img={img} description={description} name={name} />)}
          </div>
        </div>
      </main>
    </div>
  )
}
