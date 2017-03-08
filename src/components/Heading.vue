<template>
   <div>
    <el-row>
      <el-col :span="20">
        <el-menu default-active="news" class="el-menu-demo" mode="horizontal" @select="" :router="true">
          <el-menu-item index="news">新闻管理</el-menu-item>
          <el-menu-item index="4">汽车图片管理</el-menu-item>
          <el-menu-item index="5">客户反馈内容列表</el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="4">
        <div v-if="id">
            <el-menu default-active="11" class="el-menu-demo" mode="horizontal" @select="" :router="true">
            <el-menu-item index="news">欢迎{{name}}</el-menu-item>
            <el-menu-item index="" @click="exit">退出</el-menu-item>
          </el-menu>

          
        </div>
        <div v-else>
            <el-menu default-active="" class="el-menu-demo" mode="horizontal" @select="" :router="true">
             <el-menu-item index="signup">注册</el-menu-item>
            <el-menu-item index="signin">登录</el-menu-item>
          </el-menu>
        </div>
      </el-col>
    </el-row>
  <router-view></router-view>
</div>

</template>

<script type="text/javascript">
import jwt from 'jsonwebtoken'

export default {
    created(){
      const userInfo = this.getUserInfo();
      if(userInfo != null){
        this.id = userInfo.id;
        this.name = userInfo.name;
      }else{
        this.id = '';
        this.name = ''
      }
      console.log(userInfo);
  },
  data () {
    return {
      name: '',
      id: '',
      isSign: 0,
      userInfo: ''


    }
  },
  methods:{
    getUserInfo(){
      const token = sessionStorage.getItem('user-token');
      if(token != null && token != 'null'){
        let decode = jwt.verify(token,'mouse-token');
        return decode
      }else {
        return null
      }
    },
    
    exit(){
      this.$confirm('是否退出', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '退出成功!'
          })
          sessionStorage.setItem('user-token',null);
          this.$router.push('/signin')
          this.isSign=!this.isSign;
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });          
        });
    }
  }
}
</script>

<style scoped>
  
</style>
