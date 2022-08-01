<template>
  <div class="header">
    <a href="#/">
      <img src="@/assets/logo.png" class="logo" width="25px" />
      <span class="company">东北农业大学管理系统</span>
    </a>
    {{/*头部下拉菜单*/}}
    <el-dropdown @command="handleCommand">
      <span class="el-dropdown-link el-icon-user-solid">
        {{ user.username}}<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <div>
          <el-dropdown-item command="a" class="el-icon-edit-outline"
            >修改密码</el-dropdown-item
          >
        </div>
        <div>
          <el-dropdown-item command="b" class="el-icon-s-home"
            >退出登录</el-dropdown-item
          >
        </div>
      </el-dropdown-menu>
    </el-dropdown>
    <span class="date-weather">
      <span class="date">{{ currentTime }}</span>
      &nbsp;&nbsp;|&nbsp;&nbsp;
      <span class="weather"
        ><i :class="wea_img"></i>&nbsp;&nbsp; {{ wea }}&nbsp;&nbsp;{{
          tem_day
        }}/{{ tem_night }}C&deg;</span
      >
    </span>
        <el-dialog
      title="修改密码"
      :visible.sync="dialogFormVisible"
      width="500px"
    >
      <el-form
        status-icon
        :model="userForm"
        ref="userForm"
        label-width="100px"
        style="width: 400px"
        :rules="rules"
      >
        <el-form-item label="原密码" prop="oldPass">
          <el-input
            v-model="userForm.oldPass"
            type="password"
          ></el-input>
        </el-form-item>
         <el-form-item label="新密码" prop="pass">
          <el-input
            v-model="userForm.pass"
            type="password"
          ></el-input>
        </el-form-item>
         <el-form-item label="确认密码" prop="checkPass">
          <el-input
            v-model="userForm.checkPass"
            type="password"
          ></el-input>
        </el-form-item>
         <el-form-item>
          <el-button
           type="primary"
           @click="submitForm('userForm')"
          >提交
          </el-button>
          <el-button @click="$refs['userForm'].resetFields()">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { reqWeather } from "@/api/jsonp.js";
import { formateDate } from "@/utils/dateUtils";
import memoryUtils from "../../utils/memoryUtils";
import storageUtils from "../../utils/storageUtils";
import userApi  from   '@/api/user.js'
export default {
  data() {
    const validateOldPass = (rule,value,callback)=>{//校验原密码
        userApi.checkPwd(this.user._id,value).then(response=>{
          const resp = response.data
          if(resp.status==0){
            callback()
          }else{
            callback(new Error(resp.msg))
          }
        })
    }
    const validatePass = (rule,value,callback)=>{
      if(value != this.userForm.pass){
        callback(new Error('两次输入密码不一致'))
      }else{
        callback()
      }
    }
    return {
      user:memoryUtils.user,
      currentTime: formateDate(Date.now()),
      tem_day: "",
      tem_night: "",
      wea: "",
      wea_img: "",
      dialogFormVisible:false,
      userForm:{
        oldPass:"",
        pass:"",
        checkPass:""
      },
      rules:{
        oldPass:[
          {required:true,message:'旧密码不能为空',trigger:"blur"},
          {validator:validateOldPass,trigger:'change'}
        ],
        pass:[
          {required:true,message:'新密码不能为空',trigger:'blur'}
        ],
        checkPass:[
          {required:true,message:'确认密码不能为空',trigger:'blur'},
          {validator:validatePass,trigger:'change'}
        ]
      }
    };
  },

  components: {},

  methods: {
    handleCommand(command) {
      switch (command) {
        case "a":
          this.handlePwd()
          break;
        case "b":
          this.handleLogout()
          
          break;
        default:
          break;
      }
    },
    submitForm(formName){
      this.$refs[formName].validate(valid=>{
        if(valid){
          userApi.updatePwd(this.user._id,this.userForm.checkPass).then(response=>{
            const resp = response.data
            this.$message({
              message:"修改密码成功",
              type:resp.status==0?'success':'warning'
            })
            if(resp.status==0){
              this.handleLogout()
              this.dialogFormVisible=false
            }
          })
        }else{
            return false
        }
      })
    },
    handleLogout(){
       memoryUtils.user={}
       storageUtils.removeUser();
       this.$router.replace('/login')
    },
    getWeather() {
      reqWeather("北京").then((response) => {
        const { tem_day, tem_night, wea, wea_img } = response;
        console.log("天气信息", response);
        const weaImgs = {
          xue: "el-icon-light-rain",
          lei: "el-icon-ligthning",
          shachen: "el-icon-sunrise",
          wu: "el-icon-cloudy-and-sunny",
          bingbao: "el-icon-light-rain",
          yun: "el-icon-cloudy",
          yu: "el-icon-heavy-rain",
          yin: "el-icon-partly-cloudy",
          qing: "el-icon-sunny",
        };
        this.tem_day = tem_day;
        this.tem_night = tem_night;
        this.wea = wea;
        this.wea_img = weaImgs[wea_img];
      });
    },
    getTime() {
      setInterval(() => {
        this.currentTime = formateDate(Date.now());
      }, 1000);
    },
    handlePwd(){
      this.dialogFormVisible=true;
      this.$nextTick(()=>{
        this.$refs['userForm'].resetFields()
      });
    }
  },
  mounted() {
    this.getWeather();
    this.getTime();
  },
};
</script>

<style scoped>
.header {
  position: absolute;
  line-height: 50px;
  padding: 0px;
  top: 0px;
  left: 0px;
  right: 0px;
  background-color: #2d3a4b;
}
.logo {
  vertical-align: middle;
  padding: 0 20px 0 40px;
}
.company {
  position: absolute;
  color: aliceblue;
}
.el-dropdown {
  float: right;
  margin-right: 40px;
}
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.date-weather {
  float: right;
  color: white;
  margin-right: 30px;
  font-size: 12px;
}
</style>