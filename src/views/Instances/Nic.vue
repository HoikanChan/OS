<template>
    <div class="nic-content">
        <div class="operation-row">
            <ul class="clear">
                    <li>
                        <div class="icon" @click="addNicModal=!addNicModal">
                            <img src="../../assets/details_info_icon_12.png" alt="" style="margin-left:6px;">
                        </div>
                        <p>添加网络</p>
                    </li>
            </ul>
            <Modal
                v-model="addNicModal"
                title="将网络添加到 VM"
                @on-ok="addNic"
                >
                <p>请指定要将此 VM 添加到的网络。将为此网络添加一个新 NIC。</p>
                <div>
                     网络：
                    <Select v-model="networkSelected" style="width:200px">
                        <Option v-for="item in networkData" :value="item.id" :key="item.id">{{ item.name }}</Option>
                    </Select>
                </div>
            </Modal>
        </div>
        <div class="nic-list clear">
            <div class="nic-item" v-for="(item,index) in nicData" :class="item.isdefault?'default-nic-item':''">
                <div class="nic-item-title" v-if="item.isdefault">
                    网卡{{index+1}}（默认）
                </div>
                <div class="nic-item-title" v-else>
                    网卡{{index+1}}   
                    <div class="nic-operation">
                        <span>设置为默认</span>
                        <span>删除</span>
                    </div>
                </div>
                <div class="nic-item-inner">
                    <ul>
                        <li>
                            <span>ID</span>{{item.id}}
                        </li>
                        <li>
                            <span>网络名称</span>{{item.networkname}}
                        </li>
                        <li>
                            <span>类型</span>{{item.type}}
                        </li>
                        <li class="nic-item-ipaddress">
                            <span>IP 地址</span>{{item.ipaddress}}
                            <i @click="showIpSelectModal(item.networkid)">改变IP地址</i>
                        </li>
                        <li class="nic-item-secondary-ips">
                            <span>二级 IPs</span>{{item.secondaryips}}
                            <i>编辑二级 IPs</i>
                        </li>
                        <li>
                            <span>网关</span>{{item.gateway}}
                        </li>
                        <li>
                            <span>网络掩码</span>{{item.netmask}}
                        </li>
                        <li>
                            <span>IPv6 IP 地址</span>{{item.ip6address}}
                        </li>
                        <li>
                            <span>IPv6 网关</span>{{item.ip6gateway}}
                        </li>
                        <li>
                            <span>IPv6 CIDR</span>{{item.ip6cidr}}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <Modal
            v-model="ipSelectModal"
            title="Change IP address for NIC"
            @on-ok="updateVmNicIp"
            >
            <p>Please confirm that you would like to change the IP address for this NIC on VM.</p>
            <div>
                    IP地址：
                <Select v-model="networkSelected" style="width:200px">
                    <Option v-for="item in ipAddressData" :value="item.ipaddress" :key="item.id">{{ item.ipaddress }}</Option>
                </Select>
            </div>
        </Modal>
    </div>
