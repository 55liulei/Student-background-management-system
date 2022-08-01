<template>
  <div class="student-update">
    <el-button
      icon="el-icon-arrow-left"
      circle
      @click="$router.replace('/student')"
    ></el-button>
    <el-form
      status-icon
      ref="studentForm"
      :model="updateStudent"
      :rules="rules"
      label-width="100px"
      label-position="right"
      style="width: 100%; height: 100%"
      class="update-form"
    >
      <div class="content">
        <div>
          <el-form-item label="姓名" prop="name">
            <el-input v-model="updateStudent.name"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="gender">
            <el-select v-model="updateStudent.gender" placeholder="请点击选择">
              <el-option
                v-for="option in genderOptions"
                :key="option.type"
                :label="option.name"
                :value="option.type"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="学校" prop="school">
            <el-autocomplete
              class="inline-input"
              v-model="updateStudent.school"
              :fetch-suggestions="querySearchSchool"
              placeholder="请输入内容"
            ></el-autocomplete>
          </el-form-item>
          <el-form-item label="专业" prop="major">
            <el-autocomplete
              class="inline-input"
              v-model="updateStudent.major"
              :fetch-suggestions="querySearchMajor"
              placeholder="请输入内容"
            ></el-autocomplete>
          </el-form-item>
          <el-form-item label="年级" prop="grade">
            <el-select
              v-model="updateStudent.grade"
              placeholder="请点击选择"
              class="filter-item"
            >
              <el-option
                v-for="option in gradeOptions"
                :key="option.type"
                :label="option.name"
                :value="option.type"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="学历" prop="education">
            <el-select
              v-model="updateStudent.education"
              placeholder="请点击选择"
              class="filter-item"
            >
              <el-option
                v-for="option in educationOptions"
                :key="option.type"
                :label="option.name"
                :value="option.type"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="学习方向" prop="direction">
            <el-select
              v-model="updateStudent.direction"
              placeholder="请点击选择"
              class="filter-item"
            >
              <el-option
                v-for="option in directionOptions"
                :key="option.type"
                :label="option.name"
                :value="option.type"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="身份证号" prop="id_number">
            <el-input v-model="updateStudent.id_number"></el-input>
          </el-form-item>
          <el-form-item label="电话号码" prop="phone">
            <el-input v-model="updateStudent.phone"></el-input>
          </el-form-item>
          <el-form-item label="家长姓名" prop="parent">
            <el-input v-model="updateStudent.parent"></el-input>
          </el-form-item>
          <el-form-item label="家长联系电话" prop="parent_phone">
            <el-input v-model="updateStudent.parent_phone"></el-input>
          </el-form-item>
          <el-form-item label="家庭住址" prop="address">
            <el-input v-model="updateStudent.address"></el-input>
          </el-form-item>
          <el-form-item label="QQ" prop="qq">
            <el-input v-model="updateStudent.qq"></el-input>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="所在班级" prop="class">
            <el-select
              v-model="updateStudent.class"
              placeholder="请点击选择"
              class="filter-item"
            >
              <el-option
                v-for="option in classOptions"
                :key="option._id"
                :label="option.name"
                :value="option._id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="入学时间" prop="addmission_date">
            <el-date-picker
              v-model="updateStudent.addmission_date"
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="教师" prop="teacher_id">
            <el-select
              v-model="updateStudent.teacher_id"
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
              v-model="updateStudent.manager_id"
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
          <el-form-item label="照片" prop="pictures">
            <el-upload
              :action="baseApi + '/manage/img/upload'"
              list-type="picture-card"
              :auto-upload="true"
              :file-list="fileList"
              name="image"
              accept="image/*"
              :on-change="handleChange"
            >
              <i slot="default" class="el-icon-plus"></i>
              <div slot="file" slot-scope="{ file }">
                <img
                  class="el-upload-list__item-thumbnail"
                  :src="file.url"
                  alt=""
                />
                <span class="el-upload-list__item-actions">
                  <span
                    class="el-upload-list__item-preview"
                    @click="handlePictureCardPreview(file)"
                  >
                    <i class="el-icon-zoom-in"></i>
                  </span>
                  <span
                    v-if="!disabled"
                    class="el-upload-list__item-delete"
                    @click="handleDownload(file)"
                  >
                    <i class="el-icon-download"></i>
                  </span>
                  <span
                    v-if="!disabled"
                    class="el-upload-list__item-delete"
                    @click="handleRemove(file)"
                  >
                    <i class="el-icon-delete"></i>
                  </span>
                </span>
              </div>
            </el-upload>
            <el-dialog :visible.sync="pictureDialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="" />
            </el-dialog>
          </el-form-item>
        </div>
      </div>
      <div>
        <el-form-item label="备注信息" prop="note">
          <vue-tinymce
            v-model="updateStudent.note"
            :setting="setting"
          ></vue-tinymce>
        </el-form-item>
      </div>

      <el-form-item>
        <el-button
          type="primary"
          @click="
            updateStudent._id == null
              ? addData('studentForm')
              : updateData('studentForm')
          "
          >确定</el-button
        >
      </el-form-item>
    </el-form>
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
    var validatePhone = (rule, value, callback) => {
      value = value.trim();
      const pwdReg =
        /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
      if (value === "") {
        callback(new Error("请输入手机号码"));
      } else if (!pwdReg.test(value)) {
        callback(new Error("请输入正确的手机号码"));
      } else {
        callback();
      }
    };
    var validateIdNumber = (rule, value, callback) => {
      value = value.trim();
      const _IDRe18 =
        /^([1-6][1-9]|50)\d{4}(18|19|20)\d{2}((0[1-9])|10|11|12)(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
      const _IDre15 =
        /^([1-6][1-9]|50)\d{4}\d{2}((0[1-9])|10|11|12)(([0-2][1-9])|10|20|30|31)\d{3}$/;
      if (_IDRe18.test(value) || _IDre15.test(value)) {
        callback();
      } else {
        callback(new Error("请输入正确的身份证号码"));
      }
    };
    return {
      setting: {
        //去除文件栏
        menubar: false,
        //定义工具栏
        toolbar:
          "undo redo | fullscreen | formatselect alignleft aligncenter alignright alignjustify | link unlink | numlist bullist | image media table | fontselect fontsizeselect forecolor backcolor | bold italic underline strikethrough | indent outdent | superscript subscript | removeformat |",
        toolbar_drawer: "sliding",
        quickbars_selection_toolbar:
          "removeformat | bold italic underline strikethrough | fontsizeselect forecolor backcolor",
        //工具栏模块
        plugins: "link image media table lists fullscreen quickbars imagetools",
        language: "zh_CN", //本地化设置
        height: 350,
      },
      baseApi: process.env.VUE_APP_BASE_API, //图片上传地址拼接进行代理请求
      baseUrl: process.env.VUE_APP_SERVICE_URL, // 代理url地址，展示图片时拼接使用
      updateStudent: {
        _id: null,
        name: "",
        gender: "",
        school: "",
        major: "",
        grade: "",
        education: "",
        direction: "",
        id_number: "",
        phone: "",
        parent: "",
        parent_phone: "",
        address: "",
        qq: "",
        class: "",
        addmission_date: "",
        teacher_id: "",
        manager_id: "",
        pictures: "",
        note: "",
      },
      rules: {
        name: [{ required: true, message: "请填写姓名", trigger: "blur" }],
        gender: [{ required: true, message: "请选择性别", trigger: "blur" }],
        direction: [
          { required: true, message: "请选择学习方向", trigger: "blur" },
        ],
        id_number: [
          { validator: validateIdNumber, trigger: ["blur", "change"] },
        ],
        phone: [
          {
            required: true,
            validator: validatePhone,
            trigger: ["blur", "change"],
          },
        ],
        class: [{ required: true, message: "请选择所在班级", trigger: "blur" }],
        teacher_id: [
          { required: true, message: "请选择授课教师", trigger: "blur" },
        ],
        manager_id: [
          { required: true, message: "请选择学管", trigger: "blur" },
        ],
      },
      userAll: [],
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
      pictureDialogVisible: false, //大图是否显示
      dialogImageUrl: "", //显示大图地址
      disabled: false, //查看大图 下载 删除按钮是否显示
      fileList: [], //所有已上传图片的数组
    };
  },

  components: {},
  mounted() {
    this.getClassList(),
      this.getUserList(),
      this.getSchoolList(),
      this.getMajorList();
      this.getStudent()
  },
  methods: {
    getStudent() {
      //根据传过来的——id查询要编辑的学生
      const { _id } = this.$route.params;
      if (_id !== "-1") {
        studentApi.getStudentById(_id).then((response) => {
          const resp = response.data;
          if (resp.status == 0) {
            this.updateStudent = resp.data;
            const { pictures } = resp.data;
            if (pictures && pictures.length > 0) {
              this.fileList= pictures.map((img,index)=>({
                name:img,
                status:"success",
                url:this.baseUrl + "/upload/" +img 
              }))
            }
          }
        });
      }
    },
    querySearchSchool(queryString, cb) {
      var schoolOptions = this.schoolOptions;
      var results = queryString
        ? schoolOptions.filter(this.createFilter(queryString))
        : schoolOptions;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    querySearchMajor(queryString, cb) {
      var majorOptions = this.majorOptions;
      var results = queryString
        ? majorOptions.filter(this.createFilter(queryString))
        : majorOptions;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return (restaurant) => {
        return restaurant.value.indexOf(queryString.toLowerCase()) === 0;
      };
    },
    addData(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.updateStudent.pictures = this.getImgs();
          studentApi.addStudent(this.updateStudent).then((response) => {
            const resp = response.data;
            if (resp.status == 0) {
              this.$router.replace("/student");
            }
          });
        } else {
          return false;
        }
      });
    },
    updateData(formName) {
        this.$refs[formName].validate((valid) => {
        if (valid) {
          this.updateStudent.pictures = this.getImgs();
          studentApi.updateStudent(this.updateStudent).then((response) => {
            const resp = response.data;
            if (resp.status == 0) {
              this.$router.replace("/student");
            }
          });
        } else {
          return false;
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
          const arr = resp.data;
          for (let i = 0; i < arr.length; i++) {
            this.schoolOptions[i].value = arr[i].schoolname;
          }
        }
      });
    },
    //获取所有专业
    getMajorList() {
      majorApi
        .getMajorAll()
        .then((response) => {
          const resp = response.data;
          if (resp.status == 0) {
            this.majorOptions = resp.data;
            const arr = resp.data;
            for (let i = 0; i < arr.length; i++) {
              this.majorOptions[i].value = arr[i].name;
            }
          }
        })
        .catch((err) => {
          console.log("err", err);
        });
    },
    handleRemove(file) {
      studentApi.reqDeleteImg(file.name).then((response) => {
        const resp = response.data;
        if (resp.status == 0) {
          // this.fileList.splice(this.fileList.indexOf(file.name), 1);
          this.fileList.splice(this.fileList.indexOf(file), 1);
        }
      });
    },
    handlePictureCardPreview(file) {
      //查看大图
      this.dialogImageUrl = file.url;
      this.pictureDialogVisible = true;
    },
    handleDownload(file) {
      console.log(file);
    },
    handleChange(file, fileList) {
      if (file.status == "success") {
        const result = file.response;
        if (result.status == 0) {
          const { name, url } = result.data;
          file = fileList[fileList.length - 1];
          file.name = name;
          file.url = url;
        }
      }
      this.fileList = fileList;
    },
    getImgs() {
      return this.fileList.map((file) => file.name);
    },
    
  },
};
</script>

<style scoped>
.content {
  display: flex;
  justify-content: space-around;
}
.el-input {
  width: 190px;
}
</style>