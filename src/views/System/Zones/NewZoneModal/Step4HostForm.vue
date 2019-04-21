<template>
<div>
  <p>每个群集中必须至少包含一个主机以供来宾 VM 在上面运行，现在我们将添加第一个主机。要使主机在 CloudStack 中运行，必须在此主机上安装虚拟机管理程序软件，为其分配一个 IP 地址，并确保将其连接到 CloudStack 管理服务器。<br/><br/>请提供主机的 DNS 或 IP 地址、用户名(通常为 root)和密码，以及用于对主机进行分类的任何标签。</p>
  <div class="container">
   <Form :model="form"  ref="form"  :rules="rules" :label-width="80">
        <FormItem label="主机名称:" prop="name" >
          <Input placeholder="请输入名称" v-model="form.name"/>
          </Input>
        </FormItem>
        <FormItem label="用户名" prop="username">
          <Input placeholder="请输入用户名" v-model="form.username"/>
        </FormItem>
        <FormItem label="密码" prop="password">
          <Input type="password" placeholder="请输入密码" v-model="form.password"/>
        </FormItem>
        <FormItem label="主机标签" prop="hosttags">
          <Input placeholder="请输入主机标签" v-model="form.hosttags"/>
        </FormItem>
    </Form>
  </div>
  <div class="modal-footer">
      <div class="modal-footer-left">
        <div class="btn previous-step-btn" @click="previousStep">上一步</div>
      </div>
      <div class="modal-footer-right">
        <div class="btn cancel-btn" @click="cancel">取消</div>
        <div class="btn next-step-btn" @click="nextStep">下一步</div>
      </div>
    </div>
</div>
</template>

<script>
export default {
  name: "step4-host-form",
  data() {
    return {
      form: {
        username: "",
        name: "",
        password: "",
        hosttags: ""
      },
      rules: {
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
      }
    };
  },
  methods: {
    previousStep() {
      this.$emit("previous");
    },
    cancel() {
      this.$emit("cancel");
    },
    nextStep() {
      this.$refs["form"].validate(
        async function(valid) {
          if (valid) {
            this.$emit("next");
            this.$emit("emitForm", "hostForm", this.form);
          }
        }.bind(this)
      );
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/css" scoped>
@import "./style.scss";
.container {
  border: solid 1px #999999;
  border-radius: 5px;
  overflow-y: auto;
}
.ivu-form-item {
  display: flex;
  align-items: center;
  justify-content: center;
  .ivu-form-item-label {
    text-align: center;
  }
}
.container /deep/ .ivu-form-item-content {
  width: 50%;
  margin: 12px 0;
}
</style>
