const CafeStorage = require("./CafeStorage");

class Cafe{
    constructor(body){
        this.body = body;
    }
    //재료를 등록
    async material_register(){
        const client = this.body;
        try{
            const material = await CafeStorage.material_dupcheck(client);
            if(material){
                if(material.m_name == client.m_name){
                    return {success:false, msg:"중복되는 재료가 존재합니다."};
                }
            }
        }catch(err){
            return {success: false, msg:err};
        }
        try{
            const response = await CafeStorage.material_register(client);
            const m_id = await CafeStorage.get_m_id(client);
            client.m_id = m_id.m_id
            const stock = await CafeStorage.stock_init(client);  
            return response;
        }catch(err){
            return {success: false, msg:err};
        }
        
    
    }
    //조인 문을 이용한 재고랑 같이 받아오는 함수 
    async material_get(){
        const client = this.body;
        console.log(client);
        try{
            const material = await CafeStorage.material_get(client);
            return material
        }catch(err){
            return {success: false, msg:err};
        }
    }
    //제품 등록
    async product_register(){
        const client = this.body;
        try{
            console.log(client);
            const product = await CafeStorage.product_dupcheck(client);
            
            if(product){
                if(product.p_name == client.p_name){
                    return {success:false, msg:"중복되는 제품이 존재합니다."};
                }
            }
        }catch(err){
            return {success:false, msg:err};
        }try{
            const response = await CafeStorage.product_register(client);
            return response;
        }catch(err){
            return {success:false, msg:err};
        }
    }
    //제품 정보 가져오기
    async product_get(){
        const client = this.body;
        try{
            const product = await CafeStorage.product_get(client);
            return product;
        }catch(err){
            return {success: false, msg:err};
        }
    }
    //제품 재료 연결
    async ingredient_register(){
        const client = this.body;
        try{
            const buffer = []
            for(var i=0; i<client.m_name.length; i++){
                buffer.push({cafe_id: client.cafe_id, p_name:client.p_name, m_name: client.m_name[i]});
                console.log(buffer);
            }
            buffer.forEach(async element => {
                try{
                const dupcheck = await CafeStorage.ingredient_dupcheck(element);
                    if(dupcheck){
                        if(dupcheck.m_name == dupcheck.m_name){
                            return {success:false, msg:"중복되는 제품-재료가 존재합니다."};
                        }
                    }
                }catch(err){
                    return {success: false, msg:err};
                }
            });
        }catch(err){
            return {success:false, msg:err};
        }try{
            const buffer = []
            for(var i=0; i<client.m_name.length; i++){
                buffer.push({cafe_id: client.cafe_id, p_name:client.p_name, m_name: client.m_name[i], amount: client.amount[i]});
                console.log(buffer);
            }
            buffer.forEach(async element => {
                try{
                const response = await CafeStorage.ingredient_register(element);  
                }catch(err){
                    return {success: false, msg:err};
                }
            });
            var response = {success:true};
            return response;
        }catch(err){
            return {success:false, msg:err};
        }
    }

}

module.exports = Cafe;