<template>
       <div class="alerts-detail">
            <Row>
                <!--面包屑-->
                <v-breadcrumb></v-breadcrumb>
            </Row>
            <Row>
                <div class="operation-row">

                </div>
            </Row>
            <Row>
                <!--基本信息-->
                <div class="basic-info">
                    <div class="basic-title">基本信息</div>
                    <div class="basic-info-content">
                        <ul>
                            <li>12222222</li>
                            <li>12222222</li>
                            <li>12222222</li>
                            <li>12222222</li>
                            <li>12222222</li>
                            <li>12222222</li>
                            <li>12222222</li>
                            <li>12222222</li>
                            <li>12222222</li>
                            <li>12222222</li>
                            <li>12222222</li>
                            <li>12222222</li>
                            <li>12222222</li>
                            <li>12222222</li>
                            <li>12222222</li>
                            <li>12222222</li>
                            <li>12222222</li>
                            <li>12222222</li>
                        </ul>
                    </div>
                </div>
            </Row>
       </div>
</template>

<script>
//面包屑
import breadcrumb from '../../components/Breadcrumb';
export default {
  name: 'v-alertsDeatil',
  data () {
    return {

    }
  },
  methods:{
      requestAlertsDetailData(){
           this.$http.get('client/api',{
                params:{
                    command:"listAlerts",
                    response:"json",
                    id:this.$route.params.id
                }
            }).then(function(response){
               console.log(response)
            }.bind(this))
      },
  },
  components:{
     'v-breadcrumb':breadcrumb
  },
  mounted(){
      this.requestAlertsDetailData();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/css" scoped>
.alerts-detail{
    width:1200px;
    margin:0 auto;
    .basic-info{
        .basic-title{
            height:37px;
            line-height: 37px;
            padding-left: 13px;
            border-left:6px solid #51e299;
            color:#333;
            font-size: 16px;
            background-color: #f0f0f0;
        }
    }
}
</style>
