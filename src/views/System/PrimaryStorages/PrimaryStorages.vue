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
    <v-grid-list :data="PrimaryStorages" :cols="cols" :hoverCols="hoverCols" @view="viewPrimaryStorage"></v-grid-list>
    <newPrimaryStorage-modal :isModalShow="isModalShow" @show="show"></newPrimaryStorage-modal>
  </div>
</template>

<script>
import NewPrimaryStorageModal from "./NewPrimaryStorageModal";
export default {
  name: "v-PrimaryStorages",
  components: {
    "newPrimaryStorage-modal": NewPrimaryStorageModal
  },
  data() {
    return {
      PrimaryStorages: [],
      searchValue: "",
      isModalShow: false,
      cols: {
        name: "名称",
        ipaddress: "服务器",
        path: "路径",
        clustername: "群集",
        scope: "范围"
      },
      hoverCols: {
        name: "名称",
        id: "ID",
        state: "状态",
        storgetag: "存储标签"
      }
    };
  },
  methods: {
    async fetchData() {
      const params = {
        command: "listStoragePools",
        listAll: true,
        page: 1,
        pagesize: 20
      };
      if (this.searchValue) {
        params.keyword = this.searchValue;
      }
      const res = await this.$get(params);
      this.PrimaryStorages = res.liststoragepoolsresponse.storagepool;
    },
    show(isShow, isReload) {
      this.isModalShow = isShow;
      if (isReload) {
        this.fetchData();
      }
    },
    viewPrimaryStorage(item) {
      this.$router.push({
        name: "PrimaryStorageDetail",
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
