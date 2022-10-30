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
}

module.exports = CafeStorage;