<template>
  <div class="container">
    <h4>出口规则</h4>
    <h6>Add by:</h6>
    <RadioGroup v-model="addBy">
      <Radio label="CIDR"></Radio>
      <Radio label="Account"></Radio>
    </RadioGroup>
    <section class="table-wrapper">
      <Row type="flex" align="middle" style="height:48px" class="addRow">
        <Col class="edit-row">
        <Row type="flex" justify="center">
          <Select v-model="egressForm.protocol">
            <Option v-for="item in protocols" :value="item" :key="item">{{ item }}</Option>
          </Select>
          </Input>
        </Row>
        </Col>
        <Col class="edit-row">
        <Row type="flex" justify="center">
          <Input v-model="egressForm.startport">
          </Input>
        </Row>
        </Col>
        <Col class="edit-row">
        <Row type="flex" justify="center">
          <Input v-model="egressForm.endport">
          </Input>
        </Row>
        </Col>
        <Col v-if="addBy === 'CIDR'" class="edit-row">
        <Row type="flex" justify="center">
          <Input v-model="egressForm.cidr">
          </Input>
        </Row>
        </Col>
        <Col v-if="addBy === 'Account'" class="edit-row">
        <Row type="flex" justify="center">
          <Input v-model="egressForm.account">
          </Input>
        </Row>
        </Col>
        <Col v-if="addBy === 'Account'" class="edit-row">
        <Row type="flex" justify="center">
          <Input v-model="egressForm.securitygroupname">
          </Input>
        </Row>
        </Col>
        <Col style="width: 170px">
        <Row type="flex" justify="center">
          <Button type="success" @click="addEgress">添加</Button>
        </Row>
        </Col>
      </Row>
      <Table :columns="columns" :data="egresses" border width="1200"></Table>
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
        <Col v-for="tag in pickedEgress.tags" :key="tag.key">
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
    name: "securitygroup-egress",
    props: {
      egresses: Array
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
                  this.pickedEgress = params.row;
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
                  await this.deleteEgress(params.row);
                  this.$emit("reload");
                }
              }
            },
            "删除"
          )
        ]);
      }
      return {
        egressForm: {
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
        pickedEgress: [],
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
        if (this.egressForm.protocol === "ICMP") {
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
          resourceIds: this.pickedEgress.ruleid,
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
          resourceIds: this.pickedEgress.ruleid,
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
      async deleteEgress(egress) {
        console.log(egress);
        const params = {
          command: "revokeSecurityGroupEgress",
          id: egress.ruleid,
          domainid: this.$store.getters.fetchDataFromStorage('domainId'),
          account: this.$store.getters.fetchDataFromStorage('account')
        };
        const { revokesecuritygroupegressresponse } = await this.$get(params);
        await this.$queryJobResult(
          revokesecuritygroupegressresponse.jobid,
          "成功删除标签"
        );
        this.$emit("reload");
      },
      async addEgress() {
        //检测新增出口规则的信息是否填入
        if (
          (!this.egressForm.startport || !this.egressForm.endport || !this.egressForm.protocol)
          || (this.addBy === "Account" && (!this.egressForm.account || !this.egressForm.securitygroupname))
          || (this.addBy === "CIDR" && !this.egressForm.cidr)
        ) {
          this.$Modal.warning({
            title: "错误",
            content: "都为必填项"
          })
          return;
        }
        const params = {
          command: "authorizeSecurityGroupEgress",
          startport: this.egressForm.startport,
          endport: this.egressForm.endport,
          protocol: this.egressForm.protocol,
          securitygroupid: this.$route.query.id,
          domainid: this.$store.getters.fetchDataFromStorage('domainId'),
          account: this.$store.getters.fetchDataFromStorage('account')
        };

        if (this.addBy === "Account") {
          const keyname = "usersecuritygrouplist[0].account";
          params[keyname] = this.egressForm.account;
          const valuename = "usersecuritygrouplist[0].group";
          params[valuename] = this.egressForm.securitygroupname;
        } else {
          params.cidrlist = this.egressForm.cidr
        }
        const { authorizesecuritygroupegressresponse } = await this.$get(params);
        await this.$queryJobResult(
          authorizesecuritygroupegressresponse.jobid,
          "成功创建出口规则"
        );
        this.$emit("reload");
        this.egressForm = {
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
      if (this.pickedEgress) {
        this.egresses.forEach(egress => {
          if (egress.ruleid === this.pickedEgress.ruleid) {
            this.pickedEgress = egress
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