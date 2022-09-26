const express = require('express');
const dbConnection = require('./db');
const auth = require('./routes/auth');

const app = express();

const port = 9000;

dbConnection.connect((error, result)=>{
    if(!result){
        console.log(error)
    }else{
        console.log("connected to database successfully")
    }
})

app.use(express.json());



app.use('/api', auth)


app.listen(port, ()=>{
    console.log(`server is running on ${port} port`);
})