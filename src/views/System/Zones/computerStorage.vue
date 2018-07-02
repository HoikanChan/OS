<template>
        <!-- 详情信息内容 -->
        <div class="details-info-content">
        </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {};
  },
  components: {},
  methods: {},
  created() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/css">
.details-info-content {
  .operation-row {
    ul {
      padding: 19px 0 17px;
      li {
        float: left;
        margin-right: 36px;
        text-align: center;
        cursor: pointer;
        &:last-child,
        &:nth-child(11n) {
          margin-right: 0;
        }
        .icon {
          display: inline-block;
          width: 53px;
          height: 53px;
          line-height: 53px;
          background-color: #f6f6f6;
          border-radius: 50%;
          text-align: center;
          img {
            vertical-align: middle;
          }
        }
        p {
          height: 50px;
          line-height: 50px;
          color: #333333;
        }
      }
    }
  }
  h4 {
    margin-bottom: 20px;
    height: 37px;
    line-height: 37px;
    font-size: 16px;
    padding-left: 13px;
    border-left: 6px solid #51e299;
    background-color: #f0f0f0;
  }
  .basic-info {
    padding-bottom: 30px;
    .basic-info-content {
      ul {
        width: 100%;
        padding-bottom: 28px;
        li {
          float: left;
          width: 33%;
          height: 26px;
          line-height: 26px;
          i {
            font-style: normal;
          }
          span {
            margin-left: 16px;
          }
        }
      }
    }
    .secret-key-row {
      padding: 9px 0 24px 20px;
      background-color: #f0f0f0;
      h5 {
        height: 36px;
        line-height: 36px;
        font-size: 16px;
        font-weight: bold;
      }
      form {
        height: 30px;
        line-height: 30px;
        input {
          width: 210px;
          height: 30px;
          line-height: 30px;
          border: 1px solid #bdbdbd;
          border-radius: 3px;
          padding-left: 10px;
        }
        input[name="key"] {
          margin-right: 50px;
        }
        input[name="value"] {
          margin-right: 18px;
        }
        button {
          width: 103px;
          height: 30px;
          border: 1px solid #51e299;
          background-color: #51e299;
          color: #fff;
          border-radius: 3px;
          cursor: pointer;
        }
      }
    }
  }
  .content-table {
    padding-bottom: 28px;
  }
}
//将虚拟机迁移到其他主机模态框样式
.findHosts-Modal {
  .findHosts-Modal-search-row {
    margin-bottom: 10px;
    float: right;
    .findHosts-Modal-search-input {
      padding-left: 15px;
      width: 200px;
      height: 30px;
      line-height: 28px;
      border: 1px solid #bdbdbd;
      border-radius: 3px;
    }
    .findHosts-Modal-search-button {
      width: 80px;
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
</style>
