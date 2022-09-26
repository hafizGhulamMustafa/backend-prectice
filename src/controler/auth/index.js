const db = require("../../db");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.getData = (req, res) => {
  db.query("select * from users where deleted_at is null", (err, result) => {
    console.log("result is :", result);
    res.send({result, email:req.user});
  });
};

exports.signup = async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const secpass = await bcrypt.hash(req.body.password , salt) ;

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

exports.login = (req, res) => {
  const {email, password} = req.body;

  try{
    const user =db.query(`select * from users where email = ?`, [email]);
        
          if (!user) {
            res.status(400).json({ message: "login email is not found" });
          } 
        const passwordCompare = bcrypt.compare(password, user.password )
        if(!passwordCompare){
            res.status(400).json({ message: "login email is not found" });
             
            } else{
                const token =jwt.sign({email:data.email},"MERNSTACKDE",{expiresIn:'1h'});
                res.send({message:"successfully login", token})
            }
          
  }
  catch{}



 

};
