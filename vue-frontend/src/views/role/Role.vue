<template>
  <div class="btn_box" style="margin: 20px 0px">
    <div style="margin: 10px">
      <el-button type="primary" @click="handleAdd">创建角色</el-button>
      <el-button type="primary" :disabled="currentRow ? false:true " @click="handleUpdateAuth">设置角色权限</el-button>
    </div>
    <el-table
      :data="roleList"
      heigth="380"
      border:true
      style="width: 100%"
      highlight-current-row
      @current-change="handleCurrentChange"
    >
      <el-table-column type="index" label="序号" width="50"> </el-table-column>
      <el-table-column property="name" label="角色名称"> </el-table-column>
      <el-table-column property="create_time" label="创建时间" :formatter="resetDate">
      </el-table-column>
      <el-table-column property="auth_time" label="授权时间" :formatter="resetDate"> </el-table-column>
      <el-table-column property="auth_name" label="授权人"> </el-table-column>
    </el-table>

    <!-- 对话框表单 -->
    <el-dialog title="添加角色" :visible.sync="dialogFormVisible" width="500px">
      <el-form
        status-icon
        :model="role"
        ref="roleForm"
        label-width="100px"
        label-position="right"
        style="width: 400px"
        :rules="rolesRules"
      >
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="role.name" placeholder="请输入角色名称"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addData('roleForm')">确 定</el-button>
      </div>
    </el-dialog>
     <!-- 为角色添加权限弹窗 -->
      <el-dialog title="设置角色权限" :visible.sync="roleAuthVisible" width="500px">
        <Auth :role="currentRow" ref="auth"/>
      <div slot="footer" class="dialog-footer">
        <el-button @click="roleAuthVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateData">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import roleApi from "@/api/role.js";
import Auth  from "./Auth.vue"
import memoryUtils from "@/utils/memoryUtils";
import  {formateDateLess}  from '@/utils/dateUtils'
export default {
  data() {
    return {
      currentRow: null,
      roleList: [],
      role: {
        name: "",
        menus: [],
      },
      rolesRules: {
        name: [
          { required: true, message: "角色名称必须输入", trigger: "blur" },
        ],
      },
      dialogFormVisible: false,
      roleAuthVisible:false,
    };
  },

  components: {
    Auth
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    //打开设置权限窗口
    handleUpdateAuth(){
        this.roleAuthVisible=true
    },
    handleCurrentChange(val) {
      this.currentRow = val;
    },
    handleAdd() {
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["roleForm"].resetFields();
      });
    },
    fetchData() {
      roleApi.getRolelist().then((response) => {
        const res = response.data;
        if (res.status == 0) {
          this.roleList = res.data;
        } else {
          this.$message({
            message: res.msg,
            type: "warning",
          });
        }
      });
    },
    addData(roleForm) {
      this.$refs[roleForm].validate((valid) => {
        if (valid) {
          //验证通过，提交添加
          roleApi.addRole(this.role.name).then((response) => {
            const resp = response.data;
            if (resp.status == 0) {
              this.$message({
                type: "success",
                message: "添加角色成功",
              });
              this.dialogFormVisible = false;
              this.fetchData();
            }
          });
        } else {
          return false;
        }
      });
    },
    updateData(){
      //获取最新的menus和name
      // console.log(this.$refs['auth'].getMenus());
      const newRole = this.$refs['auth'].getMenus()
      this.currentRow.menus = newRole.menus
      this.currentRow.name = newRole.name
      this.currentRow.auth_name=memoryUtils.user.username
      roleApi.updateRole(this.currentRow).then(response=>{
        const res = response.data;
        if(res.status==0){
          this.$message({
            message:'更新角色成功',
            type:'success'
          })
        }
        this.roleAuthVisible=false;
        this.fetchData()
      })
    },
    resetDate(row,column,cellValue,index){
      return  formateDateLess(cellValue)
    }
   
  },
};
</script>

<style scoped>
</style>