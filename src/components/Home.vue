
<script>
    export default {
        name: 'Home',
        data() {
            return {}
        },
        created() {
           this.$store.dispatch('fetchCart') 
        }
    }
</script>

<template>
    <h2>Volkan</h2>
</template>
