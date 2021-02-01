<template>
  <div class="fixed top-0 z-10 w-full px-2 py-2 text-center bg-white lg:w-1/2">
    <form
      class="relative"
      novalidate
      autocomplete="off"
      @submit.stop.prevent="submit(search)"
    >
      <div class="absolute">
        <svg
          class="w-6 h-6 mx-3 my-2 text-gray-400 transition-all ease-out transition-medium"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path
            d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"
          />
        </svg>
      </div>
      <input
        aria-label="Search Box"
        type="text"
        v-model="search"
        class="w-full h-10 px-10 pr-4 text-xs border-0 border-gray-200 rounded-full shadow bg-purple-white focus:outline-none"
        placeholder="Search for food"
        name="search"
      />
      <nuxt-link to="/" class="absolute top-0 right-0 focus:outline-none">
        <svg
          class="w-6 h-6 m-2 text-gray-600 transition-all ease-out transition-medium"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path
            d="M5.41 11H21a1 1 0 0 1 0 2H5.41l5.3 5.3a1 1 0 0 1-1.42 1.4l-7-7a1 1 0 0 1 0-1.4l7-7a1 1 0 0 1 1.42 1.4L5.4 11z"
          />
        </svg>
      </nuxt-link>
    </form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      search: '',
    }
  },
  methods: {
    submit(q) {
      this.$router.push(`/search/${q}`)
    },
    go(url) {
      this.$router.go(-1)
    },
  },
  created() {
    this.search = this.$route.params.q
  },
  computed: { ...mapGetters({ settings: 'settings' }) },
  watch: {
    search: {
      immediate: false,
      handler(value, oldValue) {
        // if (value.length < 4) return;
        if (!oldValue) return // Do not trigger on page load
        clearTimeout(this.typingTimer)
        let vm = this
        this.typingTimer = setTimeout(function () {
          if (!value || value == 'undefined') value = '' // When clear button clicked
          vm.searchString = value
          vm.$router.push(`/search/${value}`)
        }, this.settings.typingTimeout)
      },
    },
    '$route.query.q': {
      immediate: true,
      handler(value) {
        let pathName = null
        if (this.$route.name) pathName = this.$route.name.substr(0, 8)
        if (pathName === 'category') return
        if (!value || value == 'undefined') value = ''
        if (value == '') return
        if (this.search == '') this.search = value
      },
    },
  },
}
</script>
