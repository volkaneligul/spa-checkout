import service from '../services/service'

const state = {
    cart: []
}

const getters = {}

const mutations = {
    setCart(state, cart) {
        state.cart = cart
    }
}

const actions = {
    fetchCart(context) {
        service.fetchCart().then((res) => {
            //console.log(res.data)
            context.commit('setCart', res.data)
        })
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}