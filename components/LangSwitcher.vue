// TODO a11y
<template>
  <b-dropdown v-if="$i18n.locales.length > 1" v-model="currentLocale">
    <button slot="trigger" class="button is-primary" type="button">
      <b-icon icon="earth"></b-icon>
      {{ selectedLocale.name }}&nbsp;
      <span class="is-uppercase">({{ selectedLocale.code }})</span>
    </button>
    <b-dropdown-item
      v-for="locale in $i18n.locales"
      :key="locale.code"
      :value="locale.code"
      has-link
    >
      <nuxt-link :to="switchLocalePath(locale.code)">{{
        locale.name
      }}</nuxt-link>
    </b-dropdown-item>
  </b-dropdown>
</template>

<script>
export default {
  data() {
    return {
      currentLocale: this.$i18n.locale
    }
  },
  computed: {
    selectedLocale() {
      return this.$i18n.locales.find(
        (locale) => locale.code === this.currentLocale
      )
    }
  }
}
</script>

<style></style>
