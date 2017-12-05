<script>
import { mapGetters } from 'vuex'

export default {
    name: 'DeliveryContent',
    computed: {
        ...mapGetters([
            'shippingAddresses',
            'billingAddresses',
            'selectedShippingAddress',
            'selectedBillingAddress',
            'shippingMethodsGroup'
        ])
    },
    data() {
        return {
        }
    },
    filters: {
        productNameFilter(productName) {
            return productName.length > 40 ? productName.substring(0,40) + '...' : productName;
        },
        shippingTotalPriceFilter(isDigitalProduct, price) {
            let text = '';

            if(price === '0,00') {
                text = isDigitalProduct ? '(Dijital Ürün)' : '(Kargo Bedava)';
            } else {
                text = '(' + price + ' TL)';
            }

            return text;
        }
    },
    methods: {
        fullAddress(addressType = 1) {
            var item = addressType === 1 ? this.selectedShippingAddress : this.selectedBillingAddress;
            var address = item.address + '- ' + item.town + '/' + item.city + '/' + item.countryName;
            return address
        },
        shortAddress(addressType = 1) {
            var fullAddress = this.fullAddress(addressType);

            return fullAddress.length > 70 ?
                    fullAddress.substring(0, 70) + '...' :
                    fullAddress;
        },
        addressInfo(addressType = 1) {
            var item = addressType === 1 ? this.selectedShippingAddress : this.selectedBillingAddress;
            var lastName = item.lastName ? item.lastName : '';
            var phone = item.phoneNumber ? ' - ' + item.phoneNumber : '';
            
            return item.firstName + ' ' + lastName + phone
        },
        selectShipping() {
            debugger
        }
    }
}
</script>

