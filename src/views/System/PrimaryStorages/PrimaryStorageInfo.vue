<template>
  <div class="templates">
    <Row class="operation-row" style="border:none;background:none;">
      <Row class="operation-center-row">
        <Col class="left-operation-row" span="13">
          <ul>
            <li>
              <div class="icon" >
                <img src="@/assets/add_instances_icon.png" alt="" @click="isEditing = !isEditing">
              </div>
              <span>编辑</span>
            </li>
            <li v-if="primaryStorageInfo.state === 'Up'" @click="isMaintainStorageModalShow = true">
              <div class="icon" >
                <img src="@/assets/add_instances_icon.png" alt="">
              </div>
              <span>启动维护模式</span>
            </li>
            <li v-if="primaryStorageInfo.state === 'Maintenance'" @click="isCancelMaintainStorageModalShow = true">
              <div class="icon" >
                <img src="@/assets/add_instances_icon.png" alt="">
              </div>
              <span>取消维护模式</span>
            </li>
            <li v-if="primaryStorageInfo.state === 'Maintenance'" @click="isDeleteModalShow = true">
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
          <Col span="8"><Row><Col span="8">名称</Col><Col span="16">{{primaryStorageInfo.name}}</Col></Row></Col>
        </Row>
    <Row :gutter="8" class="info-row" >
      <Col span="8"><Row type="flex" align="middle"><Col span="8">ID</Col><Col span="16">{{primaryStorageInfo.id}}</Col></Row></Col>
      <Col span="8"><Row type="flex" align="middle"><Col span="8">状态</Col><Col span="16">{{primaryStorageInfo.state}}</Col></Row></Col>
      <Col span="8">
        <Row type="flex" align="middle">
          <Col span="8">存储标签</Col>
          <Col span="16" v-if="!isEditing">{{primaryStorageInfo.tags}}</Col>
          <Col span="16" v-if="isEditing"><Input v-model="primaryStorageInfo.tags"/></Col>
        </Row>
      </Col>
      <Col span="8"><Row type="flex" align="middle"><Col span="8">资源域</Col><Col span="16">{{primaryStorageInfo.zonename}}</Col></Row></Col>
      <Col span="8"><Row type="flex" align="middle"><Col span="8">提供点</Col><Col span="16">{{primaryStorageInfo.podname}}</Col></Row></Col>
      <Col span="8"><Row type="flex" align="middle"><Col span="8">群集</Col><Col span="16">{{primaryStorageInfo.clustername}}</Col></Row></Col>
      <Col span="8"><Row type="flex" align="middle"><Col span="8">类型</Col><Col span="16">{{primaryStorageInfo.type}}</Col></Row></Col>
      <Col span="8"><Row type="flex" align="middle"><Col span="8">IP地址</Col><Col span="16">{{primaryStorageInfo.ipaddress}}</Col></Row></Col>
      <Col span="8"><Row type="flex" align="middle"><Col span="8">路径</Col><Col span="16">{{primaryStorageInfo.path}}</Col></Row></Col>
      <Col span="8">
        <Row type="flex" align="middle">
          <Col span="8">磁盘总量</Col>
          <Col span="16" v-if="!isEditing">{{primaryStorageInfo.disksizetotal | convertByType}}</Col>
          <Col span="16" v-if="isEditing">
            <Input v-model="disksizeConverted" >
              <Select v-model="diskUnit" slot="append" style="width: 70px;z-index=99">
                <Option v-for="(val,index) in units" :value="val" :key="index">{{val}}</Option>
              </Select>
            </Input>
          </Col>
        </Row>
      </Col>
      <Col span="8"><Row type="flex" align="middle"><Col span="8">已分配的磁盘</Col><Col span="16">{{primaryStorageInfo.todo}}</Col></Row></Col>
      <Col span="8">
        <Row type="flex" align="middle">
          <Col span="8">总IOPS</Col>
          <Col span="16" v-if="!isEditing">{{primaryStorageInfo.capacityiops}}</Col>
          <Col span="16" v-if="isEditing"><Input v-model="primaryStorageInfo.capacityiops"/></Col>
        </Row>
      </Col>
    </Row>
    <Row :gutter="12" class="btn-row" type="flex" justify="end" v-if="isEditing">
      <Col><Button type="success" @click="updatePrimaryStorage">应用</Button></Col>
      <Col><Button type="ghost" @click="isEditing = false">取消</Button></Col>
    </Row>
    <Modal
      v-model="isMaintainStorageModalShow"
      title="确认"
      loading
      @on-ok="maintainStorage"
    >
      <p>警告: 将主存储置于维护模式将导致使用主存储中的卷的所有 VM 停止运行。是否要继续?</p>
    </Modal>
    <Modal
      v-model="isCancelMaintainStorageModalShow"
      title="确认"
      @on-ok="cancelMaintainStorage"
    >
      <p>请确认您确实要取消此维护模式。</p>
    </Modal>
    <!-- 删除确认窗口 -->
    <Modal v-model="isDeleteModalShow" width="360">
        <p slot="header" style="color:#f60;text-align:center">
          <Icon type="information-circled"></Icon>
          <span>删除确认</span>
        </p>
        <div style="text-align:center">
           <Checkbox v-model="isForced">强制移除</Checkbox>
        </div>
        <div slot="footer">
          <Button type="error" size="large" long  @click="deletePrimaryStorage">删除</Button>
        </div>
    </Modal>
  </div>
