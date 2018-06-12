<template>
  <div>
    <!--模板-->
    <Row class="operation-row">
      <Row class="operation-center-row">
        <Col class="left-operation-row" span="13">
          <ul>
            <li @click="toggleAddPortableIp">
              <div class="icon">
                <img src="../../assets/add_instances_icon.png" alt="">
              </div>
              <span>添加可移植IP范围</span>
            </li>
          </ul>
        </Col>
        
        <!-- TODO:搜索APi缺失 -->
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
    <div class="container">
      <v-breadcrumb></v-breadcrumb>
      <Row class="accounts-table" type="flex" justify="center">
        <Col :span="24">
          <Table :columns="columns" :data="portableIpList" border width="1200" ></Table>
        </Col>
      </Row>
    </div>
    <Modal
      v-model="isAddModalShow"
      title="新增账户"
    > 
      <Form :model="newPortableForm"  ref="newPortableForm"  :rules="rules" :label-width="80">
        <Row>
          <FormItem label="起始IP" prop="startip">
            <Input  placeholder="请输入起始IP" v-model="newPortableForm.startip"/>
          </FormItem>
        </Row>
        <Row>
          <FormItem label="结束IP" prop="endip" >
            <Input  placeholder="请输入结束IP" v-model="newPortableForm.endip"/>
          </FormItem>
        </Row>
        <Row>
          <FormItem label="网关" prop="gateway" >
            <Input  placeholder="请输入网关" v-model="newPortableForm.gateway"/>
          </FormItem>
        </Row>
        <Row>
          <FormItem label="网络掩码" prop="netmask" >
            <Input  placeholder="请输入网络掩码" v-model="newPortableForm.netmask"/>
          </FormItem>
        </Row>
        <Row>
          <FormItem label="VLAN/VNI" prop="vlan" >
            <Input  placeholder="请输入VLAN/VNI" v-model="newPortableForm.vlan"/>
          </FormItem>
        </Row>
      </Form>
      <div slot="footer">
          <Button type="ghost" @click="toggleAddPortableIp">取消</Button>
          <Button type="success" @click="addPortableIp" style="margin-left: 8px">确定</Button>
      </div>
    </Modal>

    <!-- 删除确认窗口 -->
    <Modal v-model="isConfirmModalShow" width="360">
        <p slot="header" style="color:#f60;text-align:center">
          <Icon type="information-circled"></Icon>
          <span>删除确认</span>
        </p>
        <div style="text-align:center">
          <p v-if="portableIpTodelete">请确认您确实要删除可移植 IP 范围</p>
        </div>
        <div slot="footer">
          <Button type="error" size="large" long  @click="deletePortableIp">删除</Button>
        </div>
    </Modal>
  </div>
</template>

<script>
export default {
  name: "v-templates",
  data() {
    return {
      portableIpList: [],
      searchValue: "",
      newPortableForm: {
        startip: "",
        endip: "",
        gateway: "",
        netmask: "",
        vlan: ""
      },
      portableIpTodelete: {},
      isAddModalShow: false,
      isConfirmModalShow: false,
      columns: [
        {
          title: "起始IP",
          key: "startip",
          align: "center"
        },
        {
          title: "结束IP",
          key: "endip",
          align: "center"
        },
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
                      this.portableIpTodelete = params.row;
                      this.isConfirmModalShow = true;
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
        startip: [{ required: true, message: "请输入起始IP", trigger: "blur" }],
        endip: [{ required: true, message: "请输入结束IP", trigger: "blur" }],
        gateway: [{ required: true, message: "请输入网关", trigger: "blur" }],
        netmask: [
          { required: true, message: "请输入网络掩码", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    async fecthData() {
      let params = {
        command: "listPortableIpRanges",
        regionid: this.$route.params.id,
        response: "json"
      };
      try {
        const res = await this.$http.get("/client/api", {
          params: params
        });
        this.portableIpList = res.listportableipresponse.portableiprange;
      } catch (error) {
        console.log(error.response.data);
        this.$message({
          showClose: true,
          message: error.response.data,
          type: "error"
        });
      }
    },
    toggleAddPortableIp() {
      this.isAddModalShow = !this.isAddModalShow;
    },
    async addPortableIp() {
      console.log(this.newPortableForm);
      if (
        this.newPortableForm.vlan === undefined ||
        this.newPortableForm.vlan === ""
      ) {
        delete this.newPortableForm.vlan;
      }
      try {
        const res = await this.$http.get("/client/api", {
          params: Object.assign(
            {
              command: "createPortableIpRange",
              response: "json",
              regionid: this.$route.params.id
            },
            this.newPortableForm
          )
        });
        this.toggleAddPortableIp();
        this.fecthData();
      } catch (error) {
        console.log(error.response.data);
      }
    },
    async deletePortableIp() {
      try {
        const res = await this.$http.get("/client/api", {
          params: {
            command: "deletePortableIpRange",
            response: "json",
            id: this.portableIpTodelete.id
          }
        });
        this.isConfirmModalShow = false;
        this.fecthData();
      } catch (error) {
        console.log(error.response.data);
      }
    }
  },
  mounted() {
    this.fecthData();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/css" scoped>
.container {
  width: 1200px;
  margin: 24px auto;
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
