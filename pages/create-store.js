import Router from 'next/router'
import styles from '../styles/CreateStore.module.css'

function CreateStore() {

  const createStoreHandler = (e) => {
    e.preventDefault()
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