

<template>
<div>
  <h4>统计数据</h4>
  <Row :gutter="8" >
    <Col span="8"><Row type="flex" align="middle"><Col span="8">CPU 总量</Col><Col span="16">{{info.cpunumber+" x "}}<span>{{info.cpuspeed| convertByType(1)}}</span></Col></Row></Col>
    <Col span="8"><Row type="flex" align="middle"><Col span="8">CPU 利用率</Col><Col span="16">{{info.cpuused}}</Col></Row></Col>
    <Col span="8"><Row type="flex" align="middle"><Col span="8">网络读取量	</Col><Col span="16">{{info.networkkbsread | convertByType(2)}}</Col></Row></Col>
  </Row>
  <Row :gutter="8" >
    <Col span="8"><Row type="flex" align="middle"><Col span="8">网络写入量	</Col><Col span="16">{{info.networkkbswrite| convertByType(2)}}</Col></Row></Col>
    <Col span="8"><Row type="flex" align="middle"><Col span="8">磁盘读取(字节)</Col><Col span="16">{{info.diskkbsread| convertByType(2)}}</Col></Row></Col>
    <Col span="8"><Row type="flex" align="middle"><Col span="8">磁盘写入(字节)</Col><Col span="16">{{info.diskkbswrite|convertByType(2)}}</Col></Row></Col>
  </Row>
  <Row :gutter="8" >
    <Col span="8"><Row type="flex" align="middle"><Col span="8">磁盘读取(IO)</Col><Col span="16">{{info.diskkbsread| convertByType(2)}}</Col></Row></Col>
    <Col span="8"><Row type="flex" align="middle"><Col span="8">磁盘写入(IO)</Col><Col span="16">{{info.diskkbswrite| convertByType(2)}}</Col></Row></Col>
  </Row>
</div>
  
</template>

<script>
export default {
  name: "",
  data() {
    return {
      info: {}
    };
  },
  methods: {
    async getVm() {
      const result = (await this.$safeGet({
        command: "listVirtualMachines",
        details: "stats",
        id: this.$route.query.id
      })).listvirtualmachinesresponse.virtualmachine;
      this.info = result ? result[0] : {};
    }
  },
  mounted() {
    this.getVm();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/css" scoped>
.ivu-col {
  padding: 8px 0;
}
</style>
