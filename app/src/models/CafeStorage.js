const db = require("../config/db");

class CafeStorage{
    static material_register(client){
        return new Promise((resolve, reject)=>{
            const query = 
            "INSERT INTO material(cafe_id, m_name, unit, des) VALUES(?, ?, ?, ?);";
            db.query(query,
                [client.cafe_id, client.m_name,client.unit,client.desc],
                (err,data)=>{
                if (err) reject(`${err}`);

                resolve({success: true});
            });
        });
    }
    static get_m_id(client){
        return new Promise((resolve, reject)=>{
            const query = 
            "SELECT m_id FROM material WHERE cafe_id = ? AND m_name = ?;";
            db.query(query,
                [client.cafe_id, client.m_name],
                (err,data)=>{
                if (err) reject(`${err}`);
                resolve(data[0]);
            });
        });
    }
    static stock_init(client){
        return new Promise((resolve, reject)=>{
            const query = 
            "INSERT INTO stock(cafe_id, m_id, quantity, safe_quantity) VALUES(?, ?, ?, ?);";
            db.query(query,
                [client.cafe_id, client.m_id, 0, 0],
                (err,data)=>{
                if (err) reject(`${err}`);

                resolve({success: true});
            });
        });
    }

    static material_dupcheck(client){
        return new Promise((resolve, reject)=>{
            const query = 
            "SELECT * FROM material WHERE m_name = ? AND cafe_id = ?";
            db.query(query,
                [client.m_name, client.cafe_id],
                (err,data)=>{
                if (err) reject(`${err}`);
                resolve(data[0]);
            });
        });
    }
    static material_get(client){
        return new Promise((resolve, reject)=>{
            const query = 
            "SELECT DISTINCT * FROM material m, stock s WHERE m.cafe_id = s.cafe_id AND m.m_id = s.m_id AND m.cafe_id = ?;";
            db.query(query,
                [client.cafe_id],
                (err,data)=>{
                if (err) reject(`${err}`);
                resolve(data);
            });
        });
    }
    static product_register(product){
        return new Promise((resolve, reject)=>{
            const query = 
            "INSERT INTO product(cafe_id, p_name, price, des, category) VALUES(?, ?, ?, ?, ?);";
            db.query(query,
                [product.cafe_id, product.p_name, product.price, product.desc, product.category],
                (err)=>{
                if (err) reject(`${err}`);
                resolve({success: true});
            });
        });
    }
    static product_dupcheck(product){
        return new Promise((resolve, reject)=>{
            const query = 
            "SELECT * FROM product WHERE p_name = ? AND cafe_id = ?";
            db.query(query,
                [product.p_name, product.cafe_id],
                (err,data)=>{
                if (err) reject(`${err}`);
                resolve(data[0]);
            });
        });
    }
    static product_get(product){
        return new Promise((resolve, reject)=>{
            const query = 
            "SELECT * FROM product WHERE cafe_id = ?";
            db.query(query,
                [product.cafe_id],
                (err,data)=>{
                if (err) reject(`${err}`);
                resolve(data);
            });
        });
    }
    static ingredient_dupcheck(ingredient){{
        return new Promise((resolve, reject)=>{
            const query = 
            "SELECT * FROM ingredient WHERE cafe_id = ? AND p_name = ? AND m_name = ?";
            db.query(query,
                [ingredient.cafe_id,ingredient.p_name,ingredient.m_name],
                (err,data)=>{
                if (err) reject(`${err}`);
                resolve(data);
            });
        });
    }}
    static ingredient_register(ingredient){
        return new Promise((resolve, reject)=>{
            const query = 
            "INSERT INTO ingredient(cafe_id, p_name, m_name, amount) VALUES(?, ?, ?, ?);";
            db.query(query,
                [ingredient.cafe_id, ingredient.p_name,ingredient.m_name,ingredient.amount],
                (err)=>{
                if (err) reject(`${err}`);
                resolve({success: true});
            });
        });
    }
}

module.exports = CafeStorage;