<template>
  <div id="app">
          <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style lang="scss" type="text/css">
* {
  font-size: 14px;
}
ul {
  li {
    list-style: none;
  }
}

//清除浮动的
.clear {
  &::before,
  &::after {
    content: " ";
    display: table;
  }
  &::after {
    clear: both;
  }
}
//操作栏样式
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
          .icon,
          .dark {
            background-color: #f3f3f3;
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
.operation-row,
.dark {
  background: #fff;
  border: none;
}
//iview Tab组件
.ivu-tabs-bar {
  border-bottom: none;
  .ivu-tabs-nav-wrap {
    display: flex;
    justify-content: center;
    .ivu-tabs-ink-bar {
      height: 0;
    }
    .ivu-tabs-tab {
      width: 200px;
      height: 40px;
      background-color: #353c4c;
      color: #ffffff;
      text-align: center;
      font-size: 16px;
      margin-right: 2px;
    }
    .ivu-tabs-tab-active {
      background-color: #51e299;
    }
  }
}
//iview modal组件
.ivu-modal {
  .ivu-modal-body {
    text-align: center;
    .ivu-icon {
      display: none;
    }
    .ivu-btn-primary {
      background-color: #51e299;
      border-color: #51e299;
    }
    .ivu-btn-text:hover {
      background-color: #51e299;
      color: #fff;
    }
  }
  .ivu-modal-confirm-body {
    padding: 0;
  }
}
//iview select
.ivu-select-selection {
  border-color: #bdbdbd;
  .ivu-select-placeholder {
    color: #999999;
  }
  .ivu-icon-arrow-down-b:before {
    content: "\F3D8";
    // width: 12px;
    // height: 7px;
    // background: url('./assets/select_arrow_down.png') no-repeat center center;
  }
}
//input placeholder color
input::-webkit-input-placeholder,
textarea::-webkit-input-placeholder {
  /* WebKit browsers */
  color: #999999;
}
input:-moz-placeholder,
textarea:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: #999999;
}
input::-moz-placeholder,
textarea::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: #999999;
}
input:-ms-input-placeholder,
textarea:-ms-input-placeholder {
  /* Internet Explorer 10+ */
  color: #999999;
}
</style>
