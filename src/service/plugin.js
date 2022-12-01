import yhRequest from './request/yhRequest'

export const createPlugin = (data) => yhRequest.post({ url: '/plugin', data: data })
export const getPlugins = (data) => yhRequest.get({ url: '/plugin', params: data })

export const getPluginById = id => yhRequest.get({ url: `/plugin/${id}`})
