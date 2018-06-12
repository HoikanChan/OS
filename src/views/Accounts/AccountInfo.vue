<template>
  <div class="templates">
    <h4>基本信息</h4>
      <Row class="name-block">
        <Col span="8"><Row><Col span="8">名称</Col><Col span="16">{{accoutInfo.name}}</Col></Row></Col>
      </Row>
      <div class="account-info">
        <Row :gutter="8" class="info-row">
          <Col span="8"><Row><Col span="8">ID</Col><Col span="16">{{accoutInfo.id}}</Col></Row></Col>
          <Col span="8"><Row><Col span="8">角色</Col><Col span="16">{{accoutInfo.rolename}}</Col></Row></Col>
          <Col span="8"><Row><Col span="8">Role Type</Col><Col span="16">{{accoutInfo.roletype}}</Col></Row></Col>
        </Row>
        <Row :gutter="8" class="info-row">
          <Col span="8"><Row><Col span="8">域</Col><Col span="16">{{accoutInfo.domain}}</Col></Row></Col>
          <Col span="8"><Row><Col span="8">状态</Col><Col span="16">{{accoutInfo.state}}</Col></Row></Col>
          <Col span="8"><Row><Col span="8">网络域</Col><Col span="16">{{accoutInfo.name}}</Col></Row></Col>
        </Row>
        <Row :gutter="8" class="info-row">
          <Col span="8"><Row><Col span="8">实例限制</Col><Col span="16">{{accoutInfo.vmlimit}}</Col></Row></Col>
          <Col span="8"><Row><Col span="8">公用 IP 限制</Col><Col span="16">{{accoutInfo.iplimit}}</Col></Row></Col>
          <Col span="8"><Row><Col span="8">卷限制</Col><Col span="16">{{accoutInfo.volumelimit}}</Col></Row></Col>
        </Row>
        <Row :gutter="8" class="info-row">
          <Col span="8"><Row><Col span="8">快照限制</Col><Col span="16">{{accoutInfo.snapshotlimit}}</Col></Row></Col>
          <Col span="8"><Row><Col span="8">模板限制</Col><Col span="16">{{accoutInfo.templatelimit}}</Col></Row></Col>
          <Col span="8"><Row><Col span="8">VPC 限制</Col><Col span="16">{{accoutInfo.vpcavailable}}</Col></Row></Col>
        </Row>
        <Row :gutter="8" class="info-row">
          <Col span="8"><Row><Col span="8">CPU 限制</Col><Col span="16">{{accoutInfo.cpulimit}}</Col></Row></Col>
          <Col span="8"><Row><Col span="8">内存限制(MiB)</Col><Col span="16">{{accoutInfo.memorylimit}}</Col></Row></Col>
          <Col span="8"><Row><Col span="8">网络限制</Col><Col span="16">{{accoutInfo.networklimit}}</Col></Row></Col>
        </Row>
        <Row :gutter="8" class="info-row">
          <Col span="8"><Row><Col span="8">主存储限制(GiB)</Col><Col span="16">{{accoutInfo.primarystoragelimit}}</Col></Row></Col>
          <Col span="8"><Row><Col span="8">二级存储限制(GiB)</Col><Col span="16">{{accoutInfo.secondarystoragelimit}}</Col></Row></Col>
          <Col span="8"><Row><Col span="8">总 VM 数</Col><Col span="16">{{accoutInfo.vmtotal}}</Col></Row></Col>
        </Row>
        <Row :gutter="8" class="info-row">
          <Col span="8"><Row><Col span="8">IP地址总数</Col><Col span="16">{{accoutInfo.iptotal}}</Col></Row></Col>
          <Col span="8"><Row><Col span="8">接收的字节数</Col><Col span="16">???</Col></Row></Col>
          <Col span="8"><Row><Col span="8">发送的字节数</Col><Col span="16">???</Col></Row></Col>
        </Row>
    </div>
  </div>
</template>

<script>
export default {
  name: "v-templates",
  props: {
    accoutInfo: Object
  },
  data() {
    return {};
  },
  methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/css" scoped>
.info-row {
  margin: 12px 0;
}
.name-block{
  border-bottom:solid 1px #f1f1f1;
  padding: 12px 0;
}
.account-info{
  padding-bottom: 36px;
}
h4 {
  margin:20px 0;
  height: 37px;
  line-height: 37px;
  font-size: 16px;
  padding-left: 13px;
  border-left: 6px solid #51e299;
  background-color: #f0f0f0;
}
</style>
