<template>
	<div class="container">
    <v-breadcrumb/>
		<Tabs :animated="false" style="padding:24px 0">
      <TabPane class="tabs-content" label="详细信息">
				<ClusterInfo margin-top:-24px/>
      </TabPane>
      <TabPane class="tabs-content" label="设置">
        <Searchbar class="projects-search" style="position: absolute;right: 20px;top: 84px;" @search="getCongfigList">
        </Searchbar>
        <Table :columns="columns" :data="listConfigs" border width="1200" style="margin-top:96px"></Table>
      </TabPane>
    </Tabs>
	</div>
</template>

<script>
import ClusterInfo from "./ClusterInfo";
import Searchbar from "@/components/Searchbar";
export default {
  name: "v-cluster-detail",
  components: {
    ClusterInfo,
    Searchbar
  },
  data() {
    return {
      editingRow: null,
      updateVal:"",
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
        }
      ],
      listConfigs: []
    };
  },
  methods: {
    async getCongfigList(keyword) {
      const params = {
        command: "listConfigurations",
        id: this.$route.query.id,
        listAll: true,
        page: 1,
        pagesize: 20
      };
      if (keyword) {
        params.name = keyword;
      }
      const res = await this.$safeGet(params);
      this.listConfigs = res.listconfigurationsresponse.configuration;
    },
    async updateConfig(name) {
      try {
        await this.$get({
          command: "updateConfiguration",
          storageid: this.$route.query.id,
          name: name,
          value: this.updateVal
        });
        this.getCongfigList();
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
      }
    }
  },
  mounted() {
    this.getCongfigList();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/css" scoped>
.container {
  width: 1200px;
  margin: 0 auto;
}
</style>
