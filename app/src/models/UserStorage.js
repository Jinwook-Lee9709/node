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
    static getCafeInfo(id){
        return new Promise((resolve, reject)=>{
            const query = "SELECT * FROM cafe c, user_cafe u WHERE c.cafe_id = u.cafe_id AND u.user_id = ?;";
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
            const query = "INSERT INTO users(id, name, psword, cafe) VALUES(?, ?, ?, ?);";
            db.query(query,
                [userInfo.id, userInfo.name, userInfo.psword, false],
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
        const response = await new Promise((resolve, reject)=>{  
            const query = "INSERT INTO cafe(cafe_name, owner_id, code) VALUES(?, ?, ?)"
            db.query(query,
                [info.cafe_name, info.id, info.code],
                (err,)=>{
                if (err) reject(`${err}`);
                resolve({ success: true});
            });
        });
        if(response.success){
            const cafe_id = await new Promise((resolve, reject)=>{  
                const query = "SELECT cafe_id FROM cafe WHERE owner_id = ?"
                db.query(query,
                    [info.id],
                    (err,data)=>{
                    if (err) reject(`${err}`);
                    resolve(data[0]);
                });
            });
            console.log(cafe_id);
            if(cafe_id){
                return new Promise((resolve, reject)=>{  
                    const query = "INSERT INTO user_cafe(user_id, cafe_id) VALUES(?, ?)"
                    db.query(query,
                        [info.id, cafe_id.cafe_id],
                        (err,)=>{
                        if (err) reject(`${err}`);
                        resolve({ success: true});
                    });
                });
            }
        }
    }
    static async cafe_register_by_code(info){
        const response =  await new Promise ((resolve, reject)=>{  
            const query = "SELECT * FROM cafe WHERE cafe.code = ?"
            db.query(query,
                [info.code],
                (err,data)=>{
                if (err) reject(`${err}`);
                resolve(data[0]);
            });
        });
        if(response){
            const response2 =  await new Promise ((resolve, reject)=>{  
                const query = "INSERT INTO user_cafe(user_id, cafe_id) VALUES(?,?)"
                db.query(query,
                    [info.id,response.cafe_id],
                    (err,)=>{
                    if (err) reject(`${err}`);
                    resolve({ success: true});
                });
            });
            if(response2.success){
                return await new Promise ((resolve, reject)=>{  
                    const query = "UPDATE users SET cafe = '1' WHERE  id = ?;"
                    db.query(query,
                        [info.id],
                        (err,)=>{
                        if (err) reject(`${err}`);
                        resolve({ success: true});
                    });
                });
            }
        }else{
            response.success = false;
        }
    }
    static async cafe_find(id){
        return new Promise((resolve, reject)=>{  
            const query = "SELECT DISTINCT * FROM cafe c, user_cafe u WHERE c.cafe_id = u.cafe_id AND u.user_id = ?"
            db.query(query,
                [id],
                (err,data)=>{
                if (err) reject(`${err}`);
                resolve(data[0]);
            });
        });
    }
    static async change_cafe_name(client){
        return new Promise((resolve, reject)=>{  
            const query = "UPDATE cafe SET cafe_name = ? WHERE cafe_id = ?"
            db.query(query,
                [client.cafe_name, client.cafe_id],
                (err,data)=>{
                if (err) reject(`${err}`);
                resolve({success:true});
            });
        });
    }
}

module.exports = UserStorage;