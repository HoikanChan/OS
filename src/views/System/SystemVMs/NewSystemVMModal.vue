<template>
  <div class="templates">
    <!-- 新增角色窗口 -->
    <Modal
      v-model="isModalShow"
      title="添加提供点"
    > 
      <Form :model="addSystemVMForm"  ref="addSystemVMForm"  :rules="rules" :label-width="80">
        <Row>
          <FormItem label="资源域" prop="zoneId">
            <Select 
              v-model="addSystemVMForm.zoneId" 
            >
              <Option v-for="item in listZones" :value="item.id" :key="item.id">{{ item.name }}</Option>
            </Select>
          </FormItem>
        </Row>
        <Row>
          <FormItem label="提供点名称" prop="name" >
            <Input placeholder="请输入提供点名称" v-model="addSystemVMForm.name"/>
          </FormItem>
        </Row>
        <Row>
          <FormItem label="预留的系统网关" prop="gateway">
            <Input placeholder="请输入预留的系统网关" v-model="addSystemVMForm.gateway"/>
          </FormItem>
        </Row>
        <Row>
          <FormItem label="预留的系统网络掩码" prop="netmask" >
            <Input  placeholder="请输入预留的系统网络掩码" v-model="addSystemVMForm.netmask"/>
          </FormItem>
        </Row>
        <Row>
          <FormItem label="起始预留系统 IP" prop="startIp" >
            <Input  placeholder="请输入起始预留系统 IP" v-model="addSystemVMForm.startIp"/>
          </FormItem>
        </Row>
        <Row>
          <FormItem label="结束预留系统 IP" prop="endIp" >
            <Input  placeholder="请输入结束预留系统 IP" v-model="addSystemVMForm.endIp"/>
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
          <Button type="success" @click="addSystemVM" style="margin-left: 8px">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
export default {
  name: "v-templates",
  props: {
    isModalShow: Boolean
  },
  data() {
    return {
      addSystemVMForm: {
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
      listDomains: [],
      rules: {
        zoneId: [{ required: true, message: "请选择资源域", trigger: "blur" }],
        name: [
          { required: true, message: "请输入提供点名称", trigger: "blur" }
        ],
        netmask: [
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
            command: "createSystemVM"
          },
          this.addSystemVMForm
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
    addSystemVM(name) {
      this.$refs["addSystemVMForm"].validate(
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
