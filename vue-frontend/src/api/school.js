import request from '@/utils/request'
export default {
    getSchoolList(page,size) {
        return request({
            url: "/manage/school/list",
            method: 'post',
            data:{
                page,
                size
            }
        })
    },
    getSchoolAll(){
        return request({
            url:'manage/school/all',
            method:'get'
        })
    },
    addSchool(school){
        return request({
            url:'/manage/school/add',
            method:'post',
            data:school
        })
    },
    getSchoolById(_id) {
        return request({
            url: `/manage/school/find?_id=${_id}`,
            method: 'get',
        })
    },
    updateSchool(school) {
        return request({
            url: '/manage/school/update',
            method: 'post',
            data: school
        })
    },
    deleteSchoolById(schoolId){
        return request ({
            url:'/manage/school/delete',
            method:'post',
            data:{
                schoolId
            }
        })
    }
}