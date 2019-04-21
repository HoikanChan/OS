<template>
  <step-basic @cancel="cancel" @next="nextStep" @previous="previousStep">
    <!--选择资源-->
    <div class="choice-resrouce" slot="content">
      <h6>设置资源域类型</h6>
      <p>请为您的资源域选择一种配置。</p>
      <RadioGroup v-model="zoneType" vertical size="large">
        <div class="option-box">
          <Row type="flex" align="middle">
            <Col span="2">
            <Radio label="Basic">
              <p></p>
            </Radio>
            </Col>
            <Col span="20">
            <div class="option-content">
              <h2>基本</h2>
              <p class="option-desc">
                提供一个网络，将直接从此网络中为每个 VM 实例分配一个 IP。可以通过安全组等第 3 层方式提供来宾隔离(IP 地址源过滤)。
              </p>
            </div>
            </Col>
          </Row>
        </div>
        <div class="option-box">
          <Row type="flex" align="middle">
            <Col span="2">
            <Radio label="Premium">
              <p></p>
            </Radio>
            </Col>
            <Col span="20">
            <div class="option-content">
              <h2>高级</h2>
              <p class="option-desc">
                适用于更加复杂的网络拓扑。此网络模式在定义来宾网络并提供防火墙、VPN 或负载平衡器支持等自定义网络方案方面提供了最大的灵活性。
              </p>
            </div>
            </Col>
          </Row>
          <Row>
            <div class="premium-desc" :class="{disable:isDisable}">
              <h3>隔离模式</h3>
              <Row type="flex" align="middle">
                <Col span="2">
                <Checkbox label="premium" margin="0 auto" :disabled="isDisable">
                </Checkbox>
                </Col>
                <Col span="20">
                <div class="option-content">
                  <h3>安全组</h3>
                  <p class="option-desc">
                    如果要使用安全组提供来宾 VM 隔离，请选择此模式。
                  </p>
                </div>
                </Col>
              </Row>
            </div>
          </Row>
        </div>
      </RadioGroup>
    </div>
  </step-basic>
</template>

<script>
  import StepBasic from "./StepBasic";
  export default {
    name: "step1-form",
    components: {
      StepBasic
    },
    data() {
      return {
        zoneType: "Basic",
      };
    },
    methods: {
      previousStep() {
        this.$emit("prvious");
      },
      cancel() {
        this.$emit("cancel");
      },
      nextStep() {
        this.$emit("emitForm", "zoneType", this.zoneType)
        this.$emit("next");
      }
    },
    computed: {
      isDisable: function () {
        return this.zoneType === "Basic";
      }
    },
    mounted() {
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
    margin: 8px 0;
  }

  .option-box {
    border: solid 1px #999999;
    border-radius: 5px;
    padding: 12px;
    display: flex;
    flex-direction: column;
    margin: 16px 0;
    .ivu-radio-wrapper {
      white-space: white-space;
    }
    .premium-desc {
      width: 100%;
      h3 {
        width: 64px;
        margin-left: 24px;
      }
      >h3 {
        margin: 12px;
      }
      .ivu-checkbox-wrapper {
        margin: 0 24px;
      }
    }
    .disable {
      color: #bbbec4;
    }
    .option-content {
      display: flex;
      align-items: center;
      .option-desc {
        display: inline-block;
        margin-left: 24px;
        flex: 1 1 auto;
      }
      h2 {
        font-size: 1.2em;
        width: 118px;
        padding: 18px;
      }
      div {
        float: 1 1 auto;
      }
    }
  }
</style>