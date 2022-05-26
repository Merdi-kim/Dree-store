import { useContract, useSigner } from 'wagmi'
import { useSelector } from 'react-redux'
import Store from '../artifacts/contracts/Store.sol/StoreContract.json'
import styles from '../styles/ItemCard.module.css'

function ItemCard({ img, description, price }) {

  const dispatchedData = useSelector(data => data)

  console.log(dispatchedData)

  const { data: signer, isError, isLoading } = useSigner()
  const storeContract = useContract({
    addressOrName: '0x5FC8d32690cc91D4c39d9d3abcBD16989F875707',
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