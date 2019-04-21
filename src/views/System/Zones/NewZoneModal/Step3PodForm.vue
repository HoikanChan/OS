<template>
<div>
  <p>提供点来宾流量每个资源域中必须包含一个或多个提供点，现在我们将添加第一个提供点。提供点中包含主机和主存储服务器，您将在随后的某个步骤中添加这些主机和服务器。首先，请为 CloudStack 的内部管理流量配置一个预留 IP 地址范围。预留的 IP 范围对云中的每个资源域来说必须唯一。</p>
  <div class="container">
   <Form :model="addPodForm"  ref="addPodForm"  :rules="rules" :label-width="80">
      <Row>
        <FormItem label="提供点名称" prop="name" >
          <Input placeholder="请输入提供点名称" v-model="addPodForm.name"/>
        </FormItem>
      </Row>
      <Row>
        <FormItem label="预留的系统网关" prop="gateway">
          <Input placeholder="请输入预留的系统网关" v-model="addPodForm.gateway"/>
        </FormItem>
      </Row>
      <Row>
        <FormItem label="预留的系统网络掩码" prop="netmask" >
          <Input  placeholder="请输入预留的系统网络掩码" v-model="addPodForm.netmask"/>
        </FormItem>
      </Row>
      <Row>
        <FormItem label="起始预留系统 IP" prop="startIp" >
          <Input  placeholder="请输入起始预留系统 IP" v-model="addPodForm.startIp"/>
        </FormItem>
      </Row>
      <Row>
        <FormItem label="结束预留系统 IP" prop="endIp" >
          <Input  placeholder="请输入结束预留系统 IP" v-model="addPodForm.endIp"/>
        </FormItem>
      </Row>
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
  name: "step3-pod-form",
  data() {
    return {
      addPodForm: {
        zoneId: "",
        name: "",
        gateway: "",
        netmask: "",
        startIp: "",
        endIp: ""
      },
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
      this.$refs["addPodForm"].validate(
        async function(valid) {
          if (valid) {
            this.$emit("next");
            this.$emit("emitForm", "podForm", this.addPodForm);
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
  padding: 12px;
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
