<template>
  <button
    class="fixed bottom-0 right-0 z-10 block w-8 h-8 text-xl text-white bg-gray-500 border-0 rounded-full outline-none cursor-pointer hover:bg-gray-600"
    @click="toTop"
    v-if="scrolled > 1000"
  >
    <img class="w-1/3 m-auto" v-lazy="`/up-arrow.png`" alt />
  </button>
</template>

<script>
export default {
  name: 'BackToTop',
  data() {
    return {
      shouldShow: false,
      scrolled: 0,
    }
  },
  components: {},
  methods: {
    toTop() {
      if (process.client) {
        window.scroll({ behavior: 'smooth', left: 0, top: 100 })
      }
    },
  },
  mounted() {
    if (process.client) {
      window.addEventListener('scroll', () => {
        this.scrolled = window.scrollY
      })
    }
  },
}
</script>
