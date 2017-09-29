<script>
    import MessageList from './MessageList.vue'
    import Loader from './Loader.vue'
    import RightSidebar from './RightSidebar.vue'
    import DeliveryContent from './DeliveryContent.vue'
    export default {
        name: 'Delivery',
        components: {
            MessageList,
            Loader,
            RightSidebar,
            DeliveryContent
        },
        data() {
            return {
                isLoading: true
            }
        },
        created() {
           this.$store.dispatch('fetchDelivery').then(() => {
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
            <delivery-content />
        </section>
        <right-sidebar />
    </div>
</section>    
</template>
