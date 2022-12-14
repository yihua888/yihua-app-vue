import yhRequest from './request/yhRequest'

export const login = (loginForm) => yhRequest.post({ url: '/login', data: loginForm })

export const getUser = (data) => yhRequest.get({ url: '/users',  params: data})
export const getUserById = id => yhRequest.get({ url: `/users/${id}`})
export const getPermission = () => yhRequest.get({ url: '/permission' })
export const updateUser = data => yhRequest.patch({ url: '/users',  data})
export const removeUser = id => yhRequest.delete({ url: `/users/${id}` })
export const registerUser = data => yhRequest.post({ url:'/users' , data })
