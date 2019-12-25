import { createClient } from '@/plugins/contentful'
const contentfulClient = createClient()

export const actions = {
  async nuxtServerInit({ commit, dispatch, getters }, context) {
    await Promise.all([
      contentfulClient.getEntries({
        content_type: 'category'
      }),
      contentfulClient.getEntries({
        content_type: 'product'
      })
    ])
      .then(([categories, products]) => {
        dispatch('navigation/buildNavigationTree', products.items)
        // commit('navigation/SET_CATEGORIES', categories.items)
        // commit('navigation/SET_PRODUCTS', products.items)
      })
      .catch(console.error)
  }
}
