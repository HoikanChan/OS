<template>
  <div class="container">
    <Tabs :animated="false" style="padding:24px 0">
      <TabPane class="tabs-content" label="详细信息">
        <v-projectInfo/>
      </TabPane>
      <TabPane class="tabs-content" label="账户">
        <v-projectAccount :projectId="this.projectInfo.id"/>
      </TabPane>
      <TabPane class="tabs-content" label="资源">
        <v-projectResource :projectId="this.projectInfo.id"/>
      </TabPane>
    </Tabs>
  </div>
</template>

<script>
import ProjectInfo from "./ProjectInfo";
import ProjectAccount from "./ProjectAccount";
import ProjectResource from "./ProjectResource";
export default {
  name: "v-templates",
  components: {
    "v-projectInfo": ProjectInfo,
    "v-projectAccount": ProjectAccount,
    "v-projectResource": ProjectResource
  },
  data() {
    return {
      projectInfo: {}
    };
  },
  methods: {
    async fecthData() {
      let params = {
        command: "listProjects",
        id: this.$route.query.id,
        istAll: true,
        response: "json"
      };
      try {
        const res = await this.$http.get("/client/api", {
          params: params
        });
        this.projectInfo = res.listprojectsresponse.project[0];
      } catch (error) {
        console.log(error.response.data);
        this.$message({
          showClose: true,
          message: error.response.data,
          type: "error"
        });
      }
    }
  },
  mounted() {
    this.fecthData();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/css" scoped>
.container {
  width: 1200px;
  margin: 24px auto;
}

.tabs-content {
  padding: 24px 0;
}
</style>