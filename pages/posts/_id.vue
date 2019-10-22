<template>
  <div class="content">
    <h1>{{ post.title }}</h1>
    <div v-html="post.contetn"></div>
  </div>
</template>

<script>
export default {
  async asyncData({ $axios, $payloadURL, route, payload }) {
    // if generated and works as client navigation, fetch previously saved static JSON payload
    if (process.static && process.client) {
      const post = await $axios.$get($payloadURL(route))
      return post
    }

    // your request logic
    // let post = await $axios.$get(`/post.json`)
    return {
      post: payload
    }
  }
}
</script>
