<template>
  <div class="templates">
    <!-- 新增角色窗口 -->
    <Modal
      v-model="isModalShow"
      title="新增账户"
    > 
      <Form :model="addAccountForm"  ref="addAccountForm"  :rules="rules" :label-width="80">
        <Row>
          <FormItem label="名称" prop="username">
            <Input  placeholder="请输入用户名" v-model="addAccountForm.username"/>
          </FormItem>
        </Row>
        <Row>
          <FormItem label="密码" prop="password" >
            <Input  type="password" placeholder="请输入密码" v-model="addAccountForm.password"/>
          </FormItem>
        </Row>
        <Row>
          <FormItem label="确认密码" prop="passwordConfirm">
            <Input  type="password" placeholder="请输入密码" v-model="addAccountForm.passwordConfirm"/>
          </FormItem>
        </Row>
        <Row>
          <FormItem label="电子邮件" prop="email" >
            <Input  placeholder="请输入电子邮件" v-model="addAccountForm.email"/>
          </FormItem>
        </Row>
        <Row>
          <FormItem label="名字" prop="firstname" >
            <Input  placeholder="请输入名字" v-model="addAccountForm.firstname"/>
          </FormItem>
        </Row>
        <Row>
          <FormItem label="姓氏" prop="lastname" >
            <Input  placeholder="请输入姓氏" v-model="addAccountForm.lastname"/>
          </FormItem>
        </Row>
        <Row>
          <FormItem label="域" prop="domainid" >
            <Select 
              v-model="addAccountForm.domainid" 
            >
              <Option v-for="item in listDomains" :value="item.id" :key="item.id">{{ item.name }}</Option>
            </Select>
          </FormItem>
        </Row>
        <Row>
          <FormItem label="账户" prop="account" >
            <Input  placeholder="请输入角色说明" v-model="addAccountForm.account"/>
          </FormItem>
        </Row>
        <Row>
          <FormItem label="角色" prop="roleid" >
            <Select 
              v-model="addAccountForm.roleid" 
            >
              <Option v-for="item in listRoles" :value="item.id" :key="item.id">{{ `${item.name}(${item.type})` }}</Option>
            </Select>
          </FormItem>
        </Row>
        <Row>
          <FormItem label="时区" prop="timezone" >
            <Select 
              v-model="addAccountForm.timezone" 
            >
              <Option v-for="(item, index) in listTimezone" :value="item" :key="index">{{ item }}</Option>
            </Select>
          </FormItem>
        </Row>
        <Row>
          <FormItem label="网络域" prop="networkdomain" >
            <Input  placeholder="请输入角色说明" v-model="addAccountForm.networkdomain"/>
          </FormItem>
        </Row>
      </Form>
      <div slot="footer">
          <Button type="ghost" @click="cancel">取消</Button>
          <Button type="primary" @click="ok" style="margin-left: 8px">确定</Button>
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
    const validatePassCheck = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次确认密码"));
      } else if (value !== this.addAccountForm.password) {
        callback(new Error("两次输入密码不一致"));
      } else {
        callback();
      }
    };
    return {
      httpParam: {
        response: "json",
        _: "1521791056413"
      },
      addAccountForm: {
        username: "",
        email: "",
        firstname: "",
        lastname: "",
        password: "",
        passwordConfirm: "",
        domainid: "",
        account: "",
        roleid: "",
        timezone: "",
        networkdomain: ""
      },
      listDomains: [],
      listRoles: [],
      listTimezone: [
        "America/Adak",
        "Hongkong",
        "Asia/Shanghai",
        "Asia/Taipei",
        "Japan",
        "Europe/Paris",
        "Europe/Rome"
      ],
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        email: [
          { required: true, message: "请输入电子邮件地址", trigger: "blur" },
          { type: "email", message: "邮箱格式不正确", trigger: "blur" }
        ],
        firstname: [{ required: true, message: "请输入名字", trigger: "blur" }],
        lastname: [{ required: true, message: "请输入姓氏", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        passwordConfirm: [{ validator: validatePassCheck, trigger: "blur" }],
        domainid: [{ required: true, message: "请选择域", trigger: "blur" }],
        roleid: [{ required: true, message: "请选择类型", trigger: "blur" }]
      }
    };
  },
  methods: {
    async addAccount() {
      try {
        const params = Object.assign(
          {
            command: "createAccount",
            response: "json",
            _: "1521794665536"
          },
          this.addAccountForm
        );
        for (let key in params) {
          if (
            params.hasOwnProperty(key) &&
            (params[key] == null || params[key] == undefined || params[key] == "")
          ) {
            delete params[key];
          }
        }
        const response = await this.$http.get("client/api", {
          params: params
        });
      } catch (error) {
        console.log("error", error.response.data);
        if (error.response.data.createaccountresponse) {
          this.$Modal.error({
              title: '错误',
              content: `<p>${error.response.data.createaccountresponse.errortext}</p>`
          });
        }
      }
    },
    ok(name) {
      this.$refs["addAccountForm"].validate(async function (valid) {
        if (valid) {
          await this.addAccount();
          this.$emit("show",false ,true);
        } else {
          this.isModalShow = true;
          this.$emit("show", true);
        }
      }.bind(this));
    },
    cancel() {
      this.$emit("show", false);
    }
  },
  async mounted() {
    try {
      const listdomainsRes = await this.$http.get("client/api", {
        params: Object.assign({ command: "listDomains" }, this.httpParam)
      });
      this.listDomains = listdomainsRes.listdomainsresponse.domain;
      const listRolesRes = await this.$http.get("client/api", {
        params: Object.assign({ command: "listRoles" }, this.httpParam)
      });
      this.listRoles = listRolesRes.listrolesresponse.role;
    } catch (error) {
      console.log(error.response.data);
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
