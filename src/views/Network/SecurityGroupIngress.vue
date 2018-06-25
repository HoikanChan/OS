<template>
  <div class="container">
    <h4>入口规则</h4>
    <h6>Add by:</h6>
    <RadioGroup v-model="addBy">
      <Radio label="CIDR"></Radio>
      <Radio label="Account"></Radio>
    </RadioGroup>
    <section class="table-wrapper">
      <Row type="flex" align="middle" style="height:48px" class="addRow">
        <Col class="edit-row">
        <Row type="flex" justify="center">
          <Select v-model="ingressForm.protocol">
            <Option v-for="item in protocols" :value="item" :key="item">{{ item }}</Option>
          </Select>
          </Input>
        </Row>
        </Col>
        <Col class="edit-row">
        <Row type="flex" justify="center">
          <Input v-model="ingressForm.startport">
          </Input>
        </Row>
        </Col>
        <Col class="edit-row">
        <Row type="flex" justify="center">
          <Input v-model="ingressForm.endport">
          </Input>
        </Row>
        </Col>
        <Col v-if="addBy === 'CIDR'" class="edit-row">
        <Row type="flex" justify="center">
          <Input v-model="ingressForm.cidr">
          </Input>
        </Row>
        </Col>
        <Col v-if="addBy === 'Account'" class="edit-row">
        <Row type="flex" justify="center">
          <Input v-model="ingressForm.account">
          </Input>
        </Row>
        </Col>
        <Col v-if="addBy === 'Account'" class="edit-row">
        <Row type="flex" justify="center">
          <Input v-model="ingressForm.securitygroupname">
          </Input>
        </Row>
        </Col>
        <Col style="width: 170px">
        <Row type="flex" justify="center">
          <Button type="success" @click="addIngress">添加</Button>
        </Row>
        </Col>
      </Row>
      <Table :columns="columns" :data="ingresses" border width="1200"></Table>
    </section>
    <Modal v-model="isTagModalShow" title="规则标签">
      <Row :gutter="8" type="flex" align="middle">
        <Col span="8">
        <Row type="flex" align="middle">
          <Col span="8">密钥</Col>
          <Col span="14">
          <Input v-model="tagForm.key" />
          </Col>
        </Row>
        </Col>
        <Col span="8">
        <Row type="flex" align="middle">
          <Col span="8">值</Col>
          <Col span="14">
          <Input v-model="tagForm.value" />
          </Col>
        </Row>
        </Col>
        <Col span="8">
        <Button type="success" @click="createTag">添加</Button>
        </Col>
      </Row>
      <Row :gutter="16" type="flex" align="middle" class="tags-area">
        <Col v-for="tag in pickedIngress.tags" :key="tag.key">
        <Alert closable>
          <span slot="close" @click="deleteTag(tag)">X</span>
          <strong>{{tag.key}}</strong> = {{tag.value}}
        </Alert>
        </Col>
      </Row>
    </Modal>
  </div>
</template>

