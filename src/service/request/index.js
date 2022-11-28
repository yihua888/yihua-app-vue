import axios from 'axios'

class Request {
    constructor(baseURL, timeout, requestSuccessFn, requestErrorFn, responseSuccessFn, responseErrorFn, headers = {}, withCredentials = true) {
        this.request = axios.create({
            baseURL,
            timeout,
            headers,
            withCredentials
        })

        this.request.interceptors.request.use(config => {
            return requestSuccessFn(config)
        }, error => {
            return requestErrorFn(error)
        })

        this.request.interceptors.response.use(response => {
            return responseSuccessFn(config)
        }, error => {
            return responseErrorFn(error)
        })

    }

    get(url, config = {}) {
        return this.request.get(url, config)
    }

    post(url, data, config = {}) {
        return this.request.post(url, data, config)
    }

    put(url, data, config = {}) {
        return this.request.put(url, data, config)
    }

    patch(url, data = null, config = {}) {
        return this.request.patch(url, data, config)
    }

    delete(url, config = {}) {
        return this.request.delete(url, config)
    }

}

export default Request