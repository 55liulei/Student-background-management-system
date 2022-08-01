import Vue from "vue";
import VueRouter from "vue-router";
import Login from '../views/login'
import  Layout from '../components/Layout.vue'
import Home  from   '../views/home/Home.vue'
import User  from   '../views/user/User.vue'
import Role  from   '../views/role/Role.vue'
import School  from   '../views/students/School.vue'
import Majors  from   '../views/students/Major.vue'
import Class  from   '../views/students/Class.vue'
import Student  from   '../views/students/Student.vue'
import StudentUpdate from '../views/students/StudentUpdate'
Vue.use(VueRouter);
const routes = [
    {
      path:'/login',
      name:'login',
      component:Login
    },
    {
      path:'/',
      name:'layout',
      component:Layout,
      redirect: '/home',
      children:[
        {
          path:'/home',
          component:Home,
          meta: { title:'首页' }
        }
      ]
    },
    {
      path:'/user',
      component:Layout,
      children:[
        {
          path:'/',
          component:User,
          meta: { title:'用户管理' }
        }
      ]
    },
    {
      path:'/role',
      component:Layout,
      children:[
        {
          path:'/',
          component:Role,
          meta: { title:'角色管理' }
        }
      ]
    },
    {
      path:'/school',
      component:Layout,
      children:[
        {
          path:'/',
          component:School,
          meta: { title:'学校管理' }
        }
      ]
    },
    {
      path:'/major',
      component:Layout,
      children:[
        {
          path:'/',
          component:Majors,
          meta: { title:'专业管理' }
        }
      ]
    },
    {
      path:'/class',
      component:Layout,
      children:[
        {
          path:'/',
          component:Class,
          meta: { title:'班级管理' }
        }
      ]
    },
    {
      path:'/student',
      component:Layout,
      children:[
        {
          path:'/',
          component:Student,
          meta: { title:'学生管理' }

        },
      ]
      
    },
    {
      path:'/student/update/:_id',
      component:Layout,
      children:[
        {
          path:'/',
          component:StudentUpdate,
          meta: { title:'添加学生' }
        }
      ]
    },
    
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;