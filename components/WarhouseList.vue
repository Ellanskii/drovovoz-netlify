<template>
  <ul>
    <li v-for="warhouse in warhouses" :key="warhouse.id">
      {{ warhouse.address }}
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    warhouses: Array
  }
}
</script>

<style></style>
