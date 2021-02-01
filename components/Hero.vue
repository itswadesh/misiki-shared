<template>
  <div class="w-full h-48">
    <ApolloQuery
      :query="require('~/../shared/gql/banner/banners.gql')"
      :variables="{ city, type: 'slider', active: true }"
    >
      <template v-slot="{ result: { error, data }, isLoading }">
        <content-loader
          v-if="isLoading"
          :height="70"
          :speed="2"
          primaryColor="#f3f3f3"
          secondaryColor="#ecebeb"
        >
          <rect x="30" y="15" width="50" height="50" />
          <rect x="130" y="15" rx="4" ry="4" width="50" height="50" />
          <rect x="230" y="15" rx="4" ry="4" width="50" height="50" />
          <rect x="330" y="15" rx="4" ry="4" width="50" height="50" />
        </content-loader>
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
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'

export default {
  data() {
    return {
      city: null,
      banners: null,
    }
  },
  components: { VueSlickCarousel },
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
