import yhRequest from './request/yhRequest'

export const createRole = (data) => yhRequest.post({ url: '/role', data: data })
export const getRoles = () => yhRequest.get({url: '/role'})
export const getRoleById = () => yhRequest.get({url: `/role/${id}`})
