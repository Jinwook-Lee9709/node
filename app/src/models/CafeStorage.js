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
    static stock_logging1(client){
        return new Promise((resolve, reject)=>{
            const query = 
            "INSERT INTO stock_log (cafe_id, m_name, cu_quantity, po_quantity, flag) VALUES(?, ?, ?, ?, ?);";
            db.query(query,
                [client.cafe_id, client.m_name, client.quantity, client.po_quantity, 1],
                (err,data)=>{
                if (err) reject(`${err}`);
                resolve({success: true});
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
    static async material_delete(product){
        const get_mid =  await new Promise ((resolve, reject)=>{
            const query = 
            "SELECT * FROM material WHERE m_name = ? AND cafe_id = ?";
            db.query(query,
                [product.m_name, product.cafe_id],
                (err,data)=>{
                if (err) reject(`${err}`);
                 resolve(data[0]);
            });
        });
        if(get_mid){
            const response1 = await new Promise((resolve, reject) => {
                const query ="DELETE FROM ingredient WHERE m_name = ? AND cafe_id = ?";
                db.query(query,
                    [get_mid.m_name, get_mid.cafe_id],
                    (err,data)=>{
                    if (err) reject(`${err}`);
                    resolve({success:true});
                });
            });
            if(response1.success){
                const response2 = await new Promise((resolve, reject) => {
                    const query ="DELETE FROM stock_log WHERE m_name = ? AND cafe_id = ?";
                    db.query(query,
                        [get_mid.m_name, get_mid.cafe_id],
                        (err,data)=>{
                        if (err) reject(`${err}`);
                        resolve({success:true});
                    });
                });
                if(response2.success){
                    const response3 = await new Promise((resolve, reject) => {
                        const query ="DELETE FROM stock WHERE m_id = ? AND cafe_id = ?";
                        db.query(query,
                            [get_mid.m_id, get_mid.cafe_id],
                            (err,data)=>{
                            if (err) reject(`${err}`);
                            resolve({success:true});
                        });
                    });
                    if(response3.success){
                        return await new Promise((resolve, reject) => {
                        const query ="DELETE FROM material WHERE m_id = ?";
                        db.query(query,
                            [get_mid.m_id],
                            (err,data)=>{
                            if (err) reject(`${err}`);
                            resolve({success:true});
                            });
                        });
                    }
                }
            }
        }
        
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
    static async product_delete(product){
        const get_pid =  await new Promise ((resolve, reject)=>{
            const query = 
            "SELECT * FROM product WHERE p_name = ? AND cafe_id = ?";
            db.query(query,
                [product.p_name, product.cafe_id],
                (err,data)=>{
                if (err) reject(`${err}`);
                 resolve(data[0]);
            });
        });
        if(get_pid){
            const response1 = await new Promise((resolve, reject) => {
                const query ="DELETE FROM ingredient WHERE p_name = ? AND cafe_id = ?";
                db.query(query,
                    [get_pid.p_name, get_pid.cafe_id],
                    (err,data)=>{
                    if (err) reject(`${err}`);
                    resolve({success:true});
                });
            });
            if(response1.success){
                const response2 = await new Promise((resolve, reject) => {
                    const query ="DELETE FROM sell_log WHERE p_id = ? AND cafe_id = ?";
                    db.query(query,
                        [get_pid.p_id, get_pid.cafe_id],
                        (err,data)=>{
                        if (err) reject(`${err}`);
                        resolve({success:true});
                    });
                });
                if(response2.success){
                    return await new Promise((resolve, reject) => {
                        const query ="DELETE FROM product WHERE p_id = ?";
                        db.query(query,
                            [get_pid.p_id],
                            (err,data)=>{
                            if (err) reject(`${err}`);
                            resolve({success:true});
                        });
                    });
                }
            }
        }
        
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
            "SELECT DISTINCT p.p_name,s.in_date, p.price, SUM(amount) AS SUM FROM product p, sell_log s WHERE p.cafe_id = ? AND p.cafe_id = s.cafe_id AND p.p_id = s.p_id AND s.in_date > date_add(now(),interval -7 day) AND s.in_date < date_add(now(),interval 0 day) GROUP BY p.p_name, DATE(s.in_date);";
            db.query(query,
                [client.cafe_id],
                (err,data)=>{
                if (err) reject(`${err}`);
                resolve(data);
            });
        });
    }
    static get_week_sum_log(client){
        return new Promise((resolve, reject)=>{
            const query = 
            "SELECT DISTINCT p.p_name,p.price, SUM(amount) AS SUM FROM product p, sell_log s WHERE p.cafe_id = ? AND p.cafe_id = s.cafe_id AND p.p_id = s.p_id AND s.in_date > date_add(now(),interval -7 day) AND s.in_date < date_add(now(),interval 0 day) GROUP BY p.p_name;";
            db.query(query,
                [client.cafe_id],
                (err,data)=>{
                if (err) reject(`${err}`);
                resolve(data);
            });
        });
    }
    //일주일 재고 소모량
    static get_stock_week_log(client){
        return new Promise((resolve, reject)=>{
            const query = 
            "SELECT DISTINCT *, SUM(cu_quantity-po_quantity) AS SUM FROM material m, stock_log s WHERE m.cafe_id = ? AND s.flag = '1' AND m.cafe_id = m.cafe_id AND m.m_name = s.m_name AND s.in_date > date_add(now(),interval -7 day) AND s.in_date < date_add(now(),interval 0 day) GROUP BY m.m_name;";
            db.query(query,
                [client.cafe_id],
                (err,data)=>{
                if (err) reject(`${err}`);
                resolve(data);
            });
        });
    }
    static get_w_week_log(client){
        return new Promise((resolve, reject)=>{
            const query = 
            "SELECT DISTINCT * FROM product p, sell_log s WHERE p.cafe_id = s.cafe_id AND p.p_id = s.p_id AND s.in_date > date_add(now(),interval -7 day) AND s.in_date < date_add(now(),interval 0 day);";
            db.query(query,
                [],
                (err,data)=>{
                if (err) reject(`${err}`);
                resolve(data);
            });
        });
    }
    static get_w_stock_week_log(client){
        return new Promise((resolve, reject)=>{
            const query = 
            "SELECT DISTINCT *, FLOOR (SUM(cu_quantity-po_quantity)/7*1.2) AS SUM FROM material m, stock_log s WHERE s.flag = '1' AND m.cafe_id = s.cafe_id AND m.m_name = s.m_name AND s.in_date > date_add(now(),interval -7 day) AND s.in_date < date_add(now(),interval 0 day) GROUP BY m.m_name;";
            db.query(query,
                [],
                (err,data)=>{
                if (err) reject(`${err}`);
                resolve(data);
            });
        });
    }
    static modify_safestock(client){
        return new Promise((resolve, reject)=>{
            const query = 
            "UPDATE stock SET recommend_safe_quantity = ? WHERE m_id = ?;";
            db.query(query,
                [client.safe_quantity, client.m_id],
                (err,data)=>{
                if (err) reject(`${err}`);
                resolve(data);
            });
        });
    }
    static get_sell_log(){
        return new Promise((resolve, reject)=>{
            const query = 
            "SELECT DISTINCT p.cafe_id, p.p_name, SUM(amount) AS SUM FROM product p, sell_log s WHERE p.cafe_id = s.cafe_id AND p.p_id = s.p_id AND s.in_date > date_add(now(),interval -1 day) AND s.in_date < date_add(now(),interval 0 day) GROUP BY p.cafe_id, p.p_name;";
            db.query(query,
                [],
                (err,data)=>{
                if (err) reject(`${err}`);
                resolve(data);
            });
        });
    }
    static get_ingredient(client){
        return new Promise((resolve, reject)=>{
            const query = 
            "SELECT * FROM ingredient WHERE cafe_id = ? AND p_name = ?;";
            db.query(query,
                [client.cafe_id, client.p_name],
                (err,data)=>{
                if (err) reject(`${err}`);
                resolve(data);
            });
        });
    }
    static sell_logging(client){
        return new Promise((resolve, reject)=>{
            const query = 
            "INSERT INTO sell_log(cafe_id, p_id, amount) VALUES(?, ? ,?";
            db.query(query,
                [client.cafe_id, client.p_id,client.amount],
                (err,data)=>{
                if (err) reject(`${err}`);
                resolve(data);
            });
        });
    }
    
}

module.exports = CafeStorage;