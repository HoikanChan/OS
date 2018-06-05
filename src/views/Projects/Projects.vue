<template>
       <div class="projects">
           <div class="projects-content">
                <div>
                    <v-breadcrumb></v-breadcrumb>
                </div>
                <div class="projects-title">
                    <div v-bind:class="{titleDiv: true, 'selectDiv': isPro}" @click="changeRequestData('pro')">
                        项目
                    </div>
                     <div v-bind:class="{titleDiv: true, 'selectDiv': isInv}" @click="changeRequestData('inv')">
                        邀请
                    </div>
               </div>  
               <div class="projects-search">
                  <div class="searchBtn" @click="openDialog">+添加方案</div>
                  <div class="searchBtn" @click="searchKeyWord()">搜索</div>
                  <div><input class="inputCla" placeholder="请输入关键字" v-model="mykeyword"></input></div>
              </div>
              <div class="data-list-row">
                <ul>
                    <li v-for="item in dataList" @mouseenter="showHoverInfo" @mouseleave="hideHoverInfo">
                        <div class="default-show">
                              <div class="item-icon"></div>
                              <div class="item-info">
                                  <p><span>名称：</span>{{item.name}}</p>
                                  <p><span>显示名称：</span>{{item.displaytext}}</p>
                                  <p><span>域：</span>{{item.domain}}</p>
                                  <p><span>所有者账户：</span>{{item.account}}</p>
                                  <p><span>状态：</span>{{item.state}}</p>
                              </div>
                        </div>
                        <div class="hover-show">
                            <div class="item-info">
                                  <p><span>名称：</span>{{item.name}}</p>
                                  <p><span>显示名称：</span>{{item.displaytext}}</p>
                                  <p><span>ID：</span>{{item.id}}</p>
                                  <p><span>域：</span>{{item.domain}}</p>
                              </div>
                        </div>
                    </li>
                 </ul>
              </div>
              <v-iDialog  :isShow="isShow" :ibutton="ibutton" @getDialogVisible="setDialogVisible">
                  <div class="dialog-body" slot="body">
                      <div class="bodyDiv" v-show="step == 1">
                          <span class="title"> + 创建项目</span>
                          <div class="bodyDivA">
                              <div class="bodyRow">
                                  <div class="nameCla">项目名称:</div>
                                  <div class="valueCls"><input v-model="name" class="inputCla"></input></div>
                              </div>
                              <div class="bodyRow">
                                  <div class="nameCla">显示文本:</div>
                                  <div class="valueCls"><input v-model="displayText" class="inputCla"></input></div>
                              </div>
                          </div>
                      </div>
                      <div class="bodyDiv" v-show="step == 2">
                          <span class="title">{{name}}</span>
                          <div class="bodyDivA">
                              <div class="bodyRow">
                                  <div class="nameCla">项目名称:</div>
                                  <div class="valueCls">{{name}}</div>
                              </div>
                              <div class="bodyRow">
                                  <div class="nameCla">显示文本:</div>
                                  <div class="valueCls">{{displayText}}</div>
                              </div>
                          </div>
                      </div>
                      <div class="bodyDiv" v-show="step == 3">
                          <span class="title">添加账户至 {{name}}</span>
                          <div class="bodyDivA">
                              <Table :columns="columns1" :data="data1"></Table>
                          </div>
                      </div>
                  </div>
              </v-iDialog>
           </div>
       </div>
</template>

