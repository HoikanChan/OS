<template>
  <div class="container">
    <Row class="operation-row dark" style="border:none;background:none;">
      <Row class="operation-center-row">
        <Col class="left-operation-row" span="13">
          <ul>
            <li @click="isDeleteModalShow = true">
              <div class="icon" >
                <img src="@/assets/add_instances_icon.png" alt="">
              </div>
              <span>删除</span>
            </li>
          </ul>
        </Col>
      </Row>
    </Row>
    <Row class="name-block">
          <Col span="8"><Row><Col span="8">名称</Col><Col span="16">{{secondaryStorageInfo.name}}</Col></Row></Col>
        </Row>
    <Row :gutter="8" class="info-row" >
      <Col span="8"><Row type="flex" align="middle"><Col span="8">URL</Col><Col span="16">{{secondaryStorageInfo.url}}</Col></Row></Col>
      <Col span="8"><Row type="flex" align="middle"><Col span="8">提供程序</Col><Col span="16">{{secondaryStorageInfo.providername}}</Col></Row></Col>
      <Col span="8"><Row type="flex" align="middle"><Col span="8">范围</Col><Col span="16">{{secondaryStorageInfo.scope}}</Col></Row></Col>
      <Col span="8"><Row type="flex" align="middle"><Col span="8">资源域</Col><Col span="16">{{secondaryStorageInfo.zonename}}</Col></Row></Col>
      <Col span="8"><Row type="flex" align="middle"><Col span="8">详细信息</Col><Col span="16">{{secondaryStorageInfo.todo}}</Col></Row></Col>
      <Col span="8"><Row type="flex" align="middle"><Col span="8">ID</Col><Col span="16">{{secondaryStorageInfo.id}}</Col></Row></Col>
    </Row>
    <!-- 删除确认窗口 -->
    <Modal v-model="isDeleteModalShow" width="360">
        <p slot="header" style="color:#f60;text-align:center">
          <Icon type="information-circled"></Icon>
          <span>删除确认</span>
        </p>
        <div style="text-align:center">
           请确认您确实要删除此二级暂存存储。
        </div>
        <div slot="footer">
          <Button type="error" size="large" long  @click="deleteSecondaryStorage">删除</Button>
        </div>
    </Modal>
  </div>
</template>

<script>
export default {
  name: "secondaryStorage-info",
  data() {
    return {
      secondaryStorageInfo: {
        name: "",
        url: "",
        providername: "",
        scope: "",
        zonename: "",
        id: ""
      },
      isDeleteModalShow: false
    };
  },
  methods: {
    async listSecondaryStorages() {
      const res = await this.$safeGet({
        command: "listSecondaryStagingStores",
        id: this.$route.query.id
      });
      this.secondaryStorageInfo =
        res.listsecondarystagingstoreresponse.imagestore[0];
    },
    async updateSecondaryStorage() {
      try {
        let params = {
          command: "updateStoragePool",
          id: this.$route.query.id,
          capacitybytes: this.convertToByte(this.disksizeConverted)
        };
        if (this.secondaryStorageInfo.tags) {
          params.tags = this.secondaryStorageInfo.tags;
        }
        if (this.secondaryStorageInfo.capacityiops) {
          params.capacityiops = this.secondaryStorageInfo.capacityiops;
        }
        await this.$get(params);
      } catch (error) {
        console.log("error", error.response.data);
        if (error.response.data.updateSecondaryStorageresponse) {
          this.$Modal.error({
            title: "错误",
            content: `<p>${
              error.response.data.updateSecondaryStorageresponse.errortext
            }</p>`
          });
        }
      } finally {
        this.listSecondaryStorages();
        this.isEditing = false;
      }
    },
    async deleteSecondaryStorage() {
      try {
        await this.$get({
          command: "deleteSecondaryStagingStore",
          id: this.$route.query.id
        });
        this.$router.push({ name: "SecondaryStorages" });
      } catch (error) {
        console.log("error", error.response.data);
        if (error.response.data.deletesecondarystagingstoreresponse) {
          this.$Modal.error({
            title: "错误",
            content: `<p>${
              error.response.data.deletesecondarystagingstoreresponse.errortext
            }</p>`
          });
        }
      } finally {
        this.isDeleteModalShow = false;
      }
    }
  },
  async mounted() {
    await this.listSecondaryStorages();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/css" scoped>
.container {
  width: 1200px;
  margin: 0 auto;
}
.name-block {
  border-bottom: solid 1px #f1f1f1;
  padding: 12px 0;
}
.info-row {
  border-bottom: solid 1px #f1f1f1;
}
.ivu-col {
  padding: 8px 0;
}
</style>
