import axios from 'axios'
import memoryUtils from './memoryUtils'
import { Message, Loading } from 'element-ui'
import storageUtils from '@/utils/storageUtils.js'
const request = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    timeout: 5000
})
const loading = {
    loadingInstance: null,
    open: function () {
        if (this.loadingInstance == null) {
            this.loadingInstance = Loading.service({
                text: '拼命加载中....',
                target: '.main',
                background: 'rgba(0,0,0,0.5)'
            })
        }
    },
    close: function () {
        if (this.loadingInstance !== null) {
            this.loadingInstance.close()
        }
        this.loadingInstance = null
    }
}
const getMenus = () => {
    if (memoryUtils.user.role_id) {
        //获取缓存数据中的角色id及权限数组
        const roleId = memoryUtils.user.role_id;
        const userMenus = memoryUtils.user.role.menus;
        request({
            url: '/menus',
            method: 'post',
            data: { roleId }
        }).then(response => {
            const resp = response.data;
            if (resp.status === 0) {
                //最新权限数组
                const menus = resp.data.menus;
                if (userMenus.length === menus.length) {
                    userMenus.forEach(item => {
                        if (menus.indexOf(item) === -1) {
                            memoryUtils.user = {}
                            storageUtils.removeUser();
                            Message({
                                message: "当前用户权限被修改，请重新登录",
                                type: 'warning'
                            })
                            window.location.replace = '/login'
                        }
                    })
                } else {
                    memoryUtils.user = {};
                    storageUtils.removeUser();
                    Message({
                        message: "当前用户权限被修改，请重新登录",
                        type: 'warning'
                    })
                    window.location.replace = '/login'
                }
            }
            return
        }).catch(err => {
            return
        })
    }
}
// 请求拦截器
request.interceptors.request.use(config => {

    if (config.url !== '/menus') {
        loading.open()
        getMenus()
    }
    // 请求拦截
    return config
}, error => {
    // 出现异常，抛出错误对
    loading.close()
    return Promise.reject(error)
})

// 响应拦截器
request.interceptors.response.use(response => {
    loading.close()
    const resp = response.data;
    if (resp.status !== 0) {
        Message({
            message: resp.msg || '系统异常',
            type: "warning",
            duration: 5 * 1000
        })
    }
    return response
}, error => {
    loading.close()
    Message({
        message: error.message,
        type: "error",
        duration: 5 * 1000
    })
    return Promise.reject(error)
})

export default request