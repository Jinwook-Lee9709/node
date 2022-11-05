
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
                    return {success: true, name : user.name, cafe : user.cafe};
                }
                return {success : false,msg:"비밀번호가 틀렸습니다."};
            }
            return { success : false, msg:"존재하지 않는 아이디입니다."};
        }catch(err){
            return { success: false , msg: err};
        }
    }
    async get_cafe_info(){
        const client = this.body;
        try{
            const user = await UserStorage.getCafeInfo(client.id);
            return user
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
    //cafe 테이블에 등록
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
    async cafe_register_by_code(){
        const client = this.body;
        try{
            const response = await UserStorage.cafe_register_by_code(client);
            return response;
        }
        catch (err){
            const a = { success:false, msg: err};
            return a;
        }
    }
    //user 테이블의 cafe값 True로 변경
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
    async cafe_find(){
        const client = this.body;
        try{
            const user = await UserStorage.cafe_find(client.id);
            if(user){
                if(user.cafe_id){
                    return {success: true, cafe_id: user.cafe_id};
                }
                return {success : false,msg:"카페 연동에 오류 발생"};
            }
        }
        catch (err){
            const a = { success:false, msg: err};
            return a;
        }
    }
    async change_cafe_name(){
        const client = this.body;
        try{
            const user = await UserStorage.change_cafe_name(client);
            return user
        }
        catch (err){
            const a = { success:false, msg: err};
            return a;
        }
    }
    async cafe_disconnect(){
        const client = this.body;
        try{
            const response = await UserStorage.cafe_disconnect(client);
            return response
        }
        catch (err){
            const a = { success:false, msg: err};
            return a;
        }
    }
}

module.exports = User;