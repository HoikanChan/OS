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
    <v-grid-list :data="snapshots" :cols="cols" :hoverCols="hoverCols" @view="view"></v-grid-list>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      snapshots: [],
      searchValue: "",
      cols: {
        volumename:"卷",
        name: "名称",
        snapshottype: "间隔类型",
        created: "创建日期",
        state: "状态"
      },
      hoverCols: {
        name: "名称",
        id: "ID",
        volumename: "卷名称",
        state: "状态"
      }
    };
  },
  methods: {
    async getSnapshots() {
      let params = {
        command: "listSnapshots",
        page: 1,
        pagesize: 20,
        listAll: true
      };
      if (this.searchValue) {
        params.keyword = this.searchValue;
      }
      const { listsnapshotsresponse } = await this.$safeGet(params);
      const result = listsnapshotsresponse.snapshot;
      this.snapshots = result ? result : [];
    },
    view(item) {
      this.$router.push({
        name: "snapshotDetail",
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
