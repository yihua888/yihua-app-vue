import yhRequest from './request/yhRequest'

export const createCase= (data) => yhRequest.post({ url: '/case', data: data })
export const getCases = (data) => yhRequest.get({ url: '/case', params: data })

export const getCaseById = id => yhRequest.get({ url: `/case/${id}`})
