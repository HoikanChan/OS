<template>
  <div class="templates">
    <!-- 新增角色窗口 -->
    <Modal
      v-model="isModalShow"
      title="添加提供点"
    > 
      <Form :model="addTemplateForm"  ref="addTemplateForm"  :rules="rules" :label-width="80">
        <Row>
          <FormItem label="URL" prop="url">
            <Input  placeholder="请输入url" v-model="addTemplateForm.url"/>
          </FormItem>
        </Row>
        <Row>
          <FormItem label="名称" prop="name" >
            <Input  placeholder="请输入名称" v-model="addTemplateForm.name"/>
          </FormItem>
        </Row>
        <Row>
          <FormItem label="说明" prop="displayText">
            <Input  placeholder="请输入说明" v-model="addTemplateForm.displayText"/>  
          </FormItem>
        </Row>
        <Row>
          <FormItem label="资源域" prop="podid" >
            <Select
              v-model="addTemplateForm.podid" 
            >
              <Option v-for="item in listPods" :value="item.id" :key="item.id">{{ item.name }}</Option>
            </Select>
          </FormItem>
        </Row>
        <Row>
          <FormItem label="虚拟机管理程序" prop="hypervisor">
            <Select 
              v-model="addTemplateForm.hypervisor" 
            >
              <Option v-for="item in listClusters" :value="item.id" :key="item.id">{{ item.name }}</Option>
            </Select>
          </FormItem>
        </Row>
        <!-- Todo:选择变化的逻辑看不懂 -->
        <Row>
          <FormItem label="格式" prop="format" >
            <Select 
              v-model="addTemplateForm.format" 
            >
              <Option v-for="item in listClusters" :value="item.id" :key="item.id">{{ item.name }}</Option>
            </Select>
          </FormItem>
        </Row>
        <Row>
          <FormItem label="操作系统类型" prop="osTypeId" >
            <Select 
              v-model="addTemplateForm.osTypeId" 
            >
              <Option v-for="item in listClusters" :value="item.id" :key="item.id">{{ item.name }}</Option>
            </Select>
          </FormItem>
        </Row>
        <Row>
          <FormItem label="可提取" prop="isextractable" >
            <Checkbox 
              v-model="addTemplateForm.isextractable" 
            >
            </Checkbox>
          </FormItem>
        </Row>
        <Row>
          <FormItem label="已启用密码" prop="passwordEnabled" >
            <Checkbox 
              v-model="addTemplateForm.passwordEnabled" 
            >
            </Checkbox>
          </FormItem>
        </Row>
        <Row>
          <FormItem label="可动态扩展" prop="isdynamicallyscalable" >
             <Checkbox 
              v-model="addTemplateForm.isdynamicallyscalable" 
            >
            </Checkbox>
          </FormItem>
        </Row>
        <Row>
          <FormItem label="公用" prop="ispublic" >
             <Checkbox 
              v-model="addTemplateForm.ispublic" 
            >
            </Checkbox>
          </FormItem>
        </Row>
        <Row>
          <FormItem label="精选" prop="isfeatured" >
             <Checkbox 
              v-model="addTemplateForm.isfeatured" 
            >
            </Checkbox>
          </FormItem>
        </Row>
        <Row>
          <FormItem label="正在路由" prop="isrouting" >
             <Checkbox 
              v-model="addTemplateForm.isrouting" 
            >
            </Checkbox>
          </FormItem>
        </Row>
        <Row>
          <FormItem label="HVM" prop="requireshvm" >
             <Checkbox 
              v-model="addTemplateForm.requireshvm" 
            >
            </Checkbox>
          </FormItem>
        </Row>
      </Form>
      <div slot="footer">
          <Button type="ghost" @click="cancel">取消</Button>
          <Button type="success" @click="addTemplate" style="margin-left: 8px">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
export default {
  name: "new-template-modal",
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
      addTemplateForm: {
        name: "",
        displayText: "",
        url: "",
        zoneids: "",
        format: "",
        isextractable: false,
        passwordEnabled: false,
        isdynamicallyscalable: false,
        osTypeId: "",
        hypervisor: "",
        ispublic: false,
        requireshvm: false,
        isfeatured: false,
        isrouting: false
      },
      listZones: [],
      listStorageProviders: [],
      listHosts: [],
      listPods: [],
      listClusters: [],
      listStorageTags: [],
      rules: {
        url: [{ required: true, message: "请输入url", trigger: "blur" }],
        name: [
          { required: true, message: "请输入名称", trigger: "blur" }
        ],
        displayText: [
          {
            required: true,
            message: "请输入说明",
            trigger: "blur"
          }
        ],
        zoneids: [
          { required: true, message: "请选择资源域", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    async addAccount() {
      try {
        const params = Object.assign(
          {
            command: "createTemplate"
          },
          this.addTemplateForm
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
    addTemplate(name) {
      this.$refs["addTemplateForm"].validate(
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
