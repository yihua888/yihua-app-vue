import yhRequest from "./request/yhRequest";


export const login = (loginForm) => yhRequest.post({ url: '/login', data: loginForm })
export const getPermission = () => yhRequest.get({ url: '/permission' })

