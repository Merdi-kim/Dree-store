import { Web3Storage } from 'web3.storage'

const storageKey = process.env.NEXT_PUBLIC_STORAGE_KEY 
const storage = new Web3Storage({token:storageKey})

export const storeData = async(file) => {
    const cid = await storage.put(file)
    return cid
}