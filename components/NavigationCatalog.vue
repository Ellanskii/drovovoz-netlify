<template>
  <ul>
    <li v-for="category in tree" :key="category.id">
      <nuxt-link :to="`catalog/${category.slug}`">
        {{ category.name }}
      </nuxt-link>
      <ul>
        <li v-for="product in category.products" :key="product.id">
          <nuxt-link :to="`catalog/${category.slug}/${product.slug}`">
            {{ product.name }}
          </nuxt-link>
        </li>
      </ul>
    </li>
  </ul>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      tree: 'navigation/getNavigationTree'
    })
  }
}
</script>
