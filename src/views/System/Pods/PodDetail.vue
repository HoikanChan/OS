<template>
  <div class="container">
    <v-breadcrumb/>
    <Tabs :animated="false" style="padding:24px 0">
      <TabPane class="tabs-content" label="详细信息">
        <PodInfo/>
      </TabPane>
      <TabPane class="tabs-content" label="IP分配">
        <Row :gutter="8" class="info-row">
          <Col span="8"><Row><Col span="8">ID</Col><Col span="16">{{vlanIpRanges.id}}</Col></Row></Col>
          <Col span="8"><Row><Col span="8">网关</Col><Col span="16">{{vlanIpRanges.gateway}}</Col></Row></Col>
          <Col span="8"><Row><Col span="8">网络掩码</Col><Col span="16">{{vlanIpRanges.netmask}}</Col></Row></Col>
          <Col span="8"><Row><Col span="8">起始 IP</Col><Col span="16">{{vlanIpRanges.startip}}</Col></Row></Col>
          <Col span="8"><Row><Col span="8">结束 IP</Col><Col span="16">{{vlanIpRanges.endip}}</Col></Row></Col>
        </Row>
      </TabPane>
    </Tabs>
  </div>
</template>

<script>
import PodInfo from "./PodInfo";
export default {
  name: "v-pod-detail",
  components: {
    PodInfo
  },
  data() {
    return {
      podInfo: null,
      vlanIpRanges: {
        endip: "",
        gateway: "",
        id: "",
        netmask: "",
        podname: "",
        startip: ""
      }
    };
  },
  methods: {
    async fecthData() {
      const res = await this.$get({
        command: "listPods",
        id: this.$route.query.id
      });
      this.podInfo = res.listpodsresponse.pod[0];
    },
    async getVlanIpRanges() {
      const res = await this.$get({
        command: "listVlanIpRanges",
        podid: this.$route.query.id,
        zoneid: this.$route.query.zoneid
      });
      this.vlanIpRanges = res.listvlaniprangesresponse.vlaniprange[0];
    }
  },
  mounted() {
    this.fecthData();
    this.getVlanIpRanges();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/css" scoped>
.container {
  width: 1200px;
  margin: 0 auto;
}
.ivu-col{
  margin: 12px 0;
}
</style>
