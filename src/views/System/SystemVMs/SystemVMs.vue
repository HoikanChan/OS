<template>
  <div class="container">
    <v-breadcrumb/>
    <Row class="operation-row dark">
      <Row class="operation-center-row">
        <Col class="right-operation-row" offset="15" span="11">
          <Row>
            <Col class="search-operation" span="13">
              <input type="text" placeholder="请输入名称关键字" v-model="searchValue" @keydown.enter="fetchData">
              <button class="search-btn" @click.prevent="fetchData">搜索</button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Row>
    <v-grid-list :data="systemVMs" :cols="cols" :hoverCols="hoverCols" @view="viewSystemVM" v-if="isReset"></v-grid-list>
  </div>
</template>

<script>
export default {
  name: "v-SystemVMs",
  data() {
    return {
      systemVMs: [],
      hosts: [],
      searchValue: "",
      isModalShow: false,
      isReset: true,
      cols: {
        name: "名称",
        systemvmtype: "类型",
        zonename: "资源域",
        state: "VM状态",
        proxystate: "代理状态"
      },
      hoverCols: {
        name: "名称",
        id: "ID",
        state: "状态",
        systemvmtype: "类型"
      }
    };
  },
  methods: {
    async fetchData() {
      const params = {
        command: "listSystemVms",
        listAll: true,
        page: 1,
        pagesize: 20
      };
      if (this.searchValue) {
        params.keyword = this.searchValue;
      }
      const res = await this.$get(params);
      if (res.listsystemvmsresponse.systemvm) {
        this.systemVMs = res.listsystemvmsresponse.systemvm;
      }
      this.isReset = false;
      await this.getHosts();
      this.systemVMs.forEach(vm => {
        this.hosts.forEach(host => {
          if (vm.name === host.name) {
            vm.proxystate = host.state;
          }
        });
      });
      this.isReset = true;
    },
    async getHosts() {
      const params = {
        command: "listHosts",
        details: "min"
      };
      const res = await this.$get(params);
      this.hosts = res.listhostsresponse.host;
    },
    show(isShow, isReload) {
      this.isModalShow = isShow;
      if (isReload) {
        this.fetchData();
      }
    },
    viewSystemVM(item) {
      this.$router.push({
        name: "SystemVMDetail",
        query: { id: item.id, zoneId: item.zoneid },
        params: {
          displayName: item.name
        }
      });
    }
  },
  mounted() {
    this.fetchData();
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
