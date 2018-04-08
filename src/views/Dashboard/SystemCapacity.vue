<template>
       <div id="system-capacity">
           <div class="system-capacity-content">
               <Row>
                    <div class="system-capacity-title">
                        系统容量
                    </div>
                    <div class="system-capacity-refresh" @click="refreshSystemCapacity">
                        刷新
                    </div>
               </Row>
                <div class="system-capacity-list">
                    <div  class="system-capacity-item" v-for="item in systemCapacityList"
                        :key="item.name">
                        <iCircle 
                            class="circle-item"
                            :percent="item.percentused | getNumber"
                            :size="128"
                            :stroke-width="4"
                            :trail-width="4"
                            trail-color="#5a647b"
                            :stroke-color="item.percentused | circleColor"
                            >
                                <Row class="system-capacity-icon-row"><img class="system-capacity-icon" :src="getIcon(item.name)" alt=""></Row>
                                <Row class="system-capacity-percent-row"><span class="system-capacity-percent">{{item.percentused}}%</span></Row>
                            </iCircle>
                            <span class="system-capacity-item-name">{{item.type | toCapacityCountType}}</span>
                    </div>
                </div> 
           </div>
       </div>
</template>

<script>
export default {
  name: 'v-systemCapacity',
  data () {
    return {
        systemCapacityList:[],
        icon:{
            'MEMORY':require('../../assets/memory_icon.png'),
            'CPU':require('../../assets/cpu_icon.png'),
            'STORAGE':require('../../assets/storage_icon.png'),
            'STORAGE_ALLOCATED':require('../../assets/storage_icon.png'),
            'PRIVATE_IP':require('../../assets/ip_icon.png'),
            'SECONDARY_STORAGE':require('../../assets/storage_icon.png'),
            'DIRECT_ATTACHED_PUBLIC_IP':require('../../assets/network_icon.png'),
            'GPU':require('../../assets/gpu_icon.png'),
            'CPU_CORE':require('../../assets/cpu_icon.png')
        }
    }
  },
  methods:{
      getIcon(val){
          let iconPath = this.icon[val];
          return iconPath
      },
      refreshSystemCapacity(){
          this.requestSystemCapacityData();
      },
      //请求系统容量数据
      requestSystemCapacityData(){
          this.$http.get('client/api',{
                params:{
                    command:"listCapacity",
                    response:"json",
                    sortBy:"usage",
                    fetchLatest:true,
                }
            }).then(function(response){
                this.systemCapacityList=response.listcapacityresponse.capacity;
            }.bind(this))
        },
        //请求常规警报数据
        requestGeneralAlarmData(){
             this.$http.get('client/api',{
                params:{
                    command:"listCapacity",
                    response:"json",
                    sortBy:"usage",
                    fetchLatest:true,
                }
            }).then(function(response){
            }.bind(this))
        }
  },
  filters:{
       //显示颜色
      circleColor(val){
          let percent = Number(val);
          if(percent>0||percent<=50){
                return "#51e299"
            }else if(percent>50||percent<=80){
                return "#ffae00"
            }else {
                return "#fe6275"
            }
        },
  },
  created(){
      this.requestSystemCapacityData();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/css" scoped>
#system-capacity{
    padding-top: 30px;
    width: 100%;
    height: 748px;
    background: url('../../assets/index_bg.png') no-repeat 0 0;
    background-size: cover;
    .system-capacity-content{
        width: 1200px;
        margin: 0 auto;
        .system-capacity-title{
            float: left;
            padding-left: 16px;
            font-size: 16px;
            color: #fff;
            border-left: 4px solid #51e299;
            height: 26px;
            line-height: 26px;
        }
        .system-capacity-refresh{
            float: right;
            margin-top: -4px;
            width: 89px;
            height: 34px;
            line-height: 34px;
            text-align: center;
            border-top-left-radius: 14px;
            border-top-right-radius: 14px;
            border-bottom-left-radius: 14px;
            border-bottom-right-radius: 14px;
            font-size: 14px;
            color: #fff;
            background-color: #51e299;
            cursor: pointer;
        }
        .system-capacity-list{
            padding-top: 45px;
            height: 683px;
            width: 948px;
            margin: 0 auto;
            .system-capacity-item{
                position: relative;
                display: inline-block;
                margin-right: 145px;
                margin-bottom: 74px;
                &:nth-child(4n){
                    margin-right: 0;
                }
                .system-capacity-icon-row{
                    // margin-top: -28px;
                }
                 .system-capacity-percent-row{
                    margin-top: 12px;
                    .system-capacity-percent{
                        font-size: 18px;
                        color: #fff;
                        font-weight: bolder;
                    }
                }
                .system-capacity-item-name{
                    position: absolute;
                    top: 142px;
                    left:50%;
                    transform: translateX(-50%);
                    width: 100%;
                    text-align: center;
                    font-size: 16px;
                    color: #fff;
                }
            }
        }
    }
}
</style>
