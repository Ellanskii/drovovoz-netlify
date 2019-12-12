<template>
  <nav class="breadcrumb">
    <ol
      v-if="breadcrumbs.length > 1"
      itemscope
      itemtype="http://schema.org/BreadcrumbList"
      aria-label="breadcrumbs"
    >
      <li
        v-for="(breadcrumb, index) in breadcrumbs"
        :key="index"
        :class="breadcrumb.classes"
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
export default {
  computed: {
    breadcrumbs() {
      const crumbs = []
      this.$route.matched.map((item, i, { length }) => {
        const crumb = {}
        crumb.path = item.path
        crumb.name = this.$i18n.t('route.' + (item.name || item.path))

        // is last item?
        if (i === length - 1) {
          // is param route? .../.../:id
          if (item.regex.keys.length > 0) {
            crumbs.push({
              path: item.path.replace(/\/:[^/:]*$/, ''),
              name: this.$i18n.t('route.' + item.name.replace(/-[^-]*$/, ''))
            })
            crumb.path = this.$route.path
            crumb.name = this.$i18n.t('route.' + this.$route.name, [
              crumb.path.match(/[^/]*$/)[0]
            ])
          }
          crumb.classes = 'is-active'
        }

        crumbs.push(crumb)
      })

      return crumbs
    }
  }
}
</script>
