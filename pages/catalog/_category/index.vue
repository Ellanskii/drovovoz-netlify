<template>
  <main class="container">
    <div class="columns is-multiline">
      <header class="column is-12">
        <h1 class="title">{{ category.name }}</h1>
      </header>
      <div v-for="product in products" :key="product.id" class="column is-4">
        <nuxt-link
          :to="
            localePath({
              name: 'catalog-category-product',
              params: {
                category: category.slug,
                product: product.slug
              }
            })
          "
          class="is-hoverable"
        >
          <ProductCard :product="product" />
        </nuxt-link>
      </div>
    </div>
  </main>
</template>

<script>
import { cleanProduct } from '~/plugins/api'

import ProductCard from '~/components/ProductCard'

export default {
  components: {
    ProductCard
  },

  async asyncData({ $axios, $payloadURL, route, payload, store }) {
    let category, products

    // получаем данные через API, если это не статика
    if (!process.static) {
      const contentful = require('~/plugins/contentful')
      const contentfulClient = contentful.createClient()

      let categoryId

      // Получаем категорию
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

      // Получаем товары категории
      await contentfulClient
        .getEntries({
          content_type: 'product',
          'fields.categories.sys.id': categoryId
        })
        .then((_products) => {
          products = _products.items.map((product) => cleanProduct(product))
        })
        .catch((e) => console.error)
    }

    // if generated and works as client navigation, fetch previously saved static JSON payload
    else if (process.static && process.client) {
      category = await $axios.$get($payloadURL(route))
    }

    // data for generating static page
    else {
      category = payload
    }

    // setting breadcrumbs
    store.commit('navigation/SET_BREADCRUMBS', [
      { name: 'Каталог', path: '/catalog' },
      { name: category.name, path: `/catalog/${category.slug}` }
    ])

    return { category, products }
  }

  // beforeRouteLeave(to, from, next) {
  //   this.$store.commit('navigation/SET_BREADCRUMBS', [])
  //   next()
  // }
}
</script>
