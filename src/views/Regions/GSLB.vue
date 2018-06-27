<template>
  <div class="container">
    <Row class="accounts-table" type="flex" justify="center">
      <Col :span="24">
        <Table :columns="columns" :data="gslbList" border width="1200" ></Table>
      </Col>
    </Row>
  </div> 
</template>

<script>
export default {
  name: "v-templates",
  data() {
    return {
      gslbList: [],
      columns: [
        {
          title: "名称",
          key: "name",
          align: "center"
        },
        {
          title: "GSLB域名",
          key: "rolename",
          align: "center"
        },
        {
          title: "算法",
          key: "roletype",
          align: "center"
        },
        {
          title: "操作",
          key: "action",
          width: 120,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.isConfirmModalShow = true;
                      this.accountToDelete = params.row;
                      console.log(this.accountToDelete);
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
    async fecthData() {
      try {
        const res = await this.$http.get("/client/api", {
          params: {
            command: "listGlobalLoadBalancerRules",
            response: "json",
            id: this.$route.query.id
          }
        });
        this.gslbList = res.listgloballoadbalancerrulesresponse;
      } catch (error) {
        console.log(error.response.data);
        this.$message({
          showClose: true,
          message: error.response.data,
          type: "error"
        });
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/css" scoped>
.container {
  width: 1200px;
  margin: 24px auto;
}
</style>
