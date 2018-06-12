<template>
  <div class="roles">
    <!--角色-->
    <!-- <Row>
      <Col :span="4"><el-button type="primary">添加按钮</el-button></Col>
    </Row> -->
    <Row class="operation-row">
      <Row class="operation-center-row">
        <Col class="left-operation-row" span="13">
          <ul>
            <li @click="click">
              <div class="icon">
                <img src="../../assets/add_instances_icon.png" alt="">
              </div>
              <span>新增角色</span>
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
    <Row class="role-table" type="flex" justify="center">
      <Col :span="20">
        <Table :columns="columns" :data="rolesTable" border width="1200"></Table>
      </Col>
    </Row>

    <!-- 新增角色窗口 -->
    <Modal
      v-model="isModalShow"
      title="新增角色"
    > 
      <Form :model="addRoleForm" :rules="rules" ref="addRoleForm"  :label-width="50">
        <Row>
          <FormItem label="名称" prop="name">
            <Input  placeholder="请输入用户名" v-model="addRoleForm.name"/>
          </FormItem>
        </Row>
        <Row>
          <FormItem label="类型"  prop="type">
            <Select 
              v-model="addRoleForm.type" 
            >
              <Option v-for="item in roleList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </FormItem>
        </Row>
        <Row>
          <FormItem label="说明" prop="desc" >
            <Input  placeholder="请输入角色说明" v-model="addRoleForm.description" type="textarea" :autosize="{minRows: 2,maxRows: 5}"/>
          </FormItem>
        </Row>
      </Form>
      <div slot="footer">
          <Button type="ghost" @click="cancel">取消</Button>
          <Button type="primary" @click="ok" style="margin-left: 8px">确定</Button>
      </div>
    </Modal>

    <!-- 删除确认窗口 -->
    <Modal v-model="isConfirmModalShow" width="360">
        <p slot="header" style="color:#f60;text-align:center">
          <Icon type="information-circled"></Icon>
          <span>删除确认</span>
        </p>
        <div style="text-align:center">
          <p v-if="roleToDelete">确定删除角色:{{roleToDelete.name}}？</p>
        </div>
        <div slot="footer">
          <Button type="error" size="large" long  @click="deleteRole">删除</Button>
        </div>
    </Modal>
  </div>
</template>

<script>
export default {
  name: "v-roles",
  data() {
    return {
      roleList: [
        {
          value: "Admin",
          label: "Admin"
        },
        {
          value: "User",
          label: "User"
        },
        {
          value: "DomainAdmin",
          label: "Domain Admin"
        }
      ],
      addRoleForm: {
        name: "",
        description: "",
        type: ""
      },
      roleToDelete: null,
      rolesParam: {
        command: "listRoles",
        response: "json",
        _: "1521794665536"
      },
      isModalShow: false,
      isConfirmModalShow: false,
      rolesTable: [],
      rolesCount: 0,
      searchValue: null,
      columns: [
        {
          title: "名称",
          key: "name",
          align: "center"
        },
        {
          title: "类型",
          key: "type",
          align: "center"
        },
        {
          title: "说明",
          key: "description",
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
                      this.roleToDelete = params.row;
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      rules: {
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
        type: [{ required: true, message: "请选择类型", trigger: "blur" }]
      }
    };
  },
  methods: {
    async fetchData() {
      let searchParams = {
        name: this.searchValue
      };
      let params = this.searchValue
        ? Object.assign(searchParams, this.rolesParam)
        : this.rolesParam;
      try {
        const response = await this.$http.get("client/api", {
          params: params
        });
        this.rolesTable = response.listrolesresponse.role;
        this.rolesCount = response.listrolesresponse.count;
      } catch (error) {
        this.handleError(error).bind(this);
      }
    },
    async deleteRole(rodeId) {
      if (!this.roleToDelete) return;
      try {
        const params = {
          command: "deleteRole",
          response: "json",
          _: "1521794665536",
          id: this.roleToDelete.id
        };
        await this.$http.get("client/api", {
          params: params
        });
        this.roleToDelete = null;
        this.isConfirmModalShow = false;
        this.fetchData();
      } catch (error) {
        this.handleError(error).bind(this);
      }
    },
    async addRole() {
      try {
        const params = Object.assign(
          {
            command: "createRole",
            response: "json",
            _: "1521794665536"
          },
          this.addRoleForm
        );
        await this.$http.get("client/api", {
          params: params
        });
        this.fetchData();
      } catch (error) {
        this.handleError(error).bind(this);
      }
    },
    ok(name) {
      this.$refs["addRoleForm"].validate(valid => {
        if (valid) {
          this.isModalShow = false;
          this.addRole();
        } else {
          this.isModalShow = true;
        }
      });
    },
    cancel() {
      this.isModalShow = true;
    },
    click() {
      this.isModalShow = true;
    },
    handleError(error) {
      console.log(error.response.data);
      this.$message({
        showClose: true,
        message: error.response.data,
        type: "error"
      });
    }
  },
  mounted() {
    this.fetchData();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/css" scoped>
.formItem {
  margin: 12px 0;
}
.role-table {
  margin: 24px 0 36px;
}
.operation-row {
  height: 93px;
  border-bottom: 1px solid #e2e2e2;
  background-color: #f6f6f6;
  .operation-center-row {
    width: 1200px;
    margin: 0 auto;
    .left-operation-row {
      width: 610px;
      ul {
        li {
          float: left;
          margin: 8px 33px 0;
          padding-bottom: 6px;
          list-style: none;
          position: relative;
          cursor: pointer;
          .icon {
            width: 53px;
            height: 53px;
            line-height: 53px;
            border-radius: 50%;
            background-color: #fff;
            text-align: center;
            img {
              vertical-align: middle;
            }
          }
          span {
            position: absolute;
            white-space: nowrap;
            left: 50%;
            bottom: -14px;
            transform: translateX(-50%);
          }
        }
      }
    }
    .right-operation-row {
      width: 590px;
      padding-top: 32px;
      .select-operation {
        width: 150px;
      }
      .search-operation {
        width: 440px;
        input {
          padding-left: 15px;
          width: 326px;
          height: 30px;
          line-height: 28px;
          border: 1px solid #bdbdbd;
          border-radius: 3px;
        }
        button {
          width: 103px;
          height: 30px;
          line-height: 28px;
          margin-left: 5px;
          text-align: center;
          color: #fff;
          background-color: #51e299;
          border: 1px solid #51e299;
          border-radius: 3px;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
