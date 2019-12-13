<template>
  <nav v-if="breadcrumbs.length > 1" class="breadcrumb">
    <ol
      itemscope
      itemtype="http://schema.org/BreadcrumbList"
      aria-label="breadcrumbs"
    >
      <li
        v-for="(breadcrumb, index) in breadcrumbs"
        :key="index"
        :class="{ 'is-active': index === breadcrumbs.length - 1 }"
        itemprop="itemListElement"
        itemscope
        itemtype="http://schema.org/ListItem"
      >
        <nuxt-link :to="breadcrumb.path" itemprop="item">
          <span itemprop="name" v-html="breadcrumb.name"></span>
        </nuxt-link>
        <meta itemprop="position" :content="index + 1" />
      </li>
    </ol>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      breadcrumbs: 'navigation/getBreadcrumbs'
    })
  }
}
</script>
