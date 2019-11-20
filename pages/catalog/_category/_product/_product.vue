<template>
  <div class="content">
    <h1>{{ product.title }}</h1>
    <div v-html="product.description"></div>
  </div>
</template>

//
<script>
// export default {
//   async asyncData({ $axios, $payloadURL, route, payload }) {
//     // получаем данные через API, если это не статика
//     // if (!process.static) {
//     //   let post = {}
//     //   await $axios
//     //     .$get(`https://jsonplaceholder.typicode.com/posts/${route.params.id}`)
//     //     .then((res) => {
//     //       post = res
//     //     })
//     //     .catch()
//     //   return { post }
//     // }

//     // if generated and works as client navigation, fetch previously saved static JSON payload
//     if (process.static && process.client) {
//       const product = await $axios.$get($payloadURL(route))
//       return product
//     }

//     // data for generating static page
//     return {
//       product: payload
//     }
//   }
// }
//
</script>
