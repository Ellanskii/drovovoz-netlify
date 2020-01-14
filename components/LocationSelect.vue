<template>
  <form @submit.prevent="setLocation" action="">
    <section class="modal-card location-select">
      <header class="modal-card-head">
        <p class="modal-card-title">Адрес доставки</p>
      </header>
      <div class="modal-card-body is-paddingless">
        <yandex-map :coords="coords" ymap-class="map"> </yandex-map>
      </div>
      <footer class="modal-card-foot">
        <button type="submit" class="button is-primary">Продолжить</button>
      </footer>
    </section>
  </form>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {}
  },
  computed: {
    ...mapGetters({
      address: 'user/getAddress',
      coords: 'user/getCoords'
    })
  },
  methods: {
    setLocation() {
      this.$parent.close()
    }
  }
}
</script>

<style lang="scss">
.location-select {
  width: auto;

  .map {
    height: 500px;
  }
}
</style>
