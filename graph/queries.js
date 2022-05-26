
export const storesQuery = `
  query {
    createdStores {
      id
      itemId
      metadata
      category
    }
  }
`

export const itemsQuery = `
  query {
    postedItems {
        id
        itemId
        itemPrice
        listingSatus
    }
  }
`
