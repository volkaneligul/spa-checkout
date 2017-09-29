<script>
    import MessageList from './MessageList.vue'
    import Loader from './Loader.vue'
    import RightSidebar from './RightSidebar.vue'
    import CartContent from './CartContent.vue'
    export default {
        name: 'MyCart',
        components: {
            MessageList,
            Loader,
            RightSidebar,
            CartContent
        },
        data() {
            return {
                isLoading: true
            }
        },
        created() {
           this.$store.dispatch('fetchCart').then(() => {
               this.isLoading = false;
           }); 
        }
    }
</script>

<template>
<section>
    <loader v-if="isLoading" />

    <div v-if="!isLoading">
        <section class="checkout-content">
            <message-list />
            <cart-content />
        </section>
        <right-sidebar />
    </div>
</section>
   
</template>
