<template>
  <div class="container">
    <div class="page-row">
      <v-header ref="headerHeight"></v-header>
    </div>
    <div class="page-row content">
      <router-view></router-view>
    </div>
    <div class="page-row">
      <v-footer ref="footerHeight"></v-footer>
    </div>
  </div>
</template>

<script>
  //引入该页面需要的组件
  import header from "../components/Header";
  import footer from "../components/Footer";
  export default {
    name: "",
    data() {
      return {};
    },
    //注册组件
    components: {
      "v-header": header,
      "v-footer": footer
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/css" scoped>
  .container {
    display: flex;
    min-height: 100vh;
    flex-direction: column;
    .page-row {
      width: 100%;
    }
    .content{
      flex: 1 1 auto;
    }
  }
</style>