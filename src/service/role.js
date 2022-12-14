import yhRequest from './request/yhRequest'

export const createRole = (data) => yhRequest.post({ url: '/role', data: data })
export const updateRole = (data) => yhRequest.patch({ url: '/role', data: data })
export const getRoles = () => yhRequest.get({url: '/role'})
export const getRoleById = (id) => yhRequest.get({url: `/role/${id}`})
export const removeRole = (id) => yhRequest.delete({url: `/role/${id}`})
