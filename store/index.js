import { createClient } from '@/plugins/contentful'
const contentfulClient = createClient()

export const actions = {
  async nuxtServerInit({ commit, dispatch, getters }, context) {
    console.log('nuxtServerInit')
    await Promise.all([
      contentfulClient.getEntries({
        content_type: 'category',
        order: '-sys.createdAt'
      }),
      contentfulClient.getEntries({
        content_type: 'product',
        order: '-sys.createdAt'
      })
    ])
      .then(([categories, products]) => {
        dispatch('navigation/buildNavigationTree', products.items)
        commit('navigation/SET_CATEGORIES', categories.items)
        commit('navigation/SET_PRODUCTS', products.items)
      })
      .catch(console.error)
  }
}
