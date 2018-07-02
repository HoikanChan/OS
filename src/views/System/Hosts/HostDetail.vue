<template>
  <div class="container">
    <v-breadcrumb/>
    <Tabs :animated="false" style="padding:24px 0">
      <TabPane class="tabs-content" label="详细信息">
        <HostInfo/>
      </TabPane>
      <TabPane class="tabs-content" label="统计数据">
        <Row :gutter="8" class="info-row">
          <Col span="8"><Row><Col span="8">CPU 总量</Col><Col span="16">{{hostInfo.id}}</Col></Row></Col>
          <Col span="8"><Row><Col span="8">CPU 利用率</Col><Col span="16">{{hostInfo.todo}}</Col></Row></Col>
          <Col span="8"><Row><Col span="8">已分配给 VM 的 CPU</Col><Col span="16">{{hostInfo.cpuallocated}}</Col></Row></Col>
          <Col span="8"><Row><Col span="8">内存总量</Col><Col span="16">{{hostInfo.memorytotal | convertByType(0)}}</Col></Row></Col>
          <Col span="8"><Row><Col span="8">已分配的内存</Col><Col span="16">{{hostInfo.memoryallocated | convertByType(0)}}</Col></Row></Col>
          <Col span="8"><Row><Col span="8">已使用的内存</Col><Col span="16">{{hostInfo.memoryuesd || "N/A"}}</Col></Row></Col>
          <Col span="8"><Row><Col span="8">网络读取量</Col><Col span="16">{{hostInfo.todo || "N/A"}}</Col></Row></Col>
          <Col span="8"><Row><Col span="8">网络写入量</Col><Col span="16">{{hostInfo.todo || "N/A"}}</Col></Row></Col>
        </Row>
      </TabPane>
    </Tabs>
  </div>
</template>

<script>
import HostInfo from "./HostInfo";
export default {
  name: "v-host-detail",
  components: {
    HostInfo
  },
  data() {
    return {
      hostInfo: null,
      hosts: {
        endip: "",
        gateway: "",
        id: "",
        netmask: "",
        hostname: "",
        startip: ""
      }
    };
  },
  methods: {
    async fecthData() {
      const res = await this.$get({
        command: "listHosts",
        id: this.$route.query.id
      });
      this.hostInfo = res.listhostsresponse.host[0];
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
</style>
