<template>
  <div>
    <div style="margin: 20px 0">
      <el-button type="primary" @click="handleAdd">添加用户</el-button>
    </div>
    <el-table :data="users" heigth="380" border style="width: 100%">
      <el-table-column label="序号" width="60" type="index"></el-table-column>
      <el-table-column label="用户名" prop="username"></el-table-column>
      <el-table-column label="姓名" prop="name"></el-table-column>
      <el-table-column label="电话" prop="phone"></el-table-column>
      <el-table-column
        label="创建时间"
        prop="create_time"
        :formatter="resetDate"
      ></el-table-column>
      <el-table-column label="所属角色" prop="role_id" :formatter="geRole"></el-table-column>
      <el-table-column label="操作" width="250">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row._id)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row._id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
    <!-- 添加用户表单 -->
    <el-dialog title="添加用户" :visible.sync="userFormVisible" width="500px">
      <el-form
        status-icon
        :model="user"
        ref="userForm"
        label-width="100px"
        label-position="right"
        style="width: 400px"
        :rules="rules"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="user.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="user.password" type="password"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="user.name" palceholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="role_id">
          <el-select
            v-model="user.role_id"
            class="filter-item"
            placeholder="请点击选择"
          >
            <el-option
              v-for="option in roleOptions"
              :key="option._id"
              :label="option.name"
              :value="option._id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="手机号码" prop="phone">
          <el-input v-model="user.phone"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="userFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="
            user._id == null ? addData('userForm') : updateData('userForm')
          "
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import userApi from "@/api/user.js";
import { formateDateLess } from "@/utils/dateUtils";
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
      } else if (!pwdReg.test(value)) {
        callback(new Error("账号必须由英文、字母或下划线组成"));
      } else {
        callback();
      }
    };
    var validataPhone = (rule, value, callback) => {
      value = value.trim();
      const pwdReg =
        /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
      if (value === "") {
        callback(new Error("请输入手机号码"));
      } else if (!pwdReg.test(value)) {
        callback(new Error("请输入正确手机号码"));
      } else {
        callback();
      }
    };
    return {
      userFormVisible: false, //编辑窗口是否显示
      totalPage:1,
      user: {
        //新增或编辑用户数据
        _id: null,
        username: "",
        password: "",
        name: "",
        phone: "",
        role_id: "",
      },
      rules: {
        username: [
          {
            required: true,
            validator: validataUserName,
            trigger: ["blur", "change"],
          },
        ],
        phone: [
          {
            required: true,
            validator: validataPhone,
            trigger: ["blur", "change"],
          },
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur",
          },
          {
            min: 4,
            message: "密码长度需大于等于4位",
            trigger: "blur",
          },
        ],
        name: [
          {
            required: true,
            message: "请输入姓名",
            trigger: "blur",
          },
        ],
        role_id: [
          {
            required: true,
            message: "请选择角色",
            trigger: "blur",
          },
        ],
      },
      roleOptions: [],
      users: [],
      pageSize: 5, //每页显示条数
      currentPage: 1, //当前页
      total: 0, //总计
    };
  },

  components: {},
  mounted() {
    this.fetchUsers();
  },
  methods: {
    fetchUsers() {
      if(this.currentPage > Math.ceil(this.totalPage)){
        this.currentPage = Math.ceil(this.totalPage)
      }
      userApi.getUserList(this.currentPage, this.pageSize).then((response) => {
        const resp = response.data;
        if (resp.status === 0) {
          this.users = resp.data.data;
          this.roleOptions = resp.data.roles;
          this.total = resp.data.total;
          this.totalPage = this.total/this.pageSize
        }
      });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize=val
       this.fetchUsers();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage=val
       this.fetchUsers();
    },
    handleEdit(_id) {
      this.handleAdd();
      userApi.getUserById(_id).then((response) => {
        const resp = response.data;
        if (resp.status == 0) {
          this.user = resp.data;
        }
      });
    },
    handleDelete(id) {
      this.$confirm("确认删除改用户吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          userApi.deleteUserById(id).then((response) => {
            const resp = response.data;
            if (resp.status == 0) {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              this.totalPage = (this.total - 1)/this.pageSize
              this.fetchUsers();
            }
          
          });
        }).catch(() => {});
    },
    resetDate(row, column, cellValue, index) {
      return formateDateLess(cellValue);
    },
    geRole(row,column,cellValue,index){
      return  this.roleOptions.find(item=>item._id===cellValue).name
    },
    //添加用户
    addData(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          userApi.addUser(this.user).then((response) => {
            const res = response.data;
            if (res.status == 0) {
              this.fetchUsers();
              this.userFormVisible = false;
              this.$message({
                type: "success",
                message: "添加用户成功",
              });
            }

            //新增成功，刷新列表数据
          });
        } else {
          return false;
        }
      });
    },
    //打开用户窗口
    handleAdd() {
      (this.user = {
        _id: null,
        username: "",
        password: "",
        name: "",
        phone: "",
        role_id: "",
      }),
        (this.userFormVisible = true);
      this.$nextTick(() => {
        this.$refs["userForm"].resetFields();
      });
    },
    //更新用户数据
    updateData(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          userApi.updateUser(this.user).then((response) => {
            const res = response.data;
            if (res.status == 0) {
              this.fetchUsers();
              this.userFormVisible = false;
              this.$message({
                type: "success",
                message: "更新用户数据成功",
              });
            }
            //新增成功，刷新列表数据
          });
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<style scoped>
</style>