<template>
  <div class="templates">
    <!-- 新增角色窗口 -->
    <Modal
      v-model="isModalShow"
      title="添加提供点"
    > 
      <Form :model="addPrimaryStorageForm"  ref="addPrimaryStorageForm"  :rules="rules" :label-width="80">
        <Row>
          <FormItem label="范围" prop="range">
            <Select 
              v-model="addPrimaryStorageForm.range" 
            >
              <Option v-for="item in ranges" :value="item.id" :key="item.id">{{ item.name }}</Option>
            </Select>
          </FormItem>
        </Row>
        <Row>
          <FormItem label="虚拟机管理程序" prop="vmManager" v-if="addPrimaryStorageForm.range === 'zones'">
            <Select 
              v-model="addPrimaryStorageForm.zoneId" 
            >
              <Option v-for="item in vmManagers" :value="item" :key="item">{{ item }}</Option>
            </Select>
          </FormItem>
        </Row>
        <Row>
          <FormItem label="资源域" prop="zoneId">
            <Select 
              v-model="addPrimaryStorageForm.zoneId" 
            >
              <Option v-for="item in listZones" :value="item.id" :key="item.id">{{ item.name }}</Option>
            </Select>
          </FormItem>
        </Row>
        <Row>
          <FormItem label="提供点" prop="podid" >
            <Select
              v-model="addPrimaryStorageForm.podid" 
            >
              <Option v-for="item in listPods" :value="item.id" :key="item.id">{{ item.name }}</Option>
            </Select>
          </FormItem>
        </Row>
        <Row>
          <FormItem label="群集" prop="clusterid">
            <Select 
              v-model="addPrimaryStorageForm.clusterid" 
            >
              <Option v-for="item in listClusters" :value="item.id" :key="item.id">{{ item.name }}</Option>
            </Select>
          </FormItem>
        </Row>
            <Row>
          <FormItem label="名称" prop="name" >
            <Input  placeholder="请输入名称" v-model="addPrimaryStorageForm.name"/>
          </FormItem>
        </Row>
        <Row>
          <FormItem label="协议" prop="startIp" >
            <Input  placeholder="请输入起始预留系统 IP" v-model="addPrimaryStorageForm.startIp"/>
          </FormItem>
        </Row>
        <Row>
          <FormItem label="服务器" prop="ipaddress" >
            <Input  placeholder="请输入结束预留系统 IP" v-model="addPrimaryStorageForm.endIp"/>
          </FormItem>
        </Row>
        <Row>
          <FormItem label="提供程序" prop="domainid" >
            <Select 
              v-model="addPrimaryStorageForm.listStorageProviders" 
            >
              <Option v-for="item in listStorageProviders" :value="item.name" :key="item.name">{{ item.name }}</Option>
            </Select>
          </FormItem>
        </Row>
        <Row>
          <FormItem label="容量(字节)" prop="endIp" >
            <Input  placeholder="请输入容量(字节)" v-model="addPrimaryStorageForm.endIp"/>
          </FormItem>
        </Row>
        <Row>
          <FormItem label="容量 IOPS" prop="endIp" >
            <Input  placeholder="请输入容量 IOPS" v-model="addPrimaryStorageForm.endIp"/>
          </FormItem>
        </Row>
        <Row>
          <FormItem label="URL" prop="endIp" >
            <Input  placeholder="请输入URL" v-model="addPrimaryStorageForm.endIp"/>
          </FormItem>
        </Row>
        <Row>
          <FormItem label="存储标签" prop="endIp" >
            <Input  placeholder="请输入存储标签" v-model="addPrimaryStorageForm.endIp"/>
          </FormItem>
        </Row>
      </Form>
      <div slot="footer">
          <Button type="ghost" @click="cancel">取消</Button>
          <Button type="success" @click="addPrimaryStorage" style="margin-left: 8px">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
export default {
  name: "new-primaryStorage-modal",
  props: {
    isModalShow: Boolean
  },
  data() {
    return {
      ranges: [
        {
          id: "cluster",
          name: "群集"
        },
        {
          id: "zones",
          name: "整个资源域"
        }
      ],
      vmManagers: ["kvm", "VMware", "Hyperv", "Any"],
      addPrimaryStorageForm: {
        range: "",
        zoneId: "",
        name: "",
        gateway: "",
        netmask: "",
        startIp: "",
        endIp: ""
      },
      isExclusive: false,
      accountForm: {
        name: "",
        dominId: ""
      },
      listZones: [],
      listStorageProviders: [],
      listHosts: [],
      listPods: [],
      listClusters: [],
      listStorageTags: [],
      rules: {
        zoneId: [{ required: true, message: "请选择资源域", trigger: "blur" }],
        name: [
          { required: true, message: "请输入提供点名称", trigger: "blur" }
        ],
        ipaddress: [
          {
            required: true,
            message: "请输入预留的系统网络掩码",
            trigger: "blur"
          }
        ],
        gateway: [
          { required: true, message: "请输入预留的系统网关", trigger: "blur" }
        ],
        startIp: [{ required: true, message: "请输入密码", trigger: "blur" }]
      },
      accountRules: {
        dominId: [{ required: true, message: "请输入域", trigger: "blur" }]
      }
    };
  },
  methods: {
    async addAccount() {
      try {
        const params = Object.assign(
          {
            command: "createPrimaryStorage"
          },
          this.addPrimaryStorageForm
        );
        for (let key in params) {
          if (
            params.hasOwnProperty(key) &&
            (params[key] == null ||
              params[key] == undefined ||
              params[key] == "")
          ) {
            delete params[key];
          }
        }
        const response = await this.$get(params);
      } catch (error) {
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
    addPrimaryStorage(name) {
      this.$refs["addPrimaryStorageForm"].validate(
        async function(valid) {
          if (valid) {
            await this.addAccount();
            this.$emit("show", false, true);
          } else {
            this.isModalShow = true;
            this.$emit("show", true);
          }
        }.bind(this)
      );
    },
    cancel() {
      this.$emit("show", false);
    }
  },
  async mounted() {
    try {
      const listZonesRes = await this.$get({
        command: "listZones"
      });
      this.listZones = listZonesRes.listzonesresponse.zone;

      const listPodsRes = await this.$get({
        command: "listPods"
      });
      this.listPods = listPodsRes.listpodsresponse.pod;

      const listHostsRes = await this.$get({
        command: "listHosts"
      });
      this.listHosts = listHostsRes.listhostsresponse.host;

      const listClustersRes = await this.$get({
        command: "listClusters"
      });
      this.listClusters = listClustersRes.listclustersresponse.cluster;

      const listStorageTagsRes = await this.$get({
        command: "listStorageTags"
      });
      this.listStorageTags =
        listStorageTagsRes.liststoragetagsresponse.storagetag;

      const listStorageProvidersRes = await this.$get({
        command: "listStorageProviders",
        type: "primary"
      });
      this.listStorageProviders =
        listStorageProvidersRes.liststorageprovidersresponse.dataStoreProvider;
    } catch (error) {
      console.error(error);
      this.$message({
        showClose: true,
        message: error.response.data,
        type: "error"
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/css" scoped>
</style>
