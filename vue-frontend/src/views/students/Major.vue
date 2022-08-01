<template>
  <div>
    <div style="margin: 20px" class="btn_bos">
      <el-button type="primary" @click="handleAdd">添加专业</el-button>
    </div>
    <el-table :data="majors" height="380" border style="width: 100%">
      <el-table-column label="序号" type="index" width="60"></el-table-column>
      <el-table-column label="专业名称" prop="name"></el-table-column>
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
      :visible.sync="majorFormVisible"
      width="500px"
    >
      <el-form
        status-icon
        :model="major"
        ref="majorForm"
        label-width="100px"
        label-position="right"
        style="width: 400px"
        :rules="rules"
      >
        <el-form-item label="专业名称" prop="name">
          <el-input
            v-model="major.name"
            placeholder="请输入专业名称"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="majorFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="
            major._id == null
              ? addData('majorForm')
              : updateData('majorForm')
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
import majorApi from "@/api/major.js";
export default {
  data() {
    return {
      majorFormVisible: false, //编辑窗口是否显示
      major: {
        _id: null,
        name: "",
      },
      majors:[],
      totalPage:1,
      pageSize: 5, //每页显示条数
      currentPage: 1, //当前页
      total: 0, //总计
      rules: {
        majorName: [
          {
            required: true,
            message: "专业名称必须输入",
            trigger: ["blur", "change"],
          },
        ],
      },
    };
  },
  components: {},
  mounted(){
    this.fetchMajor()
  },

  methods: {
    addData(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          majorApi.addMajor(this.major).then((response) => {
            const resp = response.data;
            console.log(resp,'res');
            if (resp.status == 0) {
              this.majorFormVisible = false;
              this.fetchMajor();
              this.$message({
                type: "success",
                message: "添加专业成功",
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
          majorApi.updateMajor(this.major).then((response) => {
            const resp = response.data;
            if (resp.status == 0) {
              this.majorFormVisible = false;
              this.fetchMajor();
              this.$message({
                type: "success",
                message: "更新专业成功",
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
      this.major={
        _id:null,
        name:""
      }
      this.majorFormVisible = true;
      this.$nextTick(() => {
        this.$refs["majorForm"].resetFields();
      });
    },
    handleEdit(_id) {
      this.handleAdd();
      majorApi.getMajorById(_id).then((response)=>{
        const resp = response.data;
        if(resp.status==0){
          this.major = resp.data
        }
      })
    },
     handleDelete(_id) {
      this.$confirm("确认删除改用户吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          majorApi.deleteMajorById(_id).then((response) => {
            const resp = response.data;
            if (resp.status == 0) {
              this.$message({
                type: "success",
                message: "删除专业成功!",
              });
              this.totalPage = (this.total - 1)/this.pageSize
              this.fetchMajor();
            }
          });
        }).catch(() => {});
    },
    handleSizeChange(val) {
     this.pageSize=val
      this.fetchMajor();
    },
    handleCurrentChange(val) {
     this.currentPage=val
      this.fetchMajor();
    },
    fetchMajor() {
      if(this.currentPage > Math.ceil(this.totalPage)){
        this.currentPage = Math.ceil(this.totalPage)
      }
      majorApi
        .getMajorList(this.currentPage, this.pageSize)
        .then((response) => {
          const res = response.data;
          console.log('------',res);
          if (res.status == 0) {
            this.majors = res.data.data;
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