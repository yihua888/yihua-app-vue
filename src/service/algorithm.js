import yhRequest from './request/yhRequest'

export const createAlgorithm = (data) => yhRequest.post({ url: '/algorithm', data: data })
export const getAlgorithms = (data) => yhRequest.get({ url: '/algorithm', params: data })

export const getAlgorithmById = id => yhRequest.get({ url: `/algorithm/${id}`})

export const getAlgorithmTypes = () => yhRequest.get({url: '/algorithm/type'})
