const User = require("../../models/User")

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
    home: (req, res) => {
        const user = req.session.user;
        if(user !== undefined){
            console.log(user);
            data = {
                name: user.body.name
            }
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

    products: (req, res) => {
        //res.render("home/products");
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
};



const process = {
    login: async (req, res) => {
        const user = new User(req.body);
        const response = await user.login();
        if(response.success){
            user.body.name = response.name;
            req.session.user = user;
        }
        return res.json(response);
    },
    register: async (req, res) => {
        const user = new User(req.body);
        const response = await user.register();
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