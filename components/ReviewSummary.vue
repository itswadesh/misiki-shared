<template>
  <ApolloQuery
    :query="query"
    class="flex items-center justify-center w-full p-2 bg-blue-100"
  >
    <template v-slot="{ result: { error, data }, isLoading }">
      <div v-if="isLoading">Loading........</div>
      <ErrComponent v-else-if="error" :error="error" />
      <div
        v-else-if="data && data[model]"
        class="flex w-full text-gray-900 bg-white rounded shadow-md h-60 card"
      >
        <div class="flex flex-col w-full">
          <div class="flex-1 p-4 pb-0">
            <h3 class="mb-1 text-xl font-thin text-gray-800">
              Reviews / Comments
            </h3>
            <span class="text-5xl font-bold text-gray-900">
              {{ 100 }}
              <span class="text-sm">reviews</span>
              200
              <span class="text-sm">comments</span>
            </span>
          </div>
          <nuxt-link
            to="/reviews"
            class="flex items-center justify-between p-3 transition bg-gray-100 hover:bg-gray-200"
          >
            View All
            <ArrowRightIcon />
          </nuxt-link>
        </div>
      </div>
    </template>
  </ApolloQuery>
</template>
<script>
import { ArrowRightIcon } from 'vue-feather-icons'
export default {
  props: {
    heading: {
      type: String,
    },
    detail: {
      type: String,
    },
    query: {
      type: Object,
    },
    link: {
      type: String,
    },
    model: {
      type: String,
    },
  },
  components: { ArrowRightIcon },
}
</script>
