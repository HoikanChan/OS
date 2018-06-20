<template>
  <div class="container">
    <Tabs :animated="false" style="padding:24px 0">
      <TabPane class="tabs-content" label="详细信息">
        <Row class="operation-row" style="border:none;background:none;">
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
          <Col span="8"><Row type="flex" align="middle"><Col span="8">协议</Col><Col span="16">{{secondaryStorageInfo.protocol}}</Col></Row></Col>
          <Col span="8"><Row type="flex" align="middle"><Col span="8">提供程序</Col><Col span="16">{{secondaryStorageInfo.providername}}</Col></Row></Col>
          <Col span="8"><Row type="flex" align="middle"><Col span="8">范围</Col><Col span="16">{{secondaryStorageInfo.scope}}</Col></Row></Col>
          <Col span="8"><Row type="flex" align="middle"><Col span="8">资源域</Col><Col span="16">{{secondaryStorageInfo.zonename}}</Col></Row></Col>
          <Col span="8"><Row type="flex" align="middle"><Col span="8">ID</Col><Col span="16">{{secondaryStorageInfo.id}}</Col></Row></Col>
        </Row>
      </TabPane>
      <TabPane class="tabs-content" label="设置">
        <Searchbar class="projects-search" style="position: absolute;right: 20px;top: 84px;" @search="getCongfigList">
        </Searchbar>
        <Table :columns="columns" :data="listConfigs" border width="1200" style="margin-top:96px"></Table>
      </TabPane>
    </Tabs>
    <!-- 删除确认窗口 -->
    <Modal v-model="isDeleteModalShow" width="360">
        <p slot="header" style="color:#f60;text-align:center">
          <Icon type="information-circled"></Icon>
          <span>删除确认</span>
        </p>
        <div style="text-align:center">
           请确认您确实要删除此二级存储。
        </div>
        <div slot="footer">
          <Button type="error" size="large" long  @click="deleteSecondaryStorage">删除</Button>
        </div>
    </Modal>
  </div>
</template>

<script>
import Searchbar from "@/components/Searchbar";

export default {
  name: "secondaryStorage-info",
  components: {
    Searchbar
  },
  data() {
    return {
      listConfigs: [],
      secondaryStorageInfo: {
        name: "",
        id: "",
        netmask: "",
        startip: "",
        endip: "",
        gateway: "",
        allocationstate: ""
      },
      columns: [
        {
          title: "名称",
          key: "name",
          align: "center"
        },
        {
          title: "说明",
          key: "description",
          align: "center"
        },
        {
          title: "值",
          key: "value",
          align: "center"
        }
      ],
      isDeleteModalShow: false
    };
  },
  methods: {
    async listSecondaryStorages() {
      const res = await this.$safeGet({
        command: "listImageStores",
        id: this.$route.query.id
      });
      this.secondaryStorageInfo = res.listimagestoresresponse.imagestore[0];
    },
    async getCongfigList(keyword) {
      const params = {
        command: "listConfigurations",
        imagestoreuuid: this.$route.query.id,
        listAll: true,
        page: 1,
        pagesize: 20
      };
      if (keyword) {
        params.name = keyword;
      }
      const res = await this.$safeGet(params);
      this.listConfigs = res.listconfigurationsresponse.configuration;
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
          command: "deleteImageStore",
          id: this.$route.query.id
        });
        this.$router.push({ name: "SecondaryStorages" });
      } catch (error) {
        console.log("error", error.response.data);
        if (error.response.data.deleteimagestoreresponse) {
          this.$Modal.error({
            title: "错误",
            content: `<p>${
              error.response.data.deleteimagestoreresponse.errortext
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
    await this.getCongfigList();
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
  padding: 12px 0;
}
</style>
