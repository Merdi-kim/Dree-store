import styles from '../styles/Form.module.css'

function PostItem() {
    const postItemHandler = (e) => {
        e.preventDefault()
        console.log('Hello')
    }
    return (
        <div className={styles.container}>
          <div className={styles.store}>
          <h2>Upload your item here !</h2>
          <form onSubmit={postItemHandler}>
            <fieldset>
              <label htmlFor="">Name</label>
              <input type="text" placeholder='e.g: Iphone 13pro max' />
            </fieldset>
            <fieldset>
              <label htmlFor="">Description</label>
              <input type="text" placeholder='eg:The coolest iphone' />
            </fieldset>
            <fieldset>
              <label htmlFor="store">Item picture</label>
              <input type='file'/>
            </fieldset>
            
          <button type='submit'>Upload</button>
            
          </form>
        </div>
        </div>
    )
}

export default PostItem