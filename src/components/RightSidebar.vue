<script>
import { mapGetters } from 'vuex'

export default {
    name: 'RightBar',
    computed: {
        ...mapGetters([
            'rightSidebarData'
        ]),
        giftBoxAmount() {
            return this.pointReplace(this.rightSidebarData.giftBoxAmount)
        },
        shippingPrice() {
            return this.pointReplace(this.rightSidebarData.shippingPrice)
        }
    },
    data() {
        return {
        }
    },
    methods: {
        continueCheckout() {
            var that = this;
            this.$store.dispatch('fetchCart').then(() => {
                that.$router.push('/teslimat');
            });  
        },
        pointReplace(amount) {
            if (typeof amount === 'undefined') {
                return undefined;
            } else if (typeof amount === 'number') {
                amount = amount.toString();
            }
            return amount.replace('.', '').replace(',', '.');
        }
    }
}
</script>

<template>
 <aside id="sidebar" class="sidebar" role="complementary">
     <section class="box widget short-summary">
        <div id="short-summary">
            <div class="box-content">
                <h2>Sipariş Özeti</h2>
                <p class="quantity-detail">
                    <span>{{ rightSidebarData.cartItemTotalQuantity }}</span>
                </p>
                <div class="total-amount">
                    <h4 class="sidebar-list-title">
                        {{ rightSidebarData.isGiftCertPriceSubtractedFromTotalPrice ? 'Ödenecek Tutar' : 'KDV Dahil Toplam Tutar' }}
                    </h4>
                    <div class="total-price">
                        <span>{{ rightSidebarData.totalPrice }}</span> TL
                    </div>
                    
                    <div class="total-tax" v-if="!rightSidebarData.isGiftCertPriceSubtractedFromTotalPrice">KDV (<span>{{ rightSidebarData.totalTax }}</span>)</div>
                </div>

                <div class="cart-proceed-container">
                    <button class="btn btn-primary full" v-if="!rightSidebarData.blockContinue" @click="continueCheckout">
                        <span class="text">Alışverişi Tamamla</span>
                        <i class="icon-chevron-right"></i>
                    </button>
                    <div class="gifts-in-basket group" v-if="!rightSidebarData.isGiftBoxOptionRestricted">
                        <input type="checkbox" id="has-gift-box" class="checkbox" data-bind="checked: isGiftBoxSelected">
                        <label for="has-gift-box">Hediye paketi istiyorum</label>
                    </div>
                </div>
            </div>

            <div id="item-prices" class="box-highlighted box-content">
                <div class="sidebar-list">
                    <div class="list-item">
                        <h3 class="sidebar-list-title">
                            Ürünler Toplamı (KDV Dahil)
                        </h3>
                        <div class="price">
                            <strong>{{ rightSidebarData.cartItemPrice }}</strong> TL
                        </div>
                    </div>
                    
                    <div class="list-item" v-if="giftBoxAmount > 0">
                        <h3 class="sidebar-list-title">
                            <i class="icon-info-sign tooltips" data-toggle="tooltip" title="Ürün fiyatlarına hediye paketi fiyatı da dahildir."></i>
                            Hediye Paketi Ücreti
                        </h3>
                        <div class="price">
                            <strong>{{ giftBoxAmount }}</strong> TL
                        </div>
                    </div>
                    
                    
                    <div class="list-item" v-if="shippingPrice > 0">
                        <h3 class="sidebar-list-title">
                            <i class="icon-info-sign tooltips" data-toggle="tooltip" title="Seçtiğiniz adres ve teslimat şekline göre değişebilir."></i>
                            Kargo Ücreti
                        </h3>
                        <div class="price">
                            <strong>{{ shippingPrice }}</strong> TL
                        </div>
                    </div>
                            
                    <div class="list-item" v-if="rightSidebarData.isPartnerPointUsed">
                        <h3 class="sidebar-list-title">
                            AVONPARA
                        </h3>
                        <div class="price">
                            <!-- ko 'if': isGiftCertPriceSubtractedFromTotalPrice -->-<!-- /ko -->
                            <strong data-bind="text: partnerPoint"></strong> TL
                        </div>
                    </div>
                    
                </div>
            </div>

            <div class="box-content">
                <div v-if="rightSidebarData.isGiftCertUsed">
                    <h3 class="sidebar-list-title">
                        <!-- ko 'if': isGiftCertPriceSubtractedFromTotalPrice -->
                            <!-- ko 'if': giftCertRefundDetailMessage -->
                            <i class="icon-info-sign tooltips" data-toggle="tooltip" data-bind="attr: { title: giftCertRefundDetailMessage } "></i>
                            <!-- /ko -->
                        <!-- /ko -->
                        Çek / Promosyon Kodu
                    </h3>
                    <div class="price">
                        <!-- ko 'if': isGiftCertPriceSubtractedFromTotalPrice -->-<!-- /ko --><strong data-bind="text: giftCertAmount"></strong> TL
                    </div>
                    <a href="javascript://" class="link-type-one" data-bind="click: removeGiftCert">Kaldır</a>
                </div>
                
                <a v-else href="javascript://" class="link-type-one" data-bind="click: showGiftCerts">Çek / Promosyon Kodu Kullan</a>
                
            </div>
        </div>
    </section>
</aside> 
</template>
