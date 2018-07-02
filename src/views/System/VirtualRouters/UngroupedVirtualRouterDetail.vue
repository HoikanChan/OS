<template>
  <div class="container">
    <Tabs :animated="false" style="padding:24px 0">
      <TabPane class="tabs-content" label="详细信息">
        <VirtualRouterInfo/>
      </TabPane>
      <TabPane class="tabs-content" label="NIC">
        <div v-for="(nic,index) in virtualRouterInfo.nic" :key="nic.id">
          <h4>{{`NIC${index}`}}</h4>
          <Row :gutter="8" class="info-row">
            <Col span="8">
            <Row type="flex" align="middle">
              <Col span="8">类型</Col>
              <Col span="16">{{nic.type}}</Col>
            </Row>
            </Col>
            <Col span="8">
            <Row type="flex" align="middle">
              <Col span="8">流量类型</Col>
              <Col span="16">{{nic.traffictype}}</Col>
            </Row>
            </Col>
            <Col span="8">
            <Row type="flex" align="middle">
              <Col span="8">网络名称</Col>
              <Col span="16">{{nic.networkname}}</Col>
            </Row>
            </Col>
          </Row>
          <Row :gutter="8" class="info-row">
            <Col span="8">
            <Row type="flex" align="middle">
              <Col span="8">网络掩码</Col>
              <Col span="16">{{nic.netmask}}</Col>
            </Row>
            </Col>
            <Col span="8">
            <Row type="flex" align="middle">
              <Col span="8">IP 地址</Col>
              <Col span="16">{{nic.ipaddress}}</Col>
            </Row>
            </Col>
            <Col span="8">
            <Row type="flex" align="middle">
              <Col span="8">ID</Col>
              <Col span="16">{{nic.id}}</Col>
            </Row>
            </Col>
          </Row>
          <Row :gutter="8" class="info-row">
            <Col span="8">
            <Row type="flex" align="middle">
              <Col span="8">网络 ID</Col>
              <Col span="16">{{nic.networkid}}</Col>
            </Row>
            </Col>
            <Col span="8">
            <Row type="flex" align="middle">
              <Col span="8">隔离 URI</Col>
              <Col span="16">{{nic.todo}}</Col>
            </Row>
            </Col>
            <Col span="8">
            <Row type="flex" align="middle">
              <Col span="8">广播 URI</Col>
              <Col span="16">{{nic.broadcasturi}}</Col>
            </Row>
            </Col>
          </Row>
        </div>
      </TabPane>
    </Tabs>
  </div>
</template>

<script>
import VirtualRouterInfo from "./VirtualRouterInfo";
export default {
  name: "v-ungrouped-virtualRouter-detail",
  components: {
    VirtualRouterInfo
  },
  data() {
    return {
      virtualRouterInfo: {
        nic: []
      },
      zones: {
        endip: "",
        gateway: "",
        id: "",
        netmask: "",
        virtualRoutername: "",
        startip: ""
      }
    };
  },
  methods: {
    async fecthData(params) {
      const res = await this.$get({
        command: "listRouters",
        id: this.$route.query.id
      });
      this.virtualRouterInfo = res.listroutersresponse.router[0];
    }
  },
  mounted() {
    this.fecthData();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/css" scoped>
.container {
  width: 1200px;
  margin: 0 auto;
}
.ivu-col {
  margin: 8px 0;
}
h4 {
  margin-bottom: 20px;
  height: 37px;
  line-height: 37px;
  font-size: 16px;
  padding-left: 13px;
  border-left: 6px solid #51e299;
  background-color: #f0f0f0;
}
</style>
