const CafeStorage = require("./CafeStorage");

class Cafe{
    constructor(body){
        this.body = body;
    }
    //재료를 등록
    async material_register(){
        const client = this.body;
        try{
            const user = await CafeStorage.material_dupcheck(client);
            if(user){
                if(user.m_name == client.m_name){
                    return {success:false, msg:"중복되는 재료가 존재합니다."};
                }
            }
        }catch(err){
            return {success: false, msg:err};
        }
        try{
            const response = await CafeStorage.material_register(client);
            return response;
        }catch(err){
            return {success: false, msg:err};
        }
    
    }

}

module.exports = Cafe;