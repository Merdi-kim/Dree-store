import { ApolloClient, InMemoryCache, gql } from '@apollo/client'
import { storesQuery, itemsQuery} from './queries'

const APIURL = 'https://api.thegraph.com/subgraphs/name/merdi-kim/store'

const client = new ApolloClient({
    uri: APIURL,
    cache: new InMemoryCache(),
})


export const getStores = async() => {
    const { data }= await client.query({
      query: gql(storesQuery),
    })
    return data
}

export const getItems = async() => {
    const { data } = await client.query({
        query: gql(itemsQuery),
    })
    return data
}
  