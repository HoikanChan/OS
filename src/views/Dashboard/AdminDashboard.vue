<template>
       <div id="adminDashboard">
           <!--默认显示内容--> 
           <Row>
               <Row>
                    <!--内存容量-->
                    <v-systemCapacity></v-systemCapacity>
                </Row>
                <Row class="alerts-row">
                    <div class="alerts-row-center">
                            <Col>
                                    <!--常规警报-->
                                    <v-generalAlerts></v-generalAlerts> 
                            </Col>
                            <Col>
                                    <!--Hosts in Alert State-->
                                    <v-hostAlerts></v-hostAlerts>
                            </Col>
                    </div>
                </Row>
           </Row>
         
       </div>
</template>

<script>
//系统容量
import systemCapacity from './SystemCapacity'
//常规警报
import generalAlerts from './GeneralAlerts'
//主机警报
import hostAlerts from './HostAlerts';
export default {
  name: 'v-adminDashboard',
  data () {
    return {
    }
  },
  components:{
      'v-systemCapacity':systemCapacity,
      'v-generalAlerts':generalAlerts,
      'v-hostAlerts':hostAlerts,
  },
  methods:{
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/css">
#adminDashboard{
    .alerts-row{
        background-color: #f5f5f5;
        .alerts-row-center{
            width: 1200px;
            margin:0 auto;
            padding-top: 22px;
        }
    }
}
</style>
