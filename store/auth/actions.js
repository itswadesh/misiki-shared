import updateProfile from './../../gql/user/updateProfile.gql'
import me from './../../gql/user/me.gql'
import signOut from './../../gql/user/signOut.gql'
import login from './../../gql/user/login.gql'
import register from './../../gql/user/register.gql'
import changePassword from './../../gql/user/changePassword.gql'
import getOtp from './../../gql/user/getOtp.gql'
import verifyOtp from './../../gql/user/verifyOtp.gql'

export default {
    async fetch({ commit, state, getters }) {
        // This is only to get data from saved cart
        try {
            commit('clearErr', null, { root: true })
            commit('busy', true, { root: true })
            const data = (
                await this.app.apolloProvider.defaultClient.query({
                    query: me,
                    fetchPolicy: 'no-cache'
                })
            ).data.me
            commit('setUser', data)
            return data
        } catch (e) {
            // commit('setErr', e, { root: true })
        } finally {
            commit('busy', false, { root: true })
        }
    },
    async getOtp({ commit, rootState }, {phone}) {
        try {
            commit('clearErr', null, { root: true })
            commit('busy', true, { root: true })
            await this.app.apolloProvider.defaultClient.mutate({
                mutation: getOtp, variables:{phone}, fetchPolicy: 'no-cache'
            })
            commit('clearErr', null, { root: true })
            return
        } catch (e) {
            commit('setErr', e, { root: true })
            throw e
        } finally {
            commit('busy', false, { root: true })
        }
    },
    async verifyOtp({ commit, rootState }, variables) {
        try {
            commit('clearErr', null, { root: true })
            commit('busy', true, { root: true })
            const data = (await this.app.apolloProvider.defaultClient.mutate({
                mutation: verifyOtp, variables, fetchPolicy: 'no-cache'
            })).data.verifyOtp
            commit('setUser', data)
            commit('clearErr', null, { root: true })
            return data
        } catch (e) {
            commit('setErr', e, { root: true })
            throw e
        } finally {
            commit('busy', false, { root: true })
        }
    },
    async logout({ commit, rootState }, variables) {
        try {
            commit('clearErr', null, { root: true })
            const logout = (await this.app.apolloProvider.defaultClient.mutate({ mutation: signOut, fetchPolicy: 'no-cache' })).data.signOut
            if (logout) {
                commit('clearUser')
                this.app.router.push('/')
            }
            else
                commit('setErr', 'Logout error', { root: true })
        }
        catch (e) {
        } finally {
            commit('busy', false, { root: true })
        }
    },
    async register({ commit, rootState }, variables) {
        try {
            commit('clearErr', null, { root: true })
            const data = (
                await this.app.apolloProvider.defaultClient.mutate({
                    mutation: register,
                    variables
                })
            ).data.register
            if (data) {
                commit('setUser', {
                    phone: data.phone,
                    email: data.email,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    avatar: data.avatar,
                    gender: data.gender,
                    state: data.state,
                    city: data.city,
                    zip: data.zip,
                    phone: data.phone
                })
                commit('info', 'Registered successfully.', { root: true })
                return data
            }
        } catch (err) {
            throw err
        } finally {
            commit('busy', false, { root: true })
        }
    },
    async login({ commit, rootState }, variables) {
        try {
            commit('clearErr', null, { root: true })
            const data = (
                await this.app.apolloProvider.defaultClient.mutate({
                    mutation: login,
                    variables,
                    fetchPolicy: 'no-cache'
                })
            ).data.login
            if (data) {
                commit('setUser', {
                    phone: data.phone,
                    email: data.email,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    avatar: data.avatar,
                    gender: data.gender,
                    state: data.state,
                    city: data.city,
                    zip: data.zip,
                    phone: data.phone,
                    carbon_neutral: data.carbon_neutral
                })
                return data
            }
        } catch (e) {
            commit('setErr', e, { root: true })
            throw e
        } finally {
            commit('busy', false, { root: true })
        }
    },
    async changePassword({ commit, rootState }, variables) {
        try {
            commit('clearErr', null, { root: true })
            const data = (
                await this.app.apolloProvider.defaultClient.mutate({
                    mutation: changePassword,
                    variables,
                    fetchPolicy: 'no-cache'
                })
            ).data.changePassword
        } catch (e) {
            commit('setErr', e, { root: true })
            throw e
        } finally {
            commit('busy', false, { root: true })
        }
    },
    async resetPassword({ commit, rootState }, variables) {
        try {
            commit('clearErr', null, { root: true })
            return (
                await this.app.apolloProvider.defaultClient.mutate({
                    mutation: resetPassword,
                    variables,
                    fetchPolicy: 'no-cache'
                })
            ).data.resetPassword
        } catch (e) {
            throw e
        } finally {
            commit('busy', false, { root: true })
        }
    },
    async emailPassword({ commit, rootState }, variables) {
        try {
            commit('clearErr', null, { root: true })
            const data = (
                await this.app.apolloProvider.defaultClient.mutate({
                    mutation: emailPassword,
                    variables,
                    fetchPolicy: 'no-cache'
                })
            ).data.emailPassword
            return data
        } catch (e) {
            throw e
        } finally {
            commit('busy', false, { root: true })
        }
    },
    async updateProfile({ commit, rootState }, variables) {
        try {
            commit('clearErr', null, { root: true })
            const data = (await this.app.apolloProvider.defaultClient.mutate({
                mutation: updateProfile,
                variables
            })).data.updateProfile
            commit('setUser', {
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                avatar: data.avatar,
                verified: data.verified,
                dob: data.dob,
                role: data.role,
                gender: data.gender,
                state: data.state,
                city: data.city,
                zip: data.zip,
                phone: data.phone,
                info: data.info
            })
            // commit('info', 'Profile updated.', { root: true }) // Also fired on location change
            commit('busy', false, { root: true })
            return data
        } catch (err) {
            throw err
        }
    }
}