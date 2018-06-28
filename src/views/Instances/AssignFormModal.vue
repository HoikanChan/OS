<template>
  <div class="container">
    <!-- 新增角色窗口 -->
    <Modal
      v-model="isModalShow"
      :closable="false"
      title="将实例分配给其他账户"
    > 
      <Form :model="form"  ref="form"  :rules="rules" :label-width="100" style="width:84%;margin:0 auto;">
        <Row>
          <FormItem label="Account Type" prop="type" >
            <Select 
              v-model="type" 
            >
              <Option value="Account">Account</Option>
              <Option value="Project">Project</Option>
            </Select>
          </FormItem>
        </Row>
        <Row>
          <FormItem label="域" prop="domainid" >
            <Select 
              v-model="form.domainid" 
            >
              <Option v-for="item in domains" :value="item.id" :key="item.id">{{ item.name}}</Option>
            </Select>
          </FormItem>
        </Row>
        <Row v-if="type==='Account'">
          <FormItem label="账户" prop="account" >
            <Select 
              v-model="form.account" 
            >
              <Option v-for="item in accounts" :value="item.name" :key="item.name">{{ item.name}}</Option>
            </Select>
          </FormItem>
        </Row>
        <Row v-else>
          <FormItem label="项目" prop="projectid" >
            <Select 
              v-model="form.projectid" 
            >
              <Option v-for="item in projects" :value="item.id" :key="item.id">{{ item.name}}</Option>
            </Select>
          </FormItem>
        </Row>
        <Row>
          <FormItem label="网络" prop="networkIds" >
            <Select 
              v-model="form.networkIds" 
            >
              <Option v-for="item in networks" :value="item.id" :key="item.id">{{ item.name}}</Option>
            </Select>
          </FormItem>
        </Row>
        <Row>
          <FormItem label="安全组" prop="securitygroupIds" >
            <Select 
              v-model="form.securitygroupIds" 
            >
              <Option v-for="item in securitygroups" :value="item.id" :key="item.id">{{ item.name}}</Option>
            </Select>
          </FormItem>
        </Row>
      </Form>
      <div slot="footer">
          <Button type="ghost" @click="cancel">取消</Button>
          <Button type="success" @click="addIso" style="margin-left: 8px">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
export default {
  name: "assign-instance-modal",
  props: {
    isModalShow: Boolean,
    zoneId: String
  },
  data() {
    return {
      type: "Account",
      form: {
        domainid: "",
        account: "",
        networkIds: "",
        securitygroupIds: "",
        projectid: ""
      },
      isExclusive: false,
      domains: [],
      accounts: [],
      projects: [],
      zones: [],
      securitygroups: [],
      networks: []
    };
  },
  watch: {
    type: async function(val) {
      this.updateSelect();
    },
    pickedAccount: async function(val) {
      this.updateSelect();
    },
    pickProject: async function(val) {
      this.updateSelect();
    }
  },
  computed: {
    rules: function() {
      const rules = {
        domainid: [{ required: true, message: "请选择资源域", trigger: "blur" }]
      };
      if (this.type === "Account") {
        rules.account = [
          { required: true, message: "请选择账户", trigger: "blur" }
        ];
      } else {
        rules.projectid = [
          { required: true, message: "请选择项目", trigger: "blur" }
        ];
      }
      return rules;
    },
    pickedAccount: function() {
      return this.form.account;
    },
    pickProject: function() {
      return this.form.projectid;
    }
  },
  methods: {
    async updateSelect(val) {
      let networkParams = {
        command: "listNetworks",
        domainId: this.$store.getters.fetchDataFromStorage("domainId"),
        listAll: true,
        isrecursive: false
      };
      let params = {
        command: "listSecurityGroups",
        domainId: this.$store.getters.fetchDataFromStorage("domainId"),
        listAll: true,
        isrecursive: false
      };
      if (this.type === "Account") {
        networkParams.account = this.form.account;
        params.account = this.form.account;
      } else {
        networkParams.projectid = this.form.projectid;
        params.projectid = this.form.projectid;
      }
      const networks = (await this.$safeGet(networkParams)).listnetworksresponse
        .network;
      const result = (await this.$safeGet(params)).listsecuritygroupsresponse
        .securitygroup;
      if (networks) {
        this.networks = networks;
      }
      this.securitygroups = result ? result : [];
    },
    async doAdd() {
      try {
        const params = Object.assign(
          {
            command: "assignVirtualMachine",
            virtualmachineid: this.$route.query.id
          },
          this.form
        );
        if (this.type === "Account") {
          delete params.projectid;
        } else {
          delete params.account;
        }
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
        if (error.response.data.assignvirtualmachineresponse) {
          this.$Modal.error({
            title: "错误",
            content: `<p>${
              error.response.data.assignvirtualmachineresponse.errortext
            }</p>`
          });
        }
      }
    },
    addIso(name) {
      this.$refs["form"].validate(
        async function(valid) {
          if (valid) {
            await this.doAdd();
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
    const zones = (await this.$safeGet({
      command: "listZones",
      id: this.zoneId
    })).listzonesresponse.zone;
    if (zones) {
      this.zones = zones;
    }
    const domains = (await this.$safeGet({
      command: "listDomains",
      listAll: true,
      details: "min"
    })).listdomainsresponse.domain;
    if (domains) {
      this.domains = domains;
    }

    const accounts = (await this.$safeGet({
      command: "listAccounts",
      domainid: this.$store.getters.fetchDataFromStorage("domainId"),
      state: "Enabled",
      listAll: true
    })).listaccountsresponse.account;
    if (accounts) {
      this.accounts = accounts;
    }
    const projects = (await this.$safeGet({
      command: "listProjects",
      domainId: this.$store.getters.fetchDataFromStorage("domainId"),
      state: "Active",
      listAll: true
    })).listprojectsresponse.project;
    if (projects) {
      this.projects = projects;
    }
    this.form.domainid = this.domains[0].id;
    this.form.account = this.accounts[0].name;
    this.form.projectid = this.projects[0].id;
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/css" scoped>
.container /deep/ .ivu-form-item-content {
  width: 70%;
}
</style>
