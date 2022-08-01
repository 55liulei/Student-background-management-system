import request from '../utils/request'
export default {
    getStudentList(page,size,searchMap){
        return request({
            url:'/manage/student/list',
            method:'post',
            data:{page,
                 size,
                 searchMap}

        })
    },
    addStudent(student){
        return request({
            url:"/manage/student/add",
            method:'post',
            data:student
        })
    },
    reqDeleteImg(name){
        return request({
            url:'/manage/img/delete',
            method:'post',
            data:{
                name
            }
        })
    },
    getStudentById(_id){
        return request({
            url:`/manage/student/find?_id=${_id} `,
            method:'get'
        })
    },
    updateStudent(student){
        return request({
            url:'/manage/student/update',
            method:'post',
            data:student
        })
    },
    deleteStudentById(studentId){
        return request({
            url:'/manage/student/delete',
            method:'post',
            data:{
                studentId
            }
        })
    },
    getStudentListForMonth(year){
        return request({
            url:'/manage/student/date',
            method:'post',
            data:{
                year
            }
        })
    }
}