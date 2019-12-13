export const state = () => ({
  categories: [],
  products: [],
  navigationTree: [],
  breadcrumbs: []
})

export const getters = {
  getCategories: (state) => state.categories,
  getProducts: (state) => state.products,
  getNavigationTree: (state) => state.navigationTree,
  getBreadcrumbs: (state) => state.breadcrumbs
}

export const actions = {
  buildNavigationTree: ({ commit }, products) => {
    const tree = []
    products.map((product) => {
      // TODO может ли товар не принадлежать ни к одной категории? Если да, то что с ним делать
      let productCategory
      if (product.fields.categories) {
        productCategory = product.fields.categories[0]
      } else {
        return
      }

      const indexInTree = tree.findIndex(
        (category) => category.id === productCategory.sys.id
      )
      // оставляем только нужное в товаре
      product = {
        id: product.sys.id, // TODO нужен ли id?
        name: product.fields.name,
        slug: product.fields.slug
      }
      if (indexInTree >= 0) {
        tree[indexInTree].products.push(product)
      } else {
        tree.push({
          id: productCategory.sys.id,
          name: productCategory.fields.name,
          slug: productCategory.fields.slug,
          products: [product]
        })
      }
    })
    commit('SET_NAVIGATION_TREE', tree)
  }
}

export const mutations = {
  SET_CATEGORIES(state, categories) {
    state.categories = categories
  },
  SET_PRODUCTS(state, products) {
    state.products = products
  },
  SET_NAVIGATION_TREE(state, tree) {
    state.navigationTree = tree
  },
  SET_BREADCRUMBS(state, breadcrumbs) {
    state.breadcrumbs = breadcrumbs
  }
}
