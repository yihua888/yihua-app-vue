import yhRequest from './request/yhRequest'

export const createSql = (data) => yhRequest.post({ url: '/sql', data: data })
export const getSqls = (data) => yhRequest.get({ url: '/sql', params: data })

export const getSqlById = id => yhRequest.get({ url: `/sql/${id}`})
