<template>
  <div class="container">
    <Row class="operation-row">
      <Row class="operation-center-row">
        <Col class="left-operation-row" span="13">
          <ul>
            <li @click="isModalShow = !isModalShow">
              <div class="icon">
                <img src="@/assets/add_instances_icon.png" alt="">
              </div>
              <span>添加群集</span>
            </li>
          </ul>
        </Col>
        <Col class="right-operation-row" span="11">
          <Row>
            <Col class="search-operation" span="13">
              <input type="text" placeholder="请输入名称关键字" v-model="searchValue" @keydown.enter="fetchData">
              <button class="search-btn" @click.prevent="fetchData">搜索</button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Row>
    <v-grid-list :data="clusters" :cols="cols" :hoverCols="hoverCols" @view="viewPod"></v-grid-list>
    <newcluster-modal :isModalShow="isModalShow" @show="show"></newcluster-modal>
  </div>
</template>

<script>
import NewClusterModal from "./NewClusterModal";
export default {
  name: "v-clusters",
  components: {
    "newcluster-modal": NewClusterModal
  },
  data() {
    return {
      clusters: [],
      searchValue: "",
      isModalShow: false,
      cols: {
        name: "名称",
        podname: "提供点",
        hypervisortype: "虚拟机管理程序",
        allocationstate: "状态"
      },
      hoverCols: {
        name: "名称",
        id: "ID",
        zonename: "资源域",
        podname: "提供点"
      }
    };
  },
  methods: {
    async fetchData() {
      const params = {
        command: "listClusters",
        listAll: true,
        page: 1,
        pagesize: 20
      };
      if (this.searchValue) {
        params.keyword = this.searchValue;
      }
      const res = await this.$get(params);
      this.clusters = res.listclustersresponse.cluster;
    },
    show(isShow, isReload) {
      this.isModalShow = isShow;
      if (isReload) {
        this.fetchData();
      }
    },
    viewPod(item) {
      this.$router.push({
        name: "ClusterDetail",
        query: { id: item.id }
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
</style>
