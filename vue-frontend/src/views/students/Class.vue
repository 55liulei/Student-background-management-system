<template>
  <div>
    <el-form
      :inline="true"
      :model="search"
      ref="searchForm"
      style="margin: 20px"
    >
      <el-form-item prop="teacher">
        <el-input
          v-model="search.teacher"
          placeholder="根据教师查询"
          style="width: 200px"
        ></el-input>
      </el-form-item>
      <el-form-item prop="manager">
        <el-input
          v-model="search.manager"
          placeholder="根据学管查询"
          style="width: 200px"
        ></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="searchData" icon="el-icon-search"
          >查询</el-button
        >
        <el-button type="primary" @click="handleAdd" icon="el-icon-edit"
          >新增</el-button
        >
        <el-button type="primary" @click="resetForm('searchForm')"
          >重置</el-button
        >
      </el-form-item>
    </el-form>

    <el-table :data="classs" height="380" border style="width: 100%">
      <el-table-column label="序号" type="index" width="60"></el-table-column>
      <el-table-column label="班级名称" prop="name"></el-table-column>
      <el-table-column
        label="授课教师"
        prop="teacher_id"
        :formatter="formatTeacher"
      ></el-table-column>
      <el-table-column
        label="学管"
        prop="manager_id"
        :formatter="formatManager"
      ></el-table-column>
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
    <el-dialog title="教师编辑" :visible.sync="dialogFormVisible" width="500px">
      <el-form
        :model="updateClass"
        status-icon
        ref="classForm"
        label-width="100px"
        label-position="right"
        style="width: 400px"
        :rules="rules"
      >
        <el-form-item label="班级名称" prop="name">
          <el-input v-model="updateClass.name"></el-input>
        </el-form-item>
        <el-form-item label="授课教师" prop="teacher_id">
          <el-select
            v-model="updateClass.teacher_id"
            placeholder="请点击选择"
            class="filter-item"
          >
            <el-option
              v-for="option in teacherOptions"
              :key="option._id"
              :label="option.name"
              :value="option._id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="学管" prop="manager_id">
          <el-select
            v-model="updateClass.manager_id"
            placeholder="请点击选择"
            class="filter-item"
          >
            <el-option
              v-for="option in managerOptions"
              :key="option._id"
              :label="option.name"
              :value="option._id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="
            updateClass._id === null
              ? addData('classForm')
              : updateData('classForm')
          "
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>
<script>
import classApi from "@/api/classs.js";
import userApi from "@/api/user.js";
export default {
  data() {
    return {
      currentPage: 1,
      total: 0,
      pageSize: 5,
      classs: [],
      userAll: [],
      search: {
        teacher: "",
        manager: "",
      },
      searchMap: {
        teacher_id: "",
        manager_id: "",
      },
      teacherOptions: [],
      managerOptions: [],
      dialogFormVisible: false,
      rules: {
        name: [
          { required: true, message: "班级名称必须填写", trigger: "blur" },
        ],
        teacher_id: [
          { required: true, message: "请选择教师", trigger: "blur" },
        ],
        manager_id: [
          { required: true, message: "请选择学管", trigger: "blur" },
        ],
      },
      updateClass: {
        _id: null,
        name: "",
        teacher_id: "",
        manager_id: "",
      },
    };
  },

  components: {},
  mounted() {
    this.fetchClass();
    this.getUserList();
  },
  methods: {
    resetForm(formName) {
      this.$refs[formName].resetFields();
      
    },
    searchData() {
      this.currentPage = 1;
      const resTeacher =
        this.userAll.find((item) => item.name === this.search.teacher) || {};
      const resManager =
        this.userAll.find((item) => item.name === this.search.manager) || {};
      this.searchMap.teacher_id = resTeacher._id || "";
      this.searchMap.manager_id = resManager._id || "";
      this.fetchClass();
    },
    fetchClass() {
      if(this.currentPage > Math.ceil(this.totalPage)){
        this.currentPage = Math.ceil(this.totalPage)
      }
      classApi
        .getClassList(this.currentPage, this.pageSize, this.searchMap)
        .then((response) => {
          const res = response.data;
          if (res.status == 0) {
            this.classs = res.data.data;
            this.total = res.data.total;
          }
        });
    },
    getUserList() {
      userApi.getUserAll().then((response) => {
        const res = response.data;
        if (res.status == 0) {
          this.userAll = res.data;
          this.userAll.forEach((item) => {
            if (item.role_id === "62da0ff43d303b501d4044ca") {
              this.teacherOptions.push(item);
            } else if (
              item.role_id === "62d67e23ac27b13a0e8bd2e7" ||
              "62da19693d303b501d40458a"
            ) {
              this.managerOptions.push(item);
            }
          });
        }
      });
    },
    formatTeacher(row, column, cellValue, index) {
      const teacher = this.userAll.find((item) => item._id === cellValue) || {};
      return teacher.name;
    },
    formatManager(row, column, cellValue, index) {
      const manager = this.userAll.find((item) => item._id === cellValue) || {};
      return manager.name;
    },
    handleEdit(_id) {
      this.handleAdd();
      classApi.getClassById(_id).then((response) => {
        const resp = response.data;
        if (resp.status == 0) {
          this.updateClass = resp.data;
        }
      });
    },
    handleDelete(_id) {
      this.$confirm("确认删除该班级吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          classApi.deleteClassById(_id).then((response) => {
            const resp = response.data;
            if (resp.status == 0) {
              this.$message({
                type: "success",
                message: "删除班级成功!",
              });
              this.totalPage = (this.total - 1) / this.pageSize;
              this.fetchClass();
            }
          });
        })
        .catch(() => {});
    },
    handleSizeChange(val) {
       this.pageSize=val
      this.fetchClass();
    },
    handleCurrentChange(val) {
      this.currentPage=val
      this.fetchClass();
    },
    addData(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          classApi.addClass(this.updateClass).then((response) => {
            const resp = response.data;
            if (resp.status == 0) {
              this.fetchClass();
              this.dialogFormVisible = false;
            }
          });
        } else {
          return false;
        }
      });
    },
    handleAdd() {
      this.updateClass = {
        _id: null,
        name: "",
        teacher_id: "",
        manager_id: "",
        stage: "",
      };
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["classForm"].resetFields();
      });
    },
    updateData(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          classApi.updateClass(this.updateClass).then((response) => {
            const resp = response.data;
            if (resp.status == 0) {
              this.fetchClass();
              this.dialogFormVisible = false;
            }
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