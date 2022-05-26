import Router from 'next/router'
import { useContract, useSigner } from 'wagmi'
import { storeData } from '../lib/storage'
import Store from '../artifacts/contracts/Store.sol/StoreContract.json'
import { address } from '../helpers/contractAddress'
import styles from '../styles/Form.module.css'
import { useState } from 'react'

function CreateStore() {

  const [StoreData, setStoreData] = useState({
    name:'',
    category:''
  })
  const [file, setFile] = useState([])

  const { data: signer, isError, isLoading } = useSigner()
  const storeContract = useContract({
    addressOrName: address,
    contractInterface: Store.abi,
    signerOrProvider: signer
  })

  const createStore = async(e) => {
    e.preventDefault()
    const blob = new Blob([JSON.stringify(StoreData)], { type: 'application/json' })
    const files = [
      file[0],
      new File([blob], `${StoreData.name}.json`)
    ]
    const cid = await storeData(files)
    const tx = await storeContract.createStore(cid, storeData.category)
    await tx.wait()
    Router.push('/')
  }

  return (
    <div className={styles.container}>
      <div className={styles.store}>
      <h2>Create your store here !</h2>
      <form onSubmit={createStore}>
        <fieldset>
          <label htmlFor="">Name</label>
          <input type="text" placeholder='Store name ...' onChange={(e) => setStoreData({...StoreData, name : e.target.value})} />
        </fieldset>
        <fieldset>
          <label htmlFor="">Category</label>
          <input type="text" placeholder='eg:Electornics, clothes...' onChange={(e) => setStoreData({...StoreData, category : e.target.value})} />
        </fieldset>
        <fieldset>
          <label htmlFor="store">Store thumbnail</label>
          <input type='file' accept='image/*' onChange={(e) => setFile(e.target.files)}/>
        </fieldset>
        
      <button type='submit'>Create</button>
        
      </form>
    </div>
    </div>
  )
}

export default CreateStore