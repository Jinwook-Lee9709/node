const User = require("../../models/User");
const Cafe = require("../../models/Cafe");
const UserStorage = require("../../models/UserStorage");


// function RenderIfNotLogin(req, res, path){
//     if(req.session.user !== undefined){
//         res.render(path);
//     }
//     else{
//         //res.render("home/login");
//         res.redirect("login");
//     }
// }

async function RenderIfNotLogin(req, res, path){
    const user = req.session.user;
    if(user !== undefined){
        console.log(user.body);
        if(user.body.cafe){
            // console.log(user);
            const cafe = new Cafe(req.body);
            const user1 = new User(req.body);
            user1.body = req.session.user.body
            cafe.body.cafe_id = req.session.user.body.cafe_id
            const product = await cafe.product_get();
            const material = await cafe.material_get();
            const ingredient = await cafe.ingredient_get();
            const stocklog = await cafe.stock_log_get();
            const weeklog = await cafe.get_week_log();
            const stockweeklog = await cafe.get_stock_week_log();
            const weeksumlog = await cafe.get_week_sum_log();
            const info = await user1.get_cafe_info();
            data = {
                name: user.body.name
            }
            data.products = product;
            data.material = material;
            data.ingredient = ingredient;
            data.stocklog = stocklog; // 재고 변경 기록
            data.weeklog = weeklog; // <분석> 각 상품 별, 일주일치 각 날짜당 판매량 p_name , in_date, SUM
            data.stockweeklog = stockweeklog;  //
            data.weeksumlog = weeksumlog; // 각 상품별, 일주일치 판매량 합 p_name, SUM
            data.info = info;
            console.log(data.material);
            res.render(path,{data});
        }else{
            res.redirect("/cafeLogin");
        }
    }else{
        res.render("home/login");
    }
}

const output = {
    home: async(req, res) => {
        RenderIfNotLogin(req, res, "home/index");
    },
    
    login: (req, res) => {
        res.render("home/login");
    },
    register: (req, res) => {
        res.render("home/register");
    },

    products:  (req, res) => {
        RenderIfNotLogin(req, res, "home/products");
    },
    ingredient: (req, res) => {
        RenderIfNotLogin(req, res, "home/ingredient");
    },
    inbound: (req, res) => {
        RenderIfNotLogin(req, res, "home/inbound");
    },
    adjustment: (req, res) => {
        RenderIfNotLogin(req, res, "home/adjustment");
    },
    stockLog: (req, res) => {
        RenderIfNotLogin(req, res, "home/stockLog");
    },
    analysis: (req, res) => {
        RenderIfNotLogin(req, res, "home/analysis");
    },
    setting: (req, res) => {
        RenderIfNotLogin(req, res, "home/setting");
    },
    pos: (req, res) => {
        RenderIfNotLogin(req, res, "home/pos");
    },
    
    cafeLogin: (req, res) => {
        const user = req.session.user;
        if(user !== undefined){
            res.render("home/cafeLogin");
        }else{
            res.render("home/login");
        }
    },
    cafeRegister: (req, res) => {
        const user = req.session.user;
        if(user !== undefined){
            res.render("home/cafeRegister");
        }else{
            res.render("home/login");
        }
    },
    
    test: (req, res) =>{
        RenderIfNotLogin(req, res, "home/test");
    }
};



