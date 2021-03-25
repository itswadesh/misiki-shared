<template>
  <div class="w-full h-48">
    <ApolloQuery
      :query="require('~/gql/banner/banners.gql')"
      :variables="{ city, type: 'slider', active: true }"
    >
      <template v-slot="{ result: { error, data }, isLoading }">
        <div v-if="isLoading">Loading...</div>
        <ErrComponent v-else-if="error" />
        <div v-else-if="data && data.banners.data.length > 0">
          <VueSlickCarousel
            :arrows="true"
            :dots="true"
            :autoplay="true"
            lazyLoad="ondemand"
          >
            <div v-for="(i, ix) in data.banners.data" :key="ix">
              <img class="object-cover w-full h-48" v-lazy="i.img" alt />
            </div>
          </VueSlickCarousel>
        </div>
      </template>
    </ApolloQuery>
  </div>
</template>

<script>
export default {
  data() {
    return {
      city: null,
      banners: null,
    }
  },
  middleware: ['geo'],
  async created() {
    this.city = (this.$cookies.get('geo') || {}).city
    // try {
    //   this.$store.commit('clearErr')
    //   this.banners = (
    //     await this.$apollo.query({
    //       query: BANNERS,
    //       variables: { city, type: 'slider', active: true },
    //       fetchPolicy: 'no-cache',
    //     })
    //   ).data.banners
    // } catch (e) {
    //   this.$store.commit('setErr', e)
    // } finally {
    //   this.$store.commit('busy', false)
    //   this.$router.push('/')
    // }
  },
}
</script>