<script>
  export default {
    name: "securitygroup-ingress",
    props: {
      ingresses: Array
    },
    data() {
      const actionCol = (h, params) => {
        return h("div", [
          h(
            "Button",
            {
              props: {
                type: "success",
                size: "small"
              },
              style: {
                marginRight: "12px"
              },
              on: {
                click: () => {
                  this.pickedIngress = params.row;
                  this.isTagModalShow = true;
                }
              }
            },
            "编辑"
          ),
          h(
            "Button",
            {
              props: {
                type: "warning",
                size: "small"
              },
              on: {
                click: async () => {
                  await this.deleteIngress(params.row);
                  this.$emit("reload");
                }
              }
            },
            "删除"
          )
        ]);
      }
      return {
        ingressForm: {
          protocol: "TCP",
          startport: "",
          endport: "",
          cidr: "",
          account: "",
          securitygroupname: ""
        },
        isTagModalShow: false,
        addBy: "CIDR",
        tagForm: {
          key: "",
          value: ""
        },
        protocols: ["TCP", "UDP", "ICMP"],
        tags: [],
        pickedIngress: [],
        colCIDR:
          [
            {
              title: "协议",
              key: "protocol",
              align: "center"
            },
            {
              title: "起始端口",
              key: "startport",
              align: "center"
            },
            {
              title: "结束端口",
              key: "endport",
              align: "center"
            },
            {
              title: "CIDR",
              key: "cidr",
              align: "center"
            },
            {
              title: "操作",
              key: "action",
              width: 170,
              align: "center",
              render: actionCol
            }
          ],
        colAccount: [
          {
            title: "协议",
            key: "protocol",
            align: "center"
          },
          {
            title: "起始端口",
            key: "startport",
            align: "center"
          },
          {
            title: "结束端口",
            key: "endport",
            align: "center"
          },
          {
            title: "账户",
            key: "account",
            align: "center"
          },
          {
            title: "安全组",
            key: "securitygroupname",
            align: "center"
          },
          {
            title: "操作",
            key: "action",
            width: 170,
            align: "center",
            render: actionCol
          }
        ]
      };
    },
    computed: {
      columns: function () {
        const col = this.addBy === "CIDR" ? this.colCIDR : this.colAccount;
        if (this.ingressForm.protocol === "ICMP") {
          col[1] = {
            title: "ICMP类型",
            key: "icmptype",
            align: "center"
          }
          col[2] = {
            title: "ICMP代码",
            key: "icmpcode",
            align: "center"
          }
        } else {
          col[1] = {
            title: "起始端口",
            key: "startport",
            align: "center"
          }
          col[2] = {
            title: "结束端口",
            key: "endport",
            align: "center"
          }
        }
        return col
      }
    },
    methods: {
      async createTag() {
        const params = {
          command: "createTags",
          resourceIds: this.pickedIngress.ruleid,
          resourceType: "SecurityGroupRule"
        };
        const keyname = "tags[0].key";
        params[keyname] = this.tagForm.key;
        const valuename = "tags[0].value";
        params[valuename] = this.tagForm.value;
        const { createtagsresponse } = await this.$get(params);
        await this.$queryJobResult(
          createtagsresponse.jobid,
          "成功创建标签"
        );
        this.$emit("reload");
        this.tagForm.key = "";
        this.tagForm.value = "";
      },
      async deleteTag(tag) {
        const params = {
          command: "deleteTags",
          resourceIds: this.pickedIngress.ruleid,
          resourceType: "SecurityGroupRule"
        };
        const keyname = "tags[0].key";
        params[keyname] = tag.key;
        const valuename = "tags[0].value";
        params[valuename] = tag.value;
        const { deletetagsresponse } = await this.$get(params);
        await this.$queryJobResult(
          deletetagsresponse.jobid,
          "成功删除标签"
        );
        this.$emit("reload");
      },
      async deleteIngress(ingress) {
        console.log(ingress);
        const params = {
          command: "revokeSecurityGroupIngress",
          id: ingress.ruleid,
          domainid: this.$store.getters.fetchDataFromStorage('domainId'),
          account: this.$store.getters.fetchDataFromStorage('account')
        };
        const { revokesecuritygroupingressresponse } = await this.$get(params);
        await this.$queryJobResult(
          revokesecuritygroupingressresponse.jobid,
          "成功删除标签"
        );
        this.$emit("reload");
      },
      async addIngress() {
        //检测新增入口规则的信息是否填入
        if (
          (!this.ingressForm.startport || !this.ingressForm.endport || !this.ingressForm.protocol)
          || (this.addBy === "Account" && (!this.ingressForm.account || !this.ingressForm.securitygroupname))
          || (this.addBy === "CIDR" && !this.ingressForm.cidr)
        ) {
          this.$Modal.warning({
            title: "错误",
            content: "都为必填项"
          })
          return;
        }
        const params = {
          command: "authorizeSecurityGroupIngress",
          startport: this.ingressForm.startport,
          endport: this.ingressForm.endport,
          protocol: this.ingressForm.protocol,
          securitygroupid: this.$route.query.id,
          domainid: this.$store.getters.fetchDataFromStorage('domainId'),
          account: this.$store.getters.fetchDataFromStorage('account')
        };

        if (this.addBy === "Account") {
          const keyname = "usersecuritygrouplist[0].account";
          params[keyname] = this.ingressForm.account;
          const valuename = "usersecuritygrouplist[0].group";
          params[valuename] = this.ingressForm.securitygroupname;
        } else {
          params.cidrlist = this.ingressForm.cidr
        }
        const { authorizesecuritygroupingressresponse } = await this.$get(params);
        await this.$queryJobResult(
          authorizesecuritygroupingressresponse.jobid,
          "成功创建入口规则"
        );
        this.$emit("reload");
        this.ingressForm = {
          protocol: "TCP",
          startport: "",
          endport: "",
          cidr: "",
          account: "",
          securitygroupname: ""
        }
      },
    },
    updated() {
      if (this.pickedIngress) {
        this.ingresses.forEach(ingress => {
          if (ingress.ruleid === this.pickedIngress.ruleid) {
            this.pickedIngress = ingress
          }
        })
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/css" scoped>
  .container /deep/ .ivu-table-header {
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


  .tags-area {
    margin: 36px 0 12px;
  }
</style>