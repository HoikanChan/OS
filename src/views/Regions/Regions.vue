<template>
  <div class="regions">
    <Row class="operation-row">
      <Row class="operation-center-row">
        <Col class="left-operation-row" span="13">
          <ul>
            <li @click="toggleModal">
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
    <div class="data-list-row">
      <ul>
        <li v-for="(item,index) in regionList" :key="index" @mouseenter="showHoverInfo" @mouseleave="hideHoverInfo" @click="viewRegion(item.id)">
          <div class="default-show">
            <div class="item-icon"></div>
            <div class="item-info">
              <p><span>名称：</span>{{item.name}}</p>
              <p><span>端点：</span>{{item.endpoint}}</p>
            </div>
          </div>
          <div class="hover-show">
            <div class="item-info">
              <p><span>名称：</span>{{item.name}}</p>
              <p><span>ID：</span>{{item.id}}</p>
              <p><span>端点：</span>{{item.endpoint}}</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <Modal
      v-model="isModalShow"
      width=350
      title="添加地理区域"
    > 
      <p>请指定添加新地理区域所需的信息。</p>
      <br/>
      <Form :model="addRegionForm"  ref="addRegionForm"  :rules="rules" :label-width="50">
        <Row>
          <FormItem label="ID" prop="ID" >
            <Input   v-model="addRegionForm.ID"/>
          </FormItem>
        </Row>
        <Row>
          <FormItem label="名称" prop="name">
            <Input   v-model="addRegionForm.name"/>
          </FormItem>
        </Row>
        <Row>
          <FormItem label="端点" prop="endpoint" >
            <Input  v-model="addRegionForm.endpoint"/>
          </FormItem>
        </Row>
      </Form>
      <div slot="footer">
        <Button type="ghost" @click="toggleModal">取消</Button>
        <Button type="success" @click="addRegion" style="margin-left: 8px">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
export default {
  name: "v-regions",
  data() {
    const validateNumber = (rule, value, callback) => {
      if (!Number.isInteger(value)) {
        callback(new Error("请输入只包含数字的ID"));
      }
    };
    return {
      regionList: [],
      isModalShow: false,
      searchValue: "",
      addRegionForm: {
        name: null,
        ID: null,
        endpoint: null
      },
      rules: {
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
        ID: [
          { required: true, message: "请输入ID", trigger: "blur" },
          { validator: validateNumber, trigger: "blur" }
        ],
        endpoint: [
          { required: true, message: "请输入端点地址", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    //TODO：缺少搜索的API
    async fetchData() {
      let searchParams = {
        keyword: this.searchValue
      };
      let regularParams = {
        command: "listRegions",
        response: "json"
      };
      let params = this.searchValue
        ? Object.assign(searchParams, regularParams)
        : regularParams;
      try {
        const res = await this.$http.get("client/api", {
          params: params
        });
        this.regionList = res.listregionsresponse.region;
      } catch (error) {
        this.handleError(error).bind(this);
      }
    },
    async addRegion() {
      try {
        const res = await this.$http.get("client/api", {
          params: {
            command: "addRegion",
            response: "json",
            id: this.addRegionForm.ID,
            name: this.addRegionForm.name,
            endpoint: this.addRegionForm.endpoint
          }
        });
        this.toggleModal();
        this.fetchData();
      } catch (error) {
        this.handleError(error).bind(this);
      }
    },
    toggleModal() {
      this.isModalShow = !this.isModalShow;
    },
    viewRegion(id) {
      this.$router.push({ name: "regionDetail", params: { id: id } });
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
.data-list-row {
  width: 1200px;
  margin: 25px auto 80px;
  ul {
    li {
      display: inline-block;
      margin-right: 29px;
      margin-bottom: 20px;
      list-style: none;
      vertical-align: top;
      background-color: #f6f6f6;
      cursor: pointer;
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
          span {
            font-weight: bold;
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
          span {
            font-weight: bold;
          }
        }
      }
    }
  }
}
</style>
