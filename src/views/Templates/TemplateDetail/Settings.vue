<template>
<div>
  <Row class="operation-row" style="border:none;background:none;">
    <Row class="operation-center-row dark">
      <Col class="left-operation-row" span="13">
        <ul>
          <li @click="isAddModalShow =true">
            <div class="icon icon-dark" >
              <img src="@/assets/add_instances_icon.png" alt="" @click="isEditing = !isEditing">
            </div>
            <span>添加设置</span>
          </li>
        </ul>
      </Col>
    </Row>
  </Row>
  <Table :columns="columns" :data="datas" border width="1200" style="margin-bottom:24px;"></Table>
  <Modal @on-ok="deleteSettings" v-model="isDeleteModalShow" title="确认">
    <p style="margin:24px 0">删除设置</p>
  </Modal>
  <Modal @on-ok="addSettings" v-model="isAddModalShow" title="确认">
    <Form :model="form"  ref="form"  :rules="rules" :label-width="80">
      <Row>
        <FormItem label="名称" prop="key">
          <Input 
            v-model="form.key" 
          >
          </Input>
        </FormItem>
      </Row>
      <Row>
        <FormItem label="值" prop="value">
          <Input 
            v-model="form.value" 
          >
          </Input>
        </FormItem>
      </Row>
    </Form>
  </Modal>
</div>
</template>
<script>
export default {
  name: "v-template-settings",
  props: {
    detail: {
      type: Object,
      required: true
    }
  },
  computed: {
    datas: function() {
      const datas = [];
      for (let key in this.detail) {
        datas.push({
          key: key,
          value: this.detail[key]
        });
      }
      return datas;
    }
  },
  data() {
    return {
      isDeleteModalShow: false,
      isAddModalShow: false,
      editingRow: null,
      updateVal: "",
      form: {
        key: "",
        value: ""
      },
      rules: {
        key: [{ required: true, message: "请输入名称", trigger: "blur" }],
        value: [{ required: true, message: "请输入值", trigger: "blur" }]
      },
      columns: [
        {
          title: "名称",
          key: "key",
          align: "center"
        },
        {
          title: "值",
          key: "value",
          align: "center",
          render: (h, params) => {
            return params.index === this.editingRow
              ? h("div", [
                  h("Input", {
                    props: {
                      value: params.row.value
                    },
                    style: {
                      width: "50%",
                      margin: "0 auto"
                    },
                    on: {
                      keyup: () => {
                        console.log("enter");
                      },
                      input: val => {
                        this.updateVal = val;
                      }
                    }
                  })
                ])
              : h("p", params.row.value);
          }
        },
        {
          title: "操作",
          key: "action",
          width: 170,
          align: "center",
          render: (h, params) => {
            return params.index === this.editingRow
              ? h("div", [
                  h(
                    "Button",
                    {
                      props: {
                        type: "ghost",
                        size: "small"
                      },
                      style: {
                        marginRight: "12px"
                      },
                      on: {
                        click: () => {
                          this.editingRow = null;
                        }
                      }
                    },
                    "取消"
                  ),
                  h(
                    "Button",
                    {
                      props: {
                        type: "success",
                        size: "small"
                      },
                      on: {
                        click: async () => {
                          await this.updateSettings({
                            key: params.row.key,
                            value: this.updateVal
                          });
                          this.editingRow = null;
                        }
                      }
                    },
                    "确定"
                  )
                ])
              : h("div", [
                  h(
                    "Button",
                    {
                      props: {
                        type: "success",
                        size: "small"
                      },
                      on: {
                        click: () => {
                          this.editingRow = params.index;
                        }
                      }
                    },
                    "编辑"
                  ),
                  h(
                    "Button",
                    {
                      props: {
                        type: "error",
                        size: "small"
                      },
                      style: {
                        marginLeft: "12px"
                      },
                      on: {
                        click: () => {
                          this.toDeleteRow = params.row;
                          this.isDeleteModalShow = true;
                        }
                      }
                    },
                    "删除"
                  )
                ]);
          }
        }
      ]
    };
  },
  methods: {
    async deleteSettings() {
      console.log(this.toDeleteRow);
      await this.$safeGet({
        command: "updateTemplate",
        id: this.$route.query.id,
        cleanupdetails: true
      });
      this.$emit("fetchData");
    },
    async updateSettings({ key, value }) {
      const params = {
        command: "updateTemplate",
        id: this.$route.query.id
      };
      this.datas.forEach(d => {
        params[`details[0].${d.key}`] = d.value;
      });
      params[`details[0].${key}`] = value;
      await this.$safeGet(params);
      this.$emit("fetchData");
    },
    async addSettings() {
      this.updateSettings(this.form);
      this.form.key = "";
      this.form.value = "";
    }
  },
  mounted() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/css" scoped>
.ivu-input-wrapper {
  width: 70%;
}
</style>
