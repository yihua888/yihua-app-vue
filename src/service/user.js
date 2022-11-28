import yhRequest from "./request/yhRequest";

class UserService{
    constructor(){
        this.service = yhRequest
    }

    async login(loginForm){
       const rst = await yhRequest.post('/login',loginForm)
       return rst
    }
}

export default new UserService()