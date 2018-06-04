<template>
       <div id="footer-bar">
           <p>广东中科遥感技术有限公司</p>
       </div>
</template>

<script>
export default {
    name: 'v-footer',
    data () {
        return{

        }
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/css" scoped>
#footer-bar{
  width:100%;
  background-color: #e8e8e8;
  padding:20px;
  p{
    text-align: center;
    font-size: 14px;
  }
}
</style>
