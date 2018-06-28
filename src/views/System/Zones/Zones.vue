<template>
  <div class="instances">
    <router-view></router-view>
    <Row class="operation-row">
      <Row class="operation-center-row">
        <Col class="left-operation-row" span="13">
        <ul>
          <li @click="ZoneIndicators">
            <div class="icon">
              <img src="../../../assets/indicator_icon.png" alt="">
            </div>
            <span>运行指标</span>
          </li>
          <li @click="initModal">
            <div class="icon">
              <img src="../../../assets/add_instances_icon.png" alt="">
            </div>
            <span>新增资源域</span>
          </li>
        </ul>
        </Col>
        <Col class="right-operation-row" span="11">
        <Row>
          <Col class="search-operation" span="13">
          <input type="text" placeholder="请输入名称关键字" v-model="searchValue" @keydown.enter="searchData">
          <button class="search-btn" @click.prevent="searchData">搜索</button>
          </Col>
        </Row>
        </Col>
      </Row>
    </Row>

    <v-breadcrumb/>
    <div class="data-list-row">
      <ul>
        <li v-for="item in listData" :key="item.id" @mouseenter="showHoverInfo" @mouseleave="hideHoverInfo" @click="detailsInfo(item)">
          <div class="default-show">
            <div class="item-icon"></div>
            <div class="item-info">
              <p>名称：{{item.name}}</p>
              <p>网络类型：{{item.networktype }}</p>
              <p>分配状态：{{item.allocationstate | vMState(item.allocationstate)}}</p>
              <p>DNS：{{item.dns1}}</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <!--新增资源域模态框-->
    <NewZoneModal :isModalShow="modalShow"/>
  </div>
</template>

<script>
import NewZoneModal from "./NewZoneModal";
export default {
  name: "v-zones",
  data() {
    return {
      listData: [],
      osTypesLIst: [],
      //搜索框的值
      searchValue: "",
      //添加虚拟机模态框显隐
      modalShow: false
    };
  },
  methods: {
    //请求操作系统列表
    fetchZonesData(param) {
      let params = {
        command: "listZones",
        response: "json",
        page: 1,
        pagesize: 20
      };
      let newParams = {};
      if (param) {
        newParams = Object.assign(params, param);
      } else {
        newParams = params;
      }
      this.$http
        .get("/client/api", {
          params: newParams
        })
        .then(
          function(response) {
            this.listData = response.listzonesresponse.zone;
          }.bind(this)
        );
    },

    //根据虚拟机的guestosid获取对应的操作系统名字
    getOsName(guestosid) {
      let osName = "";
      this.osTypesLIst.filter(item => {
        if (item.id == guestosid) {
          return (osName = item.description);
        }
      });
      return osName;
    },
    //详情信息
    detailsInfo(item) {
      this.$router.push({
        name: "ZoneDetail",
        query: { id: item.id },
        params: {
          displayName: item.name
        }
      });
      //  this.$router.push({path:'instances/instancesdetails',query:{id:id},params:{displayName:name}})
      //  this.$router.push({path:'/',query:{id:id},params:{displayName:name}})
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
    //模糊查询
    searchData() {
      this.fetchZonesData({ keyword: this.searchValue });
    },

    //运行指数
    ZoneIndicators() {
      this.$router.push({ name: "zoneindicators" });
    }
  },

  created() {
    this.fetchZonesData();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/css" scoped>
.instances {
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
    margin: 72px auto 80px;
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
              background: #51e299 url("../../../assets/cloud_icon.png")
                no-repeat center center;
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