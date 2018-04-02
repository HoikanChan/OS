<template>
    <div class="container" @keyup.enter="submitForm('loginForm')">
        <Row  class="row-bg" type="flex" justify="center" align="middle">
            <Form :model="loginForm" :rules="rules" ref="loginForm"  class="ruleForm" :label-width="80">
                <Row>
                        <FormItem label="用户名" prop="username">
                            <Input v-model="loginForm.username" placeholder="请输入用户名"></Input>
                        </FormItem>
                </Row>
                <Row>
                        <FormItem label="密码" prop="password" >
                            <Input type="password" v-model="loginForm.password" placeholder="请输入密码"></Input>
                        </FormItem>
                </Row>
                <Row>
                        <FormItem>
                            <Button type="primary" @click.prevent="submitForm('loginForm')" >登录</Button>
                        </FormItem>
                </Row>
            </Form>
        </Row>
    </div>
</template>

<script>
import { setCookie,getCookie,delCookie } from '../common/js/cookie'
export default {
  name: '',
  data () {
    return {
      loginForm:{
          username:'',
          password:'',
          command:'login',
          domain: '/',
          response: 'json'
      },
      rules: {
          username:[
              { required: true, message: '请输入用户名', trigger: 'blur' },
          ],
          password:[
              { required: true, message: '请输入密码', trigger: 'blur' },
          ]
      }
    }
  },
  methods:{
      submitForm(formName){
          //表单验证
          this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$http.post('/client/api',this.loginForm).then(function(response){
                //保存数据到cookie上，在记录数据有效期内，免去登录
                setCookie('userId',response.loginresponse.userid,response.loginresponse.timeout);
                setCookie('account',response.loginresponse.account,response.loginresponse.timeout);
                setCookie('firstName',response.loginresponse.firstname,response.loginresponse.timeout);
                setCookie('lastName',response.loginresponse.lastname,response.loginresponse.timeout);
                setCookie('domainId',response.loginresponse.domainid,response.loginresponse.timeout);
                setCookie('sessionKey',response.loginresponse.sessionkey,response.loginresponse.timeout);
                setCookie('userName',response.loginresponse.username,response.loginresponse.timeout);
                setCookie('role',response.loginresponse.type,response.loginresponse.timeout);
                 //路由跳转到首页
                this.$router.push({path:'/'});
            }.bind(this)).catch(function(error){
                //报错信息提示
                 this.$Notice.error({
                    title: error.response.data.loginresponse.errortext,
                    desc: error
                });
            }.bind(this))
          } else {
            return false;
          }
        });
      },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/css" scoped>
.container{
    height:100vh;
    form{
        margin: 50vh auto 0;
         transform: translateY(-50%);
    }
}
</style>
