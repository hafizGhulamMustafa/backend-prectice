const express = require('express');
const dbConnection = require('./db');
const auth = require('./routes/auth');
const path = require('path');

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
app.use('/public', express.static(path.join(__dirname, 'uploads')));



app.use('/api', auth)


app.listen(process.env.PORT || port, ()=>{
    console.log(`server is running at http://localhost:${port}`);
})