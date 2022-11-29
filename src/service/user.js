import yhRequest from "./request/yhRequest";


export async function login(loginForm) {
    const rst = await yhRequest.post({ url: '/api/login', data: loginForm })
    return rst
}

export async function getPermission() {
    const rst = await yhRequest.get({ url: '/api/permission' })
}
