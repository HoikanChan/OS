<template>
  <div id="app">
          <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
}
</script>

<style lang="scss" type="text/css">
.ivu-modal{
    .ivu-modal-body{
        text-align: center;
        .ivu-icon{
            display: none;
        }
        .ivu-btn-primary{
            background-color: #51e299;
            border-color: #51e299;
        }
        .ivu-btn-text:hover{
            background-color: #51e299;
            color: #fff;
        }
    }
}
</style>
