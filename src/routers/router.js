import MyCart from '../components/MyCart.vue'
import Delivery from '../components/Delivery.vue'

export default {
    routes: [
      {
        path: '/',
        component: MyCart
      },
      {
        path: '/teslimat',
        component: Delivery
      }
    ],
    mode: 'history'
}