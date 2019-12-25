<template>
  <div class="menu navigation-catalog">
    <p class="menu-label">
      Каталог
    </p>
    <ul class="menu-list">
      <li v-for="category in tree" :key="category.id">
        <nuxt-link
          :to="
            localePath({
              name: 'catalog-category',
              params: { category: category.slug }
            })
          "
        >
          {{ category.name }}
        </nuxt-link>
        <ul>
          <li v-for="product in category.products" :key="product.id">
            <nuxt-link :to="`/catalog/${category.slug}/${product.slug}`">
              {{ product.name }}
            </nuxt-link>
          </li>
        </ul>
      </li>
    </ul>
  </div>
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

<style lang="scss">
.navigation-catalog {
  a {
    transition: all $slow;
  }
}
</style>
