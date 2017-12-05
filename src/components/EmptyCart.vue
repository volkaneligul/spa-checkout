<script>
    import MessageList from './MessageList.vue'

    export default {
        name: 'EmptyCart',
        components: {
            MessageList
        },
        data() {
            return {
            }
        }
    }
</script>

<template>
 <div class="content-holder">
        <message-list />
        <div class="box">
            <div class="box-content">
                <div class="empty-cart recommendation">
                    <h1 class="h1">Sepetin şu an boş.</h1>
                    <p>Dilersen aşağıdaki önerileri inceleyerek hemen alışverişe başlayabilirsin.</p>
                </div>

                <!-- ko allowBindings: false -->
                <div id="recommended-products-container" data-bind="template: { name: 'cart-recommended-products-tmpl', if: isVisible }"></div>
                <!-- /ko -->
            </div>
        </div>
    </div> 
</template>
