import yhRequest from "./request/yhRequest";

class FileService{
    constructor(){
        this.service = yhRequest
    }

    async getFile(fileUrl){
       const rst = await yhRequest.get(fileUrl)
       return rst
    }
}

export default new FileService()