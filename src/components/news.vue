<template>
  <div>
  	<heading></heading>
    <main>
          <!-- 左侧导航 -->
        <div class="main-left">
          <el-menu default-active="/activePublic" class="el-menu-vertical-demo" >
            <el-menu-item index="" @click="isActive=true">新闻发布</el-menu-item>
            <el-menu-item index=" " @click="isActive=false">新闻管理</el-menu-item>
          </el-menu>
        </div>
  
          <!-- 右侧主内容区 -->
          <div  class="main-right" v-if="isActive">
            <el-form ref="form"  label-width="80px">
              <el-form-item label="新闻名称">
                <el-input v-model="title"></el-input>
              </el-form-item>
              <el-form-item label="新闻时间">
                <el-col :span="24 ">
                  <el-date-picker type="date" placeholder="选择日期" v-model="time" style="width: 100%;"></el-date-picker>
                </el-col>
              </el-form-item>
              <el-form-item label="新闻内容">
                <el-input type="textarea" v-model="content"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit">立即发布</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div  class="main-right" v-else>
            <div class="content"v-for="(item,index) in list" >
           
              <el-form ref="form"  label-width="80px">
            <el-form-item label="新闻名称">
                <el-input v-model = "item.title"></el-input>
              </el-form-item>
              <el-form-item label="新闻时间">
                <el-col :span="24 ">
                <el-date-picker type="date" style="width: 100%;" v-model = "item.time"></el-date-picker>
                </el-col>
              </el-form-item>
              <el-form-item label="新闻内容">
                <el-input type="textarea" v-model = "item.content" :autosize="{ minRows: 2, maxRows: 4 }"></el-input>
              </el-form-item>
              <el-form-item>
              </el-form-item>
            </el-form>
                <!-- 新闻名称：<el-button @click="open1(index)">{{ item.title }}</el-button><br>

                新闻时间：<el-button @click="open2(index)">{{ item.time }}</el-button><br>

                新闻内容：<el-input
                  type="textarea"
                  :autosize="{ minRows: 2, maxRows: 4}"
                 :value="item.content">
                </el-input> -->
<!--                 内容：<el-button @click="open(index)"><p>{{ item.content }}</p></el-button> -->
                <!-- ID：{{ item.id }} -->

                <el-button type="success" size='small' @click="open(index)">提交修改</el-button>
                <el-button type="danger"size='small' @click="remove(index)">删除</el-button>
            </div>
          </div>

    </main>
    
  </div>
</template>

<script>
import heading from './Heading'
export default {
    created(){
      this.getNewslist();
    },
    components: { heading },
    data () {
      return {
        news_id: 1,
        list: [],
        active: true,
        isActive: true,
        title: '',
        time: '',
        date1: '',
        data2: '',
        content: '' ,
        disabled: false  
      }
    },
    methods: {
      onSubmit() {
       if(this.title&&this.time&&this.content){
          let obj = {
            title: this.title,
            time: this.time,
            content: this.content,
            news_id: 1,
            status: 200,
          }
          this.$http.post('/api/news',obj)
          .then((res) => {
            if(res.status == 200){
            this.$message({
              type: 'success',
              message: '创建成功！'
            })
            this.getNewslist();
          }else{
            this.$message.error('创建失败！')
          }
        }, (err) => {
          this.$message.error('创建失败！')
          console.log(err)
        })
          
       }  this.title = '',
          this.time = '',
          this.content =  ''
      },
      open(index){
        // console.log(this.list[index].content)
        this.$confirm('确定修改？','提示',{
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(({}) => {
          // console.log(this.value)
            let obj={
              title: this.list[index].title,
              time: this.list[index].time,
              content: this.list[index].content,
            }
            console.log(this.list[index].title)
            this.$http.put('/api/news/'+ this.list[index].id,obj)
          .then((res) => {
            if(res.status == 200){
              this.$message({
                type: 'success',
                message: '新闻状态更新成功！'

              })
              this.getNewslist();
            }else{
              this.$message.error('新闻状态更新失败！')
            }
          }, (err) => {
            this.$message.error('新闻状态更新失败！')
            console.log(err)
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });       
        });
      },
      update(index){
        console.log(this.list[index].id);
      },
      remove(index){
        this.$confirm('确定修改？','提示',{
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(({}) => {
        this.$http.delete('/api/news/'+ this.list[index].id)
        .then((res) => {
          if(res.status == 200){
            this.$message({
              type: 'success',
              message: '新闻删除成功！'
            })
            this.getNewslist();
          }else{
            this.$message.error('新闻删除失败！')
          }
        }, (err) => {
          this.$message.error('新闻删除失败！')
          console.log(err)
        })
       }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });       
        });
      },
      getNewslist(){
        this.$http.get('/api/news/'+ this.news_id)
        .then((res) => {
          if(res.status === 200){
            this.list = res.data;
            console.log(this.list);
          }else{
            this.$message.error('获取列表失败')
          }
        },(err) =>{
              this.$message.error('获取列表失败')
            console.log(err)
        })
       }
      }
    }
</script>

<style>
      main{  display: -webkit-box;  display: -ms-flexbox;  display: flex;  min-height: 500px;  border: solid 40px #E9ECF1;  background-color: #FCFCFC;  }
	  main .main-left{text-align: center;width: 200px;float: left;}
	  main .main-right{-webkit-box-flex: 1;  -ms-flex: 1;  flex: 1;text-align: left;  background-color: #fff; padding: 50px 70px;margin: 5px;max-width: 600px}
    .content{
      margin-bottom: 50px;
      padding-bottom: 20px;
    }
    .el-button{
      max-height:200px; 
    }
	  main .el-menu{background-color: transparent!important;}

</style>
