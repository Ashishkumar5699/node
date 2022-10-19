const { callbackify } = require("util");
const pool = require("../../config/database");

module.exports = {
    create: (data, callback) => {
    pool.query(
        `insert into registration(first_name, last_name, gender, email, user_password, Phone_number)
            value (?,?,?,?,?,?)`,
            [
                data.first_name,
                data.last_name,
                data.gender,
                data.email,
                data.user_password,
                data.Phone_number
            ],
            (error, results, field) => {
                if(error){
                   return callback(error)
                }
                    return callback (null, results)
            }  
        );
        console.log(`user service user_password = ${data.user_password}`);
    },
    getUsers: callback => {
        pool.query(
            `select id, first_name, last_name, gender, email, user_password, Phone_number from registration`,
            [],(error, results, field) => {
                if(error){
                    return callback(error);
                }
                return callback(null, results)
            }
        );
    },
    getUserbyid: (id, callback) => {
        pool.query(
            `select id, first_name, last_name, gender, email, user_password, Phone_number from registration where id = ?`,
            [id],
            (error, results, fields) => {
                if(error){
                    return callback(error);
                }
                return callback(null, results[0]);
            }
        );
    },
    updateUser: (data, callback) => {
        pool.query(
            `update registration set first_name = ?, last_name =?, gender =?, email=?, user_password = ?, Phone_number = ? where id = ?`,
            [
                data.first_name,
                data.last_name,
                data.gender,
                data.email,
                data.user_password,
                data.Phone_number,
                data.id
            ],
            (error, results, field) => {
                if(error){
                   return callback(error);
                }
                    return callback (null, results);
            } 
        );
    },
    deleteUser: (data, callback) => {
        pool.query(
            `delete from registration where id = ?`,
            [data.id],
            (error, results, field) => {
                if(error){
                   return callback(error);
                }
                    return callback (null, results);
            } 
        );
    },
    getUserByUserEmail: (email, callBack) =>
    pool.query(
        `select * from registration where email = ?`,
        [email],
        (error, results, fields) => {
            if(error)
            {
                return callBack(error);
            }
            return callBack(null, results);
        }
    )
};