<script>
import breadcrumb from '../../components/Breadcrumb';  
import iDialog from '../../components/dialog';   
export default {
  name: 'v-projects',
  components:{
      'v-breadcrumb':breadcrumb,
      'v-iDialog': iDialog,
  },
  data () {
    return {
      isPro: true,
      isInv: false,
      mykeyword: '',
      dataList: [],
      isShow: false,
      ibutton: [{text: '创建项目', value: 'ok'}, {text: '取消', value: 'cancel'}],
      step: 1,
      name: '',
      displayText: '',
      columns1: [],
      data1:[],
      proId: '',
    }
  },
  methods:{
      //更改类型
      changeRequestData(val){
          this.isPro = false;
          this.isInv = false;
          this.mykeyword = "";
          this.dataList = [];

          if(val == "pro"){
              this.isPro = true;            
          }
          else if(val == "inv"){
              this.isInv = true;
          }
      }, 
      searchKeyWord(){
          if(this.isPro){
              this.searchPro();          
          }
          else if(this.isInv){
              this.searchPro();
          }
      },
      searchPro(){
          let params = {
              command:"listProjects",
              response:"json",
              listAll:true,
              page:1,
              pagesize:20
          };
          if(this.mykeyword != ""){
              params.keyword = this.mykeyword;
          }
          this.$http.get("/client/api",{
              params:params
          }).then(function(response){
              this.dataList = response.listprojectsresponse.project;
          }.bind(this))
      },
      //获取项目下用户
      listProjectAccount(){

      },
      //鼠标移进显示隐藏的信息
      showHoverInfo(event){
          let currentTarget = event.currentTarget;
          let defaultShowDiv = currentTarget.firstChild;
          let hoverShowDiv = currentTarget.lastChild;
          if(defaultShowDiv.offsetHeight>hoverShowDiv.offsetHeight){
              hoverShowDiv.style.cssText="display:block;min-Height:"+defaultShowDiv.offsetHeight+"px";
              defaultShowDiv.style.cssText="display:none;";
          };
      },
      //鼠标移出显示隐藏的信息
      hideHoverInfo(event){
          let currentTarget = event.currentTarget;
          let defaultShowDiv = currentTarget.firstChild;
          let hoverShowDiv = currentTarget.lastChild;
          hoverShowDiv.style.cssText="display:none;";
          defaultShowDiv.style.cssText="display:block;";
      },      
      openDialog(){
        this.isShow = true;
      },
      setDialogVisible(val){
        if(val == "ok"){
            if(this.step == 1){
                let params = {
                    command: "createProject",
                    response: "json",
                    account: "admin",
                    name: this.name,
                    displayText: this.displayText,
                    domainId: "4d8114f7-2767-11e8-962c-e41f13c4e7f2"
                };
                this.$http.get("/client/api",{
                    params:params
                }).then(function(response){
                    if(response.createprojectresponse && response.createprojectresponse.id){
                        this.step = 2;
                        this.proId = response.createprojectresponse.id;
                        this.ibutton = [{text: '添加账号', value: 'ok'}, {text: '以后提醒我', value: 'cancel'}];
                    }                    
                }.bind(this))
            }
            else if(this.step == 2){
                this.step = 3;
            }
        }
        else if(val == "cancel"){
            this.isShow = false;
            this.step = 1;
            this.proId = "";
            this.ibutton = [{text: '创建项目', value: 'ok'}, {text: '取消', value: 'cancel'}];
        }
      }
  },
  created(){
      this.searchPro();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/css">
.projects{
    width: 100%;
    height: 748px;

    .projects-content{
         width: 1200px;
         margin: 0 auto;

         .projects-title{
            width:400px;
            overflow:hidden;
            margin: 20px auto;
            text-align: center;
            
            div{ 
                float:left;
            }
            .titleDiv{                
                width: 200px;
                height: 40px;
                background-color: #353C4C;
                color: #FFFFFF;
                text-align: center;
                line-height: 40px;
                font-size: 16px;
                border: 1px solid #FFFFFF;
            }
            .titleDiv:hover
            { 
                background-color: #676F8B;
                cursor: pointer;
            }
            .selectDiv{
                background-color: #51E299;
            }
        }

        .projects-search{
            height: 50px;
            padding-top: 10px;

            div{ 
                float:right;
                border: 1px solid #FFFFFF;
                border-radius: 5px;
            }
            .searchBtn{
                background-color: #353C4C;
                color: #FFFFFF;
                text-align: center;
                line-height: 30px;
                font-size: 14px;
                height: 30px;
                width: 100px;
            }
            .searchBtn:hover{
                background-color: #676F8B;
                cursor: pointer;
            }
            .inputCla{ 
                height: 30px;
                width: 325px; 
                font-size: 14px; 
                border:1px solid #cdcdcd;
                border-radius: 5px;
            }
        }

        .data-list-row{
            width: 1200px;
            margin: 25px auto 80px;
            ul{
                li{
                    display: inline-block;
                    margin-right: 29px;
                    margin-bottom: 20px;
                    list-style: none;
                    vertical-align: top;
                    background-color: #f6f6f6;
                    cursor: pointer;
                    &:nth-child(5n){
                        margin-right: 0;
                    }
                    .default-show{
                        display: block;
                        padding: 0 19px 19px;
                        .item-icon{
                            position: relative;
                            width: 100%;
                            height: 148px;
                            &:after{
                                position: absolute;
                                content:'';
                                width: 106px;
                                height: 106px;
                                border-radius: 50%;
                                left:50%;
                                top: 50%;
                                background:#51e299 url('../../assets/cloud_icon.png') no-repeat center center;
                                transform: translate(-50%,-50%);
                            }
                        }
                        .item-info{
                            p{
                                width: 176px;
                                line-height: 28px;
                                color: #333;
                                font-size: 14px;
                                word-wrap: break-word;
                                word-break: normal;
                            }
                            span{
                                font-weight: bold;
                            }
                        }
                    }
                    .hover-show{
                        display: none;
                        padding: 19px;
                        .item-info{
                            p{
                                width: 176px;
                                line-height: 28px;
                                color: #333;
                                font-size: 14px;
                                word-wrap: break-word;
                                word-break: normal;
                            }
                            span{
                                font-weight: bold;
                            }
                        }
                    }
                }
            }
        }

        .bodyDiv{
            width: 100%;

            .title{
              font-size: 17px;
              font-weight: bold;
            }

            .bodyDivA{
                width: 450px;
                heght: auto;
                margin: 0 auto;

                .bodyRow{
                    height:50px;
                    margin: 5px;

                    div{
                        float: left;
                    }
                }
                
                .nameCla{
                    width: 130px;
                    font-size: 15px;
                    line-heighr:30px;
                }
                .valueCls{
                    height: 30px;
                    width: 300px; 
                    
                    .inputCla{ 
                        height: 30px;
                        width: 300px; 
                        font-size: 14px; 
                        border:1px solid #cdcdcd;
                        border-radius: 5px;
                    }
                    .inputClaC{
                        margin-top: 10px;
                    }
                    .selectCls{
                        height: 30px;
                        width: 300px; 
                        font-size: 14px; 
                        border:1px solid #cdcdcd;
                        border-radius: 5px;
                    }
                }
            }
        }
    }
}
</style>
