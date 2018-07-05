<template>
  <div class="alerts-detail">
    <Row>
      <!--面包屑-->
      <v-breadcrumb></v-breadcrumb>
    </Row>
    <Row>
      <div class="operation-row dark">
        <div class="operation-btn deleted-btn" @click="deleteAlert">
          <span></span>
          <p>删除</p>
        </div>
        <div class="operation-btn archive-btn" @click="archiveAlert">
          <span></span>
          <p>存档</p>
        </div>
      </div>
    </Row>
    <Row>
      <!--基本信息-->
      <div class="basic-info">
        <div class="basic-title">基本信息</div>
        <div class="basic-info-content">
          <ul>
            <li v-for="(value,key ) in requestAlertsDetailDataFilter()" :key="key" :title="value">
              {{key | getDictionary }}：{{value}}
            </li>
          </ul>
        </div>
      </div>
    </Row>
  </div>
</template>

<script>
//面包屑
import breadcrumb from "../../components/Breadcrumb";
export default {
  name: "v-alertsDeatil",
  data() {
    return {
      alertsDetailData: {}
    };
  },
  methods: {
    requestAlertsDetailData() {
      this.$http
        .get("client/api", {
          params: {
            command: "listAlerts",
            response: "json",
            id: this.$route.query.id
          }
        })
        .then(
          function(response) {
            this.alertsDetailData = response.listalertsresponse.alert[0];
          }.bind(this)
        );
    },
    requestAlertsDetailDataFilter() {
      delete this.alertsDetailData["type"];
      delete this.alertsDetailData["name"];
      //将接口时间转换输出
      this.alertsDetailData["sent"] = this.$options.filters["getTime"](
        this.alertsDetailData["sent"]
      );
      return this.alertsDetailData;
    },
    //删除警报
    deleteAlert() {
      this.$Modal.confirm({
        title: "确认",
        content: "请确认您确实要删除该警报",
        onOk: () => {
          //请求
          this.$http
            .get("client/api", {
              params: {
                command: "deleteAlerts",
                response: "json",
                ids: this.alertsDetailData["id"]
              }
            })
            .then(
              function(response) {
                if (response.deletealertsresponse.success == "true") {
                  this.$Notice.success({
                    desc: "警报已删除"
                  });
                  this.$router.push({ path: "/" });
                } else {
                }
              }.bind(this)
            );
        },
        onCancel: () => {}
      });
    },
    //存档
    archiveAlert() {
      this.$Modal.confirm({
        title: "确认",
        content: "请确认您确实要存档此警报",
        onOk: () => {
          //请求
          this.$http
            .get("client/api", {
              params: {
                command: "archiveAlerts",
                response: "json",
                ids: this.alertsDetailData["id"]
              }
            })
            .then(
              function(response) {
                if (response.archivealertsresponse.success == "true") {
                  this.$Notice.success({
                    desc: "警报已存档"
                  });
                  this.$router.push({ path: "/" });
                } else {
                }
              }.bind(this)
            );
        },
        onCancel: () => {}
      });
    }
  },
  components: {
    "v-breadcrumb": breadcrumb
  },
  mounted() {
    this.requestAlertsDetailData();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/css" scoped>
.alerts-detail {
  width: 1200px;
  margin: 0 auto;
  .operation-row {
    padding-top: 15px;
    padding-bottom: 36px;
    .operation-btn {
      margin-right: 60px;
      display: inline-block;
      cursor: pointer;
      height: 85px;
      position: relative;
      span {
        display: block;
        width: 54px;
        height: 54px;
      }
      p {
        position: absolute;
        left: 50%;
        bottom: 0;
        transform: translateX(-50%);
        font-size: 14px;
        color: #333;
        text-align: center;
        word-break: keep-all;
      }
    }
    .deleted-btn {
      span {
        background: url("../../assets/deleted_icon.png") no-repeat center center;
      }
    }
    .archive-btn {
      span {
        background: url("../../assets/archive_icon.png") no-repeat center center;
      }
    }
  }
  .basic-info {
    margin-top: 24px;
    .basic-title {
      height: 37px;
      line-height: 37px;
      padding-left: 13px;
      border-left: 6px solid #51e299;
      color: #333;
      font-size: 16px;
      background-color: #f0f0f0;
    }
    .basic-info-content {
      padding-top: 20px;
      padding-bottom: 30px;
      ul {
        li {
          // width: 33%;
          // display: inline-block;
          overflow: hidden;
          list-style: none;
          height: 26px;
          line-height: 26px;
          color: #333;
          font-size: 14px;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
}
</style>
