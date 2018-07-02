<template>
  <!-- 资源信息内容 -->
  <div class="resourse-info-content">
    <!--资源信息-->
    <div class="resourse-row">
      <Table :columns="columns" :data="datas" border width="1200" style="margin-top:96px"></Table>
    </div>
  </div>

</template>

<script>
  export default {
    name: 'v-setting',
    data() {
      return {
        zonescapacityList: [],
        editingRow: null,
        updateVal: "",
        datas: [],
        columns: [
          {
            title: "名称",
            key: "name",
            align: "center"
          },
          {
            title: "说明",
            key: "description",
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
                    style:{
                      textAlign:'center',
                      color:"blue"
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
                          await this.updateConfig({
                            name: params.row.name,
                            value: this.updateVal
                          });
                          await this.getCongfigList();
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
                  )
                ]);
            }
          }]
      }
    },
    methods: {
      async fetchData(id) {
        this.datas = (await this.$safeGet({
          command: 'listConfigurations',
          zoneid: this.$route.query.id,
          listAll: true,
          page: 1,
          pagesize: 20
        })).listconfigurationsresponse.configuration
      },
      async updateConfig({ name }) {
        try {
          await this.$get({
            command: "updateConfiguration",
            zoneid: this.$route.query.id,
            name: name,
            value: this.updateVal
          });
          this.fetchData();
        } catch (error) {
          console.log("error", error.response.data);
          if (error.response.data.updateconfigurationresponse) {
            this.$Modal.error({
              title: "错误",
              content: `<p>${error.response.data.updateconfigurationresponse
                .errortext ||
                `Error:${
                error.response.data.updateconfigurationresponse.errorcode
                }`}</p>`
            });
          }
        } finally {
          this.editingRow = null
        }
      }
    },
    created() {
      this.fetchData();
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/css">
  .ivu-table-wrapper {
    margin: 24px 0 !important;
  }
</style>