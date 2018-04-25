<template>
       <div class="CalculationOffering">
           <div class="configuration-search">
                <div class="searchBtn" @click="openDialog">+添加方案</div>
                <div class="searchBtn" @click="getCalculationScheme()">搜索</div>
                <div><input class="inputCla" placeholder="请输入关键字" v-model="mykeyword"></input></div>
            </div>
           <div class="data-list-row">
                <ul>
                    <li v-for="item in dataList" @mouseenter="showHoverInfo" @mouseleave="hideHoverInfo" @click="operaDetail(item.id)">
                        <div class="default-show">
                              <div class="item-icon"></div>
                              <div class="item-info">
                                  <p><span>名称：</span>{{item.name}}</p>
                                  <p><span>说明：</span>{{item.displaytext}}</p>
                                  <p><span>自定义磁盘大小：</span>{{item.iscustomized}}</p>
                                  <p><span>磁盘大小（GB）：</span>{{item.disksize}}</p>
                              </div>
                        </div>
                        <div class="hover-show">
                            <div class="item-info">
                                  <p><span>名称：</span>{{item.name}}</p>
                                    <p><span>ID：</span>{{item.id}}</p>
                                    <p><span>说明：</span>{{item.displaytext}}</p>
                                    <p><span>自定义磁盘大小：</span>{{item.iscustomized}}</p>
                              </div>
                        </div>
                    </li>
                </ul>
              </div>
              <v-iDialog  :isShow="isShow" :ibutton="ibutton" @getDialogVisible="setDialogVisible">
                  <div class="dialog-body" slot="body">
                      <div class="bodyDiv">
                          <div class="bodyDivA">
                              <div class="bodyRow">
                                  <div class="nameCla">* 名称:</div>
                                  <div class="valueCls"><input name="name" class="inputCla claValue"></input></div>
                              </div>
                              <div class="bodyRow">
                                  <div class="nameCla">* 说明:</div>
                                  <div class="valueCls"><input name="description" class="inputCla claValue"></input></div>
                              </div>
                              <div class="bodyRow">
                                  <div class="nameCla">存储类型:</div>
                                  <div class="valueCls"><select name="storageType" class="selectCls claValue">
                                      <option value="shared">shared</option>
                                      <option value="local">local</option>
                                  </select></div>
                              </div>
                              <div class="bodyRow">
                                  <div class="nameCla">置备类型:</div>
                                  <div class="valueCls"><select name="provisioningType" class="selectCls claValue">
                                      <option value="thin">thin</option>
                                      <option value="sparse">sparse</option>
                                      <option value="fat">fat</option>
                                  </select></div>
                              </div>
                              <div class="bodyRow">
                                  <div class="nameCla">自定义磁盘大小:</div>
                                  <div class="valueCls"><input name="isCustomized" v-model="isClaCustomized" type="checkbox" class="inputClaC claValue"></input></input></div>
                              </div>
                              <div class="bodyRow" v-if="!isClaCustomized">
                                  <div class="nameCla">* 磁盘大小(GB):</div>
                                  <div class="valueCls"><input name="disksize" class="inputCla claValue"></input></div>
                              </div>
                              <div class="bodyRow">
                                  <div class="nameCla">QoS 类型:</div>
                              <div class="valueCls"><select v-model="qosVal" class="selectCls claValue" name="qosType">
                                  <option value=""></option>
                                  <option value="hypervisor">hypervisor</option>
                                  <option value="storage">storage</option>
                              </select></div>
                              </div>
                              <div class="bodyRow" v-if="qosVal == 'storage'">
                                  <div class="nameCla">自定义 IOPS:</div>
                              <div class="valueCls"><input name="isCustomizedIops" class="claValue" type="checkbox"></input></div>
                              </div>
                              <div class="bodyRow" v-if="qosVal == 'storage' && !isCustomizedIops">
                                  <div class="nameCla">最小 IOPS:</div>
                                  <div class="valueCls"><input name="minIops" class="inputCla claValue"></input></div>
                              </div>
                              <div class="bodyRow" v-if="qosVal == 'storage' && !isCustomizedIops">
                                  <div class="nameCla">最大 IOPS:</div>
                                  <div class="valueCls"><input name="maxIops" class="inputCla claValue"></input></div>
                              </div>
                              <div class="bodyRow" v-if="qosVal == 'storage'">
                                  <div class="nameCla">虚拟机管理程序快照预留:</div>
                                  <div class="valueCls"><input name="hypervisorSnapshotReserve" class="inputCla claValue"></input></div>
                              </div>
                              <div class="bodyRow" v-if="qosVal == 'hypervisor'">
                                  <div class="nameCla">磁盘读取速度(BPS):</div>
                                  <div class="valueCls"><input name="diskBytesReadRate" class="inputCla claValue"></input></div>
                              </div>
                              <div class="bodyRow" v-if="qosVal == 'hypervisor'">
                                  <div class="nameCla">磁盘写入速度(BPS):</div>
                                  <div class="valueCls"><input name="diskBytesWriteRate" class="inputCla claValue"></input></div>
                              </div>
                              <div class="bodyRow" v-if="qosVal == 'hypervisor'">
                                  <div class="nameCla">磁盘读取速度(IOPS):</div>
                                  <div class="valueCls"><input name="diskIopsReadRate" class="inputCla claValue"></input></div>
                              </div>
                              <div class="bodyRow" v-if="qosVal == 'hypervisor'">
                                  <div class="nameCla">磁盘写入速度(IOPS):</div>
                                  <div class="valueCls"><input name="diskIopsWriteRate" class="inputCla claValue"></input></div>
                              </div>
                              <div class="bodyRow">
                                  <div class="nameCla">写入缓存类型:</div>
                              <div class="valueCls"><input name="cacheMode" type="checkbox" class="claValue"></input></div>
                              </div>
                              <div class="bodyRow">
                                  <div class="nameCla">存储标签:</div>
                              <div class="valueCls"><input name="tags" class="inputCla claValue"></input></div>
                              </div>
                              <div class="bodyRow">
                                  <div class="nameCla">公用:</div>
                              <div class="valueCls"><input type="checkbox" v-model="isPublic" name="isPublic" class="claValue"></input></div>
                              </div>
                              <div class="bodyRow" v-if="!isPublic">
                                  <div class="nameCla">域:</div>
                                  <div class="valueCls"><select name="domainId" class="selectCls claValue"></select></div>
                              </div>
                          </div>
                      </div>                        
                  </div>
              </v-iDialog>                                   
       </div>
