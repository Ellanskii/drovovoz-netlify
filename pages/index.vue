<template>
  <section class="section">
    <div class="columns is-mobile">
      <nuxt-link to="users/1">user 1</nuxt-link>
      <nuxt-link to="users/2">user 2</nuxt-link>
    </div>
  </section>
</template>

<script>
import Card from '~/components/Card'

export default {
  name: 'HomePage',

  components: {
    Card
  }
}
</script>
