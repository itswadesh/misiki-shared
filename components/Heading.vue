<template>
  <div class="flex items-center justify-start px-2 bg-white">
    <!-- <button @click="go()" class="absolute flex flex-1 font-bold text-left">
      <svg
        class="w-6 h-6 transition-all ease-out transition-medium"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path
          d="M5.41 11H21a1 1 0 0 1 0 2H5.41l5.3 5.3a1 1 0 0 1-1.42 1.4l-7-7a1 1 0 0 1 0-1.4l7-7a1 1 0 0 1 1.42 1.4L5.4 11z"
        />
      </svg>
    </button> -->
    <h1 class="flex-1 p-2 text-xl font-semibold text-center bg-white">
      {{ title }}
    </h1>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    back: String,
  },
  methods: {
    go(url) {
      this.back ? this.$router.push(this.back || -1) : this.$router.go(-1)
    },
  },
}
</script>

<style scoped></style>