</template>
<script>
export default {
  data(){
      return{
          nicData:[],
          addNicModal:false,
          networkData:[],
          networkSelected:'',
          ipSelectModal:false,
          ipAddressData:[],
      }
  },
  methods:{
      fetchNicData(){
          this.$http.get('/client/api',{
            params:{
                command:'listVirtualMachines',
                details: 'nics',
                id: this.$route.query.id,
                response: 'json'
            }
        }).then(function(response){
            this.nicData=response.listvirtualmachinesresponse.virtualmachine[0].nic
            // this.nicData=[{
            //     "id": "c19e82e3-fd55-469b-ba53-0d8887aeb354",
            //     "networkid": "cd6320ae-0032-464c-81d4-751dabb3c012",
            //     "networkname": "share-rscloudmart",
            //     "netmask": "255.255.255.0",
            //     "gateway": "172.17.3.254",
            //     "ipaddress": "172.17.3.151",
            //     "isolationuri": "vlan://132",
            //     "broadcasturi": "vlan://132",
            //     "traffictype": "Guest",
            //     "type": "Shared",
            //     "isdefault": true,
            //     "macaddress": "06:07:06:00:07:51",
            //     "secondaryip": []
            // },{
            //     "id": "5b646486-63eb-43e1-8e92-fba9d5f653d8",
            //     "networkid": "403d8a1f-1e45-4532-8254-3532a6849449",
            //     "networkname": "iso-cloud2G-rscloudmart",
            //     "netmask": "255.255.255.0",
            //     "gateway": "192.168.1.254",
            //     "ipaddress": "192.168.1.74",
            //     "isolationuri": "vlan://501",
            //     "broadcasturi": "vlan://501",
            //     "traffictype": "Guest",
            //     "type": "Isolated",
            //     "isdefault": false,
            //     "macaddress": "02:00:36:2b:00:07",
            //     "secondaryip": []
            // },{
            //     "id": "5b646486-63eb-43e1-8e92-fba9d5f653d8",
            //     "networkid": "403d8a1f-1e45-4532-8254-3532a6849449",
            //     "networkname": "iso-cloud2G-rscloudmart",
            //     "netmask": "255.255.255.0",
            //     "gateway": "192.168.1.254",
            //     "ipaddress": "192.168.1.74",
            //     "isolationuri": "vlan://501",
            //     "broadcasturi": "vlan://501",
            //     "traffictype": "Guest",
            //     "type": "Isolated",
            //     "isdefault": false,
            //     "macaddress": "02:00:36:2b:00:07",
            //     "secondaryip": []
            // },{
            //     "id": "5b646486-63eb-43e1-8e92-fba9d5f653d8",
            //     "networkid": "403d8a1f-1e45-4532-8254-3532a6849449",
            //     "networkname": "iso-cloud2G-rscloudmart",
            //     "netmask": "255.255.255.0",
            //     "gateway": "192.168.1.254",
            //     "ipaddress": "192.168.1.74",
            //     "isolationuri": "vlan://501",
            //     "broadcasturi": "vlan://501",
            //     "traffictype": "Guest",
            //     "type": "Isolated",
            //     "isdefault": false,
            //     "macaddress": "02:00:36:2b:00:07",
            //     "secondaryip": []
            // }]
        }.bind(this))
      },
      fetchNetworkData(){
           this.$http.get('/client/api',{
            params:{
                command:'listNetworks',
                details: 'nics',
                zoneid: this.$route.query.zoneid,
                response: 'json'
            }
        }).then(function(response){
          this.networkData=response.listnetworksresponse.network
        }.bind(this))
      },
      fetchIpAddress(fetchNetworkData){
          this.$http.get('/client/api',{
                params:{
                    command:'listPublicIpAddresses',
                    allocatedonly: false,
                    networkid: fetchNetworkData,
                    response: 'json'
                }
            }).then(function(response){
                if(response.listpublicipaddressesresponse.publicipaddress){
                     this.ipAddressData=response.listpublicipaddressesresponse.publicipaddress
                }
            }.bind(this))
      },
      showIpSelectModal(networkid){
          this.ipSelectModal=true;
          this.fetchIpAddress(networkid)
      },
      addNic(){
          this.$http.get('/client/api',{
                params:{
                    command:'addNicToVirtualMachine',
                    virtualmachineid: this.$route.query.id,
                    networkid: this.networkSelected,
                    response: 'json'
                }
            }).then(function(response){
                if(response.addnictovirtualmachineresponse.jobid){
                    this.$queryJobResult(response.addnictovirtualmachineresponse.jobid,'添加成功',this.fetchNicData())
                }
            }.bind(this))
      },
      updateVmNicIp(){
           this.$http.get('/client/api',{
                params:{
                    command:'addNicToVirtualMachine',
                    nicId: '',
                    ipaddress: '',
                    response: 'json'
                }
            }).then(function(response){
                if(response.addnictovirtualmachineresponse.jobid){
                     this.$Notice.open({
                        desc: '添加成功'
                    });
                    this.fetchNicData();
                }
            }.bind(this))
      },
      deletedNic(){
           this.$http.get('/client/api',{
                params:{
                    command:'removeNicFromVirtualMachine',
                    virtualmachineid: this.$route.query.id,
                    nicid: '',
                    response: 'json'
                }
            }).then(function(response){
                if(response.addnictovirtualmachineresponse.jobid){
                     this.$Notice.open({
                        desc: '添加成功'
                    });
                    this.fetchNicData();
                }
            }.bind(this))
      }
  },
  created(){
      this.fetchNicData();
      this.fetchNetworkData();
  }
}
</script>
<style lang="scss"  type="text/css">
.nic-content{
     .operation-row{
        ul{
            padding:19px 0 17px;
            li{ 
                float: left;
                margin-right: 36px;
                text-align: center;
                cursor: pointer;
                &:last-child{
                    margin-right: 0;
                }
                .icon{
                    display: inline-block;
                    width: 53px;
                    height: 53px;
                    line-height: 53px;
                    background-color: #f6f6f6;
                    border-radius: 50%;
                    text-align: center;
                    img{
                        vertical-align: middle;
                    }
                }
                p{
                    height: 50px;
                    line-height: 50px;
                    color: #333333;
                }
            }
        }
    }
    .nic-list{
        .nic-item{
            float: left;
            padding:9px 16px 18px;
            margin-right: 80px;
            margin-bottom: 34px;
            width: 346px;
            background-color: #f6f6f6;
            &:nth-child(3n){
                margin-right: 0;
            }
            .nic-item-title{
                padding-left: 42px;
                height: 56px;
                line-height: 56px;
                font-weight: bold;
                font-size: 16px;
                background:url('../../assets/instances_nic_icon_1.png') no-repeat 0 center;
                color: #333;
                .nic-operation{
                    float: right;
                    padding-right: 10px;
                    span{
                        margin:0 8px;
                        font-weight: normal;
                        cursor: pointer;
                        &:hover{
                            color: #2096d3;
                        }
                    }
                }
            }
            .nic-item-inner{
                ul{
                    li{
                        height: 20px;
                        line-height: 20px;
                        color: #666;
                        span{
                            padding-right: 20px;
                        }
                    }
                    .nic-item-ipaddress,.nic-item-secondary-ips{
                        i{
                            font-style: normal;
                            cursor: pointer;
                            &:hover{
                                color: #2096d3;
                            }
                        }
                    }
                }
            }
        }
        .default-nic-item{
            background-color: #51e299;
            .nic-item-title{
                background-image: url('../../assets/instances_nic_icon.png');
                 color: #fff;
            }
            .nic-item-inner{
                ul{
                    li{
                        color: #fff;
                    }
                }
            }
        }
    }
}
</style>

