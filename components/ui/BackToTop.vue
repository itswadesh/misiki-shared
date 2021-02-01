<template>
  <button
    class="fixed top-0 z-50 w-24 h-8 mt-16 text-sm font-medium text-center rounded-lg shadow-lg"
    @click="toTop"
    v-if="scrolled > 1000"
  >
    Back To Top
    <ArrowUpIcon />
  </button>
</template>

<script>
import { ArrowUpIcon } from 'vue-feather-icons'
export default {
  name: 'BackToTop',
  data() {
    return {
      shouldShow: false,
      scrolled: 0,
    }
  },
  components: { ArrowUpIcon },
  methods: {
    toTop() {
      if (process.client) {
        window.scrollTo(0, 0)
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
