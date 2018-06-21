<template>
  <div class="container">
    <Tabs :animated="false" style="padding:36px 0 12px" closable value="unGrouped" v-model="tabName">
      <TabPane class="tabs-content" name="unGrouped" label="未分组">
      </TabPane>
      <TabPane class="tabs-content" name="zone" label="按资源域分组">
      </TabPane>
      <TabPane class="tabs-content" name="pod" label="按提供点分组">
      </TabPane>
      <TabPane class="tabs-content" name="cluster" label="按群集分组">
      </TabPane>
      <TabPane class="tabs-content" name="account" label="按账户分组">
      </TabPane>
    </Tabs>
    <Row class="operation-row dark">
      <Row class="operation-center-row">
        <Col class="right-operation-row" offset="15" span="11">
          <Row>
            <Col class="search-operation" span="13">
              <input type="text" placeholder="请输入名称关键字" v-model="searchValue" @keydown.enter="getTabData(tabName)">
              <button class="search-btn" @click.prevent="getTabData(tabName)">搜索</button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Row>
    <MyGridList :data="gridDatas" :cols="gridCols" :hoverCols="gridHoverCols" @view="viewVirtualRouter" v-if="reset"></MyGridList>
  </div>
</template>

<script>
import MyGridList from "./MyGridList";
export default {
  name: "v-VirtualRouters",
  components: {
    MyGridList
  },
  data() {
    return {
      gridDatas: [],
      gridCols: {},
      gridHoverCols: {},
      virtualRouters: [],
      zones: [],
      pods: [],
      clusters: [],
      accounts: [],
      searchValue: "",
      isModalShow: false,
      tabName: "unGrouped",
      reset: true,
      cols: {
        unGrouped: {
          name: "名称",
          todo1: "公用IP地址",
          todo2: "类型",
          state: "状态",
          requiresupgrade: "需要升级"
        },
        zone: {
          name: "资源域",
          count: "虚拟路由器总数",
          requiresupgrade: "需要升级"
        },
        pod: {
          name: "提供点",
          count: "虚拟路由器总数",
          requiresupgrade: "需要升级"
        },
        cluster: {
          name: "群集",
          count: "虚拟路由器总数",
          requiresupgrade: "需要升级"
        },
        account: {
          name: "账户",
          domain: "域名",
          count: "虚拟路由器总数",
          requiresupgrade: "需要升级"
        }
      },
      hoverCols: {
        unGrouped: {
          name: "名称",
          id: "ID",
          state: "状态",
          version: "版本"
        },
        zone: {
          name: "资源域"
        },
        pod: {
          name: "提供点"
        },
        cluster: {
          name: "群集"
        },
        account: {
          name: "账户",
          domain: "域名",
          count: "虚拟路由器总数",
          requiresupgrade: "需要升级"
        }
      }
    };
  },
  watch: {
    tabName: async function(name) {
      this.getTabData(name);
      this.gridCols = this.cols[name];
      this.gridHoverCols = this.hoverCols[name];
    }
  },
  methods: {
    async getTabData(name) {
      switch (name) {
        case "unGrouped":
          await this.fetchData();
          this.gridDatas = this.virtualRouters;
          break;
        case "zone":
          await this.getZones();
          this.gridDatas = this.zones;
          break;
        case "pod":
          await this.getPods();
          this.gridDatas = this.pods;
          break;
        case "cluster":
          await this.getClusters();
          this.gridDatas = this.clusters;
          break;
        case "account":
          await this.getAccounts();
          this.gridDatas = this.accounts;
          break;
        default:
          break;
      }
    },
    async fetchData(queryParams) {
      const params = {
        command: "listRouters",
        listAll: true,
        page: 1,
        pagesize: 20
      };
      if (this.searchValue) {
        params.keyword = this.searchValue;
      }
      if (queryParams) {
        Object.assign(params, queryParams);
      }
      const res = await this.$get(params);
      if (queryParams) {
        return res.listroutersresponse;
      } else {
        this.virtualRouters = res.listroutersresponse.router;
      }
    },
    viewVirtualRouter(item) {
      let queryParams;
      switch (this.tabName) {
        case "unGrouped":
          queryParams = { id: item.id };
          break;
        case "zone":
          queryParams = { zoneid: item.id, name: item.name };
          break;
        case "pod":
          queryParams = { podid: item.id, name: item.name };
          break;
        case "cluster":
          queryParams = { clusterid: item.id, name: item.name };
          break;
        case "account":
          queryParams = {
            domainid: item.id,
            account: item.name,
            domain: item.domain
          };
          break;
        default:
          break;
      }
      this.$router.push({
        name: "VirtualRouterDetail",
        query: queryParams
      });
    },
    async getZones() {
      let params = {
        command: "listZones",
        page: 1,
        pagesize: 20
      };
      if (this.searchValue) {
        params.keyword = this.searchValue;
      }
      const { listzonesresponse } = await this.$safeGet(params);
      this.zones = listzonesresponse.zone;
      this.zones.forEach(async zone => {
        const res = await this.fetchData({ zoneid: zone.id });
        zone.count = res.count ? res.count : 0;
        zone.requiresupgrade = false;
        if (res.router) {
          res.router.forEach(router => {
            if (
              router.requiresupgrade === true ||
              router.requiresupgrade === "true"
            ) {
              zone.requiresupgrade = true;
            }
          });
        }
      });
    },
    async getPods() {
      let params = {
        command: "listPods",
        page: 1,
        pagesize: 20
      };
      if (this.searchValue) {
        params.keyword = this.searchValue;
      }
      const { listpodsresponse } = await this.$safeGet(params);
      this.pods = listpodsresponse.pod;
      this.pods.forEach(async pod => {
        const res = await this.fetchData({ podid: pod.id });
        pod.count = res.count ? res.count : 0;
        pod.requiresupgrade = false;
        if (res.router) {
          res.router.forEach(router => {
            if (
              router.requiresupgrade === true ||
              router.requiresupgrade === "true"
            ) {
              pod.requiresupgrade = true;
            }
          });
        }
      });
    },
    async getClusters() {
      let params = {
        command: "listClusters",
        page: 1,
        pagesize: 20
      };
      if (this.searchValue) {
        params.keyword = this.searchValue;
      }
      const { listclustersresponse } = await this.$safeGet(params);
      this.clusters = listclustersresponse.cluster;
      this.clusters.forEach(async cluster => {
        const res = await this.fetchData({ clusterid: cluster.id });
        cluster.count = res.count ? res.count : 0;
        cluster.requiresupgrade = false;
        if (res.router) {
          res.router.forEach(router => {
            if (
              router.requiresupgrade === true ||
              router.requiresupgrade === "true"
            ) {
              cluster.requiresupgrade = true;
            }
          });
        }
      });
    },
    async getAccounts() {
      let params = {
        command: "listAccounts",
        listAll: true,
        page: 1,
        pagesize: 20
      };
      if (this.searchValue) {
        params.keyword = this.searchValue;
      }
      const { listaccountsresponse } = await this.$safeGet(params);
      this.accounts = listaccountsresponse.account;
      this.accounts.forEach(async account => {
        const res = await this.fetchData({
          domainid: account.domainid,
          account: account.name
        });
        account.count = res.count ? res.count : 0;
        account.requiresupgrade = false;
        if (res.router) {
          res.router.forEach(router => {
            if (
              router.requiresupgrade === true ||
              router.requiresupgrade === "true"
            ) {
              account.requiresupgrade = true;
            }
          });
        }
      });
    }
  },
  async mounted() {
    await this.fetchData();
    this.gridDatas = this.virtualRouters;
    this.gridCols = this.cols[this.tabName];
    this.gridHoverCols = this.hoverCols[this.tabName];
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/css" scoped>
// .container {
//   width: 1200px;
//   margin: 0 auto;
// }
</style>