const process = {
    login: async (req, res) => {
        const user = new User(req.body);
        const response = await user.login();
        if (response.cafe){
            const response1 = await user.cafe_find();
            if(response.success && response1){
                user.body.name = response.name;
                user.body.cafe = response.cafe;
                user.body.cafe_id = response1.cafe_id;
                req.session.user = user; 
            }
        }else{
            if(response.success){
                user.body.name = response.name;
                user.body.cafe = response.cafe;
                req.session.user = user; 
            }
        }
        console.log(req.session.user)
        return res.json(response);
    },
    register: async (req, res) => {
        const user = new User(req.body);
        const response = await user.register();
        return res.json(response);
    },
    cafe_register: async (req, res) =>{
        const user = new User(req.body);
        user.body.id = (req.session.user.body.id)
        user.body.code = Math.random().toString(10).slice(2);
        const response = await user.cafe_register();
        if (response.success){
            const response1 =  await user.cafe_update();
            console.log(response1);
            req.session.user.body.cafe = true;
        }else{
            response.success = false;
        }
        return res.json(response);
    },
    cafe_register_by_code: async (req, res) =>{
        const user = new User(req.body);
        user.body.id = (req.session.user.body.id)
        const response = await user.cafe_register_by_code();
        if (response.success){
            const response1 =  await user.cafe_update();
            req.session.user.body.cafe = true;
            const response2 = await user.cafe_find();
            if(response2){
                req.session.user.body.cafe_id = response2.cafe_id; 
            }
        }else{
            response.success = false;
        }
        return res.json(response);
    },
    cafe_disconnect: async (req, res) =>{
        const user = new User(req.body);
        user.body = (req.session.user.body)
        const response = await user.cafe_disconnect();
        if(response.success){
            req.session.user.body.name = user.body.user_name
        }
        return res.json(response);
    },
    change_cafe_name: async (req, res) => {
        const user = new User(req, res);
        user.body = user.body.body;
        user.body.id = req.session.user.body.id
        user.body.cafe_id = req.session.user.body.cafe_id;
        user.body.name = req.session.user.body.name;
        const response = await user.change_cafe_name();
        req.session.user.body.name = user.body.user_name;
        return res.json(response);
    },
    material_register: async (req, res)=>{
        const cafe = new Cafe(req.body);
        cafe.body.cafe_id = req.session.user.body.cafe_id
        const response = await cafe.material_register();
        return res.json(response);
    },
    material_modify: async (req, res) => {
        const cafe = new Cafe(req, res);
        cafe.body= cafe.body.body;
        cafe.body.cafe_id = req.session.user.body.cafe_id;
        console.log(cafe.body);
        const response = await cafe.material_modify();
        return res.json(response);
    },
    product_register: async (req, res) =>{
        const cafe = new Cafe(req.body);
        cafe.body.cafe_id = req.session.user.body.cafe_id
        const response = await cafe.product_register();
        console.log(response);
        return res.json(response);
    },
    ingredient_register: async (req, res) => {
        const cafe = new Cafe(req, res);
        cafe.body = Object.assign(cafe.body.body, req.session.user.body);
        const response = await cafe.ingredient_register();
        return res.json(response);
    },
    stock_inbound: async (req, res) => {
        const cafe = new Cafe(req, res);
        cafe.body = Object.assign(cafe.body.body, req.session.user.body);
        const response = await cafe.stock_inbound();
        return res.json(response);
    },
    stock_modify: async (req, res) => {
        const cafe = new Cafe(req, res);
        cafe.body = Object.assign(cafe.body.body, req.session.user.body);
        const response = await cafe.stock_modify();
        return res.json(response);
    },
    delete_product: async (req, res) => {
        const cafe = new Cafe(req, res);
        cafe.body = Object.assign(cafe.body.body, req.session.user.body);
        const response = await cafe.product_delete();
        return res.json(response);
    },
    delete_material: async (req, res) => {
        const cafe = new Cafe(req, res);
        cafe.body = Object.assign(cafe.body.body, req.session.user.body);
        const response = await cafe.material_delete();
        console.log(response);
        return res.json(response);
    },
    sell_logging: async (req, res) => {
        const cafe = new Cafe(req, res);
        cafe.body = Object.assign(cafe.body.body, req.session.user.body);
        const response = await cafe.sell_logging();
        return res.json(response);
    },
    logout: async (req, res) => {
        try {
            if (req.session.user) { //세션정보가 존재하는 경우
                await req.session.destroy(function (err) {
                    if (err)
                        console.log(err);
                    else {
                        res.redirect('login');
                    }
                })
            }
        }
        catch (err) {
            console.log(err)
        }
    }
};


module.exports = {
    output,
    process,
};