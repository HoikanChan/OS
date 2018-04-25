<template>
       <div class="alerts-template">
           <Row>
               <div class="alerts-title">
                   {{title}}
               </div>
           </Row>
           <Row class="alerts-list">
               <ul>
                   <li v-for="item in alertsData" :key="item.id" @click.prevent="toAlertsDetail(item.id)" :class="requestparams.command=='listHosts'?'no-pointer':''">
                       <div class="alerts-icon"></div>
                       <!--常规警报-->
                       <div class="alerts-content" v-if="requestparams.command=='listAlerts'">
                           <h6>{{item.type | toAlertType}}</h6> 
                           <p :title="item.description">{{item.description}}</p>
                       </div>
                       <!--主机警报-->
                       <div class="alerts-content" v-else>
                           <h6>{{item.name}}</h6> 
                           <p>检测到警报状态</p>
                       </div>
                   </li>
               </ul>
           </Row>
       </div>
</template>

<script>
export default {
  name: 'v-alerts',
  data () {
    return {
        alertsData:[],
    }
  },
  props:['title','response','requestparams','responsekey'],
  methods:{
       requestAlertsData(){
           this.$http.get('client/api',{
                params:this.requestparams
            }).then(function(response){
                this.alertsData=response[this.response][this.responsekey];
            }.bind(this))
      },
      toAlertsDetail(id){
          //主机警报的时候不能进入警报详情页面
          if(this.requestparams.command=='listHosts'){
              return false
          }
          this.$router.push({
              name:'alertsDetail',
              query: { id: id }
          })
      }
  },
  created(){
      this.requestAlertsData();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/css">
.alerts-template{
    width: 532px;
    .alerts-title{
        padding-left: 16px;
        font-size: 16px;
        color: #333333;
        border-left: 6px solid #51e299;
        height: 37px;
        line-height: 37px;
        background-color: #fff;
    }
    .alerts-list{
        padding-top: 34px;
        padding-bottom: 18px;
        ul{
            li{
                list-style: none;
                height: 70px;
                margin-bottom: 16px;
                cursor: pointer;
                .alerts-icon{ 
                    width: 78px;
                    height: 70px;
                    float: left;
                    background: #fe6275 url('../../assets/general_alerts_icon.png') no-repeat center center;
                }
                .alerts-content{
                    background-color: #fff;
                    padding:15px 26px 3px;
                    width: 453px;
                    height: 70px;
                    float: left;
                    h6{
                        line-height: 26px;
                        font-weight: normal;
                        color: #333333;
                        font-size: 16px;
                    }
                    p{
                        line-height: 26px;
                        font-size: 14px;
                        color:#666666;
                        overflow: hidden;
                        text-overflow:ellipsis;
                        white-space: nowrap;
                    }
                }
            }
            .no-pointer{
                cursor: default;
            }
        }
    }
}
</style>
