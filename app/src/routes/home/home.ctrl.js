const User = require("../../models/User");
const Cafe = require("../../models/Cafe");


function RenderIfNotLogin(req, res, path){
    if(req.session.user !== undefined){
        res.render(path);
    }
    else{
        //res.render("home/login");
        res.redirect("login");
    }
    
}

const output = {
    home: async(req, res) => {
        const user = req.session.user;
        if(user !== undefined){
            // console.log(user);
            const cafe = new Cafe(req.body);
            cafe.body.cafe_id = req.session.user.body.cafe_id
            const product = await cafe.product_get();
            data = {
                name: user.body.name,
                products: [{
                    name: "아메리카노", 
                    price: 3000,
                    description: "아메리카노."
                },
                {
                    name: "카페라떼",
                    price: 4000,
                    description: "우유를 섞은 커피다."
                },
                {
                    name: "카라멜 마끼아또",
                    price: 4500,
                    description: "카라멜을 섞은 커피다."
                },
                {
                    name: "카페모카",
                    price: 4500,
                    description: "초코를 섞은 커피다."
                },
                {
                    name: "아이스티",
                    price: 3000,
                    description: "편의점 아이스티다."
                }],
                ingredient: [
                    {
                        name: "원두/생두(g)",
                        stock: 5000,
                        description: "커피 원두."
                    },
                    {
                        name: "우유(L)",
                        stock: 20,
                        description: "맛있는 우유다."
                    },
                    {
                        name: "플라스틱 컵(개)",
                        stock: 1500,
                        description: "음료를 담는 플라스틱 통."
                    },
                    {
                        name: "플라스틱 뚜껑(개)",
                        stock: 1500,
                        description: "플라스틱 컵을 닫는 뚜껑."
                    },
                    {
                        name: "플라스틱 빨대(개)",
                        stock: 2000,
                        description: "빨대."
                    },
                    {
                        name: "초콜릿(g)",
                        stock: 500,
                        description: "카페모카에 들어가는 초코."
                    }
                ]
            }
            data.products = product;
            res.render("home/index",{data});
        }else{
            res.render("home/login");
        }
        
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
    sellLog: (req, res) => {
        RenderIfNotLogin(req, res, "home/sellLog");
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
    product_register: async (req, res) =>{
        const cafe = new Cafe(req.body);
        cafe.body.cafe_id = req.session.user.body.cafe_id
        const response = await cafe.product_register();
        console.log(response);
        return res.json(response);
    }
    ,
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