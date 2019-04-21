<template>
<div>
  <p>每个提供点中必须包含一个或多个群集，现在我们将添加第一个群集。群集提供了一种编组主机的方法。群集中的所有主机都具有相同的硬件，运行相同的虚拟机管理程序，位于相同的子网中，并访问相同的共享存储。每个群集由一个或多个主机以及一个或多个主存储服务器组成。</p>
  <div class="container">
   <Form :model="form"  ref="form"  :rules="rules" :label-width="80">
      <Row>
        <FormItem label="虚拟机管理程序:" prop="hypervisor" >
          <Select placeholder="请选择虚拟机管理程序" v-model="form.hypervisor">
            <Option :value="hypervisor">{{hypervisor}}</Option>
          </Select>
        </FormItem>
      </Row>
      <Row>
        <FormItem label="群集名称" prop="clustername">
          <Input placeholder="请输入群集名称" v-model="form.clustername"/>
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
  name: "step4-cluster-form",
  props: {
    hypervisor: String
  },
  data() {
    return {
      form: {
        hypervisor: "",
        clustername: ""
      },
      rules: {
        name: [{ required: true, message: "请输入名称", trigger: "blur" }]
      }
    };
  },
  watch: {
    hypervisor: function(val) {
      console.log(val);
      this.form.hypervisor = val;
    }
  },
  updated() {
    this.form.hypervisor = this.hypervisor;
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
            this.$emit("emitForm", "clusterForm", this.form);
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
  height: 310px;
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
