<template>
  <div class="login-container">
    <el-form
      :model="form"
      status-icon
      :rules="rules"
      ref="form"
      label-width="80px"
      class="login-form"
    >
      <h2 class="login-title">登录</h2>
      <el-form-item label="账号" prop="username">
        <el-input placeholder="请输入账号" v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          v-model="form.password"
          placeholder="请输入密码"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="onSubmit('form')" type="primary">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
 import {login} from '@/api/login.js'
 import memoryUtils from "@/utils/memoryUtils"
 import  storageUtils from '../../utils/storageUtils'
export default {
  data() {
    var validataUserName = (rule, value, callback) => {
        value = value.trim();
        const length = value && value.length;
        const pwdReg = /^[a-zA-z0-9_]+$/;
        if (value === "") {
          callback(new Error("请输入账号"));
        } else if (length < 4 || length > 12) {
          callback(new Error("长度在4-12个字符之间"));
        } else if (!pwdReg.test(value)){
          callback(new Error("账号必须由英文、字母或下划线组成"));
        } else {
          callback();
        }
      };
    return {
      form: {
        username: "",
        password: "",
      },

      rules: {
        username: [
          {
            required: true,
            validator: validataUserName,
            trigger: ["blur", "change"],
          },
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: ["blur", "change"],
          },
        ],
      },
    };
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate(async(valid) => {
        if (valid) {
          let result =await login(this.form.username, this.form.password)
          //console.log(this.form.username, this.form.password);
          result= result.data;
          if(result.status==0){
            this.$message({
              message:'登录成功',
              type:'success'
            });
            const user = result.data
            storageUtils.saveUser(user)
            memoryUtils.user=user
            this.$router.replace('/')
          }
        } else {
          console.log("error submit!");
          return false;
        }
      });
    },
  },
};
</script>

<style scoped>
.login-form {
  width: 350px;
  margin: 160px, auto;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 30px;
  border-radius: 20px;
}
.login-container {
  position: absolute;
  width: 100%;
  height: 100%;
  background: url(../../assets/tupian.webp);
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-title {
  text-align: center;
  color: #303133;
}
</style>