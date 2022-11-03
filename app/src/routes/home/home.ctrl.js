const User = require("../../models/User");
const Cafe = require("../../models/Cafe");


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
        // console.log(user);
        const cafe = new Cafe(req.body);
        cafe.body.cafe_id = req.session.user.body.cafe_id
        const product = await cafe.product_get();
        const material = await cafe.material_get();
        const ingredient = await cafe.ingredient_get();
        const stocklog = await cafe.stock_log_get();
        data = {
            name: user.body.name
        }
        data.products = product;
        data.material = material;
        data.ingredient = ingredient;
        res.render(path,{data});
    }else{
        res.render("home/login");
    }
}

const output = {
    home: async(req, res) => {
        // const user = req.session.user;
        // if(user !== undefined){
        //     // console.log(user);
        //     const cafe = new Cafe(req.body);
        //     cafe.body.cafe_id = req.session.user.body.cafe_id
        //     const product = await cafe.product_get();
        //     const material = await cafe.material_get();
        //     data = {
        //         name: user.body.name
        //     }
        //     data.products = product;
        //     data.material = material;
            
        //     res.render("home/index",{data});
        // }else{
        //     res.render("home/login");
        // }
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
            if(response.success && response1.success){
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
        const response = await user.cafe_register();
        if (response.success){
            const response1 =  await user.cafe_update();
            console.log(response1);
            req.session.cafe = true;
        }else{
            response.success = false;
        }
        return res.json(response);
    }
    ,
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