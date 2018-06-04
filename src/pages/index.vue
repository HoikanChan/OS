<template>
    <div class="index">
        <Row class="page-row">
            <v-header ref="headerHeight"></v-header>
        </Row>
        <Row class="page-row">
            <Col>
                <Row>
                    <router-view></router-view>
                </Row>
            </Col>
        </Row>
        <Row>
            <v-footer ref="footerHeight"></v-footer>
        </Row>
    </div>
</template>

<script>
//引入该页面需要的组件
import header from '../components/Header'
import footer from '../components/Footer'
export default {
  name: '',
  data () {
    return {
      
    }
  },
  //注册组件
  components:{
         'v-header':header,
         'v-footer':footer,
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/css" scoped>
</style>
