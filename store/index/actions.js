import { DOMAIN } from '~/shared/config/index'
import STORE_ONE from '~/gql/store/storeOne.gql'
import SETTINGS from '~/gql/settings/settings.gql'
import MEGAMENU from '~/gql/category/megamenu.gql'
import INIT from '~/gql/groupQueries/INIT.gql'
import SAVE_FCM_TOKEN from '~/gql/fcmToken/saveFcmToken.gql'
import SUBSCRIPTION_SETTINGS_UPDATED from '~/gql/settings/settingsUpdated.gql'
export default {
  async fcm({ commit, state, getters }) {
    try {
      if (process.client) {
        const currentToken = await this.$fire.messaging.getToken({})
        if (currentToken) {
          await this.app.apolloProvider.defaultClient.mutate({
            mutation: SAVE_FCM_TOKEN,
            variables: { id: 'new', token: currentToken, platform: 'web' },
            fetchPolicy: 'no-cache',
          })
        } else {
          // Show permission request UI
          // console.log(
          //   'No registration token available. Request permission to generate one.'
          // )
          // ...
        }
      }
    } catch (e) {
      // console.log('FCM:::', e.toString())
    }
  },
  async fetchSettings({ commit, state, getters, $fire, params }, domain) {
    try {
      commit('clearErr')
      const settings = (
        await this.app.apolloProvider.defaultClient.query({ query: SETTINGS })
      ).data.settings
      commit('settings', settings)
    } catch (e) {
      commit('setErr', e)
    } finally {
      commit('busy', false)
    }
  },
  async fetchOnce({ commit, state, getters, $fire, params }, domain) {
    try {
      commit('clearErr')
      const som = (
        await this.app.apolloProvider.defaultClient.query({
          query: INIT,
          variables: { domain },
          errorPolicy: 'all',
        })
      ).data
      const settings = som.settings
      const stor = som.storeOne
      const megamenu = som.megamenu
      const popularSearches = som.popularSearches
      const cart = som.cart
      const me = som.me
      commit('settings', settings)
      commit('megamenu', megamenu)
      commit('popularSearches', popularSearches) // We don't want it here because it will slowdown initial load
      commit('store', stor)
      commit('auth/setUser', me)
      commit('cart/setCart', cart)
    } catch (e) {
      commit('auth/setUser', null)
      commit('setErr', e)
    } finally {
      commit('busy', false)
    }
  },
  async fetch({ commit, state, getters, $fire, params }, domain) {
    try {
      commit('clearErr')
      const variables = { domain }
      const stor = (
        await this.app.apolloProvider.defaultClient.query({
          query: STORE_ONE,
          variables,
        })
      ).data.storeOne
      if (stor) {
        const megamenu = (
          await this.app.apolloProvider.defaultClient.query({
            query: MEGAMENU,
            variables: { store: stor.id },
          })
        ).data.megamenu
        commit('megamenu', megamenu)
        commit('store', stor)
      }
    } catch (e) {
      console.error('An error occurred while retrieving token. ', e)

      if (
        e.toString() !==
        'Error: Network error: Unexpected token E in JSON at position 0'
      )
        commit('setErr', e)
    } finally {
      commit('busy', false)
    }
  },
  async nuxtClientInit({ state, commit, dispatch }, context) {
  },
  async nuxtServerInit({ state, commit, dispatch }, { params, app, req }) {
    const host = req.headers.host
    const domain = new URL('http://' + host)
    await dispatch('fetchOnce', DOMAIN || domain.hostname)
  },
}