</template>

<script>
export default {
  name: "primaryStorage-info",
  data() {
    return {
      domains: null,
      diskUnit: null,
      disksizeConverted: null,
      units: ["B", "KB", "MB", "GB", "TB"],
      isForced: false,
      primaryStorageInfo: {
        name: "",
        id: "",
        netmask: "",
        startip: "",
        endip: "",
        gateway: "",
        allocationstate: ""
      },
      isEditing: false,
      isMaintainStorageModalShow: false,
      isCancelMaintainStorageModalShow: false,
      isDeleteModalShow: false,
      rules: {
        domainid: [{ required: true, message: "请选择域", trigger: "blur" }]
      }
    };
  },
  methods: {
    diskUnitInit: function() {
      const bytes = this.primaryStorageInfo.disksizetotal;
      if (bytes == undefined) this.diskUnit = "";
      if (bytes < 1024 * 1024) {
        this.diskUnit = "KB";
        this.disksizeConverted = (bytes / 1024).toFixed(2);
      } else if (bytes < 1024 * 1024 * 1024) {
        this.diskUnit = "MB";
        this.disksizeConverted = (bytes / 1024 / 1024).toFixed(2);
      } else if (bytes < 1024 * 1024 * 1024 * 1024) {
        this.diskUnit = "GB";
        this.disksizeConverted = (bytes / 1024 / 1024 / 1024).toFixed(2);
      } else if (bytes < 1024 * 1024 * 1024 * 1024 * 1024 * 1024) {
        this.diskUnit = "TB";
        this.disksizeConverted = (bytes / 1024 / 1024 / 1024 / 1024).toFixed(2);
      } else {
        this.diskUnit = "B";
        this.disksizeConverted = bytes;
      }
    },
    convertToByte(val) {
      if (this.diskUnit === "KB") {
        return val * 1024;
      } else if (this.diskUnit === "MB") {
        return val * 1024 * 1024;
      } else if (this.diskUnit === "GB") {
        return val * 1024 * 1024 * 1024;
      } else if (this.diskUnit === "TB") {
        return val * 1024 * 1024 * 1024 * 1024;
      } else {
        return val;
      }
    },
    async listPrimaryStorages() {
      const res = await this.$safeGet({
        command: "listStoragePools",
        id: this.$route.query.id
      });
      this.primaryStorageInfo = res.liststoragepoolsresponse.storagepool[0];
    },
    async maintainStorage() {
      const res = await this.$safeGet({
        command: "enableStorageMaintenance",
        id: this.$route.query.id
      });
      setTimeout(() => {
        this.isMaintainStorageModalShow = false;
        this.listPrimaryStorages();
      }, 1000);
    },
    async cancelMaintainStorage() {
      const res = await this.$safeGet({
        command: "cancelStorageMaintenance",
        id: this.$route.query.id
      });
      setTimeout(() => {
        this.isMaintainStorageModalShow = false;
        this.listPrimaryStorages();
      }, 1000);
    },
    async updatePrimaryStorage() {
      try {
        let params = {
          command: "updateStoragePool",
          id: this.$route.query.id,
          capacitybytes: this.convertToByte(this.disksizeConverted)
        };
        if (this.primaryStorageInfo.tags) {
          params.tags = this.primaryStorageInfo.tags;
        }
        if (this.primaryStorageInfo.capacityiops) {
          params.capacityiops = this.primaryStorageInfo.capacityiops;
        }
        await this.$get(params);
      } catch (error) {
        console.log("error", error.response.data);
        if (error.response.data.updatePrimaryStorageresponse) {
          this.$Modal.error({
            title: "错误",
            content: `<p>${
              error.response.data.updatePrimaryStorageresponse.errortext
            }</p>`
          });
        }
      } finally {
        this.listPrimaryStorages();
        this.isEditing = false;
      }
    },
    async deletePrimaryStorage() {
      try {
        await this.$get({
          command: "deleteStoragePool",
          id: this.$route.query.id,
          forced: this.isForced
        });
        this.$router.push({ name: "PrimaryStorages" });
      } catch (error) {
        console.log("error", error.response.data);
        if (error.response.data.deletestoragepoolresponse) {
          this.$Modal.error({
            title: "错误",
            content: `<p>${
              error.response.data.deletestoragepoolresponse.errortext
            }</p>`
          });
        }
      } finally {
        this.isDeleteModalShow = false;
      }
    }
  },
  async mounted() {
    await this.listPrimaryStorages();
    this.diskUnitInit();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/css" scoped>
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
