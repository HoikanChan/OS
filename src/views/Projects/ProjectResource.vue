<template>
  <div class="templates">
    <div class="account-info">
      <Row :gutter="8" class="info-row">
        <Col span="8" v-for="(item,index) in newResourceInfos" :key="index">
          <Row type="flex" justify="center" align="middle" v-if="index < 11"><Col span="8" style="margin:16px 0">{{labels[index]}}</Col><Col span="16"><Input  v-model="item.max" style="width:80%"/></Col></Row>
        </Col>
      </Row>
      <Row type="flex" justify="end">
      <Button type="success" @click="updateResource" style="margin-right:24px">应用</Button>
      </Row>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProjectResource",
  props: {
    projectId: String
  },
  data() {
    return {
      newResourceInfos: [],
      resourceInfos: [],
      labels: [
        "最大用户 VM 数",
        "最大公用 IP 数",
        "最大卷数",
        "最大快照数",
        "最大模板数",
        "最大网络数",
        "最大 CPU 内核数",
        "最大内存(MiB)",
        "最大 VPC 数",
        "最大二级存储(GiB)",
        "最大主存储(GiB)"
      ]
    };
  },
  methods: {
    async fecthData() {
      try {
        const response = await this.$http.get("client/api", {
          params: {
            command: "listResourceLimits",
            response: "json",
            projectid: this.projectId
          }
        });
        this.resourceInfos = response.listresourcelimitsresponse.resourcelimit;
      } catch (error) {
        this.handleError(error);
      }
    },
    async updateResource() {
      await this.newResourceInfos.forEach(async (info, index) => {
        if (info.max !== this.resourceInfos[index].max) {
          try {
            await this.$http.get("client/api", {
              params: {
                command: "updateResourceLimit",
                response: "json",
                projectid: this.projectId,
                resourcetype: info.resourcetype,
                max: info.max
              }
            });
          } catch (error) {
            this.handleError(error);
          }
        }
      });
      this.fecthData();
    },
    handleError(error) {
      console.log("error", error.response.data);
      if (error.response.data.createaccountresponse) {
        this.$Modal.error({
          title: "错误",
          content: `<p>${
            error.response.data.createaccountresponse.errortext
          }</p>`
        });
      }
    }
  },
  async mounted() {
    await this.fecthData();
    this.newResourceInfos = JSON.parse(JSON.stringify(this.resourceInfos));
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/css" scoped>
</style>
