import request from '@/utils/request'
export default {
    getMajorList(page,size) {
        return request({
            url: "/manage/major/list",
            method: 'post',
            data:{
                page,
                size
            }
        })
    },
    getMajorAll(){
        return request({
            url:'/manage/major/all',
            method:'get'
        })
    },
    addMajor(major){
        return request({
            url:'/manage/major/add',
            method:'post',
            data:major
        })
    },
    getMajorById(_id) {
        return request({
            url: `/manage/major/find?_id=${_id}`,
            method: 'get',
        })
    },
    updateMajor(major) {
        return request({
            url: '/manage/major/update',
            method: 'post',
            data: major
        })
    },
    deleteMajorById(majorId){
        return request ({
            url:'/manage/major/delete',
            method:'post',
            data:{
                majorId
            }
        })
    }
}