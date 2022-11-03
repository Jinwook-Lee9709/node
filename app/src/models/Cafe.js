const { json, response } = require("express");
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
            console.log(material);
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
        try{
            const material = await CafeStorage.material_get(client);
            return material
        }catch(err){
            return {success: false, msg:err};
        }
    }
    async material_modify(){
        const client = this.body;
        try{
            const material = await CafeStorage.material_get2(client);
            if(material){{
                console.log('flag');
                client.m_id = material.m_id;
                const response1 = await CafeStorage.material_modify(client);
                const response2 = await CafeStorage.safe_quantity_modify(client);
            }}
            return {success: true}
        }catch(err){
            return {success: false, msg:err};
        }
    }
    //제품 등록
    async product_register(){
        const client = this.body;
        try{
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
                buffer.push({cafe_id: client.cafe_id, pre_p_name: client.pre_p_name, des: client.des,
                price: client.price, category: client.category, p_name:client.p_name, m_name: client.m_name[i], amount: client.amount[i]});
            }
            buffer.forEach(async element => {
                try{
                const del = await CafeStorage.ingredient_delete(element);
                const dupcheck = await CafeStorage.ingredient_dupcheck(element);
                    if(dupcheck){
                        if(element.m_name == dupcheck.m_name){
                            const register = await CafeStorage.ingredient_modify(element);
                            const register1 = await CafeStorage.product_modify(element);
                            console.log('flag1');
                        }
                    }else{
                        const response = await CafeStorage.ingredient_register(element);  
                        const register1 = await CafeStorage.product_modify(element);
                        console.log('flag3');
                    }
                }catch(err){
                    return {success: false, msg:err};
                }
            });
            return {success:true};
        }catch(err){
            return {success:false, msg:err};
        }
    }
    async ingredient_get(){
        const client = this.body;
        try{
            const ingredient = await CafeStorage.ingredient_get(client);
            return ingredient;
        }catch(err){
            return {success: false, msg:err};
        }
    }
    async stock_modify(){
        const client = this.body;
        try{
            const buffer = []
            for (var i = 0; i<client.m_name.length; i++){
                buffer.push({cafe_id: client.cafe_id, m_name: client.m_name[i], amount: client.amount[i]})
            }
            buffer.forEach(async element=> {
                try{
                    
                    const stock = await CafeStorage.stock_get(element);
                    stock.amount = element.amount;
                   
                    if(stock){
                        if(stock.m_name == element.m_name){
                            const response = await CafeStorage.stock_modify(stock);
                            if(response.success){
                                const stock1 = await CafeStorage.stock_get(element);
                                stock.po_quantity = stock1.quantity;
                                console.log(stock)
                                const response1 = await CafeStorage.stock_logging3(stock);
                                
                            }
                        }
                    
                    }else{
                        return {success:false, msg:"재고 연동 오류"};
                    }
                }catch(err){
                    return {success:false, msg:err};
                }
            })
            return {success:true};
           
        }catch(err){
            return {success:false, msg:err};
        }
    }
    async stock_inbound(){
        const client = this.body;
        try{
            const buffer = []
            for (var i = 0; i<client.m_name.length; i++){
                buffer.push({cafe_id: client.cafe_id, m_name: client.m_name[i], amount: client.amount[i]})
            }
            buffer.forEach(async element=> {
                try{
                    const stock = await CafeStorage.stock_get(element);
                    stock.amount = element.amount;
                    if(stock){
                        if(stock.m_name == element.m_name){
                            const response = await CafeStorage.stock_inbound(stock);
                            if(response.success){
                                console.log('flag');
                                const stock1 = await CafeStorage.stock_get(element);
                                stock.po_quantity = stock1.quantity;
                                console.log('flag1');
                                const response1 = await CafeStorage.stock_logging2(stock);
                            }
                        }
                    
                    }else{
                        return {success:false, msg:"재고 연동 오류"};
                    }
                }catch(err){
                    return {success:false, msg:err};
                }
            })
            return {success:true};
           
        }catch(err){
            return {success:false, msg:err};
        }
    }
    async stock_log_get(){
        const client = this.body;
        try{
            const stock_log = await CafeStorage.stock_log_get(client);
            return stock_log;
        }catch(err){
            return {success: false, msg:err};
        }
    }

}

module.exports = Cafe;