<template>
<section>
    <div class="box">
        <header class="box-header checkout-header group">
            <h1 class="box-header-title">Teslimat Bilgileri</h1>
            <p class="box-header-desc"><strong>Lütfen teslimat adres bilgilerinizi ve teslimat seçeneğini belirtin.</strong>
            </p>
        </header>
        <div id="addresses" class="box-content">
            <div class="addresses group">
                <div class="col delivery-addresses">
                    <h5>Teslimat Adresi</h5>
                    <div class="hb-ui-selectbox address-list full">
                        <div class="selectbox-choice" tabindex="0">
                            <label class="selectbox-chosen">
                                <strong class="address-tag" v-text="selectedShippingAddress.addressName"></strong>
                                <span class="address" v-text="shortAddress()" :title="fullAddress()"></span>
                                <strong class="selected-address-info" v-text="addressInfo()"></strong>
                            </label>
                            <span class="selectbox-arrow">
                                <i></i>
                            </span>
                        </div>
                        <div class="hb-ui-selectbox-dropdown">
                            <ul class="inner">
                                <li class="list-item editable" v-for="shippingAddress in shippingAddresses" :key="shippingAddress.id">
                                    <div class="util-box">
                                        <!-- ko 'if': isEditable -->
                                        <a href="javascript://" data-bind="click: $root.addEditAddress.bind($data, '1', id)">Düzenle</a>
                                        <!-- /ko -->

                                        <!-- ko 'if': isEditable && ($parent.availableDeleteShippingAddress) -->
                                        <span>|</span>
                                        <!-- /ko -->

                                        <!-- ko 'if': ($parent.availableDeleteShippingAddress) -->
                                        <a href="javascript://" data-bind="click: $root.deleteAddress">Sil</a>
                                        <!-- /ko -->
                                    </div>

                                    <a href="javascript://" class="btn-select-address" tabindex="0" data-bind="click: $parent.selectShippingAddress">
                                        <strong class="address-tag" v-text="shippingAddress.addressName"></strong>
                                        <span class="address">
                                            {{ shippingAddress.address + '- ' + shippingAddress.town + '/' + shippingAddress.city + '/' + shippingAddress.countryName}}
                                        </span>
                                        <strong class="selected-address-info" data-bind="text: addressInfo">
                                            {{ shippingAddress.firstName + ' ' + shippingAddress.lastName + '-' + shippingAddress.phoneNumber}}
                                        </strong>
                                    </a>
                                </li>
                            </ul>
                            <a href="javascript://" class="btn-add-new" data-bind="click: addEditAddress.bind($data, '1', null)">+ Yeni Adres</a>
                        </div>
                    </div>
                </div>

                <div class="col invoice-addresses">
                    <h5>Fatura Adresi</h5>
                    <div class="hb-ui-selectbox address-list full">
                        <!-- ko 'if': hasBillingAddress -->
                        <div class="selectbox-choice" tabindex="0">
                            <label class="selectbox-chosen" data-bind="'with': selectedBillingAddress">
                                <strong class="address-tag" v-text="selectedBillingAddress.addressName"></strong>
                                <span class="address" v-text="shortAddress(2)" :title="fullAddress(2)"></span>
                                <strong class="selected-address-info" v-text="addressInfo(2)"></strong>
                            </label>
                            <span class="selectbox-arrow">
                                <i></i>
                            </span>
                        </div>
                        <div class="hb-ui-selectbox-dropdown">
                            <ul class="inner" data-bind="foreach: billingAddresses">
                                <li class="list-item editable" data-bind="css: { selected: id === $parent.billingAddressId() }">
                                        <div class="util-box">
                                            <!-- ko 'if': isEditable -->
                                            <a href="javascript://" data-bind="click: $root.addEditAddress.bind($data, '2', id)">Düzenle</a>
                                            <!-- /ko -->

                                            <!-- ko 'if': isEditable && ($parent.availableDeleteBillingAddress) -->
                                            <span>|</span>
                                            <!-- /ko -->

                                            <!-- ko 'if': ($parent.availableDeleteBillingAddress) -->
                                            <a href="javascript://" data-bind="click: $root.deleteAddress">Sil</a>
                                            <!-- /ko -->
                                        </div>

                                    <a href="javascript://" class="btn-select-address" tabindex="0" data-bind="click: $parent.selectBillingAddress">
                                        <strong class="address-tag" data-bind="text: addressName">sisli</strong>
                                        <span class="address" data-bind="text: addressFull">sisli  - ŞİŞLİ/İstanbul/Türkiye</span>
                                        <strong class="selected-address-info" data-bind="text: addressInfo">sisli sisli - 5078584288</strong>
                                    </a>
                                </li>
                                
                            </ul>
                            <a href="javascript://" class="btn-add-new" data-bind="click: addEditAddress.bind($data, '2', null)">+ Yeni Adres</a>
                        </div>
                    </div>
                </div>
            </div>

            <!-- ko 'if': isInvoiceSentWithOrderAvailable -->
            <p class="invoice-with-order">
                <input type="checkbox" id="is-invoice-sent-with-order" class="checkbox" name="isInvoiceSentWithOrder" data-bind="checked: isInvoiceSentWithOrder">
                <label for="is-invoice-sent-with-order">Fatura sipariş ile birlikte gönderilsin.</label>
            </p>
            <!-- /ko -->
            <!-- ko 'if': isEasyCheckoutAvailable --><!-- /ko -->
            <!-- ko 'if': displayCitizenIdFields --><!-- /ko -->
        </div>

        <div class="box-section shipment-group">
            <h1 class="box-header-title">Teslimat Seçenekleri</h1>
            <p class="box-header-desc"><strong>Standart Teslimat dışındaki seçimleriniz için kargo ücreti yeniden hesaplanır.</strong></p>
            <ul class="shipping-list-group">
                <li class="list-item group" v-for="(baseItem, baseIndex) in shippingMethodsGroup" :key="baseItem.id">
                    <div class="list-container">
                        <div class="shipping-product-container">
                            <div class="shipping-marchant">
                                <span v-text="baseItem.merchantName"></span> tarafından gönderilecek
                            </div>
                            <ul class="shipping-product-list group">
                                <li v-for="product in baseItem.productList" :key="product.id">
                                    
                                    <div class="product-count" v-if="baseItem.productList.length > 1">x<span v-text="baseItem.productList.length"></span></div>
                                    
                                    <figure>
                                        <a href="javascript://" :href="product.productLnkUrl">
                                            <img src="https://design.hepsiburada.net/ayagina-gelsin/images/blank.gif" :src="product.productImgUrl" :alt="product.productName" :title="product.productName" width="32" height="32">
                                        </a>
                                    </figure>
                                    <div class="product-container">
                                        <div class="product-name">{{ product.productName | productNameFilter }}</div>
                                        <!-- ko 'ifnot': $parent.availableEstimatedDelivery() -->
                                        <!-- ko 'if': estimatedShippingDate -->
                                        <!-- ko 'ifnot': $parent.optionId() == 2 || $parent.optionId() == 4 || $parent.isDigitalProductGroup() -->
                                        <div class="product-shipping-date">
                                            Tahmini Kargoya Veriliş Tarihi: <span v-text="product.estimatedShippingDate"></span>
                                        </div>
                                        <!-- /ko -->
                                        <!-- /ko -->
                                        <!-- /ko -->
                                    </div>
                                </li>
                            </ul>
                            
                            <div class="product-message group" v-if="baseItem.productList.length > 1">
                                <i class="icon-info"></i>
                                <span>Size daha hızlı ulaşması için ürünler ayrı ayrı gönderilebilir</span>
                            </div>
                            
                        </div>
                        <div class="shipping-item-container">
                            <ul class="shipping-item-list group">
                                <li v-for="(item, index) in baseItem.shippingItemList" :key="item.id" data-bind="css: {'selected': $parent.optionId() == optionId, 'indented': isIndented, 'optionType2': optionId == 2, 'optionType4': optionId == 4}">
                                                      
                                    <div class="shipping-firm hx" v-if="item.isHepsiExpress"></div>
                                    
                                    <div class="shipping-option-container" data-bind="click: $parent.selectShippingOption">
                                        <div class="shipping-select popover">
                                            <input type="radio" name="shippingOption" class="radio" 
                                                :value="'option' + item.optionId" 
                                                :id="'sp-' + item.optionId + '-' + index" 
                                                :name="'shippingOption' + baseIndex" 
                                                :checked="item.isDefault"
                                                @click="selectShipping" />
                                            <label :for="'sp-' + item.optionId + '-' + index">&nbsp;</label>
                                        </div>
                                        <div class="shipping-item" data-bind="css: {'var-date': optionId == 2 || optionId == 4}">
                                            <div class="shipping-company-price">
                                                <span class="shipping-company" v-text="item.optionName"></span>
                                                <span class="shipping-price">{{ baseItem.isDigitalProductGroup, item.shippingTotalPrice | shippingTotalPriceFilter}}</span>
                                            </div>
                                            
                                            <div class="product-shipping-date" 
                                                v-if="!baseItem.isDigitalProductGroup && item.estimatedShippingDate && (item.optionId === 2 || item.optionId === 4)">
                                                Teslim Tarihi: <span v-text="item.estimatedShippingDate"></span>
                                            </div>
                                            
                                            <div class="product-shipping-date" 
                                                v-if="!baseItem.isDigitalProductGroup && item.estimatedDeliveryDate && (item.optionId !== 2 || item.optionId !== 4)">
                                                Teslim Tarihi: <span data-bind="text: estimatedDeliveryDate"></span>
                                            </div>
                                            
                                        </div>
                                    </div>
                                    
                                    <div class="shipping-slot-container" v-if="item.isIndented" data-bind="css: {'optionBT': $parent.optionBT(), 'optionET': $parent.optionET()}">
                                        <div class="slot-container-line"></div>
                                        <ul data-bind="foreach: deliveryOptions">
                                            <li v-for="slot in item.deliveryOptions" :key="slot.id" data-bind="click: $parents[1].selectShippingSlot">
                                                <div class="slot-line"></div>
                                                <div class="slot-select popover">
                                                    <input type="radio" name="shippingSlot" class="radio" 
                                                        :value="item.optionId + '-' + slot.slotId"
                                                        :id="'sp-' + baseItem.groupId + '-' + item.optionId + '-' + slot.slotId"
                                                        :name="'shippingSlot' + baseItem.groupId + '-' + item.optionId"
                                                        :checked="item.isDefault" />
                                                    <label :for="'sp-' + baseItem.groupId + '-' + item.optionId + '-' + slot.slotId">&nbsp;</label>
                                                    
                                                    <div class="hb-ui-popover" v-if="slot.tooltipText">
                                                        <span class="shipping-company" v-text="item.optionName"></span>
                                                        <p class="shipping-info" v-html="slot.tooltipText"></p>
                                                    </div>
                                                   
                                                </div>
                                                <div class="slot-item" v-text="slot.shippingTime"></div>
                                            </li>
                                        </ul>
                                    </div>
                                    
                                </li>
                                
                            </ul>
                            
                            <div class="shipping-message" v-if="baseItem.isDigitalProductGroup">Anında Teslimat Ücretsizdir</div>
                            
                        </div>        
                    </div>
                </li>
            </ul>
            <p class="shipping-total-price">Toplam Kargo Ücreti: &nbsp;<span data-bind="text: shippingPrice"></span> <strong>TL</strong></p>
        </div>
    </div>
</section> 
</template>
