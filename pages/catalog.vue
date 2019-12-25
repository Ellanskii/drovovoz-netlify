<template>
  <div class="container">
    <div class="columns">
      <aside class="column is-2">
        <NavigationCatalog />
      </aside>
      <main class="column">
        <BreadcrumbList />
        <nuxt-child :key="$route.path" />
      </main>
      <div class="column is-2"></div>
    </div>
  </div>
</template>

<script>
import NavigationCatalog from '@/components/NavigationCatalog'
import BreadcrumbList from '~/components/BreadcrumbList'

export default {
  components: {
    NavigationCatalog,
    BreadcrumbList
  }
}
</script>

<style></style>
