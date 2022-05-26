import { useContract, useSigner } from 'wagmi'
import Store from '../artifacts/contracts/Store.sol/StoreContract.json'
import { address } from './../helpers/contractAddress'
import styles from '../styles/ItemCard.module.css'

function ItemCard({ img, description, price }) {

  const { data: signer, isError, isLoading } = useSigner()

  const storeContract = useContract({
    addressOrName: address,
    contractInterface: Store.abi,
    signerOrProvider: signer
  })

  const purchaseItem = async() => {
    const tx = await storeContract.buyItem(1, 3) 
    const txxx = await tx.wait()
    console.log(txxx)
  }

  return (
    <div className={styles.itemCard}>
        <img src={img} alt="" />
        <p>{description}</p>
        <button onClick={purchaseItem}>Purchase</button>
        <span>{price} ETH</span>
    </div>
  )
}

export default ItemCard