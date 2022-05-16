import Router from 'next/router'
import { ethers } from 'ethers'
import Store from '../artifacts/contracts/Store.sol/StoreContract.json'
import styles from '../styles/Form.module.css'

function CreateStore() {

  const createStoreHandler = async(e) => {
    e.preventDefault()
    const provider = new ethers.providers.JsonRpcProvider()    //Web3Provider(window.ethereum)
    //await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner()
    const storeContract = new ethers.Contract('0x5FbDB2315678afecb367f032d93F642f64180aa3', Store.abi, signer)
    const tx = await storeContract.createStore('lele')
    const txxx = await tx.wait()
    Router.push('/')
  }

  return (
    <div className={styles.container}>
      <div className={styles.store}>
      <h2>Create your store here !</h2>
      <form onSubmit={createStoreHandler}>
        <fieldset>
          <label htmlFor="">Name</label>
          <input type="text" placeholder='Store name ...' />
        </fieldset>
        <fieldset>
          <label htmlFor="">Category</label>
          <input type="text" placeholder='eg:Electornics, clothes...' />
        </fieldset>
        <fieldset>
          <label htmlFor="store">Store thumbnail</label>
          <input type='file'/>
        </fieldset>
        
      <button type='submit'>Create</button>
        
      </form>
    </div>
    </div>
  )
}

export default CreateStore