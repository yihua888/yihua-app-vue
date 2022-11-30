import yhRequest from './request/yhRequest'

export const createUtil = (data) => yhRequest.post({ url: '/util', data: data })
export const getUtils = (data) => yhRequest.get({ url: '/util', params: data })

export const getUtilById = id => yhRequest.get({ url: `/util/${id}`})
