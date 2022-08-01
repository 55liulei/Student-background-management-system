import request from '@/utils/request'
export default {
    //获取所有用户
    getUserAll() {
        return request({
            url: '/manage/user/all',
            method: 'get'
        })
    },
    getUserList(page, size) {
        return request({
            url: '/manage/user/list',
            method: 'post',
            data: {
                page,
                size
            }
        })
    },
    addUser(user) {
        return request({
            url: '/manage/user/add',
            method: 'post',
            data: user
        })
    },
    getUserById(_id) {
        return request({
            url: `/manage/user/find?_id=${_id}`,
            method: 'get',
        })
    },
    updateUser(user) {
        return request({
            url: '/manage/user/update',
            method: 'post',
            data: user
        })
    },
    deleteUserById(userId){
        return request ({
            url:'/manage/user/delete',
            method:'post',
            data:{
                userId
            }
        })
    },
    checkPwd(_id,password){//校验密码是否正确
        return request({
            url:'/manage/user/pwd',
            method:'post',
            data:{
                _id,
                password
            }
        })
    },
    updatePwd(userId,password){
        return request({
            url:'/manage/user/pwd',
            method:'put',
            data:{
                userId,
                password
            }
        })
    }
}
