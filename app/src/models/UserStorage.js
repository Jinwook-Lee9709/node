const db = require("../config/db");

class UserStorage{

    static getUserInfo(id){
        return new Promise((resolve, reject)=>{
            const query = "SELECT * FROM users WHERE id = ?;";
            db.query(query,[id],(err,data)=>{
                if (err) reject(`${err}`);
                resolve(data[0]);
            });
        });
        
    }
    
    static checkDuplication(id){
        return new Promise((resolve, reject)=>{
            const query = "SELECT id FROM users WHERE id = ?;";
            db.query(query,[id],(err,data)=>{
                if (err) reject(`${err}`);
                resolve(data[0]);
            });
        });
    }

    static async save(userInfo){
        return new Promise((resolve, reject)=>{
            const query = "INSERT INTO users(id, name, psword, cafe) VALUES(?, ?, ?);";
            db.query(query,
                [userInfo.id, userInfo.name, userInfo.psword, FALSE],
                (err,)=>{
                if (err) reject(`${err}`);
                resolve({ success: true});
            });
        });
    }
    static async cafe_update(info){
        return new Promise((resolve, reject)=>{  
            const query = "UPDATE users SET cafe = TRUE WHERE id = (?)"
            db.query(query,
                [info.id],
                (err,)=>{
                if (err) reject(`${err}`);
                resolve({ success: true});
            });
        });
    }
    static async cafe_save(info){
        return new Promise((resolve, reject)=>{  
            const query = "INSERT INTO cafe(cafe_name, owner_id) VALUES(?, ?)"
            db.query(query,
                [info.cafe_name, info.id],
                (err,)=>{
                if (err) reject(`${err}`);
                resolve({ success: true});
            });
        });
    }
    static async cafe_find(id){
        return new Promise((resolve, reject)=>{  
            const query = "SELECT * FROM cafe WHERE owner_id = ?;"
            db.query(query,
                [id],
                (err,data)=>{
                if (err) reject(`${err}`);
                resolve(data[0]);
            });
        });
    }
}

module.exports = UserStorage;