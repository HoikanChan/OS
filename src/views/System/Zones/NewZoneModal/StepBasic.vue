<template>
  <div>
    <slot name="content">
    </slot>
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
  name: "step-basic",
  data() {
    return {};
  },
  methods: {
    previousStep() {
      this.$emit("prvious");
    },
    cancel() {
      this.$emit("cancel");
    },
    nextStep() {
      this.$emit("next");
    }
  },
  mounted() {}
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