<template>
       <div id="system-capacity">
           <div class="system-capacity-content">
               <div class="title">
                    系统容量
                </div>
                <!-- <div class="system-capacity-list">
                    <iCircle 
                    class="system-capacity-item"
                    :percent="item.percentused | getNumber"
                    :size="128"
                    :stroke-width="4"
                    :trail-width="4"
                    trail-color="#5a647b"
                    :stroke-color="item.percentused | circleColor"
                    v-for="item in systemCapacityList"
                    :key="item.name"
                    >
                        <span>{{item.percentused}}%</span>
                        <span>{{item.type | toCapacityCountType}}</span>
                    </iCircle>
                </div> -->
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
                                <span>{{item.percentused}}%</span>
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
        systemCapacityList:[]
    }
  },
  methods:{
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
        .title{
            padding-left: 16px;
            font-size: 16px;
            color: #fff;
            border-left: 4px solid #51e299;
            height: 26px;
            line-height: 26px;
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
                .system-capacity-item-name{
                    position: absolute;
                    top: 142px;
                    left:50%;
                    transform: translateX(-50%)
                }
            }
        }
    }
}
</style>
