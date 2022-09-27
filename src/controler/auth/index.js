const db = require("../../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const env=require('dotenv').config();
const multer = require("multer");
const ejs = require("ejs");
const path = require("path");
const {uploads} = require('./upload');


exports.getData = (req, res) => {
  db.query("select * from users where deleted_at is null", (err, result) => {
    console.log("result is :", result);
    res.send({ result, email: req.user });
  });
};

exports.signup = async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const secpass = await bcrypt.hash(req.body.password, salt);

  const data = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: secpass,
  };

  db.query(
    `select * from users where email = ?`,
    [data.email],
    (err, result) => {
      console.log("result is :", result);
      if (!result?.length) {
        db.query("INSERT INTO users set ? ", data, (error, result) => {
          if (error) error;
          res.send(result);
        });
      } else {
        res.status(404).json({ message: "User Already Exsit" });
      }
      console.log("error is :", err);
    }
  );
};

exports.login = async (req, res) => {

  const {email,password} = req.body;
  try {
 db.query(`select * from users where email = ?`,[email],async(err,result)=>{
    if(!result[0]){
        res.status(400).json({ message: "login email is not found" });
    }
     await bcrypt.compare(password, result[0].password).then(result=>{
    console.log(result)
        if(!result){
            res.status(400).json({ message: "incorrect password" });
            }else{
                const data ={
                    result:{
                        email:result.email
                    }
                }
                const token =jwt.sign(data,process.env.JWT_SECRET,{expiresIn:'1h'});
                res.send({message:"successfully login", token})
            }
    }
 )
});
  } catch (error) {
     console.error(err.message);
     res.status(500).send("internal server error accured")
  }
    
};

