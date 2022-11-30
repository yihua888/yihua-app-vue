import yhRequest from "./request/yhRequest";

export const getFile = (fileUrl) =>  yhRequest.get({url:fileUrl})
