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
    static stock_modify(client){
        return new Promise((resolve, reject)=>{
            const query = 
            "UPDATE stock SET quantity = ? WHERE cafe_id = ? AND m_id = ?;";
            db.query(query,
                [client.amount, client.cafe_id, client.m_id],
                (err,data)=>{
                if (err) reject(`${err}`);
                resolve({success: true});
            });
        });
    }
    static stock_inbound(client){
        return new Promise((resolve, reject)=>{
            const query = 
            "UPDATE stock SET quantity = quantity + ? WHERE cafe_id = ? AND m_id = ?;";
            db.query(query,
                [client.amount, client.cafe_id, client.m_id],
                (err,data)=>{
                if (err) reject(`${err}`);
                resolve({success: true});
            });
        });
    }
    static stock_log_get(client){
        return new Promise((resolve, reject)=>{
            const query = 
            "SELECT * FROM stock_log WHERE cafe_id = ?";
            db.query(query,
                [client.cafe_id],
                (err,data)=>{
                if (err) reject(`${err}`);
                resolve(data);
            });
        });
    }
    static stock_logging2(client){
        return new Promise((resolve, reject)=>{
            const query = 
            "INSERT INTO stock_log (cafe_id, m_name, cu_quantity, po_quantity, flag) VALUES(?, ?, ?, ?, ?);";
            db.query(query,
                [client.cafe_id, client.m_name, client.quantity, client.po_quantity, 2],
                (err,data)=>{
                if (err) reject(`${err}`);
                resolve({success: true});
            });
        });
    }
    static stock_logging3(client){
        return new Promise((resolve, reject)=>{
            const query = 
            "INSERT INTO stock_log (cafe_id, m_name, cu_quantity, po_quantity, flag) VALUES(?, ?, ?, ?, ?);";
            db.query(query,
                [client.cafe_id, client.m_name, client.quantity, client.po_quantity, 3],
                (err,data)=>{
                if (err) reject(`${err}`);
                resolve({success: true});
            });
        });
    }
    static stock_get(client){
        return new Promise((resolve, reject)=>{
            const query = 
            "SELECT DISTINCT * FROM material m, stock s WHERE m.cafe_id = s.cafe_id AND m.m_id = s.m_id AND m.cafe_id = ? AND m.m_name = ? ";
            db.query(query,
                [client.cafe_id, client.m_name],
                (err,data)=>{
                if (err) reject(`${err}`);
                resolve(data[0]);
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
    static material_get2(client){
        return new Promise((resolve, reject)=>{
            const query = 
            "SELECT DISTINCT * FROM material m, stock s WHERE m.cafe_id = s.cafe_id AND m.m_id = s.m_id AND m.cafe_id = ? AND m.m_name = ?;";
            db.query(query,
                [client.cafe_id, client.m_name],
                (err,data)=>{
                if (err) reject(`${err}`);
                resolve(data[0]);
            });
        });
    }
    static material_modify(material){
        return new Promise((resolve, reject)=>{
            const query = 
            "UPDATE material SET unit = ?, des = ? WHERE cafe_id = ? AND m_name = ?;";
            db.query(query,
                [material.unit, material.des, material.cafe_id, material.m_name],
                (err,data)=>{
                if (err) reject(`${err}`);
                resolve({success: true});
            });
        });
    }
    static safe_quantity_modify(client){
        return new Promise((resolve, reject)=>{
            const query = 
            "UPDATE stock SET safe_quantity = ? WHERE cafe_id = ? AND m_id = ?;";
            db.query(query,
                [client.safe_quantity, client.cafe_id, client.m_id],
                (err,data)=>{
                if (err) reject(`${err}`);
                resolve({success: true});
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
    static product_modify(product){
        return new Promise((resolve, reject)=>{
            const query = 
            "UPDATE product SET p_name = ?, price = ?, des = ?, category = ? WHERE cafe_id = ? AND p_name = ?;";
            db.query(query,
                [product.p_name, product.price, product.des, product.category, product.cafe_id, product.pre_p_name],
                (err,data)=>{
                if (err) reject(`${err}`);
                resolve({success: true});
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
                resolve(data[0]);
            });
        });
    }}
    static ingredient_get(client){{
        return new Promise((resolve, reject)=>{
            const query = 
            "SELECT * FROM ingredient WHERE cafe_id = ?";
            db.query(query,
                [client.cafe_id],
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
    static ingredient_delete(ingredient){
        return new Promise((resolve, reject)=>{
            const query = 
            "DELETE FROM ingredient WHERE cafe_id = ? AND p_name = ?;";
            db.query(query,
                [ingredient.cafe_id, ingredient.p_name,ingredient.m_name],
                (err)=>{
                if (err) reject(`${err}`);
                resolve({success: true});
            });
        });
    }
    static ingredient_modify(ingredient){
        return new Promise((resolve, reject)=>{
            const query = 
            "UPDATE ingredient SET p_name = ?, m_name = ?, amount = ? WHERE cafe_id = ? AND p_name = ? AND m_name = ?;";
            db.query(query,
                [ingredient.p_name, ingredient.m_name, ingredient.amount, ingredient.cafe_id, ingredient.p_name, ingredient.m_name],
                (err,data)=>{
                if (err) reject(`${err}`);
                resolve({success: true});
            });
        });
    }
    static get_week_log(client){
        return new Promise((resolve, reject)=>{
            const query = 
            "SELECT DISTINCT * FROM product p, sell_log s WHERE p.cafe_id = ? AND p.cafe_id = s.cafe_id AND p.p_id = s.p_id AND s.in_date > date_add(now(),interval -7 day) AND s.in_date < date_add(now(),interval 0 day);";
            db.query(query,
                [client.cafe_id],
                (err,data)=>{
                if (err) reject(`${err}`);
                resolve(data);
            });
        });
    }

    
}

module.exports = CafeStorage;