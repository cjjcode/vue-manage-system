import axios from 'axios';
import router from '../router'

const service = axios.create({
    // process.env.NODE_ENV === 'development' 来判断是否开发环境
    // easy-mock服务挂了，暂时不使用了
    // baseURL: 'https://www.easy-mock.com/mock/592501a391470c0ac1fab128',
    timeout: 15000,
    headers: {
        common: {
            // 'X-Requested-With': 'XMLHttpRequest',
        },
        post: {
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }
});

service.interceptors.request.use(
    config => {
        // NProgress.start()
        axios.defaults.headers.post['Content-Type'] = 'application/json'
        config.method = config.method || 'POST'
        // console.log('config', config)
        return config
    },
    error => {
        Promise.reject(error)
    }
);

service.interceptors.response.use(
    response => {
        if (response.data) {
            if (response.data.code === 200) {
                return response.data.data || response.data.data === false
                    ? response.data.data
                    : true
            } else if (response.data.code === 401){


            } else {
                if (response.data.msg) {
                    Toast(response.data.msg)
                }
                return Promise.reject(response.data.data)
            }
        }
    },
    error => {
        // console.log('response-err', error.response)
        if (error.response && +error.response.status === 401) {
            // Notify({ type: 'danger', message: '请您先登录' })
            router.push('/login')
            return Promise.reject(error)
        }
        // Notify({ type: 'danger', message: error.message || '操作失败！' })
        Toast(error.message || '请求超时，请稍后再试')
        return Promise.reject(error)
    }
);

export default service;
