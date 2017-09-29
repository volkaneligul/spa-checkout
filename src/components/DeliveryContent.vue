<script>
import { mapGetters } from 'vuex'

export default {
    name: 'DeliveryContent',
    computed: {
        ...mapGetters([
            'shippingAddresses',
            'billingAddresses',
            'selectedShippingAddress',
            'selectedBillingAddress'
        ])
    },
    data() {
        return {
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
    </div>
</section> 
</template>
