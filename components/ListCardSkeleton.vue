<template>
  <div>
    <div class="relative flex px-1 py-2 m-2 bg-white rounded shadow">
      <div class="p-2">
        <img v-lazy="`/loading.svg`" class="object-cover w-32 h-20 rounded" />
      </div>
      <div class="w-full my-2">
        <div>
          <img
            v-lazy="`/food-tray.svg`"
            class="absolute top-0 right-0 object-cover w-8 h-8 mt-2 mr-2 rounded-full"
          />
        </div>
        <div class="w-48 font-bold tracking-wide bg-gray-100">&nbsp;</div>
        <div class="flex justify-between">
          <div class="flex items-center text-sm tracking-widest text-gray-500">
            <div class="w-48 bg-gray-100 rounded">&nbsp;</div>
          </div>
          <div class="text-xl font-black text-gray-700">
            {{ 0 | currency(settings.currency_symbol) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  methods: {},
  computed: { ...mapGetters({ settings: 'settings' }) },
}
</script>

<style scoped></style>
