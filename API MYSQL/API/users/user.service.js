const { callbackify } = require("util");
const pool = require("../../config/database");

module.exports = {
    create: (data, callback) => {
    pool.query(
        `insert into registration(firstname, lastname, gender, email, password, number)
            value (?,?,?,?,?,?,)`,
            [
                data.first_name,
                data.last_name,
                data.gender,
                data.email,
                data.password,
                data.number
            ],
            (error, results, field) => {
                if(error){
                   return callback(error)
                }
                    return callback (null, results)
            }  
        );
    }
}