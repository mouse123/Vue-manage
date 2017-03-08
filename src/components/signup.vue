<template>
<div>
    <heading></heading>
    <el-row type="flex" class="row-bg" justify="center" >
      <el-col :span="6"></el-col>
      <el-col :span="6">
    
		<h3>欢迎注册</h3>
			<el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-width="100px" label-position="top" class="demo-ruleForm">
			  <el-form-item label="用户名" prop="userName">
			    <el-input v-model="ruleForm2.userName" placeholder="请输入用户名"></el-input>
			  </el-form-item>
			  <el-form-item label="密码" prop="pass">
			    <el-input type="password" v-model="ruleForm2.password" auto-complete="off" placeholder="请输入密码"></el-input>
			  </el-form-item>
			  <el-form-item label="确认密码" prop="checkPass">
			    <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off" placeholder="请再次输入密码" ></el-input>
			  </el-form-item>
			  <el-form-item label="年龄" prop="age">
			    <el-input v-model.number="ruleForm2.age" placeholder="请输入年龄"></el-input>
			  </el-form-item>
			  <el-form-item>
			    <el-button type="primary" @click="submitForm('ruleForm2')" >提交</el-button>
			    <el-button @click="resetForm('ruleForm2')">重置</el-button>
			  </el-form-item>
			</el-form>
		</el-col>
		<el-col :span="6"></el-col>
      </el-row>
	</div>
</template>

<script type="text/javascript">
import heading from './Heading'
  export default {
  	components: { heading },
	data() {
      var checkUser = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('用户名不能为空'));
          
        }else{
        	callback();
        }
      };
      var checkAge = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('年龄不能为空'));
          console.log(value)
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入数字值'));
          } else {
            if (value < 18) {
              callback(new Error('必须年满18岁'));
            } else {
              callback();
            }
          }
        }, 1000);
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm2.checkPass !== '') {
            this.$refs.ruleForm2.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm2.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        ruleForm2: {
          userName: '',
          password: '',
          checkPass: '',
          age: ''
        },
        rules2: {
          userName: [
          	{ validator: checkUser, trigger: 'blur' }
          ],
          password: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          age: [
            { validator: checkAge, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
      	this.fullscreenLoading = true;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let obj = {
              name: this.ruleForm2.userName,
              password: this.ruleForm2.password,
              age: this.ruleForm2.age
            }
            // console.log(this.ruleForm2.userName)
            // console.log(this.ruleForm2.password)
            this.$http.post('/auth/users',obj)
            .then((res) => {
              if(res.status == 200){
                  this.$message({
                    type: 'success',
                    message: '创建成功！'
                  })
                  this.$router.push('/signin');
                }else{
                  this.$message.error('创建失败！')
                }
              }, (err) => {
                this.$message.error('创建失败！')
                console.log(err)
            })
            this.ruleForm2.userName='';
            this.ruleForm2.password='';
            this.ruleForm2.checkPass='';
            this.ruleForm2.age='';
            // console.log(this.ruleForm2);
            
          }else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style type="text/css">
	
</style>
