<template>
<div>
  <heading></heading>
  <el-row class="content">
    <el-col :xs="24" :sm="{span: 6,offset: 9}">
      <span class="title">
       <h3>欢迎登录</h3>
      </span>
      <div style="margin: 20px 0;"></div>
      <el-row>
        <el-input
          v-model="account"
          placeholder="账号"
          type="text">
        </el-input>
        <div style="margin: 20px 0;"></div>
        <el-input
          v-model="password"
          placeholder="密码"
          type="password"
          @keyup.enter.native="signinToDo">
        </el-input>
        <div style="margin: 20px 0;"></div>
        <el-button type="primary" @click="signinToDo">登录</el-button>
      </el-row>
    </el-col>
  </el-row>
</div>
</template>

<script>
import heading from './Heading'
export default {
  components: { heading },
  data () {
    return {
      account: '',
      password: ''
    };
  },
  methods: {
    signinToDo() {
      let obj = {
        name: this.account,
        password: this.password
      }
      this.$http.post('/auth/user', obj) // 将信息发送给后端
        .then((res) => {
          console.log(res);
          if(res.data.success){ // 如果成功
            sessionStorage.setItem('user-token',res.data.token); // 用sessionStorage把token存下来
            this.$message({ // 登录成功，显示提示语
              type: 'success',
              message: '登录成功！'
            });
            this.$router.push('/news') // 进入todolist页面，登录成功
          }else{
            this.$message.error(res.data.info); // 登录失败，显示提示语
            sessionStorage.setItem('user-token',null); // 将token清空
          }
        }, (err) => {
            this.$message.error('请求错误！')
            sessionStorage.setItem('user-token',null); // 将token清空
        })
    }
  }
};
</script>

<style scoped>
  .el-button {
    margin-top: 12px;
    padding: 10px;
  }
</style>