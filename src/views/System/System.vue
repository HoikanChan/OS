<template>
  <div class="system-capacity">
    <div class="system-capacity-content">
      <div class="system-capacity-list">
        <div class="system-capacity-item" @click="changeRequestData('zones')">
          <div class="circle">
            <span class="span-circle"></span>
            <div class="icon">
              <img src="../../assets/base_01.png" alt="">
            </div>
          </div>

          <span>资源域</span>
        </div>
        <div class="system-capacity-item" @click="changeRequestData('pods')">
          <div class="circle">
            <span class="span-circle"></span>
            <div class="icon">
              <img src="../../assets/base_02.png" alt="">
            </div>
          </div>
          <span>机柜</span>
        </div>
        <div class="system-capacity-item" @click="changeRequestData('clusters')">
          <div class="circle">
            <span class="span-circle"></span>
            <div class="icon">
              <img src="../../assets/base_03.png" alt="">
            </div>
          </div>
          <span>群集</span>
        </div>
        <div class="system-capacity-item" @click="changeRequestData('hosts')">
          <div class="circle">
            <span class="span-circle"></span>
            <div class="icon">
              <img src="../../assets/base_04.png" alt="">
            </div>
          </div>
          <span>主机</span>
        </div>
        <div class="system-capacity-item item-five" @click="changeRequestData('primarys')">
          <div class="circle">
            <span class="span-circle"></span>
            <div class="icon">
              <img src="../../assets/base_05.png" alt="">
            </div>
          </div>
          <span>主存储</span>
        </div>
        <div class="system-capacity-item" @click="changeRequestData('secondearys')">
          <div class="circle">
            <span class="span-circle"></span>
            <div class="icon">
              <img src="../../assets/base_06.png" alt="">
            </div>
          </div>
          <span>二级存储</span>
        </div>
        <div class="system-capacity-item" @click="changeRequestData('systemv')">
          <div class="circle">
            <span class="span-circle"></span>
            <div class="icon">
              <img src="../../assets/base_07.png" alt="">
            </div>
          </div>
          <span>系统VM</span>
        </div>
        <div class="system-capacity-item" @click="changeRequestData('VirtualRouters')">
          <div class="circle">
            <span class="span-circle"></span>
            <div class="icon">
              <img src="../../assets/base_08.png" alt="">
            </div>
          </div>
          <span>虚拟路由器</span>
        </div>
        <div class="system-capacity-item" @click="changeRequestData('CPUSockets')">
          <div class="circle">
            <span class="span-circle"></span>
            <div class="icon">
              <img src="../../assets/base_09.png" alt="">
            </div>
          </div>
          <span>CPU插槽</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import breadcrumb from "../../components/Breadcrumb";

  export default {
    name: "v-System",
    components: {
      "v-breadcrumb": breadcrumb
    },
    data() {
      return {
        systemList: [],
        icon: {}
      };
    },
    methods: {
      //更改类型
      changeRequestData(val) {
        if (val == "zones") {
          this.$router.push({ name: "zones" });
        } else if (val == "pods") {
          this.$router.push({ name: "Pods" });
        } else if (val == "clusters") {
          this.$router.push({ name: "Clusters" });
        } else if (val == "hosts") {
          this.$router.push({ name: "Hosts" });
        } else if (val == "primarys") {
          this.$router.push({ name: "PrimaryStorages" });
        } else if (val == "secondearys") {
          this.$router.push({ name: "SecondaryStorages" });
        } else if (val == "systemv") {
          this.$router.push({ name: "SystemVMs" });
        } else if (val == "virtualr") {
          this.$router.push({ name: "VirtualRouters" });
        } else if (val == "cpu") {
          this.$router.push({ name: "CPUSockets" });
        }
      }
      //请求基础架构数据
    }
  };
</script>
<style lang="scss" type="text/css" scoped>
  .system-capacity {
    padding-top: 30px;
    width: 100%;
    background: #353c4c;
    background-size: cover;
    .system-capacity-content {
      width: 1200px;
      margin: 0 auto;
      .system-capacity-list {
        padding-top: 45px;
        height: 587px;
        width: 1100px;
        margin: 0 auto;
        .system-capacity-item {
          position: relative;
          display: inline-block;
          width: 130px;
          margin-bottom: 74px;
          margin-right: 105px;
          text-align: center;
          color: #fff;
          cursor: pointer;
          .circle {
            position: relative;
            .span-circle {
              border: 2px solid #ddd;
              width: 123px;
              height: 123px;
              border-radius: 50%;
              display: inline-block;
              margin-bottom: 20px;
              &:nth-child(5n) {
                margin-right: 0;
              }

              &:hover {
                .system-capacite-default {
                  display: none;
                }
                .system-capacity-hover {
                  display: block;
                }
              }
            }
            .icon {
              position: absolute;
              top: 29px;
              left: 33px;
            }
          }
          span {
            color: #fff;
            font-size: 16px;
          }
          .system-capacite-default {
            .system-capacity-icon-row {
              // margin-top: -28px;
            }
            .system-capacity-percent-row {
              margin-top: 12px;
              .system-capacity-percent {
                font-size: 18px;
                color: #fff;
                font-weight: bolder;
              }
            }
          }
          .system-capacity-hover {
            display: none;
            position: relative;
            border-radius: 50%;
            width: 100%;
            height: 128px;
            color: #fff;
            h6 {
              width: 100%;
              position: absolute;
              line-height: 28px;
              top: 40px;
              text-align: center;
              font-size: 14px;
            }
            p {
              width: 100%;
              position: absolute;
              line-height: 28px;
              top: 74px;
              text-align: center;
              font-size: 12px;
            }
          }
          .system-capacity-item-name {
            position: absolute;
            top: 142px;
            left: 50%;
            transform: translateX(-50%);
            width: 100%;
            text-align: center;
            font-size: 16px;
            color: #fff;
          }
        }
        .item-five {
          margin-right: 0;
        }
      }
    }
  }
</style>