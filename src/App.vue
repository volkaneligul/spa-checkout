<template>
  <div id="app">
    <div id="site-header" class="site-header header-compact">
      <div class="content-holder">
          <router-link to="/" id="logo" class="hepsiburada-logo" title="Sepete dön">hepsiburada.com | her şey ayağına gelsin</router-link>
      </div>
  </div>
    <div class="container">
      <div id="content" class="content">
        <div id="checkout-container" class="checkout-container content-holder group">
          <router-view />
        </div>
      </div> 
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
    }
  }
}
</script>

<style lang="scss">

</style>
