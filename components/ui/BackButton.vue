<template>
  <button @click="go()" type="button" class="btn nav hover:bg-gray-100">
    <ArrowLeftIcon class="ml-4" />
    <canvas height="0" width="0" class="canvas"></canvas>
  </button>
</template>

<script>
import { ArrowLeftIcon } from 'vue-feather-icons'
export default {
  components: { ArrowLeftIcon },
  props: {
    to: { type: String },
  },
  methods: {
    go() {
      this.to ? this.$router.push(this.to) : this.$router.go(-1)
    },
  },
}
</script>

<style scoped>
.btn {
  z-index: 10;
  height: 3.5rem;
  border: 0;
  width: 4rem;
  background: #fff;
  border-radius: 0;
}
.nav {
  position: absolute;
  border-radius: 0px 50px 50px 0px;
  box-shadow: rgb(224, 224, 224) 0px 2px 8px 1px;
}
.canvas {
  border-radius: inherit;
  height: 100%;
  left: 0px;
  position: absolute;
  top: 0px;
  width: 100%;
}
</style>
