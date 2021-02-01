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
            <h3 class="mb-1 text-2xl font-thin text-gray-800">{{ heading }}</h3>
            <div class="flex items-center mb-4 text-xs">
              <ActivityIcon class="mr-1 text-grey-dark" />
              {{ data[model].count }} orders
            </div>
            <span class="text-5xl font-bold text-gray-900">{{
              data[model].amount | currency(settings.currency_symbol)
            }}</span>
            <div class="flex items-center mt-4">
              <div class="pr-2 text-xs">
                <RepeatIcon />Last Order:
                <span class="text-green-500">{{
                  data[model].createdAt | date
                }}</span>
              </div>
            </div>
          </div>
          <nuxt-link
            :to="link"
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
import { ArrowRightIcon, RepeatIcon, ActivityIcon } from 'vue-feather-icons'
import { mapGetters } from 'vuex'
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
  components: { ArrowRightIcon, RepeatIcon, ActivityIcon },
  computed: { ...mapGetters({ settings: 'settings' }) },
}
</script>
