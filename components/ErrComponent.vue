<template>
  <div v-if="error" class="err">
    <div
      v-if="
        error.message ==
        'Network error: Unexpected token E in JSON at position 0'
      "
    >
      Unable to connect to server
    </div>
    <div v-else>{{ error }}</div>
  </div>
</template>
<script>
export default {
  props: ['error'],
}
</script>
