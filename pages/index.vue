<template>
  <section class="section">
    <nav><NavigationCatalog /></nav>
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
    getProducts() {
      return Promise.all([
        // fetch all blog posts sorted by creation date
        contentfulClient.getEntries({
          content_type: 'product',
          order: '-sys.createdAt'
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
