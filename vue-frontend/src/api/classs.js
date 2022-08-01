import request from '@/utils/request'
export default {
    getClassAll(){
        return request({
            url: "/manage/class/all",
            method: 'get',
        })
    }
    ,
    getClassList(page,size,searchMap) {
        return request({
            url: "/manage/class/list",
            method: 'post',
            data:{
                page,
                size,
                searchMap
            }
        })
    },
    addClass(c){
        return request({
            url:'/manage/class/add',
            method:'post',
            data:c
        })
    },
    getClassById(_id) {
        return request({
            url: `/manage/class/find?_id=${_id}`,
            method: 'get',
        })
    },
    updateClass(c) {
        return request({
            url: '/manage/class/update',
            method: 'post',
            data: c
        })
    },
    deleteClassById(classId){
        return request ({
            url:'/manage/class/delete',
            method:'post',
            data:{
                classId
            }
        })
    }
}