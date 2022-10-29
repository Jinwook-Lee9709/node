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
            if(user.m_name = client.m_name){
                return {success:false, msg:"중복되는 제품이 존재합니다."}
            }
        }catch(err){
            return {success: false, msg:err};
        }
        try{
            const user = await CafeStorage.material_register(client);
        }catch(err){
            return {success: false, msg:err};
        }
    
    }
    //재료 중복 확인

}

module.exports = Cafe;