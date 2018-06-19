<template>
  <div class="templates">
    <!-- 新增群集窗口 -->
    <Modal
      v-model="isModalShow"
      title="添加提供点"
    > 
      <Form :model="addClusterForm"  ref="addClusterForm"  :rules="rules" :label-width="80">
        <Row>
          <FormItem label="区域名称" prop="zoneId">
            <Select 
              v-model="addClusterForm.zoneId" 
            >
              <Option v-for="item in listZones" :value="item.id" :key="item.id">{{ item.name }}</Option>
            </Select>
          </FormItem>
        </Row>
        <Row>
          <FormItem label="虚拟机管理程序" prop="hypervisor" >
            <Select 
              v-model="addClusterForm.hypervisor" 
            >
              <Option v-for="item in listHypervisors" :value="item.name" :key="item.name">{{ item.name }}</Option>
            </Select>
          </FormItem>
        </Row>
        <Row>
          <FormItem label="提供点名称" prop="podId">
            <Select 
              v-model="addClusterForm.podId" 
            >
              <Option v-for="item in listPods" :value="item.id" :key="item.id">{{ item.name }}</Option>
            </Select>
          </FormItem>
        </Row>
        <Row>
          <FormItem label="群集名称" prop="clustername" >
            <Input  placeholder="请输入群集名称" v-model="addClusterForm.clustername"/>
          </FormItem>
        </Row>
        <Row>
          <FormItem label="专用" prop="domainid" >
            <Checkbox v-model="isExclusive"></Checkbox>
          </FormItem>
        </Row>
      </Form>
      <Form v-if="isExclusive" :model="accountForm"  ref="accountForm"  :rules="accountRules" :label-width="80">
          <FormItem label="域" prop="dominId" >
            <Select 
              v-model="accountForm.dominId" 
            >
              <Option v-for="item in listDomains" :value="item.id" :key="item.id">{{ `${item.name}(${item.type})` }}</Option>
            </Select>
          </FormItem>
          <FormItem label="帐户" prop="account" >
            <Input  placeholder="请输入帐户" v-model="accountForm.name"/>
          </FormItem>
      </Form>
      <div slot="footer">
          <Button type="ghost" @click="cancel">取消</Button>
          <Button type="success" @click="ok" style="margin-left: 8px">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
export default {
  name: "v-newcluster-modal",
  props: {
    isModalShow: Boolean
  },
  data() {
    return {
      addClusterForm: {
        zoneId: "",
        clustername: "",
        hypervisor: "",
        clustertype: "CloudManaged",
        podId: ""
      },
      isExclusive: false,
      accountForm: {
        name: "",
        dominId: ""
      },
      listZones: [],
      listDomains: [],
      listHypervisors: [],
      listPods: [],
      rules: {
        zoneId: [{ required: true, message: "请选择区域", trigger: "blur" }],
        clustername: [
          { required: true, message: "请输入群集名称", trigger: "blur" }
        ]
      },
      accountRules: {
        dominId: [{ required: true, message: "请输入域", trigger: "blur" }]
      }
    };
  },
  methods: {
    async addCluster() {
      try {
        const params = Object.assign(
          {
            command: "addCluster"
          },
          this.addClusterForm
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
        if (error.response.data.addclusterresponse) {
          this.$Modal.error({
            title: "错误",
            content: `<p>${
              error.response.data.addclusterresponse.errortext
            }</p>`
          });
        }
      }
    },
    ok(name) {
      this.$refs["addClusterForm"].validate(
        async function(valid) {
          if (valid) {
            await this.addCluster();
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
      //取区域名称
      const listZonesRes = await this.$get({
        command: "listZones"
      });
      this.listZones = listZonesRes.listzonesresponse.zone;
      //取虚拟机管理程序
      const listHypervisorsRes = await this.$get({
        command: "listHypervisors"
      });
      this.listHypervisors = listHypervisorsRes.listhypervisorsresponse.hypervisor;
      //取提供点
      const listPodsRes = await this.$get({
        command: "listPods"
      });
      this.listPods = listPodsRes.listpodsresponse.pod;
      //取域
      const listDomainsRes = await this.$get({
        command: "listDomains"
      });
      this.listDomains = listDomainsRes.listdomainsresponse.domain;
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
