
const UserStorage = require("./UserStorage");

class User {
    constructor(body){
        this.body = body;
    }

    async login(){
        const client = this.body;
        try{
            const user = await UserStorage.getUserInfo(client.id);
            if(user){
                if(user.id === client.id && user.psword == client.psword){
                    return {success: true, name : user.name, cafe_id : user.cafe_id};
                }
                return {success : false,msg:"비밀번호가 틀렸습니다."};
            }
            return { success : false, msg:"존재하지 않는 아이디입니다."};
        }catch(err){
            return { success: false , msg: err};
        }
    }

    async register(){
        const client = this.body;
        try{
            const user = await UserStorage.getUserInfo(client.id);
            if(user){
                if(user.id === client.id){
                    return {success : false,msg:"중복되는 아이디가 존재합니다."};
                }
            }
        }catch(err){
            return { success: false , msg: err};
        }
        try{
            const response = await UserStorage.save(client);
            return response;
        }
        catch (err){
            const a = { success:false, msg: err};
            return a;
        }
    }
    async cafe_register(){
        const client = this.body;
        try{
            const response = await UserStorage.cafe_save(client);
            return response;
        }
        catch (err){
            const a = { success:false, msg: err};
            return a;
        }
    }
    async cafe_update(){
        const client = this.body;
        try{
            const response = await UserStorage.cafe_update(client);
            return response;
        }
        catch (err){
            const a = { success:false, msg: err};
            return a;
        }
    }
}

module.exports = User;