<template>
       <div id="adminDashboard">
           <Row>
               <!--内存容量-->
               <v-systemCapacity></v-systemCapacity>
           </Row>
           <Row class="alerts-row">
               <Col>
                    <!--常规警报-->
                    <v-generalAlerts></v-generalAlerts> 
               </Col>
               <Col>
                    <!--Hosts in Alert State-->
                    <v-hostAlerts></v-hostAlerts>
               </Col>
           </Row>
       </div>
</template>

<script>
import systemCapacity from './SystemCapacity'
import generalAlerts from './GeneralAlerts'
import hostAlerts from './HostAlerts'
export default {
  name: 'v-adminDashboard',
  data () {
    return {
    }
  },
  components:{
      'v-systemCapacity':systemCapacity,
      'v-generalAlerts':generalAlerts,
      'v-hostAlerts':hostAlerts
  },
  methods:{
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/css" scoped>
</style>
