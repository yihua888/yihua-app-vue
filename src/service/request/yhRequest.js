import Request from "./index";

// 最后封装到环境变量
const BASE_URL = 'localhost"8080'

const yhRequest = new Request(BASE_URL, 60000, config => config, error => {
    return Promise.resolve(error)
}, response => response, error => {
    return Promise.resolve(error)
})

export default yhRequest