<template>
  <div class="container">
    <article class="columns is-multiline">
      <header class="column is-12">
        <h1 class="title">{{ product.name }}</h1>
      </header>
      <div class="column is-4">
        <PictureResponsive
          :src="product.cover"
          width="400"
          class="image is-1by1"
          img-class="is-contained"
        />
      </div>
      <div v-if="product.characteristics" class="column is-4">
        <h2 class="title is-4">Характеристики</h2>
        <table class="table">
          <tbody>
            <tr
              v-for="(value, name, index) in product.characteristics"
              :key="index"
            >
              <td>{{ name }}</td>
              <td>{{ value }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-if="product.description" class="column is-4">
        <h2 class="title is-4">Описание</h2>
        <div class="content" v-html="product.description"></div>
      </div>
      <div class="column is-12">
        <div v-if="address"></div>
        <div v-else class="buttons">
          <button
            type="button"
            class="button is-fullwidth is-primary is-medium"
            @click="getWarhouses"
          >
            Указать адрес доставки
          </button>
          <button type="button" class="button is-fullwidth is-medium">
            Выбрать поставщика на карте
          </button>
        </div>
      </div>
    </article>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { cleanProduct } from '~/plugins/api'
import PictureResponsive from '~/components/PictureResponsive'
import { createClient } from '@/plugins/contentful'
const contentfulClient = createClient()

export default {
  components: {
    PictureResponsive
  },

  async asyncData({ $axios, $payloadURL, route, payload, store }) {
    let product

    // получаем данные через API, если это не статика
    if (!process.static) {
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
    }

    // if generated and works as client navigation, fetch previously saved static JSON payload
    else if (process.static && process.client) {
      product = await $axios.$get($payloadURL(route))
    }

    // data for generating static page
    else {
      product = payload
    }

    // setting breadcrumbs
    const category = store.getters['navigation/getCategoryByProduct'](
      product.id
    )
    store.commit('navigation/SET_BREADCRUMBS', [
      { name: 'Каталог', path: '/catalog' },
      {
        name: category.name,
        path: `/catalog/${category.slug}`
      },
      {
        name: product.name,
        path: `/catalog/${category.slug}/${product.slug}`
      }
    ])

    return { product }
  },

  data() {
    return {
      searchRadius: 10,
      warhouses: []
    }
  },

  computed: {
    ...mapGetters({
      address: 'user/getAddress',
      coords: 'user/getCoords'
    })
  },

  methods: {
    getWarhouses() {
      contentfulClient.getEntries({
        content_type: 'warhouse',
        // 'fields.coords[near]': `${this.coords}`
        'fields.coords[within]': `${this.coords}, ${this.searchRadius}`
      })
    }
  }
}
</script>
