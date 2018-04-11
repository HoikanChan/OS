<template>
       <div id="general-alerts">
           <Row>
               <div class="general-alerts-title">
                   常规警报
               </div>
           </Row>
           <Row class="general-alerts-list">
               <ul>
                   <li v-for="item in generalAlertsData" :key="item.id" @click.prevent="toAlertsDetail(item.id)">
                       <div class="general-alerts-icon"></div>
                       <div class="general-alerts-content">
                           <h6>{{item.type | toAlertType}}</h6> 
                           <p :title="item.description">{{item.description}}</p>
                       </div>
                   </li>
               </ul>
           </Row>
           <router-view></router-view>
       </div>
</template>

<script>
export default {
  name: 'v-generalAlerts',
  data () {
    return {
        generalAlertsData:[],
    }
  },
  methods:{
       requestGeneralAlertsData(){
           this.$http.get('client/api',{
                params:{
                    command:"listAlerts",
                    response:"json",
                    page:1,
                    pageSize:20,
                    listAll:true,
                }
            }).then(function(response){
                this.generalAlertsData=response.listalertsresponse.alert;
            }.bind(this))
      },
      toAlertsDetail(id){
        //   this.$emit('showdetail')
          this.$router.push({
              name:'alertsDetail',
              params: { id: id }
          })
      }
  },
  created(){
      this.requestGeneralAlertsData();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/css">
#general-alerts{
    width: 532px;
    .general-alerts-title{
        padding-left: 16px;
        font-size: 16px;
        color: #333333;
        border-left: 6px solid #51e299;
        height: 37px;
        line-height: 37px;
        background-color: #fff;
    }
    .general-alerts-list{
        padding-top: 34px;
        padding-bottom: 18px;
        ul{
            li{
                list-style: none;
                height: 70px;
                margin-bottom: 16px;
                cursor: pointer;
                .general-alerts-icon{ 
                    width: 78px;
                    height: 70px;
                    float: left;
                    background: #fe6275 url('../../assets/general_alerts_icon.png') no-repeat center center;
                }
                .general-alerts-content{
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
        }
    }
}
</style>
