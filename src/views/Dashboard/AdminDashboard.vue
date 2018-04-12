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
                            <Col span='12'>
                                    <!--常规警报-->
                                    <v-Alerts  
                                    title="常规警报"
                                    :requestparams="{command:'listAlerts',response:'json',page:1,pageSize:100,listAll:true}" 
                                    response="listalertsresponse"
                                    responsekey="alert"
                                    ></v-Alerts> 
                            </Col>
                            <Col span='12'>
                                    <!--Hosts in Alert State-->
                                    <v-Alerts 
                                     title="主机警报"
                                     :requestparams="{command: 'listHosts',response: 'json',state: 'Alert',page: 1,pageSize: 100,listAll:true}"
                                     response="listhostsresponse"
                                     responsekey="host"
                                    ></v-Alerts>
                            </Col>
                    </div>
                </Row>
           </Row>
       </div>
</template>

<script>
//系统容量
import systemCapacity from './SystemCapacity'
//警报
import alerts from './Alerts'
export default {
  name: 'v-adminDashboard',
  data () {
    return {
    }
  },
  components:{
      'v-systemCapacity':systemCapacity,
      'v-Alerts':alerts,
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
