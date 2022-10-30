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
}

module.exports = CafeStorage;