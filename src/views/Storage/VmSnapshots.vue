<template>
  <div class="container">
    <Row class="operation-row dark">
      <Row class="operation-center-row">
        <Col class="right-operation-row" span="11" offset="13">
          <Row>
            <Col class="search-operation" span="13">
              <input type="text" placeholder="请输入名称关键字" v-model="searchValue" @keydown.enter="getSnapshots">
              <button class="search-btn" @click.prevent="getSnapshots">搜索</button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Row>
    <v-grid-list :data="vmSnapshots" :cols="cols" :hoverCols="hoverCols" @view="view"></v-grid-list>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      vmSnapshots: [],
      searchValue: "",
      cols: {
        name: "名称",
        state: "状态",
        type: "类型",
        version: "最新版本",
        parent: "父名称",
        created: "日期"
      },
      hoverCols: {
        id: "ID",
        name: "名称",
        displayname: "显示名称",
        type: "类型"
      }
    };
  },
  methods: {
    async getSnapshots() {
      let params = {
        command: "listVMSnapshot",
        page: 1,
        pagesize: 20,
        listAll: true
      };
      if (this.searchValue) {
        params.keyword = this.searchValue;
      }
      const { listvmsnapshotresponse } = await this.$safeGet(params);
      const result = listvmsnapshotresponse.vmSnapshot;
      this.vmSnapshots = result ? result : [];
    },
    view(item) {
      this.$router.push({
        name: "vmSnapshotDetail",
        query: { id: item.id },
        params: {
          displayName: item.name
        }
      });
    }
  },
  mounted() {
    this.getSnapshots();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/css" scoped>
</style>
