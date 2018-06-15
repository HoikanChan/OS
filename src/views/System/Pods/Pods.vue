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
              <span>新增账户</span>
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
    <v-grid-list :data="pods" :cols="cols" :hoverCols="hoverCols" @view="viewPod"></v-grid-list>
    <newpod-modal :isModalShow="isModalShow" @show="show"></newpod-modal>
  </div>
</template>

<script>
import NewPodModal from "./NewPodModal";
export default {
  name: "v-Pods",
  components: {
    "newpod-modal": NewPodModal
  },
  data() {
    return {
      pods: [],
      searchValue: "",
      isModalShow: false,
      cols: {
        name: "名称",
        gateway: "网关",
        netmask: "网络掩码",
        state: "分配状态"
      },
      hoverCols: {
        name: "名称",
        id: "ID",
        netmask: "网络掩码",
        startip: "起始IP"
      }
    };
  },
  methods: {
    async fetchData() {
      const res = await this.$get({
        command: "listPods",
        listAll: true,
        page: 1,
        pagesize: 20
      });
      this.pods = res.listpodsresponse.pod;
    },
    show(isShow, isReload) {
      this.isModalShow = isShow;
      if (isReload) {
        this.fetchData();
      }
    },
    viewPod(item) {
      this.$router.push({
        name: "PodDetail",
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
