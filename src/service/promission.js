import yhRequest from './request/yhRequest'

export const getPermissionList = () => yhRequest.get({url: '/permission/list'})

export const createPermission = (data) => yhRequest.post({ url: '/permission',  data: data })

export const updatePermission = data => yhRequest.patch({ url: '/permission',  data: data })

export const removePermission = id => yhRequest.delete({ url: `/permission/${id}` })
