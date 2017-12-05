<script>
    import MessageList from './MessageList.vue'
    import Loader from './Loader.vue'
    import RightSidebar from './RightSidebar.vue'
    import CartContent from './CartContent.vue'
    import EmptyCart from './EmptyCart.vue'

    export default {
        name: 'MyCart',
        components: {
            MessageList,
            Loader,
            RightSidebar,
            CartContent,
            EmptyCart
        },
        data() {
            return {
                isLoading: true,
                isCartEmpty: false
            }
        },
        created() {
           this.$store.dispatch('fetchCart').then(() => {
               this.isLoading = false;
               this.isCartEmpty = this.$store.getters.cartItemList.length < 1
           }); 
        }
    }
</script>

<template>
<section>
    <loader v-if="isLoading" />
    <div v-if="!isLoading">
        <div v-if="!isCartEmpty">
            <section class="checkout-content">
                <message-list />
                <cart-content />
            </section>
            <right-sidebar />
        </div>
        <empty-cart v-else />
    </div>
</section>
   
</template>
