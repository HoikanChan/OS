<template>
<div>
  <p>来宾网络流量是指最终用户虚拟机之间的通信。应指定一个 CloudStack 可以分配给来宾 VM 的 IP 地址范围。请确保此范围与预留的系统 IP 范围不重叠。</p>
  <div class="container">
   <Form :model="form"  ref="form"  :rules="rules" :label-width="80">
      <Row>
        <FormItem label="来宾网关" prop="gateway" >
          <Input placeholder="请输入提供点名称" v-model="form.gateway"/>
        </FormItem>
      </Row>
      <Row>
        <FormItem label="来宾网络掩码" prop="netmask">
          <Input placeholder="请输入预留的系统网关" v-model="form.netmask"/>
        </FormItem>
      </Row>
      <Row>
        <FormItem label="来宾起始 IP" prop="startip" >
          <Input  placeholder="请输入预留的系统网络掩码" v-model="form.startip"/>
        </FormItem>
      </Row>
      <Row>
        <FormItem label="来宾结束 IP" prop="endip" >
          <Input  placeholder="请输入起始预留系统 IP" v-model="form.endip"/>
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
  name: "step3-guest-form",
  data() {
    return {
      form: {
        zoneId: "",
        name: "",
        gateway: "",
        netmask: "",
        startIp: "",
        endIp: ""
      },
      rules: {}
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
            this.$emit("emitForm", "guestForm", this.form);
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
