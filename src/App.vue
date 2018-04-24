<template>
  <div id="app">
          <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
}
</script>

<style lang="scss" type="text/css">
*{
    font-size: 14px;
    // color: #333;
}
ul{
    li{
        list-style: none;
    }
}
//清除浮动的
.clear{
    &::before,&::after{
        content: " ";
        display: table;
    };
    &::after{
        clear: both;
    }
}
//iview modal组件
.ivu-modal{
    .ivu-modal-body{
        text-align: center;
        .ivu-icon{
            display: none;
        }
        .ivu-btn-primary{
            background-color: #51e299;
            border-color: #51e299;
        }
        .ivu-btn-text:hover{
            background-color: #51e299;
            color: #fff;
        }
    }
}
//iview select
 .ivu-select-selection{
    border-color: #bdbdbd;
    .ivu-select-placeholder{
        color: #999999;
    }
    .ivu-icon-arrow-down-b:before{
        content: '\F3D8';
        // width: 12px;
        // height: 7px;
        // background: url('./assets/select_arrow_down.png') no-repeat center center;
    }
}
//input placeholder color
input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {   
 /* WebKit browsers */   
color: #999999;   
}   
input:-moz-placeholder, textarea:-moz-placeholder {   
/* Mozilla Firefox 4 to 18 */   
color: #999999;   
}   
input::-moz-placeholder, textarea::-moz-placeholder {   
 /* Mozilla Firefox 19+ */   
color: #999999;   
}   
input:-ms-input-placeholder, textarea:-ms-input-placeholder {   
 /* Internet Explorer 10+ */   
color: #999999;   
}
</style>
