<template>
  <div class="w-full px-2 mt-0 lg:pr-20 xs:w-full lg:px-10">
    <Heading title="Manage Address" />
    <div class="w-full my-4">
      <nuxt-link
        :to="`address/add`"
        class="
          flex
          items-center
          justify-center
          w-full
          p-5
          mb-5
          text-center
          bg-white
          border border-gray-100
          rounded
          shadow
          hover:shadow-xl
        "
      >
        <PlusIcon class="w-10 mr-1" />ADD NEW ADDRESS
      </nuxt-link>
      <ApolloQuery :query="require('~/gql/address/addresses.gql')">
        <template v-slot="{ result: { error, data }, isLoading }">
          <div v-if="isLoading"></div>
          <ErrComponent v-else-if="error" :error="error" />
          <div v-else-if="data && data.addresses">
            <div
              class="
                relative
                flex flex-wrap
                w-full
                px-5
                py-3
                mb-5
                bg-white
                border border-gray-100
                rounded
                shadow
                hover:shadow-xl
              "
              v-for="a in data.addresses"
              :key="a.id"
            >
              <nuxt-link
                :to="`address/${a.id}`"
                class="
                  absolute
                  right-0
                  px-2
                  mr-2
                  text-xs text-right
                  border border-gray-300
                  rounded
                "
                >Edit</nuxt-link
              >
              <!-- <span class="p-1 text-xs text-gray-700 bg-gray-200">HOME</span> -->
              <!-- <nuxt-link :to="`address/add?id=${a._id}`" class="absolute right-0 px-5 text-right" >
          <p class="w-1 h-1 m-1 bg-gray-500 rounded-full"></p>
          <p class="w-1 h-1 m-1 bg-gray-500 rounded-full"></p>
          <p class="w-1 h-1 m-1 bg-gray-500 rounded-full"></p>
              </nuxt-link>-->
              <div class="w-full p-4 text-sm leading-loose">
                <p>
                  <b>{{ a.firstName }} {{ a.lastName }}</b>
                </p>
                <div class="w-full py-2 text-sm leading-loose">
                  <p>{{ a.phone }}</p>
                  <p>{{ a.address }}</p>
                  <p>{{ a.city }}</p>
                  <p>
                    {{ a.state }}-
                    <span class="font-bold">{{ a.zip }}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </template>
      </ApolloQuery>
    </div>
  </div>
</template>
<script>
// import Vue from 'vue'
// import addresses from '~/gql/address/addresses.gql'
import deleteAddress from '~/gql/address/deleteAddress.gql'
// import gql from 'graphql-tag'
import Heading from './Heading'
import ListSkeleton from './ui/ListSkeleton'
import { PlusIcon } from 'vue-feather-icons'

export default {
  layout: 'account',
  middleware: ['isAuth'],
  components: { Heading, ListSkeleton, PlusIcon },
  data() {
    return {
      // addresses: []
    }
  },
  async created() {
    // this.getAddresses()
  },
  methods: {
    // async getAddresses() {
    //   try {
    //     this.$store.commit('busy', true)
    //     this.$store.commit('clearErr')
    //     const res = (
    //       await this.$apollo.query({
    //         query: addresses
    //       })
    //     ).data
    //     this.addresses = res.addresses
    //   } catch (e) {
    //     this.$store.commit('setErr', e)
    //   } finally {
    //     this.$store.commit('busy', false)
    //   }
    // },
    async del(address) {
      this.$swal({
        title: 'Do you wish to delete this address?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, Delete!',
      }).then(async (result) => {
        if (result.value) {
          this.$store.commit('clearErr')
          await this.$apollo.mutate({
            mutation: gql`
              mutation deleteAddress($id: ID!) {
                deleteAddress(id: $id)
              }
            `,
            variables: { id: address.id },
          })
          this.getAddresses()
        }
      })
    },
  },
}
</script>
