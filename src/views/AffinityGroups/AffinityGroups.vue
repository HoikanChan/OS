<template>
  <!-- 关联性组 -->
  <div id="affinityGroups">
    <div class="affinityGroups-heander">
      <div class="system-capacity-content">
        <Row>
          <Col span="6">
          <div class="relavance-box">
            <div class="relevance_add" @click="openDialog">
              <i class="relevance_add_icon"></i>
            </div>
            <p class="addP" @click="openDialog">新增关联性组</p>
          </div>
          </Col>
          <Col span="18">
          <div class="relevance-search">
            <Input placeholder="large size" id="serachInput" v-model="searchVal" @keydown.enter="searchData"></Input>
            <button @click.prevent="searchData">搜索</button>
          </div>
          </Col>
        </Row>
      </div>
    </div>
    <div class="data-list-row">
      <ul>
        <li class="relavance-item" v-for="(item, index) in relCapacityList" :key="item.name" @mouseenter="showHoverInfo" @mouseleave="hideHoverInfo" @click="view(item)">
          <div class="default-show">
            <div class="item-icon"></div>
            <div class="item-info">
              <p>名称：{{item.name}}</p>
              <p>类型：{{item.type}}</p>
              <p>组ID：{{item.id}}</p>
              <p v-if="item.description">说明：{{item.description}}</p>
              <p v-else>说明：</p>
            </div>
          </div>
          <div class="hover-show">
            <div class="item-info">
              <p>名称：{{item.name}}</p>
              <p>说明：{{item.description}}</p>
              <p>类型：{{item.type}}</p>
              <p>ID：{{item.id}}</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <Modal v-model="isShow" @getDialogVisible="setDialogVisible" title="添加新关联组">
       <Form  :model="affinityGroupForm"  ref="affinityGroupForm"  :rules="rules" :label-width="80">
          <FormItem label="名称" prop="name" >
            <Input  placeholder="请输入名称" v-model="affinityGroupForm.name"/>
          </FormItem>
          <FormItem label="说明" prop="description" >
            <Input  placeholder="请输入说明" v-model="affinityGroupForm.description"/>
          </FormItem>
          <FormItem label="类型" prop="type" >
            <Select 
              v-model="affinityGroupForm.type" 
            >
              <Option v-for="item in listAffinityGroupTypes" :value="item.type" :key="item.type">{{ item.type }}</Option>
            </Select>
          </FormItem>
      </Form>
      <div slot="footer">
          <Button type="ghost" @click="isShow=false">取消</Button>
          <Button type="success" @click="addAffinityGroup" style="margin-left: 8px">确定</Button>
      </div>
    </Modal>
  </div>

</template>

