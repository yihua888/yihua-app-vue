import yhRequest from "./request/yhRequest";


export const login = (loginForm) => yhRequest.post({ url: '/api/login', data: loginForm })
export const getPermission = () => yhRequest.get({ url: '/api/permission' })

