<template>
  <div class="flex flex-row w-full" v-if="count > 1">
    <div
      class="justify-start flex-1 w-full text-xs pagination-container lg:text-sm"
    >
      <div class="w-full pagination-paginationMeta lg:w-auto">
        Page {{ current }} of {{ count }}
      </div>
      <div class="justify-start flex-1 w-full lg:w-auto">
        <button
          v-if="current > 1"
          class="items-center hidden p-2 font-semibold bg-white border border-gray-400 rounded shadow lg:inline-flex lg:mx-5 hover:bg-gray-100 text-primary lg:py-2 lg:px-4"
          @click="$emit('change', current - 1)"
          rel="prev"
        >
          <ArrowLeftIcon />&nbsp;
          <span>Previous</span>
        </button>
        <button
          class="w-8 h-8 rounded-full"
          :class="{
            'bg-black font-medium text-white tracking-wide rounded-sm':
              current == i,
          }"
          v-for="i in pages"
          :key="i"
          @click="$emit('change', i)"
        >
          {{ i }}
        </button>
        <button
          class="inline-flex items-center hidden px-4 py-2 font-semibold bg-white border border-gray-400 rounded shadow lg:inline-flex hover:bg-gray-100 text-primary"
          @click="$emit('change', current + 1)"
          v-if="current < count"
          rel="next"
        >
          <span>Next</span>
          &nbsp;
          <ArrowRightIcon />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ArrowLeftIcon, ArrowRightIcon } from 'vue-feather-icons'
export default {
  components: { ArrowLeftIcon, ArrowRightIcon },
  computed: {
    pages() {
      let count = this.count > 10 ? 10 : this.count
      return parseInt(count)
    },
  },
  props: {
    count: {
      type: Number,
      default: 1,
    },
    current: {
      type: Number,
      default: 1,
    },
  },
  methods: {},
}
</script>

<style scoped>
.pagination-container {
  list-style: none;
  text-align: center;
  border-top: 1px solid #edebef;
  padding: 20px 0px;
  color: #282c3f;
}
.pagination-paginationMeta {
  color: #535766;
  font-size: 14px;
  float: left;
  margin: 10px;
  cursor: default;
  font-weight: 400;
}
li {
  display: inline-block;
  font-weight: 500;
  cursor: pointer;
  border-radius: 0.4rem;
}
</style>
