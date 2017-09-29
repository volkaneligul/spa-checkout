<script>
import Messages from './Messages.vue'

export default {
    name: 'MessageList',
    components: {
        Messages
    },
    computed: {
        isMessageList() {
            return this.$store.getters.warningMessageList.length || 
                this.$store.getters.informationMessageList.length
        }
    },
    data() {
        return {
        }
    }
}
</script>

<template>
    <messages v-if="isMessageList" />     
</template>

  

