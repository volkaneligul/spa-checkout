<script>
import { mapGetters } from 'vuex'

export default {
    name: 'CartContent',
    computed: {
        ...mapGetters([
            'cartItemList'
        ])
    },
    data() {
        return {
        }
    },
    methods: {
        increase() {
            this.isLoading = true;
            this.$store.dispatch('fetchChangeCartItemQuantity').then(() => {
               this.isLoading = false;
           }); 
        },
        decrease() {
            this.isLoading = true;
            this.$store.dispatch('fetchChangeCartItemQuantity').then(() => {
               this.isLoading = false;
           }); 
        }
    }
}
</script>

<template>
<section>
    <div class="box umbrella">
        <header class="group">
            <h1 class="cart-title">Sepetim</h1>
            <div class="cart-list-header group">
                <div class="col col2">ADET</div>
                <div class="col col3">FİYAT</div>
            </div>
        </header>
        <div class="cart-content group">
            <form id="form-item-list" method="POST" onsubmit="return false;">
                <ul class="cart-item-list" v-for="item in cartItemList" :key="item.id">
                    <li class="item">
                        <div class="item-content">
                            <figure class="product-image">
                                <a href="#" :href="item.productPageUrl">
                                    <img src="#" :src="item.productImageUrl" :alt="item.detail.properties.name" :title="item.detail.properties.name" width="80" height="80"/>
                                </a>
                            </figure>

                            <div class="product-detail">
                                <h4 class="product-name">
                                    <a href="#" :href="item.productPageUrl" v-text="item.detail.properties.name"></a>
                                </h4>
                                
                                <div class="merchant">
                                    Satıcı:
                                    <a href="#" :href="item.merchantUrl" v-text="item.detail.properties.merchantName"></a>
                                </div>

                                <div class="campaign-list">
                                    <div class="list-item" v-if="item.detail.properties.estimatedShippingValueCart">
                                        <i class="icon-time"></i>
                                        <span class="text" v-text="item.detail.properties.estimatedShippingValueCart"></span>
                                    </div>
                                </div>

                                
                                <div class="utils" v-if="!item.readOnly">
                                        
                                        <span v-if="item.detail.properties.addToListAvailable === 'True'">
                                            <a class="btn-add-to-list" href="javascript://" data-bind="click: $parent.addToList">Favorilere Taşı</a>
                                            |
                                        </span>
                                    <a class="btn-delete" href="javascript://" data-bind="click: $parent.remove">Sil</a>
                                </div>
                                
                            </div>

                            <div class="quantity-wrapper">
                                <div class="input-group">
                                    <!-- ko ifnot: quantityFixed() -->
                                    <button type="button" class="decrease" title="Azalt" @click="decrease">
                                        <span>Azalt</span>
                                    </button>
                                    <input name="quantity" class="quantity" type="number" :value="item.quantity" maxlength="3" data-bind="disable: quantityFixed, value: quantity, valueUpdate: 'afterkeypress', enterkey: $parent.quantityEnterKey.bind($data, $data)">
                                    <button type="button" class="increase" title="Arttır" @click="increase">
                                        <span>Arttır</span>
                                    </button>
                                    <!-- /ko -->

                                    <!-- ko if: quantityFixed --><!-- /ko -->
                                </div>

                                <!-- ko 'if': isQuantityChanged --><!-- /ko -->

                            </div>

                            <div class="product-prices-utils">
                                <!-- ko 'if': productAtDiscount --><!-- /ko -->

                                <div class="price">
                                    <span data-bind="html: price">2.298,99 TL</span>
                                </div>

                                <!-- ko 'if': isFreeShipping --><!-- /ko -->

                                <!-- ko 'if': hasShippingPrice -->
                                <div class="list-item not-free-shipping">
                                    <span class="text">+ Kargo Ücreti</span>
                                </div>
                                <!-- /ko -->

                                <!-- ko 'if': isGiftProduct --><!-- /ko -->
                            </div>
                        </div>

                        <!-- ko 'if': isCustomizedProduct --><!-- /ko -->
                    </li>
                </ul>
            </form>

            <a href="http://www.hepsiburada.com" class="btn btn-secondary btn-sm" data-bind="css: { 'btn-sm': !isMontageAvailable() }"><i class="arrow-icon"></i> Alışverişe Devam Et</a>
            <!-- ko 'if': isMontageAndContinueAvailable --><!-- /ko -->
        </div>
    </div>
</section>
    
</template>
