<template>
  <section class="section">
    <nav><NavigationCatalog /></nav>
    <button @click="getProducts" class="button">include 1</button>
    <button @click="getProducts(10)" class="button">include 0</button>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import { createClient } from '@/plugins/contentful'

import NavigationCatalog from '@/components/NavigationCatalog'

const contentfulClient = createClient()

export default {
  components: {
    NavigationCatalog
  },
  data() {
    return {
      products: []
    }
  },
  computed: {
    ...mapGetters({
      categories: 'navigation/getCategories'
    })
  },
  methods: {
    getProducts(depth = 1) {
      return Promise.all([
        // fetch all blog posts sorted by creation date
        contentfulClient.getEntries({
          content_type: 'product',
          order: '-sys.createdAt',
          include: depth
        })
      ])
        .then(([products]) => {
          // return data that should be available
          // in the template
          this.products = products.items
        })
        .catch(console.error)
    }
  }
}
</script>
