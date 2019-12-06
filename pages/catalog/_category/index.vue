<template>
  <div class="content">
    <!-- <h1>{{ category.title }}</h1> -->
    <!-- <div v-html="category.fields.description"></div> -->
  </div>
</template>

<script>
export default {
  async asyncData({ $axios, $payloadURL, route, payload }) {
    // получаем данные через API, если это не статика
    if (!process.static) {
      const contentful = require('~/plugins/contentful')
      const contentfulClient = contentful.createClient()

      let category, categoryId, products

      // await Promise.all([
      // 	contentfulClient.getEntries({
      // 		content_type: 'category',
      // 		'fields.slug[in]': route.params.category
      // 	}),
      // 	contentfulClient.getEntries({
      // 		content_type: 'product',
      // 		'fields.brand.sys.contentType.sys.id': 'brand',
      // 		'fields.brand.fields.companyName[match]': 'Lemnos'
      // 		// include: 0
      // 	})
      // ])
      // 	.then(([_categories, _products]) => {
      // 		category = _categories.items[0].fields
      // 		products = _products.items.map((product) => product.fields)
      // 	})
      // 	.catch((e) => console.error)

      await contentfulClient
        .getEntries({
          content_type: 'category',
          'fields.slug[in]': route.params.category
        })
        .then((categories) => {
          category = categories.items[0].fields
          categoryId = categories.items[0].sys.id
        })
        .catch((e) => console.error)

      await contentfulClient
        .getEntries({
          content_type: 'product',
          'fields.categories.sys.id': categoryId,
          include: 0
        })
        .then((_products) => {
          products = _products.items.map((product) => product.fields)
        })
        .catch((e) => console.error)

      return { category, products }
    }

    // if generated and works as client navigation, fetch previously saved static JSON payload
    if (process.static && process.client) {
      const category = await $axios.$get($payloadURL(route))
      return category
    }

    // data for generating static page
    return {
      category: payload
    }
  }
}
</script>
