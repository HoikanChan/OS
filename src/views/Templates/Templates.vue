<template>
  <div class="container">
    <Tabs :animated="false" style="padding:24px 0">
      <TabPane label="模板">
        <Row class="operation-row dark">
          <Row class="operation-center-row">
            <Col class="left-operation-row" span="13">
              <ul>
                <li @click="isNewTemplateModalShow = !isNewTemplateModalShow">
                  <div class="icon">
                    <img src="@/assets/add_instances_icon.png" alt="">
                  </div>
                  <span>添加</span>
                </li>
              </ul>
              <!-- todo:完成本地上传及上载 -->
              <ul>
                <li>
                  <div class="icon">
                    <img src="@/assets/add_instances_icon.png" alt="">
                  </div>
                  <span>本地上传</span>
                </li>
              </ul>
              <ul>
                <li>
                  <div class="icon">
                    <img src="@/assets/add_instances_icon.png" alt="">
                  </div>
                  <span>添加</span>
                </li>
              </ul>
            </Col>
            <Col class="right-operation-row" span="11">
              <Row>
                <Col class="search-operation" span="13">
                  <input type="text" placeholder="请输入名称关键字" v-model="searchValue" @keydown.enter="getTemplates">
                  <button class="search-btn" @click.prevent="getTemplates">搜索</button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Row>
        <v-grid-list :data="templates" :cols="cols" :hoverCols="hoverCols" @view="viewVol"></v-grid-list>
      </TabPane>
      <TabPane label="ISO">
        <ISOs/>
      </TabPane>
    </Tabs>
  </div>
</template>

<script>
import ISOs from "./ISOs";
export default {
  name: "v-storage",
  components: {
    ISOs
  },
  data() {
    return {
      searchValue: "",
      templates: [],
      isNewTemplateModalShow: false,
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
    async getTemplates() {
      let params = {
        command: "listTemplates",
        page: 1,
        pagesize: 20,
        listAll: true,
        templatefilter: "all"
      };
      if (this.searchValue) {
        params.keyword = this.searchValue;
      }
      const { listtemplatesresponse } = await this.$safeGet(params);
      if (listtemplatesresponse.template) {
        this.templates = listtemplatesresponse.template;
      }
    },
    show(isShow, isReload) {
      this.isNewTemplateModalShow = isShow;
      if (isReload) {
        this.getTemplates();
      }
    },
    viewVol(item) {
      this.$router.push({
        name: "templateDetail",
        query: { id: item.id }
      });
    }
  },
  mounted() {
    this.getTemplates();
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
