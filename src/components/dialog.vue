<template>
    <div>
        <div class="dialog-wrap">
            <div class="dialog-cover" v-if="isShow" @click="closeMyself"></div>
            <transition name="drop">
                <div class="dialog-content" v-if="isShow">
                    <p class="dialog-close" @click="closeMyself">x</p>
                    <slot name="body">empty</slot>
                    <div class="modal-footer">
                        <div class="btn" v-on:click="clickHandler(btn.value)" v-for="btn in ibutton" >{{btn.text}}</div>
                    </div>
                </div>
            </transition>
        </div>
    </div>
</template>

<script>
 export default {
    props:[
            'isShow',     //接收父组件传的值，来控制弹窗显示和隐藏
            'ibutton'      //控制生成button
        ],
 data () {
  return {}
 },
 methods: {
    closeMyself () {
        this.$emit('getDialogVisible', 'close');
    },
    clickHandler(val){
        this.$emit('getDialogVisible', val);
    }
 }
 }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/css">
 .drop-enter-active {
    transition: all .5s ease;
 }
 .drop-leave-active {
    transition: all .3s ease;
 }
 .drop-enter {
    transform: translateY(-500px);
 }
 .drop-leave-active {
    transform: translateY(-500px);
 }
 .dialog-wrap {
    position: fixed;
    width: 100%;
    height: 100%;
 }
 .dialog-cover {
    background: #000;
    opacity: .3;
    position: fixed;
    z-index: 5;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
 }
 .dialog-content {
    width: 50%;
    position: fixed;
    max-height: 50%;
    overflow: auto;
    background: #fff;
    top: 20%;
    left: 50%;
    margin-left: -25%;
    z-index: 10;
    border: 2px solid #464068;
    padding: 2%;
    line-height: 1.6;
 }
 .dialog-close {
    position: absolute;
    right: 5px;
    top: 5px;
    width: 20px;
    height: 20px;
    text-align: center;
    cursor: pointer;
 }
 .dialog-close:hover {
    color: #4fc08d;
 }
 .modal-footer{
     text-align: left;
     bottom: 8px;

    div{ 
            float:right;
            margin: 0 10px;
        }
     .btn{                
        width: 90px;
        height: 30px;
        background-color: #FFFFFF;
        text-align: center;
        line-height: 30px;
        font-size: 16px;
        border: 1px solid;
        border-radius: 5px;
    }
    .btn:hover
    { 
        background-color: #50E399;
        color: #FFFFFF; 
        border: 1px solid #50E399;
        cursor: pointer;
    }
 }
</style>
