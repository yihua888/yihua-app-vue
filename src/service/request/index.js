import axios from 'axios'
class YHRequest {

    constructor(config) {
        // 创建axios实例
        this.instance = axios.create(config)
        this.interceptors = config.interceptors

        // 使用拦截器
        // 1.从config中取出的拦截器是对应的实例的拦截器
        this.instance.interceptors.request.use(
            this.interceptors?.requestInterceptor,
            this.interceptors?.requestInterceptorCatch
        )
        this.instance.interceptors.response.use(
            this.interceptors?.responseInterceptor,
            this.interceptors?.responseInterceptorCatch
        )

        // 2.添加所有的实例都有的拦截器
        this.instance.interceptors.request.use(
            config => config,
            err => err
        )
    }

    request(config) {
        return new Promise((resolve, reject) => {
            // 1.单个请求对请求config的处理
            if (config.interceptors?.requestInterceptor) {
                config = config.interceptors.requestInterceptor(config)
            }

            this.instance.request(config).then(res => {
                // 1.单个请求对数据的处理
                if (config.interceptors?.responseInterceptor) {
                    res = config.interceptors.responseInterceptor(res)
                }
                resolve(res)
            }).catch(err => {
                reject(err)
                return err
            })
        })
    }

    get(config) {
        return this.request({
            ...config,
            method: 'GET'
        })
    }

    post(config) {
        return this.request({
            ...config,
            method: 'POST'
        })
    }

    delete(config) {
        return this.request({
            ...config,
            method: 'DELETE'
        })
    }

    patch(config) {
        return this.request({
            ...config,
            method: 'PATCH'
        })
    }
}

export default YHRequest