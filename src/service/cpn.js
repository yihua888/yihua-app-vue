import yhRequest from "./request/yhRequest";

export const createCpn = (data) => yhRequest.post({ url: '/cpn', data: data })
export const getCpns = (data) => yhRequest.get({ url: '/cpn', params: data })

export const getCpnById = id => yhRequest.get({ url: `/cpn/${id}`})


