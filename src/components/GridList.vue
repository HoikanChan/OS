<template>
  <div class="data-list-row">
    <ul>
      <li v-for="(item,key) in data" :key="key" @mouseenter="showHoverInfo" @mouseleave="hideHoverInfo" @click="view(item)">
        <div class="default-show">
          <div class="item-icon"></div>
          <div class="item-info">
            <p v-for="(value, key) in cols" :key="key">
              <span>{{value}}：</span>{{item[key] | booleanTrans}}
            </p>
          </div>
        </div>
        <div class="hover-show" v-if="hoverCols">
          <div class="item-info">
            <p v-for="(value, key) in hoverCols" :key="key">
              <span>{{value}}：</span>{{item[key] | booleanTrans}}
            </p>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "grid-list",
  props: {
    data: {
      type: Array,
      required: true
    },
    cols: {
      type: Object,
      required: true
    },
    hoverCols: {
      type: Object,
      default: null
    }
  },
  data() {
    return {};
  },
  methods: {
    view(item) {
      this.$emit("view", item);
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
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/css" scoped>
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
            background: #51e299 url("../assets/cloud_icon.png") no-repeat center
              center;
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
