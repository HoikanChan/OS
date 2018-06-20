<template>
  <div class="container">
    <Tabs :animated="false" style="padding:24px 0">
      <TabPane class="tabs-content" label="二级存储">
        <Row class="operation-row dark">
          <Row class="operation-center-row">
            <Col class="left-operation-row" span="13">
            <ul>
              <li @click="isModalShow = !isModalShow">
                <div class="icon">
                  <img src="@/assets/add_instances_icon.png" alt="">
                </div>
                <span>添加二级存储</span>
              </li>
            </ul>
            </Col>
            <Col class="right-operation-row" span="11">
            <Row>
              <Col class="search-operation" span="13">
              <input type="text" placeholder="请输入名称关键字" v-model="searchValue" @keydown.enter="fetchSecondaryStorages">
              <button class="search-btn" @click.prevent="fetchSecondaryStorages">搜索</button>
              </Col>
            </Row>
            </Col>
          </Row>
        </Row>
        <v-grid-list :data="secondaryStorages" :cols="cols" :hoverCols="hoverCols" @view="viewSecondaryStorage"></v-grid-list>
      </TabPane>
      <TabPane class="tabs-content" label="二级暂存存储">
        <Row class="operation-row dark">
          <Row class="operation-center-row">
            <Col class="left-operation-row" span="13">
            <ul>
              <li @click="isStagingModalShow = !isStagingModalShow">
                <div class="icon">
                  <img src="@/assets/add_instances_icon.png" alt="">
                </div>
                <span>添加NFS二级暂存存储</span>
              </li>
            </ul>
            </Col>
            <Col class="right-operation-row" span="11">
            <Row>
              <Col class="search-operation" span="13">
              <input type="text" placeholder="请输入名称关键字" v-model="searchValue" @keydown.enter="fetchSecondaryStagingStorages">
              <button class="search-btn" @click.prevent="fetchSecondaryStagingStorages">搜索</button>
              </Col>
            </Row>
            </Col>
          </Row>
        </Row>
        <v-grid-list :data="secondaryStagingStorages" :cols="stagingCols" :hoverCols="stagingHoverCols" @view="viewStagingSecondaryStorage"></v-grid-list>
      </TabPane>
    </Tabs>
    <newSecondaryStorage-modal :isModalShow="isModalShow" @show="show"></newSecondaryStorage-modal>
    <newSecondaryStagingStorage-modal :isModalShow="isStagingModalShow" @show="stagingShow"></newSecondaryStagingStorage-modal>
  </div>
</template>

<script>
import NewSecondaryStorageModal from "./NewSecondaryStorageModal";
import NewSecondaryStagingStorageModal from "./NewSecondaryStagingStorageModal";
export default {
  name: "v-secondaryStorages",
  components: {
    "newSecondaryStorage-modal": NewSecondaryStorageModal,
    "newSecondaryStagingStorage-modal": NewSecondaryStagingStorageModal
  },
  data() {
    return {
      secondaryStorages: [],
      secondaryStagingStorages: [],
      searchValue: "",
      isModalShow: false,
      isStagingModalShow: false,
      cols: {
        name: "名称",
        protocol: "协议"
      },
      hoverCols: {
        name: "名称",
        url: "URL",
        protocol: "协议",
        providername: "提供程序"
      },
      stagingCols: {
        name: "名称",
        url: "URL",
        providername: "提供程序"
      },
      stagingHoverCols: {
        name: "名称"
      }
    };
  },
  methods: {
    async fetchSecondaryStorages() {
      const params = {
        command: "listImageStores",
        listAll: true,
        page: 1,
        pagesize: 20
      };
      if (this.searchValue) {
        params.keyword = this.searchValue;
      }
      const res = await this.$get(params);
      this.secondaryStorages = res.listimagestoresresponse.imagestore;
    },
    async fetchSecondaryStagingStorages() {
      const params = {
        command: "listSecondaryStagingStores",
        listAll: true,
        page: 1,
        pagesize: 20
      };
      if (this.searchValue) {
        params.keyword = this.searchValue;
      }
      const res = await this.$get(params);
      this.secondaryStagingStorages =
        res.listsecondarystagingstoreresponse.imagestore;
    },
    show(isShow, isReload) {
      this.isModalShow = isShow;
      if (isReload) {
        this.fetchSecondaryStagingStorages();
      }
    },
    stagingShow(isShow, isReload) {
      this.isStagingModalShow = isShow;
      if (isReload) {
        this.fetchSecondaryStagingStorages();
      }
    },
    viewSecondaryStorage(item) {
      this.$router.push({
        name: "SecondaryStorageDetail",
        query: { id: item.id }
      });
    },
    viewStagingSecondaryStorage(item) {
      this.$router.push({
        name: "SecondaryStagingStorageDetail",
        query: { id: item.id}
      });
    }
  },
  mounted() {
    this.fetchSecondaryStorages();
    this.fetchSecondaryStagingStorages();
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