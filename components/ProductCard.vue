<template>
  <div class="card">
    <div class="card-image">
      <PictureResponsive
        :src="product.cover"
        width="400"
        class="image is-1by1"
        img-class="is-contained"
      />
    </div>
    <div class="card-content">
      <h2 class="title">{{ product.name }}</h2>
    </div>
  </div>
</template>

<script>
import PictureResponsive from '~/components/PictureResponsive'

export default {
  components: {
    PictureResponsive
  },
  props: {
    product: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss"></style>
