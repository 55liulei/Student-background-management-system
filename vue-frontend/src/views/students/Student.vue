<template>
  <div>
    <!-- 条件查询 -->
    <el-form
      :inline="true"
      :model="search"
      ref="searchForm"
      style="margin: 20px"
    >
      <el-form-item prop="name">
        <el-input
          v-model="search.name"
          placeholder="根据姓名查询"
          style="width: 150px"
        ></el-input>
      </el-form-item>

      <el-form-item prop="directiom">
        <el-select
          v-model="search.direction"
          placeholder="根据学习方向查询"
          class="filter-item"
          style="width: 150px"
        >
          <el-option
            v-for="option in directionOptions"
            :key="option.type"
            :label="option.name"
            :value="option.type"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item prop="class">
        <el-select
          v-model="search.class"
          placeholder="根据班级查询"
          class="filter-item"
          style="width: 150px"
        >
          <el-option
            v-for="option in classOptions"
            :key="option._id"
            :label="option.name"
            :value="option.name"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item prop="teacher">
        <el-input
          v-model="search.teacher"
          placeholder="根据教师查询"
          style="width: 150px"
        ></el-input>
      </el-form-item>
      <el-form-item prop="manager">
        <el-input
          v-model="search.manager"
          placeholder="根据学管查询"
          style="width: 150px"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="searchData"
          >查询</el-button
        >
        <el-button type="primary" icon="el-icon-edit" @click="handleAdd"
          >新增</el-button
        >
        <el-button @click="resetForm('searchForm')">重置</el-button>
      </el-form-item>
    </el-form>
    <!-- 列表 -->
    <el-table :data="students" style="width: 100%" border>
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="学员名字">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="性别">
              <span>{{ props.row.gender | dataFilter(genderOptions) }}</span>
            </el-form-item>
            <el-form-item label="所在学校">
              <span>{{ props.row.school }}</span>
            </el-form-item>
            <el-form-item label="专业">
              <span>{{ props.row.major }}</span>
            </el-form-item>
            <el-form-item label="年级">
              <span>{{ props.row.grade | dataFilter(gradeOptions) }}</span>
            </el-form-item>
            <el-form-item label="学历">
              <span>{{
                props.row.education | dataFilter(educationOptions)
              }}</span>
            </el-form-item>
            <el-form-item label="学习方向">
              <span>{{
                props.row.direction | dataFilter(directionOptions)
              }}</span>
            </el-form-item>
            <el-form-item label="身份证号">
              <span>{{ props.row.id_number }}</span>
            </el-form-item>
            <el-form-item label="联系电话">
              <span>{{ props.row.phone }}</span>
            </el-form-item>
            <el-form-item label="家长姓名">
              <span>{{ props.row.parent }}</span>
            </el-form-item>
            <el-form-item label="家庭住址">
              <span>{{ props.row.address }}</span>
            </el-form-item>
            <el-form-item label="QQ号码">
              <span>{{ props.row.qq }}</span>
            </el-form-item>
            <el-form-item label="所在班级">
              <span>{{ props.row.class }}</span>
            </el-form-item>
            <el-form-item label="入学时间">
              <span>{{ props.row.admisson_date }}</span>
            </el-form-item>
            <el-form-item label="授课教师">
              <span>{{
                props.row.teacher_id | teacherOrManagerFilter(teacherOptions)
              }}</span>
            </el-form-item>
            <el-form-item label="学管">
              <span>{{
                props.row.manager_id | teacherOrManagerFilter(managerOptions)
              }}</span>
            </el-form-item>
            <el-form-item label="照片">
              <!-- <span>{{ props.row.pictures }}</span> -->
              <el-image
                :key="index"
                v-for="(item, index) in props.row.pictures"
                style="width: 200px"
                :src="baseUrl + '/upload/' + item"
                :preview-src-list="setSrcList(prop.row.pictures)"
              >
              </el-image>
            </el-form-item>
            <el-form-item label="备注">
              <span v-html="props.row.note "></span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>

      <el-table-column label="序号" type="index" width="100px">
      </el-table-column>
      <el-table-column label="学员姓名" prop="name" width="150px">
      </el-table-column>
      <el-table-column label="性别" prop="gender" width="80px">
        <template slot-scope="scope">
          <span>{{ scope.row.gender | dataFilter(genderOptions) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="学习方向" prop="direction" width="100px">
        <template slot-scope="scope">
          <span>{{ scope.row.direction | dataFilter(directionOptions) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="联系电话" prop="phone"> </el-table-column>
      <el-table-column label="所在班级" prop="class">
        <!-- <span>
          {{props.row.class}}
        </span> -->
      </el-table-column>
      <el-table-column label="授课教师" props="teacher_id">
        <template slot-scope="scope">
          <span>{{
            scope.row.teacher_id | teacherOrManagerFilter(teacherOptions)
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="学管" props="manager_id">
        <template slot-scope="scope">
          <span>{{
            scope.row.manager_id | teacherOrManagerFilter(managerOptions)
          }}</span>
        </template>
      </el-table-column>
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
        :page-sizes="[10, 20, 30]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import studentApi from "@/api/student.js";
import userApi from "@/api/user.js";
import classApi from "@/api/classs.js";
import schoolApi from "@/api/school.js";
import majorApi from "@/api/major.js";
export default {
  data() {
    return {
      baseApi: process.env.VUE_APP_BASE_API,
      baseUrl: process.env.VUE_APP_SERVICE_URL,
      students: [],
      totalPage: 1,
      pageSize: 10, //每页显示条数
      currentPage: 1, //当前页
      total: 0, //总计
      searchMap: {
        name: "",
        direction: "",
        class: "",
        teacher_id: "",
        manager_id: "",
      },
      search: {
        name: "",
        direction: "",
        class: "",
        teacher: "",
        manager: "",
      },
      genderOptions: [
        //性别
        { type: "0", name: "男" },
        { type: "1", name: "女" },
      ],
      gradeOptions: [
        //年纪列表
        { type: "1", name: "大一" },
        { type: "2", name: "大二" },
        { type: "3", name: "大三" },
        { type: "4", name: "大四" },
        { type: "5", name: "研究生" },
      ],
      educationOptions: [
        //学历列表
        { type: "1", name: "专科" },
        { type: "2", name: "本科" },
        { type: "3", name: "硕士" },
        { type: "4", name: "社会人士" },
      ],
      directionOptions: [
        { type: "1", name: "Web前端" },
        { type: "2", name: "Java" },
        { type: "3", name: "UI/UE" },
        { type: "4", name: "C/C++" },
      ],
      schoolOptions: [], //学校列表
      majorOptions: [], //专业列表
      classOptions: [], //班级列表
      teacherOptions: [], //教师列表
      managerOptions: [], //学管列表
    };
  },
  filters: {
    dataFilter(type, dataOptions) {
      const obj = dataOptions.find((obj) => obj.type == type);
      return obj ? obj.name : null;
    },
    teacherOrManagerFilter(_id, options) {
      const obj = options.find((obj) => obj._id == _id);
      return obj ? obj.name : null;
    },
  },
  components: {},
  mounted() {
    this.fetchStudents();
    this.getUserList();
    this.getClassList();
    this.getSchoolList();
    this.getMajorList();
  },
  methods: {
    fetchStudents() {
      studentApi
        .getStudentList(this.currentPage, this.pageSize, this.searchMap)
        .then((response) => {
          const resp = response.data;
          if (resp.status == 0) {
            this.students = resp.data.data;
            this.total = resp.data.total;
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
    //获取所有班级
    getClassList() {
      classApi.getClassAll().then((response) => {
        const resp = response.data;
        if (resp.status == 0) {
          this.classOptions = resp.data;
        }
      });
    },
    //获取所有学校
    getSchoolList() {
      schoolApi.getSchoolAll().then((response) => {
        const resp = response.data;
        if (resp.status == 0) {
          this.schoolOptions = resp.data;
        }
      });
    },
    //获取所有专业
    getMajorList() {
      majorApi.getMajorAll().then((response) => {
        const resp = response.data;
        if (resp.status == 0) {
          this.majorOptions = resp.data;
        }
      });
    },
    setSrcList(imgList) {
      return imgList.map((item) => this.baseUrl + "/upload/" + item);
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.fetchStudents();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.fetchStudents();
     
    },
    searchData() {
      //获取查询表单中输入的教师或学管  在用户列表中根据名称查询对应id 赋值到查询条件对象中
      this.currentPage = 1;
      const resTeacher =
        this.userAll.find((item) => item.name === this.search.teacher) || {};
      const resManager =
        this.userAll.find((item) => item.name === this.search.manager) || {};
      //  this.searchMap.teacher_id=resTeacher._id || ""  不存在教师返回所有数据

      //如果查询到对应的教师就为查询条件对象的教师id赋值
      if (resTeacher._id) {
        this.searchMap.teacher_id = resTeacher._id;
        //如果输入了教师名称（不存在的）就赋值为-1 防止后端查询时返回所有数据
      } else if (this.search.teacher) {
        this.searchMap.teacher_id = "-1";
      } else {
        this.searchMap.teacher_id = "";
      }
      if (resManager._id) {
        this.searchMap.manager_id = resManager._id;
      } else if (this.search.manager) {
        this.searchMap.manager_id = -"-1";
      } else {
        this.searchMap.manager_id = "";
      }
      this.searchMap.direction = this.search.direction || "";
      this.searchMap.name = this.search.name || "";
      this.searchMap.class = this.search.class || "";
      this.fetchStudents();
    },
    handleAdd() {
      this.$router.push(`/student/update/-1`);
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleEdit(_id){
        this.$router.push(`/student/update/${_id}`)
    },
    handleDelete(_id){
      this.$confirm('确认删除该学员吗？','提示',{
        confirmButtonText:"确定",
        cancelButtonText:"取消",
        type:"warning"
      }).then(()=>{
        //yeah
        studentApi.deleteStudentById(_id).then((response)=>{
          const resp = response.data;
          this.$message({
            type:resp.status==0? "success" :"error",
            message:resp.msg
          })
          if(resp.status==0){
            this.fetchStudents()
          }
        })
      }).catch(()=>{

      })
    }
  },
};
</script>

<style scoped>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>