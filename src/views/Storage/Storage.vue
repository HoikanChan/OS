<template>
  <div class="container">
    <Tabs :animated="false" style="padding:24px 0">
      <TabPane label="卷">
        <Row class="operation-row dark">
          <Row class="operation-center-row">
            <Col class="left-operation-row" span="13">
              <ul>
                <li @click="viewMetrics">
                  <div class="icon">
                    <img src="@/assets/add_instances_icon.png" alt="">
                  </div>
                  <span>运行指标</span>
                </li>
                <li @click="isNewVolumeModalShow = !isNewVolumeModalShow">
                  <div class="icon">
                    <img src="@/assets/add_instances_icon.png" alt="">
                  </div>
                  <span>添加</span>
                </li>
              <!-- todo:完成本地上传及上载 -->
                <li>
                  <div class="icon">
                    <img src="@/assets/add_instances_icon.png" alt="">
                  </div>
                  <span>本地上传</span>
                </li>
                <li>
                  <div class="icon">
                    <img src="@/assets/add_instances_icon.png" alt="">
                  </div>
                  <span>上载</span>
                </li>
              </ul>
            </Col>
            <Col class="right-operation-row" span="11">
              <Row>
                <Col class="search-operation" span="13">
                  <input type="text" placeholder="请输入名称关键字" v-model="searchValue" @keydown.enter="getVolumes">
                  <button class="search-btn" @click.prevent="getVolumes">搜索</button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Row>
        <v-grid-list :data="volumes" :cols="cols" :hoverCols="hoverCols" @view="viewVol"></v-grid-list>
      </TabPane>
      <TabPane label="快照">
        <Snapshots/>
      </TabPane>
      <TabPane label="VM快照">
        <VmSnapshots/>
      </TabPane>
    </Tabs>
    <newvolume-modal :isModalShow="isNewVolumeModalShow" @show="show"></newvolume-modal>
  </div>
</template>

<script>
import NewVolumeModal from "./NewVolumeModal";
import Snapshots from "./Snapshots";
import VmSnapshots from "./VmSnapshots";
export default {
  name: "v-storage",
  components: {
    "newvolume-modal": NewVolumeModal,
    Snapshots: Snapshots,
    VmSnapshots: VmSnapshots
  },
  data() {
    return {
      searchValue: "",
      volumes: [],
      isNewVolumeModalShow: false,
      cols: {
        name: "名称",
        type: "类型",
        hypervisor: "虚拟机管理程序",
        todo: "VM显示名称"
      },
      hoverCols: {
        name: "名称",
        id: "ID",
        zonename: "资源域",
        state: "状态"
      }
    };
  },
  methods: {
    async getVolumes() {
      let params = {
        command: "listVolumes",
        page: 1,
        pagesize: 20,
        listAll: true
      };
      if (this.searchValue) {
        params.keyword = this.searchValue;
      }
      const { listvolumesresponse } = await this.$safeGet(params);
      this.volumes = listvolumesresponse.volume;
    },
    show(isShow, isReload) {
      this.isNewVolumeModalShow = isShow;
      if (isReload) {
        this.getVolumes();
      }
    },
    viewVol(item) {
      this.$router.push({
        name: "volumeDetail",
        query: { id: item.id },
        params: {
          displayName: item.name
        }
      });
    },
    viewMetrics() {
      this.$router.push({
        name: "storageMetrics"
      });
    }
  },
  mounted() {
    this.getVolumes();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/css" scoped>
.container {
  width: 1200px;
  margin: 0 auto;
}
</style>
