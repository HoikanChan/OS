<template>
  <div class="container">
    <UngroupedVirtualRouterDetail v-if="classification === 'none'"/>
    <div >
      <Row class="name-block">
        <Col span="8">
        <Row>
          <Col span="8">{{tag}}</Col>
          <Col span="16" >{{classification === 'account'? $route.query.account:$route.query.name}}</Col>
        </Row>
        </Col>
        <Col span="8" v-if="classification === 'account'">
        <Row>
          <Col span="8">域</Col>
          <Col span="16" >{{$route.query.domain}}</Col>
        </Row>
        </Col>
      </Row>
      <Row :gutter="8" class="info-row">
        <Col span="8">
        <Row type="flex" align="middle">
          <Col span="8">虚拟路由器总数</Col>
          <Col span="16">{{data.count}}</Col>
        </Row>
        </Col>
        <Col span="8">
        <Row type="flex" align="middle">
          <Col span="8">需要升级</Col>
          <Col span="16">{{data.requiresupgrade}}</Col>
        </Row>
        </Col>
        <Col span="8">
        <Row type="flex" align="middle">
          <Col span="8">需要升级的虚拟路由器总数</Col>
          <Col span="16">{{data.upgradeCount}}</Col>
        </Row>
        </Col>
      </Row>
    </div>
  </div>
</template>

<script>
import UngroupedVirtualRouterDetail from "./UngroupedVirtualRouterDetail";
export default {
  name: "v-virtualRouter-detail",
  components: {
    UngroupedVirtualRouterDetail
  },
  data() {
    return {
      data: {
        count: 0,
        requiresupgrade: false,
        upgradeCount: 0
      },
      classification: null,
      tag: null,
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
    async fecthData() {
      if (this.classification === "none") return;
      let params = Object.assign(
        {
          command: "listRouters",
          listAll: true,
          pagesize: 20,
          page: 1
        },
        this.$route.query
      );
      if (this.classification !== "account") {
        delete params.name;
      } else {
        delete params.domain;
      }
      const { listroutersresponse } = await this.$get(params);
      const res = listroutersresponse;
      this.data.count = res.count ? res.count : 0;
      this.data.requiresupgrade = false;
      if (res.router) {
        res.router.forEach(router => {
          if (
            router.requiresupgrade === true ||
            router.requiresupgrade === "true"
          ) {
            this.data.requiresupgrade = true;
            this.upgradeCount++;
          }
        });
      }
    }
  },
  mounted() {
    for (let key in this.$route.query) {
      if (key.includes("zone")) {
        this.classification = "zone";
        this.tag = "资源域";
        break;
      } else if (key.includes("pod")) {
        this.classification = "pod";
        this.tag = "提供点";
        break;
      } else if (key.includes("account")) {
        this.classification = "account";
        this.tag = "账户";
        break;
      } else if (key.includes("cluster")) {
        this.classification = "cluster";
        this.tag = "群集";
        break;
      } else {
        this.classification = "none";
      }
    }
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
  margin: 12px 0;
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
.name-block {
  border-bottom: solid 1px #f1f1f1;
  padding: 12px 0;
}
</style>
