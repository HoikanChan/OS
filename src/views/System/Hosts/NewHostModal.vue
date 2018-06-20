<template>
  <div class="templates">
    <!-- 新增群集窗口 -->
    <Modal
      v-model="isModalShow"
      loading
      title="添加提供点"
    > 
      <Form :model="addHostForm"  ref="addHostForm"  :rules="rules" :label-width="80">
        <Row>
          <FormItem label="资源域" prop="zoneid">
            <Select 
              v-model="addHostForm.zoneid" 
            >
              <Option v-for="item in listZones" :value="item.id" :key="item.id">{{ item.name }}</Option>
            </Select>
          </FormItem>
        </Row>
        <Row>
          <FormItem label="提供点" prop="podid">
            <Select 
              v-model="addHostForm.podid" 
            >
              <Option v-for="item in listPods" :value="item.id" :key="item.id">{{ item.name }}</Option>
            </Select>
          </FormItem>
        </Row>
        <Row>
          <FormItem label="群集" prop="clusterid" >
            <Select 
              v-model="addHostForm.clusterid" 
            >
              <Option v-for="item in listClusters" :value="item.id" :key="item.id">{{ item.name }}</Option>
            </Select>
          </FormItem>
        </Row>
        <Row>
          <FormItem label="主机名称" prop="url" >
            <Input  placeholder="请输入主机名称" v-model="addHostForm.url"/>
          </FormItem>
        </Row>
        <Row>
          <FormItem label="用户名" prop="username" >
            <Input  placeholder="请输入用户名" v-model="addHostForm.username"/>
          </FormItem>
        </Row>
        <Row>
          <FormItem label="密码" prop="password" >
            <Input  type="password" placeholder="请输入密码" v-model="addHostForm.password"/>
          </FormItem>
        </Row>
        <Row>
          <FormItem label="专用" prop="domainId" >
            <Checkbox v-model="isExclusive"></Checkbox>
          </FormItem>
        </Row>
        <FormItem label="主机标签" prop="hosttags" >
          <Input  placeholder="请输入主机标签" v-model="addHostForm.hosttags"/>
        </FormItem>
      </Form>
      <Form v-if="isExclusive" :model="accountForm"  ref="accountForm"  :rules="accountRules" :label-width="80">
          <FormItem label="域" prop="dominid" >
            <Select 
              v-model="accountForm.dominid" 
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
  name: "v-newhost-modal",
  props: {
    isModalShow: Boolean
  },
  data() {
    return {
      addHostForm: {
        zoneid: "",
        hostname: "",
        hypervisor: "None",
        clustertype: "CloudManaged",
        podid: "",
        hosttags: "",
        username: "",
        password: "",
        url: ""
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
      listClusters: [],
      rules: {
        zoneid: [{ required: true, message: "请选择区域", trigger: "blur" }],
        podid: [
          { required: true, message: "请输入提供点名称", trigger: "blur" }
        ],
        clusterid: [
          { required: true, message: "请输入群集名称", trigger: "blur" }
        ],
        url: [{ required: true, message: "请输入主机名称", trigger: "blur" }],
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      },
      accountRules: {
        dominId: [{ required: true, message: "请输入域", trigger: "blur" }]
      }
    };
  },
  methods: {
    async addHost() {
      try {
        //加http前缀到主机名称
        this.addHostForm.url = `http://${this.addHostForm.url}`;
        //根据群集，设定hypervisortype
        for (let cluster of this.listClusters) {
          if (cluster.id === this.addHostForm.clusterid) {
            console.log(cluster);
            this.addHostForm.hypervisor = cluster.hypervisortype;
          }
        }
        const params = Object.assign(
          {
            command: "addHost"
          },
          this.addHostForm
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
        this.isModalShow = false;
      } catch (error) {
        console.log("error", error.response.data);
        if (error.response.data.addhostresponse) {
          this.$Modal.error({
            title: "错误",
            content: `<p>${error.response.data.addhostresponse.errortext}</p>`
          });
        }
      }
    },
    ok(name) {
      this.$refs["addHostForm"].validate(
        async function(valid) {
          if (valid) {
            await this.addHost();
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
      //取区域名称
      const listClustersRes = await this.$get({
        command: "listClusters"
      });
      this.listClusters = listClustersRes.listclustersresponse.cluster;
      //取虚拟机管理程序
      const listHypervisorsRes = await this.$get({
        command: "listHypervisors"
      });
      this.listHypervisors =
        listHypervisorsRes.listhypervisorsresponse.hypervisor;
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
