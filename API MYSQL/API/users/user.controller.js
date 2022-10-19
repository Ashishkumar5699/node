const { create,
        getUsers,
        getUserbyid,
        updateUser,
        deleteUser,
        getUserByUserEmail } = require("./user.service");
const { genSaltSync, hash, hashSync, compareSync, compare } = require("bcrypt")
const { sign } = require("jsonwebtoken");
module.exports = {
    createUser: async (req,res) => {
        const body = req.body;
        console.log(body);

        //validation checkpoint
        // if (!(body.first_name && body.last_name && body.gender && body.email && body.user_password)) 
        // {
        //     res.status(400).send("All input is required");
        // }


        // const salt = genSaltSync(10);     
        // body.User_password = await hashSync(body.User_password, salt);

        body.user_password = await hash(body.user_password, 10);
        console.log(`user password = ${body.user_password}`);

        // console.log(`user password = ${body.User_password}`);

        create (body, (err, results) => {
            console.log("i am working");
            if (err)
            {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Datebase connection error"
                });
            }
            return res.status(200).json({
                success:1,
                data: results
            })
        });
    },
    getUsers: (req, res)=> {
        getUsers((err, results)=>{
            if(err){
                console.log(err);
                return;
            }
            return res.json({
                success:1,
                data: results
            })
        })
    }, 
    getUserbyid: (req, res)=> {
        const id = req.params.id;
        getUserbyid(id, (err, results)=> {
            if(err){
                console.log(error);
            }
            if(!results){
                return res.json({
                    sucess: 1,
                    data: "record not found"
                })
            }
            return res.json({
                sucsess:1,
                message: results
            })
        })
    },
    updateUser: async (req, res)=> {
        const body = req.body;
        console.log("i am working");
        const salt = genSaltSync(10);     
        body.User_password = await hash(body.User_password, salt);
        console.log(body.User_password);
        updateUser(body,(err, results)=>{
            if(err){
                console.log(err);
                return;
            }
            return res.json({
                success:1,
                message: "Update Sucessfull"
            })
        })
    },
    deleteUser: (req, res)=> {
        const data = req.body;
        deleteUser(data, (err, results)=>{
            if(err){
                console.log(err);
                return;
            }
            if(!results){
                res.json({
                    success:0,
                    message: "Record not found"
                })
            }
            return res.json({
                success:1,
                data: "user delete sucessfully"
            });
        });
    },
    login: (req, res) => {
        const body = req.body;
        console.log(" user control login body running");
        getUserByUserEmail(body.email, async (err,results) => {
            if(err)
            {
                console.log(err);
            }
            if(!results)
            {
                return res.json({
                    sucess: 0,
                    message: "invalid email or password"
                })
            }
            console.log(`body.User_password = ${body.user_password}`);
            console.log(`results.User_password = ${results.user_password}`);

            const result = compare(body.user_password, results.user_password);
            if(result){
                // result.User_password = undefined;
                const jsontoken = sign( {results: results}, "abcd", {
                    expiresIn: "1h"
                });
                return res.json({
                    success: 1,
                    message: "login succesfully",
                    token: jsontoken
                });
            } else {
                return res.json({
                    success: 0,
                    message: "invalid email or password"
                });
            }
        })
    }
}