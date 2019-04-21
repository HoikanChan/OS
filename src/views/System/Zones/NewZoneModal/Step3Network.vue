<template>
<div>
    <div class="container" slot="content">
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
import StepBasic from "./StepBasic";

export default {
  name: "step3-network-form",
  components: {
    StepBasic
  },
  data() {
    return {
      form: {},
      hypervisors: "",
      isExclusive: false,
      listDomains: [],

      accountForm: {
        name: "",
        domainid: ""
      },
      rules: {
        hypervisorId: [
          { required: true, message: "请选择虚拟机管理程序", trigger: "blur" }
        ],
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
        dns1: [
          {
            required: true,
            message: "请输入IPv4 DNS1",
            trigger: "blur"
          }
        ],
        internaldns1: [
          { required: true, message: "请输入内部 DNS 1", trigger: "blur" }
        ]
      },
      accountRules: {
        dominId: [{ required: true, message: "请输入域", trigger: "blur" }]
      }
    };
  },
  methods: {
    async fecthHypervisors() {
      const result = (await this.$safeGet({
        command: "listHypervisors",
        listAll: true
      })).listhypervisorsresponse.hypervisor;
      this.hypervisors = result ? result : [];
    },
    previousStep() {
      this.$emit("prvious");
    },
    cancel() {
      this.$emit("cancel");
    },
    nextStep() {
      this.$refs["form"].validate(
        async function(valid) {
          if (valid) {
            this.$emit("next");
            this.$emit("emitForm",'zoneForm',this.form)
            this.$emit("emitForm",'dedicateZoneForm',this.accountForm)
          } 
        }.bind(this)
      );
    }
  },
  async mounted() {
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/css" scoped>
@import "./style.scss";
.container {
  border: solid 1px #999999;
  border-radius: 5px;
  height: 250px;
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
