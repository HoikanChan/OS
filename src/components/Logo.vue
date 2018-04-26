<template>
       <div id="logo">
                <img src="../assets/logo.png" alt="">
                <router-link to='/'  class="logo-link">遥感云系统</router-link>
                 <i-select :model.sync="projectId" :placeholder="placeholder" class="projectSelect" style="">
                     <!-- <i-option value="-1">默认视图</i-option> -->
                    <i-option v-for="item in listprojects" :value="item.id" :key="item.id">{{ item.projectaccountname }}</i-option>
                </i-select>
        </div>
</template>

<script>
import { setCookie,getCookie,delCookie } from '../common/js/cookie'
export default {
  name: 'v-logo',
  data () {
    return {
        projectId:"",
        listprojects:[],
        placeholder:""
    }
  },
  methods:{
  },
  created(){
      this.$http.get("client/api",{
          params:{
              command:"listProjects",
              response:"json",
              accountId:getCookie("accountId"),
              listAll:true,
              page:1,
              pageSize:500,
          }
      }).then(function(response){
            let defaultProject = {
                id:-1,
                projectaccountname:"默认"
            }
            if(response.listprojectsresponse.project){
                 response.listprojectsresponse.project.unshift(defaultProject);
                 this.listprojects=response.listprojectsresponse.project;
            }
            this.placeholder=defaultProject.projectaccountname;
            this.projectId=defaultProject.id;
      }.bind(this))
  },
  mounted(){
    //   debugger
    //   if(getCookie('role')==1){
    //       this.projectId==-1
    //   }else{
    //       this.listprojects[0].id
    //   }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/css">
 #logo{
        height: 75px;
        line-height: 75px;
        img{
            vertical-align: middle;
            margin-top: -6px;
        }
        .logo-link{
                font-size: 22px; 
                text-decoration: none;
                color: #fff;
        }
        .projectSelect{
            width: initial;
            margin-left: 5px;
            margin-top: -5px;
        }
        .ivu-select-selection{
            background-color: transparent;
            border-color: transparent;
            width:initial;
        }
        .ivu-select-dropdown{
            overflow: hidden;
            min-width: 100px;
            max-width: 200px;
            width: initial!important;
            .ivu-select-item{
                text-overflow: ellipsis;
                white-space: nowrap;
                overflow: hidden;
            }
        }
        .ivu-select-selected-value{
            color: #fff;
        }
}
</style>
