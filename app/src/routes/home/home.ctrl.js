const User = require("../../models/User")

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
        res.render("home/products");
    },
    ingredient: (req, res) => {
        res.render("home/ingredient");
    },
    inbound: (req, res) => {
        res.render("home/inbound");
    },
    adjustment: (req, res) => {
        res.render("home/adjustment");
    },
    sellLog: (req, res) => {
        res.render("home/sellLog");
    },
    stockLog: (req, res) => {
        res.render("home/stockLog");
    },
    analysis: (req, res) => {
        res.render("home/analysis");
    },
    setting: (req, res) => {
        res.render("home/setting");
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
    }
};


module.exports = {
    output,
    process,
};