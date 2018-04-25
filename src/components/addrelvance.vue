<template>
    <Row>
        <div class="wrapper">
            <h4>
                <Icon type="heart"></Icon>&nbsp;save
            </h4>
        </div>
        <div class="wrapper">
            <div class="input-label">
                <span><i class="muststar">*</i>名称：</span>
            </div>
            <Input v-model="value1" ref="vulue2" type="text" :value="value1" ></Input>
        </div>
        <div class="wrapper">
            <div class="input-label">
                <span>说明：</span>
            </div>
           <Input v-model="value2" ref="vulue2" type="text" :value="value2" ></Input>
        </div>
        <div class="wrapper">
             <div class="input-label">
                <span>类型：</span>
            </div>
           <i-select class="projectSelect" v-model="valueSelect">
              <i-option v-for="(item,index) in listAffinityGroupTypes" :value="item.type" :key="item.type" v-bind:index="index"  >{{ item.type }}</i-option>
           </i-select>
        </div>
    </Row>
</template>
<script>
    export default {  
        name: 'addrelvance',
        data() {
            return {
                value1:'',
                value2:'',
                valueSelect:'',
                listAffinityGroupTypes:[],
            }
        },
        methods:{
        
          getListType(){
           this.$http.get("client/api",{
                params:{
                    command:"listAffinityGroupTypes",
                    response:"json",
                }
            }).then(function(response){
                this.listAffinityGroupTypes=response.listaffinitygrouptypesresponse.affinityGroupType;
                this.valueSelect=this.listAffinityGroupTypes[0].type;
            }.bind(this))
          }
        },
        created(){
          this.getListType();
    //      this.valueSelect = this.listAffinityGroupTypes[0].type;
          console.log(this.valueSelect);
          console.log(this.value1);
        }

    }
</script>
<style lang="scss" >
.wrapper{
  margin-bottom:15px;
  height:30px;
  .input-label {
	width: 20%;
	float: left;
  }
  .ivu-input-wrapper,.projectSelect {
    float: left;
    width: 80%;
  }
}

</style>