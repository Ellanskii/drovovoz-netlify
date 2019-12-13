<template>
  <picture>
    <!-- <source v-if="webp" :srcset="" type="image/webp" /> -->
    <img :src="computedSrc" :alt="alt" :class="imgClass" />
  </picture>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      required: true
    },
    alt: {
      type: String,
      default: ''
    },
    ratios: {
      type: Array,
      default: () => {
        return [1, 2]
      }
    },
    format: {
      type: String,
      default: 'jpg'
    },
    width: [String, Number],
    webp: {
      type: Boolean,
      default: true
    },
    imgClass: {
      type: String,
      default: ''
    }
  },

  computed: {
    computedSrc() {
      let src = this.src
      src += '?'
      if (this.width) {
        src += `w=${this.width}&`
      }
      if (this.format === 'jpg') {
        src += 'fm=jpg&fl=progressive&'
      }
      return src
    },
    sources() {
      this.formats.forEach((format) => {
        this.ratios.forEach((ratio) => {})
      })
      return []
    }
  },

  methods: {
    encodeParams(params) {}
  }
}
</script>

<style>
.is-contained {
  object-fit: contain;
}
.is-covered {
  object-fit: cover;
}
</style>