<script>
let paramsNew2 = {};
export default {
  name: "v-affinityGroups",
  data() {
    return {
      relCapacityList: [],
      filterrelCapacityList: [],
      listAffinityGroupTypes: [],
      createdAffinityGroup: [],
      addId: "",
      joinId: "",
      searchVal: "",
      valueSelect: "",
      value1: "",
      value2: "",
      total: "",
      isShow: false,
      pageIndex: 1,
      pageSize: 20,
      affinityGroupForm: {
        name: "",
        type: "",
        description: ""
      },
      rules: {
        name: [{ required: true, message: "请输入名称", trigger: "blur" }]
      }
    };
  },
  methods: {
    /* 获取关联性组数据 */
    requestRelCapacityData(param) {
      let params = {
        command: "listAffinityGroups",
        response: "json",
        page: 1,
        pagesize: 20,
        listAll: true
      };
      let paramsKey = params;
      if (param) {
        paramsKey = Object.assign(params, param);
        console.log(paramsKey);
      }
      this.$http
        .get("client/api", {
          params: paramsKey
        })
        .then(
          function(response) {
            this.relCapacityList =
              response.listaffinitygroupsresponse.affinitygroup;
          }.bind(this)
        );
    },
    /* 搜索 */
    searchData() {
      this.fetchNewData();
    },
    fetchNewData() {
      let params = {};
      if (this.searchVal) {
        params.keyword = this.searchVal;
      }
      this.requestRelCapacityData(params);
    },
    async addAffinityGroup() {
      const params = Object.assign(
        {
          command: "createAffinityGroup"
        },
        this.affinityGroupForm
      );
      const { createaffinitygroupresponse } = await this.$get(params);
      await this.$queryJobResult(
        createaffinitygroupresponse.jobid,
        "成功创建关联性组"
      );
      this.fetchNewData();
      this.isShow = false;
    },
    view(item) {
      this.$router.push({
        name: "affinityGroupDetail",
        query: { id: item.id },
        params: {
          displayName: item.name
        }
      });
    },
    //鼠标移进显示隐藏的信息
    showHoverInfo(event) {
      let currentTarget = event.currentTarget;
      let defaultShowDiv = currentTarget.firstChild;
      let hoverShowDiv = currentTarget.lastChild;
      if (defaultShowDiv.offsetHeight > hoverShowDiv.offsetHeight) {
        hoverShowDiv.style.cssText =
          "display:block;min-Height:" + defaultShowDiv.offsetHeight + "px";
        defaultShowDiv.style.cssText = "display:none;";
        // hoverShowDiv.style.cssText="background-color: blue;color: #fff;";
      }
    },
    //鼠标移出显示隐藏的信息
    hideHoverInfo(event) {
      let currentTarget = event.currentTarget;
      let defaultShowDiv = currentTarget.firstChild;
      let hoverShowDiv = currentTarget.lastChild;
      hoverShowDiv.style.cssText = "display:none;";
      defaultShowDiv.style.cssText = "display:block;";
    },

    openDialog: function() {
      this.isShow = true;
      this.$http
        .get("client/api", {
          params: {
            command: "listAffinityGroupTypes",
            response: "json"
          }
        })
        .then(
          function(response) {
            var itemsType =
              response.listaffinitygrouptypesresponse.affinityGroupType;

            if (itemsType) {
              this.listAffinityGroupTypes = itemsType;
              this.valueSelect = this.listAffinityGroupTypes[0].type;
            }
          }.bind(this)
        );
    },

    setDialogVisible(val1, val2, val3) {
      this.isShow = false;
      val1 = this.value1;
      val2 = this.value2;
      val3 = this.valueSelect;

      if (val1) {
        let paramsNew = {
          command: "createAffinityGroup",
          response: "json",
          name: val1,
          description: val2,
          type: val3
        };
        this.$http
          .get("client/api", {
            params: paramsNew
          })
          .then(
            function(response) {
              this.getNewData(response.createaffinitygroupresponse.id);
              this.success({});
            }.bind(this)
          );
      } else {
        this.error({});
      }
    },
    getNewData(id) {
      paramsNew2 = {
        command: "listAffinityGroups",
        response: "json",
        id: id
      };
      this.$http
        .get("client/api", {
          params: paramsNew2
        })
        .then(
          function(response) {
            this.createdAffinityGroup =
              response.listaffinitygroupsresponse.affinitygroup;
            console.log(response.queryasyncjobresultresponse);
            this.relCapacityList.push(this.createdAffinityGroup);
            this.requestRelCapacityData();
          }.bind(this)
        );
    },
    //成功提示框
    success(nodesc) {
      this.$Notice.success({
        title: nodesc != undefined && nodesc.title ? nodesc.title : "提示",
        desc: nodesc != undefined && nodesc.desc ? nodesc.desc : "操作成功"
      });
    },
    error(nodesc) {
      this.$Notice.error({
        title: nodesc != undefined && nodesc.title ? nodesc.title : "提示",
        desc:
          nodesc != undefined && nodesc.title
            ? nodesc.desc
            : "请输入关联性组的名称"
      });
    }
  },
  created() {
    this.requestRelCapacityData();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/css" scoped>
#affinityGroups {
  font-size: 14px;
  .affinityGroups-heander {
    background-color: #f6f6f6;
    .system-capacity-content {
      width: 1200px;
      margin: 0 auto;
      .relavance-box {
        width: 200px;
        margin: 10px auto;
        .relevance_add {
          width: 50px;
          height: 50px;
          background-color: white;
          border-radius: 50%;
          position: relative;
          margin-bottom: 5px;
          margin-left: 15px;
          cursor: pointer;
          i.relevance_add_icon {
            background: url("../../assets/relevance_add_icon.png") no-repeat 0 0;
            position: absolute;
            left: 10%;
            top: 10%;
            display: block;
            width: 40px;
            height: 40px;
            z-index: 9999;
          }
        }
        p.addP {
          cursor: pointer;
        }
      }
      .relevance-search {
        margin-top: 30px;
        width: 400px;
        float: right;
        #serachInput {
          width: 70%;
        }
        button {
          padding: 5px 35px;
          background-color: #51e299;
          border-radius: 5px;
          border: none;
          color: #fff;
        }
      }
    }
  }
  .data-list-row {
    width: 1200px;
    margin: 0 auto;
    ul {
      margin-top: 30px;
      li {
        display: inline-block;
        margin-right: 29px;
        margin-bottom: 20px;
        list-style: none;
        vertical-align: top;
        background-color: #f6f6f6;
        cursor: pointer;
        height: 380px;
        &:nth-child(5n) {
          margin-right: 0;
        }
        .default-show {
          display: block;
          padding: 0 19px 19px;
          .item-icon {
            position: relative;
            width: 100%;
            height: 148px;
            &:after {
              position: absolute;
              content: "";
              width: 106px;
              height: 106px;
              border-radius: 50%;
              left: 50%;
              top: 50%;
              background: #51e299 url("../../assets/cloud_icon.png") no-repeat
                center center;
              transform: translate(-50%, -50%);
            }
          }
          .item-info {
            p {
              width: 176px;
              line-height: 28px;
              color: #333;
              font-size: 14px;
              word-wrap: break-word;
              word-break: normal;
            }
          }
        }
        .hover-show {
          display: none;
          padding: 19px;
          .item-info {
            p {
              width: 176px;
              line-height: 28px;
              color: #333;
              font-size: 14px;
              word-wrap: break-word;
              word-break: normal;
            }
          }
        }
      }
    }
  }
}
</style>