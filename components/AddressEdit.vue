<template>
  <div class="w-full p-2 pb-4 bg-white lg:p-8">
    <form
      class="w-full mb-1 lg:mx-15 form"
      novalidate
      autocomplete="off"
      @submit.stop.prevent="submit(a)"
    >
      <div class="p-2 mb-20">
        <Textbox
          autofocus
          label="First Name"
          class="w-full mb-4"
          name="firstName"
          v-model="a.firstName"
        />
        <Textbox
          label="Last Name"
          class="w-full mb-4"
          name="lastName"
          v-model="a.lastName"
        />
        <Textbox
          label="Address"
          class="w-full mb-4"
          name="name"
          v-model="a.address"
        />
        <Textbox
          type="tel"
          label="Pin Code"
          class="w-full mb-4"
          name="name"
          v-model.number="a.zip"
        />
        <!-- <Textbox
          label="Landmark"
          class="w-full mb-4"
          name="name"
          v-model="a.landmark"
        /> -->

        <div class="flex justify-between w-full mb-4">
          <Textbox
            label="City"
            class="w-1/2 mr-1"
            name="name"
            v-model="a.city"
          />
          <!-- // TODO: replace v-select with material select from mcq -->
          <!-- <v-select
            :options="states.data"
            label="name"
            :reduce="(s) => s.name"
            v-model="a.state"
            placeholder="Select State"
            class="mb-4"
          /> -->
        </div>
        <Textbox
          type="tel"
          label="Phone"
          class="w-full"
          name="name"
          v-model="a.phone"
        />
      </div>
      <div class="relative bottom-0 w-full">
        <div class="flex justify-between w-full px-2 mt-4 mb-0 bg-white">
          <button
            type="button"
            @click="$router.push('/my/address')"
            class="w-1/2 p-3 text-sm font-semibold tracking-widest text-black bg-white lg:rounded"
          >
            CANCEL
          </button>
          <button
            type="submit"
            class="w-1/2 p-3 text-sm font-semibold tracking-widest primary lg:rounded"
          >
            CONTINUE
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { Textbox } from '~/../shared/components/ui'
import { Header } from '~/../shared/components'
import vSelect from 'vue-select'
import saveAddress from '~/../shared/gql/user/saveAddress.gql'
// import addAddress from '~/../shared/gql/user/addAddress.gql'
import GET_STATES from '~/../shared/gql/state/states.gql'
import address from '~/../shared/gql/user/address.gql'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      a: {},
      states: {},
    }
  },
  props: { id: { type: String }, go: { type: String } }, // if checkout, navigate to checkout
  components: { Header, Textbox, vSelect },
  async created() {
    this.a = this.$cookies.get('geo')
    // if (!this.a) {
    this.a.firstName = this.user.firstName
    this.a.lastName = this.user.lastName
    this.a.phone = this.user.phone
    // }
    const id = this.id
    try {
      this.states = (
        await this.$apollo.query({ query: GET_STATES })
      ).data.states
    } catch (e) {
      this.$store.commit('setErr', e)
    } finally {
      this.$store.commit('busy', false)
    }
    if (id === 'add') return
    try {
      this.a = (
        await this.$apollo.query({
          query: address,
          variables: { id },
          fetchPolicy: 'no-cache',
        })
      ).data.address
    } catch (e) {
      this.$store.commit('setErr', e)
    } finally {
      this.$store.commit('busy', false)
    }
  },
  methods: {
    async submit(address) {
      if (address.coords) delete address.coords.__typename
      try {
        if (!address.id) address.id = 'new'
        const addr = (this.a = (
          await this.$apollo.mutate({
            mutation: saveAddress,
            variables: address,
          })
        ).data.saveAddress)
        this.go == 'checkout'
          ? this.$router.push(`/checkout/payment-mobile?address=${addr.id}`)
          : this.$router.push('/my/address')
      } catch (e) {
        this.$store.commit('setErr', e)
      } finally {
        this.$store.commit('busy', false)
      }
    },
  },
  computed: {
    ...mapGetters({
      user: 'auth/user',
    }),
  },
  layout: 'none',
}
</script>

<style scoped>
/* form */
form {
  display: inline-block;
}
.field {
  padding-top: 10px;
  display: flex;
  flex-direction: column;
}
label {
  order: -1;
  padding-left: 5px;
  font-size: 14px;
  transition: all 0.3s ease-in;
  transform: translateY(30px);
  pointer-events: none;
}
input:focus + label,
textarea:focus + label {
  transform: translateY(16px);
}
/* form ends */
</style>
