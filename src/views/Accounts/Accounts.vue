<template>
  <div class="accounts">
    <!--账户-->
    <Row class="operation-row">
      <Row class="operation-center-row">
        <Col class="left-operation-row" span="13">
          <ul>
            <li @click="handleClick">
              <div class="icon">
                <img src="../../assets/add_instances_icon.png" alt="">
              </div>
              <span>新增账户</span>
            </li>
          </ul>
        </Col>
        <Col class="right-operation-row" span="11">
          <Row>
            <Col class="search-operation" span="13">
              <input type="text" placeholder="请输入名称关键字" v-model="searchValue" @keydown.enter="fetchData">
              <button class="search-btn" @click.prevent="fetchData">搜索</button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Row>
    <Row class="accounts-table" type="flex" justify="center">
      <Col :span="20">
        <Table :columns="columns" :data="accountsTable" border width="1200" @on-row-click="clickTableRow"></Table>
      </Col>
    </Row>

    <!-- 新建账户窗口 -->
    <v-addAccountModal :isModalShow="isModalShow" @show="show"/>
    
    <!-- 删除确认窗口 -->
    <Modal v-model="isConfirmModalShow" width="360">
        <p slot="header" style="color:#f60;text-align:center">
          <Icon type="information-circled"></Icon>
          <span>删除确认</span>
        </p>
        <div style="text-align:center">
          <p v-if="accountToDelete">确定删除角色:{{accountToDelete.name}}？</p>
        </div>
        <div slot="footer">
          <Button type="error" size="large" long  @click="deleteAccount">删除</Button>
        </div>
    </Modal>
  </div>
</template>

<script>
import AddAccountModal from "./AddAccountModal";
export default {
  name: "v-accounts",
  components: {
    "v-addAccountModal": AddAccountModal
  },
  data() {
    return {
      accountsParam: {
        command: "listAccounts",
        response: "json",
        listAll: "true",
        page: "1",
        pagesize: "-1",
      },
      searchValue: null,
      accountsTable: [],
      isModalShow: false,
      isConfirmModalShow: false,
      accountToDelete: null,
      columns: [
        {
          title: "名称",
          key: "name",
          align: "center"
        },
        {
          title: "角色",
          key: "rolename",
          align: "center"
        },
        {
          title: "角色种类",
          key: "roletype",
          align: "center"
        },
        {
          title: "域",
          key: "domain",
          align: "center"
        },
        {
          title: "状态",
          key: "state",
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
    handleClick() {
      this.isModalShow = true;
    },
    async fetchData() {
      let searchParams = {
        keyword: this.searchValue
      };
      let params = this.searchValue
        ? Object.assign(searchParams, this.accountsParam)
        : this.accountsParam;

      const response = await this.$get(params, "listaccountsresponse");
      console.log(response);
      this.accountsTable = response.listaccountsresponse.account;
    },
    async deleteAccount(rodeId) {
      if (!this.accountToDelete) return;
      try {
        const params = {
          command: "deleteAccount",
          response: "json",
          _: "1521794665536",
          id: this.accountToDelete.id
        };
        await this.$http.get("client/api", {
          params: params
        });
        this.accountToDelete = null;
        this.isConfirmModalShow = false;
        this.fetchData();
      } catch (error) {
        this.handleError(error).bind(this);
      }
    },
    handleError(error) {
      console.log(error.response.data);
      this.$message({
        showClose: true,
        message: error.response.data,
        type: "error"
      });
    },
    show(isShow, isReload) {
      this.isModalShow = isShow;
      if (isReload) {
        this.fetchData();
      }
    },
    clickTableRow(data) {
      this.$router.push({ name: "accountDetail", query: { id: data.id } });
    }
  },
  mounted() {
    this.fetchData();
    // this.accountsTable = [
    //   {
    //     name: 1,
    //     rolename: 1,
    //     roletype: 1,
    //     domain: 1,
    //     state: 1
    //   }
    // ];
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/css" scoped>
.accounts-table {
  margin: 24px 0 36px;
}

</style>
