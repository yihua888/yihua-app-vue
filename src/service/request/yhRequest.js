import YHRequest from './index'
import { getCache } from '@/utils/cache'

// TODO:由环境变量注入
const BASE_URL ='http://localhost:8080/api'
const TIME_OUT = 60000
const yhRequest = new YHRequest({
    baseURL: BASE_URL,
    timeout: TIME_OUT,
    interceptors: {
        requestInterceptor: (config) => {
            // 携带token的拦截
            const token = getCache('token')
            if (token) {
                config.headers.Authorization = `Bearer ${token}`
            }
            return config
        },
        requestInterceptorCatch: (err) => {
            return err
        },
        responseInterceptor: (res) => {
            return res
        },
        responseInterceptorCatch: (err) => {
            return err
        }
    }
})

export default yhRequest