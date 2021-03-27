<template>
  <div
    class="relative mx-1 my-3 mb-2 bg-white border rounded shadow sm:mx-3 sm:w-56"
    v-if="p"
  >
    <!-- <img
      v-lazy="p.type === 'V' ? '/veg.png' : '/non-veg.png'"
      class="absolute top-0 left-0 z-50 w-5 mt-1 ml-1 bg-white"
    /> -->
    <nuxt-link :to="`/${p.slug}`" class="relative block">
      <div
        v-if="p.time == '12 - 2 PM'"
        class="absolute right-0 z-10 px-4 text-xs text-white bg-red-500 rounded-l-lg opacity-75"
      >
        Lunch
      </div>
      <div
        v-else-if="p.time == '8:30 - 9:30 PM'"
        class="absolute right-0 z-10 px-4 text-xs text-white bg-blue-500 rounded-l-lg opacity-75"
      >
        Dinner
      </div>
      <img
        v-lazy="`${p.img}`"
        alt
        class="object-cover w-full h-32 mb-2 rounded"
      />
    </nuxt-link>
    <div class="px-2">
      <div class="relative">
        <div class="h-6">
          <div v-if="p.ratings" class="flex items-center">
            <Ratingcircle :rating="p.ratings" class="m-review" />
            <div class="pl-2 text-xs">{{ p.reviews }}</div>
          </div>
        </div>
        <nuxt-link :to="`/${p.slug}`">
          <h2 class="h-8 pr-2 text-xs font-bold tracking-wide line-clamp-2">
            {{ p.name }}
          </h2>
        </nuxt-link>
        <p>{{ p.description }}</p>
        <div class="flex flex-wrap items-center justify-between my-2">
          <div class="font-bold">
            {{ p.price | currency(settings.currency_symbol) }}
          </div>
          <del class="text-xs text-gray-700">
            {{ p.mrp | currency(settings.currency_symbol) }}
          </del>
          <div v-if="p.stock < 1" class="text-xs text-red-500">
            Out of stock
          </div>
          <div v-else class="text-xs text-red-500">
            <span v-if="p.stock < 6">Only</span> {{ p.stock }} left
          </div>
          <img
            v-lazy="p.type === 'V' ? '/veg.png' : '/non-veg.png'"
            class="w-5 mt-1 mr-1"
          />
        </div>
      </div>
      <div class="bottom-0 py-1 text-xs border-t" v-if="p.vendor">
        By {{ p.vendor.info.restaurant }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { Ratingcircle } from './ui'
export default {
  props: ['p'],
  methods: {},
  components: { Ratingcircle },
  computed: { ...mapGetters({ settings: 'settings' }) },
}
</script>

<style scoped></style>
