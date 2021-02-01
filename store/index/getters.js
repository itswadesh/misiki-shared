export default {
    loading(state) {
        return state.loading || false
    },
    error(state) {
        return state.error || null
    },
    settings(state) {
        return state.settings || {}
    }
}