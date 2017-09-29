<script>
import { mapGetters } from 'vuex'

export default {
    name: 'Messages',
    computed: {
        ...mapGetters([
            'warningMessageList',
            'informationMessageList'
        ]),
        messageLength() {
            return this.warningMessageList.length + 
                this.informationMessageList.length
        }
    },
    data() {
        return {
            isExpandMessage: true
        }
    },
    methods: {
        toggleMessages() {
            this.isExpandMessage = !this.isExpandMessage
        }
    }
}
</script>

<template>
    <div class="message-box box umbrella" :class="{ expand: isExpandMessage }">
        <i class="icon-bell">
            <span class="counter" data-bind="text: messageLength">{{ messageLength }}</span>
        </i>

        
        <article class="message-content" v-if="warningMessageList.length">
            <h5 class="message-list-title">Uyarı:</h5>
            <ol class="message-list" v-for="warningMessage in warningMessageList" :key="warningMessage.id">
                <li>{{ warningMessage }}</li>
            </ol>
        </article>
        

        
        <article class="message-content" v-if="informationMessageList.length">
            <h5 class="message-list-title">Bilgilendirme:</h5>
            <ol class="message-list" v-for="infoMessage in informationMessageList" :key="infoMessage.id">
                <li>{{ infoMessage }}</li>
            </ol>
        </article>
        

      <!--  @if (HepsiburadaIdentity.Current().CheckoutState == 3)
    {
        <article class="message-content" v-if="nonExportProductList.length">
            <ul class="message-list" data-bind="foreach: shippingMethods.nonExportProductList">
                <li data-bind="with: $data">
                    <span data-bind="text: productName"></span>
                </li>
            </ul>

            <p>
                <button class="btn btn-sm" data-bind="click: removeNonExportedProducts">Ürünleri Sepetten Kaldır</button>
            </p>
        </article>
    }    -->
        
        <span class="toggle-messages" @click="toggleMessages">
            <i class="arrow-icon"></i>
            <a href="javascript://" class="btn-toggle-messages">
                Mesajları
                <span data-bind="text: showHideMsgText"></span>
            </a>
        </span>
    </div>
</template>
