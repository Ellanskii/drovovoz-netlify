<template>
  <div class="container">
    <article class="columns is-multiline">
      <header class="column is-12">
        <h1 class="title">{{ product.name }}</h1>
      </header>
      <div class="column is-4">
        <h2 class="title is-4">Описание</h2>
        <div v-html="product.description" class="content"></div>
      </div>
    </article>
  </div>
</template>

<script>
import { cleanProduct } from '~/plugins/api'

export default {
  async asyncData({ $axios, $payloadURL, route, payload }) {
    // получаем данные через API, если это не статика
    if (!process.static) {
      const contentful = require('~/plugins/contentful')
      const contentfulClient = contentful.createClient()

      let product

      // Получаем товар
      await contentfulClient
        .getEntries({
          content_type: 'product',
          'fields.slug[in]': route.params.product
        })
        .then((products) => {
          product = cleanProduct(products.items[0], true)
        })
        .catch((e) => console.error)

      return { product }
    }

    // if generated and works as client navigation, fetch previously saved static JSON payload
    if (process.static && process.client) {
      const product = await $axios.$get($payloadURL(route))
      return product
    }

    // data for generating static page
    return {
      product: payload
    }
  }
}
</script>
