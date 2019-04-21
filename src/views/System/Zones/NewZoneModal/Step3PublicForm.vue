<template>
<div>
  <p>云中的 VM 访问 Internet 时将生成公共流量，但必须分配可公开访问的 IP 才能实现。最终用户可以使用 CloudStack UI 获取这些 IP，以在其来宾网络与公用网络之间执行 NAT。<br/>请至少为 Internet 流量提供一个 IP 地址范围。</p>
  <section class="table-wrapper">
      <Row type="flex" align="middle" style="height:48px" class="addRow">
        <Col class="edit-row">
        <Row type="flex" justify="center">
          <Input v-model="form.gateway">
          </Input>
          </Input>
        </Row>
        </Col>
        <Col class="edit-row">
        <Row type="flex" justify="center">
          <Input v-model="form.netmask">
          </Input>
        </Row>
        </Col>
        <Col class="edit-row">
        <Row type="flex" justify="center">
          <Input v-model="form.vlan">
          </Input>
        </Row>
        </Col>
        <Col class="edit-row">
        <Row type="flex" justify="center">
          <Input v-model="form.startip">
          </Input>
        </Row>
        </Col>
        <Col  class="edit-row">
        <Row type="flex" justify="center">
          <Input v-model="form.endip">
          </Input>
        </Row>
        </Col>
        <Col style="width: 170px">
        <Row type="flex" justify="center">
          <Button type="success" @click="addItem">添加</Button>
        </Row>
        </Col>
      </Row>
      <Table :columns="columns" :data="forms" border ></Table>
    </section>
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
  name: "step3--public-form",
  data() {
    return {
      form: {
        vlan: "",
        gateway: "",
        netmask: "",
        startip: "",
        endip: ""
      },
      forms: [],
      columns: [
        {
          title: "网关",
          key: "gateway",
          align: "center"
        },
        {
          title: "网络掩码",
          key: "netmask",
          align: "center"
        },
        {
          title: "VLAN/VNI",
          key: "vlan",
          align: "center"
        },
        {
          title: "起始 IP",
          key: "startip",
          align: "center"
        },
        {
          title: "结束 IP",
          key: "endip",
          align: "center"
        },
        {
          title: "操作",
          key: "action",
          width: 170,
          align: "center",
          render: (h, params) =>
            h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  style: {
                    marginRight: "12px"
                  },
                  on: {
                    click: () => {
                      console.log(params.row._index);
                      this.forms = this.forms.filter(
                        (form, index) => index !== params.row._index
                      );
                    }
                  }
                },
                "删除"
              )
            ])
        }
      ]
    };
  },
  methods: {
    addItem() {
      this.forms.push({ ...this.form });
      for (let key in this.form) {
        this.form[key] = "";
      }
    },
    previousStep() {
      this.$emit("previous");
    },
    cancel() {
      this.$emit("cancel");
    },
    nextStep() {
      if (this.forms.length > 0) {
        this.$emit("next");
        this.$emit("emitForm", "publicForms", this.forms);
      } else {
        this.$Modal.error({
          title: "错误",
          content: `<p>请至少添加一个流量范围。</p>`
        });
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/css" scoped>
@import "./style.scss";
.table-wrapper /deep/ .ivu-table-header {
  margin-bottom: 48px;
}

.table-wrapper {
  position: relative;
  margin-top: 16px;
  .addRow {
    position: absolute;
    z-index: 99;
    width: 100%;
    top: 40px;
    border-bottom: 1px solid #e9eaec;
  }
  .edit-row {
    flex: 1;
    padding: 0 24px;
    border-right: 1px solid #e9eaec;
  }
}
</style>
