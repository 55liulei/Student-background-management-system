<template>
  <div>
    <div style="margin: 20px" class="btn_bos">
      <el-button type="primary" @click="handleAdd">添加学校</el-button>
    </div>
    <el-table :data="schools" height="380" border style="width: 100%">
      <el-table-column label="序号" type="index" width="60"></el-table-column>
      <el-table-column label="学校名称" prop="schoolname"></el-table-column>
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
    <el-dialog
      title="添加/编辑"
      :visible.sync="schoolFormVisible"
      width="500px"
    >
      <el-form
        status-icon
        :model="school"
        ref="schoolForm"
        label-width="100px"
        label-position="right"
        style="width: 400px"
        :rules="rules"
      >
        <el-form-item label="学校名称" prop="schoolname">
          <el-input
            v-model="school.schoolname"
            placeholder="请输入学校名称"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="schoolFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="
            school._id == null
              ? addData('schoolForm')
              : updateData('schoolForm')
          "
          >确 定</el-button
        >
      </div>
    </el-dialog>
    <div>
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
    </div>
  </div>
</template>

<script>
import schoolApi from "@/api/school.js";
export default {
  data() {
    return {
      schoolFormVisible: false, //编辑窗口是否显示
      school: {
        _id: null,
        schoolname: "",
      },
      schools:[],
      totalPage:1,
      pageSize: 5, //每页显示条数
      currentPage: 1, //当前页
      total: 0, //总计
      rules: {
        schoolName: [
          {
            required: true,
            message: "学校名称必须输入",
            trigger: ["blur", "change"],
          },
        ],
      },
    };
  },

  components: {},
  mounted(){
    this.fetchSchool()
  },

  methods: {
    addData(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          schoolApi.addSchool(this.school).then((response) => {
            const resp = response.data;
            console.log(resp,'res');
            if (resp.status == 0) {
              this.schoolFormVisible = false;
              this.fetchSchool();
              this.$message({
                type: "success",
                message: "添加学校成功",
              });
            }
          });
        } else {
          console.log("error submit", error);
          return false;
        }
      });
    },
    updateData(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          schoolApi.updateSchool(this.school).then((response) => {
            const resp = response.data;
            if (resp.status == 0) {
              this.schoolFormVisible = false;
              this.fetchSchool();
              this.$message({
                type: "success",
                message: "更新学校成功",
              });
            }
          });
        } else {
          console.log("error submit", error);
          return false;
        }
      });
    },
    handleAdd() {
      this.school={
        _id:null,
        schoolname:""
      }
      this.schoolFormVisible = true;
      this.$nextTick(() => {
        this.$refs["schoolForm"].resetFields();
      });
    },
    handleEdit(_id) {
      this.handleAdd();
      schoolApi.getSchoolById(_id).then((response)=>{
        const resp = response.data;
        if(resp.status==0){
          this.school = resp.data
        }
      })
    },
     handleDelete(_id) {
      this.$confirm("确认删除该用户吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          schoolApi.deleteSchoolById(_id).then((response) => {
            const resp = response.data;
            if (resp.status == 0) {
              this.$message({
                type: "success",
                message: "删除学校成功!",
              });
              this.totalPage = (this.total - 1)/this.pageSize
              this.fetchSchool();
            }
          });
        }).catch(() => {});
    },
    handleSizeChange(val) {
     this.pageSize=val
      this.fetchSchool();
    },
    handleCurrentChange(val) {
     this.currentPage=val
      this.fetchSchool();
    },
    fetchSchool() {
      if(this.currentPage > Math.ceil(this.totalPage)){
        this.currentPage = Math.ceil(this.totalPage)
      }
      schoolApi
        .getSchoolList(this.currentPage, this.pageSize)
        .then((response) => {
          const res = response.data;
          console.log('------',res);
          if (res.status == 0) {
            this.schools = res.data.data;
            this.total = res.data.total;
             this.totalPage = this.total/this.pageSize
          }
        });
    },
  },
};
</script>

<style scoped>
</style>