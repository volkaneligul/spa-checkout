import service from '../services/service'
import { getCart } from '../localData/getCart'
import { getDelivery } from '../localData/getDelivery'
import { getChangeCartItemQuantity } from '../localData/getChangeCartItemQuantity'

const state = {
    data: []
}

const getters = {
    warningMessageList(state) {
        return state.data.warningMessageList
    },
    informationMessageList(state) {
        return state.data.informationMessageList
    },
    rightSidebarData() {
        return {
            cartItemTotalQuantity: state.data.cartItemTotalQuantity,
            isGiftCertPriceSubtractedFromTotalPrice: state.data.isGiftCertPriceSubtractedFromTotalPrice,
            totalPrice: state.data.totalPrice,
            totalTax: state.data.totalTax,
            blockContinue: state.data.blockContinue,
            isGiftBoxOptionRestricted: state.data.isGiftBoxOptionRestricted,
            cartItemPrice: state.data.cartItemPrice,
            giftBoxAmount: state.data.giftBoxAmount,
            shippingPrice: state.data.shippingPrice,
            isGiftCertUsed: state.data.isGiftCertUsed,
            isPartnerPointUsed: state.data.isPartnerPointUsed
        }
    },
    cartItemList() {
        return state.data.itemList
    },
    shippingAddresses() {
        return state.data.addressItemList.filter(data => data.typeCode === 1)
    },
    billingAddresses() {
        return state.data.addressItemList.filter(data => data.typeCode === 2)
    },
    selectedShippingAddress(state, getters) {
        return state.data.addressItemList.find(data => data.isDefault === true && data.typeCode === 1)
    },
    selectedBillingAddress(state, getters) {
        return state.data.addressItemList.find(data => data.isDefault === true && data.typeCode === 2)
    },
    shippingMethodsGroup() {
        return state.data.shippingMethodsGroup
    }
}

const mutations = {
    setCart(state, cart) {
        //state.cart = cart
        state.data = getCart
    },
    setDelivery(state, delivery) {
        //state.delivery = delivery
        state.data = getDelivery
    },
    setChangeCartItemQuantity(state, changeCartItemQuantity) {
        //state.delivery = delivery
        state.data = getChangeCartItemQuantity
    }
}

const actions = {
    fetchCart(context) {
        return service.fetchCart().then((res) => {
            //console.log(res.data)
            context.commit('setCart', res.data)
        })
    },
    fetchDelivery(context) {
        return service.fetchDelivery().then((res) => {
            //console.log(res.data)
            context.commit('setDelivery', res.data)
        })
    },
    fetchChangeCartItemQuantity(context) {
        return service.fetchChangeCartItemQuantity().then((res) => {
            //console.log(res.data)
            context.commit('setChangeCartItemQuantity', res.data)
        })
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}