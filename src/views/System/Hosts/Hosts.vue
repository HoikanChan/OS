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
              <span>添加提供点</span>
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
    <v-grid-list :data="hosts" :cols="cols" :hoverCols="hoverCols" @view="viewHost"></v-grid-list>
    <newhost-modal :isModalShow="isModalShow" @show="show"></newhost-modal>
  </div>
</template>

<script>
import NewHostModal from "./NewHostModal";
export default {
  name: "v-Hosts",
  components: {
    "newhost-modal": NewHostModal
  },
  data() {
    return {
      hosts: [],
      searchValue: "",
      isModalShow: false,
      cols: {
        name: "名称",
        zonename: "资源域",
        podname: "提供点",
        clustername: "群集"
      },
      hoverCols: {
        name: "名称",
        id: "ID",
        resourcestate: "资源状态",
        state: "状态"
      }
    };
  },
  methods: {
    async fetchData() {
      const params = {
        command: "listHosts",
        listAll: true,
        type: "routing",
        page: 1,
        pagesize: 20
      };
      if (this.searchValue) {
        params.keyword = this.searchValue;
      }
      const res = await this.$get(params);
      this.hosts = res.listhostsresponse.host;
    },
    show(isShow, isReload) {
      this.isModalShow = isShow;
      if (isReload) {
        this.fetchData();
      }
    },
    viewHost(item) {
      this.$router.push({
        name: "HostDetail",
        query: { id: item.id, zoneId: item.zoneid }
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
