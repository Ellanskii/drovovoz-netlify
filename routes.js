const contentful = require('contentful')
// const stringify = require('json-stringify-safe')
// TODO вынести куда-то в переменные
const config = {
  space: 'do5zujqx5kpm',
  accessToken: '06XAss4yn7t3mMALLSqGiQAsDamgB06F_8fA5gsXHO0'
}
const contentfulClient = contentful.createClient(config)

module.exports = async function() {
  const routes = []
  let categoriesRoutes, productsRoutes

  await Promise.all([
    contentfulClient.getEntries({
      content_type: 'category'
    }),
    contentfulClient.getEntries({
      content_type: 'product'
    })
  ])
    .then(([categories, products]) => {
      categoriesRoutes = categories.items.map((category) => {
        return {
          route: `/catalog/${category.fields.slug}`,
          payload: category
        }
      })
      productsRoutes = products.items.map((product) => {
        return {
          route: `/catalog/${product.fields.categories[0].fields.slug}/${product.fields.slug}`,
          payload: product
        }
      })
    })
    .catch(console.error)

  return routes.concat(categoriesRoutes, productsRoutes)
}
