<template>
  <div class="templates">
    <Form v-if="!checkMode" class="form" :model="addAccountForm"  ref="addAccountForm"  :rules="addAccountRules" :label-width="80" inline>
      <FormItem label="添加账户" prop="account">
        <Input  placeholder="请输入要添加账户的账户名" v-model="addAccountForm.account"/>
      </FormItem>
      <FormItem>
        <Button type="success" @click="addAccount">添加</Button>
      </FormItem>
    </Form>
    <Table v-if="!checkMode" :columns="columns" :data="projectAccounts" :loading="tableLoading" border />
    <Table v-if="checkMode" :columns="accountColumns" :data="projectAccounts" :loading="tableLoading" border />
  </div>
</template>

<script>
export default {
  name: "ProjectAccount",
  props: {
    projectId: String,
    checkMode: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      tableLoading: false,
      projectAccounts: [],
      addAccountRules: {
        account: [{ required: true, message: "不能为空", trigger: "blur" }]
      },
      addAccountForm: {
        account: ""
      },
      accountColumns: [
        {
          title: "账户",
          key: "account",
          align: "center"
        }
      ],
      columns: [
        {
          title: "账户",
          key: "account",
          align: "center"
        },
        {
          title: "角色",
          key: "role",
          align: "center"
        },
        {
          title: "操作",
          key: "action",
          width: 200,
          align: "center",
          render: (h, params) => {
            const col =
              params.row.role !== "Admin"
                ? h("div", [
                    h(
                      "Button",
                      {
                        props: {
                          type: "error",
                          size: "small"
                        },
                        style: {
                          margin: "0 8px"
                        },
                        on: {
                          click: () => {
                            this.deleteAccount(params.row.account);
                          }
                        }
                      },
                      "删除"
                    ),
                    h(
                      "Button",
                      {
                        props: {
                          type: "success",
                          size: "small"
                        },
                        on: {
                          click: () => {
                            this.updateProject(params.row.account);
                          }
                        }
                      },
                      "设为管理员"
                    )
                  ])
                : h("div");
            return col;
          }
        }
      ]
    };
  },
  methods: {
    async listAccounts() {
      try {
        const response = await this.$http.get("client/api", {
          params: {
            command: "listProjectAccounts",
            response: "json",
            projectId: this.projectId
          }
        });
        this.projectAccounts =
          response.listprojectaccountsresponse.projectaccount;
      } catch (error) {
        this.handleError(error, "listprojectaccountsresponse");
      }
    },
    async addAccount() {
      try {
        this.tableLoading = true;
        const response = await this.$http.get("client/api", {
          params: {
            command: "addAccountToProject",
            response: "json",
            account: this.addAccountForm.account,
            projectId: this.projectId
          }
        });
        this.addAccountForm.account = "";
        setTimeout(() => {
          this.tableLoading = false;
          this.listAccounts();
        }, 1000);
      } catch (error) {
        this.handleError(error);
      }
    },
    async deleteAccount(account) {
      try {
        const response = await this.$http.get("client/api", {
          params: {
            command: "deleteAccountFromProject",
            response: "json",
            account: account,
            projectId: this.projectId
          }
        });
        this.listAccounts();
      } catch (error) {
        this.handleError(error);
      }
    },
    async updateProject(account) {
      try {
        const response = await this.$http.get("client/api", {
          params: {
            command: "updateProject",
            response: "json",
            account: account,
            id: this.projectId
          }
        });
        this.tableLoading = true;
        setTimeout(() => {
          this.tableLoading = false;
          this.listAccounts();
        }, 1000);
      } catch (error) {
        this.handleError(error);
      }
    },
    handleError(resName) {
      console.log("error", error.response.data);
      if (error.response.data[resName]) {
        this.$Modal.error({
          title: "错误",
          content: `<p>${error.response.data[resName].errortext}</p>`
        });
      }
    }
  },
  mounted() {
    this.listAccounts();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/css" scoped>
.form {
  display: flex;
  justify-content: center;
}
</style>
