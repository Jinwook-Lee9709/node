const db = require("../config/db");

class CafeStorage{
    static material_register(mat){
        return new Promise((resolve, reject)=>{
            const query = 
            "INSERT INTO material(cafe_id, m_name, unit, desc) VALUES(?, ?, ?, ?);";
            db.query(query,
                [cafe_id, m_name,unit,desc],
                (err,data)=>{
                if (err) reject(`${err}`);

                resolve({success: true});
            });
        });
    }

    static material_dupcheck(mat){
        return new Promise((resolve, reject)=>{
            const query = 
            "SELECT * FROM material WHERE m_name = ?";
            db.query(query,
                [m_name],
                (err,data)=>{
                if (err) reject(`${err}`);

                resolve({success: true});
            });
        });
    }
}