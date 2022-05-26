import { createStore } from 'redux'

const storeReducer = (state={ storeInfo:{}}, action) => {

    if (action.type === 'goToStore') {

        return {
            storeInfo: action.storeInfo
        }
        
    }

    return state;
}

const Store = createStore(storeReducer);

export default Store 