export default {
    cart: state => {
        return state
    },
    showCart(state) {
        return state.showCart
    },
    checkCart: state => ({ pid, vid }) => {
        // Returns true when there is item in cart
        var found = state.items.some(function (el) {
            return el.pid === pid
        })
        return found
    },
    getItemQty: state => ({ pid, vid }) => {
        // Gets cart qty of that item
        for (let i of state.items) {
            if (i.pid === pid) {
                return i.qty
            }
        }
    }
}