</template>

<script>
  
import iDialog from '../../components/dialog';  

export default {
  name: 'v-CalculationOffering',
  components:{
    'v-iDialog': iDialog
  },
  data () {
    return {
        mykeyword: '',
        dataList: '',
        mykeyword: '',        
        isShow: false,
        ibutton: [{text: '保存', value: 'ok'}, {text: '取消', value: 'cancel'}],
        isClaCustomized: false,
        qosVal: '',
        isCustomizedIops: false,
        isPublic: false,
    }
  },
  methods:{
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
      //详细信息页面
      operaDetail(itemId){
          // alert(itemId);
          this.$router.push({name:'openDetail', params: { itemId: itemId, type: 'disk'}});
      },
      //获取磁盘方案
      getDiskScheme(){
          let params = {
              command:"listDiskOfferings",
              response:"json",
              isrecursive: true,
              listAll: true,
              page: 1,
              pagesize: 20
          };
          if(this.mykeyword != ""){
              params.keyword = this.mykeyword;
          }
            this.$http.get("/client/api",{
              params:params
          }).then(function(response){
              this.dataList = response.listdiskofferingsresponse.diskoffering;
              this.loading = false;
          }.bind(this))
      },
      //新增窗口
        openDialog: function () {
            this.isShow = true;
            
        },
        setDialogVisible(val){
            this.isShow = false;
            if(val == "ok"){
                this.success({});
            }
        },
        //成功提示框
        success (nodesc) {
            this.$Notice.success({
                title: nodesc != undefined && nodesc.title ? nodesc.title : '提示',
                desc: nodesc != undefined && nodesc.desc ? nodesc.desc : '操作成功'
            });
        }
  },
   created(){
        this.getDiskScheme();
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/css">
.CalculationOffering{

    .configuration-search{
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

</style>
