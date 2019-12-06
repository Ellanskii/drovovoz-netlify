<template>
  <div class="content">
    <h1>{{ category.title }}</h1>
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
      let category = {}
      await contentfulClient
        .getEntries({
          content_type: 'category',
          'fields.slug[in]': route.params.category
        })
        .then((entry) => {
          category = entry.items[0].fields
        })
        .catch()
      return { category }
    }

    // if generated and works as client navigation, fetch previously saved static JSON payload
    if (process.static && process.client) {
      const category = await $axios.$get($payloadURL(route))
      return category
    }
    console.log(process.env.CTF_SPACE_ID)
    // data for generating static page
    return {
      category: payload
    }
  }
}
</script>
