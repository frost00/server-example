//server side
const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyParser =require('body-Parser');
const cors = require('cors');
const ENV_PORT = process.env.PORT || 3001;
require('dotenv').config();


const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: process.env.DB_PASSWORD,
  database: "mydb"
});
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));


app.post('/api/insert',(req,res)=>{
const emailIN = req.body.email;
const passwordIN = req.body.password;

//result is not defined ?
  const sqlInsert = "INSERT INTO login (email,password) VALUES (?,?)";
  db.query(sqlInsert,[emailIN,passwordIN],(error,result)=>{
    console.log(result);
  });

});

app.get('/api/read',(req,res)=>{
  const emailIN = req.body.email;

  const sqlRead = "SELECT email, password FROM login WHERE email = '"+emailIN+"'";
  db.query(sqlRead,(error,result)=>{
    console.log(result);
    res.send(result);
  });
});


app.get('/api/message',(req,res)=>{
  res.send("hello!!! from server!!!")
})


app.get('/test',(req,res)=>{
  async function getMedia(constraints){
    let stream = null;
  
    try{
      stream = await navigator.mediaDevices.getUserMedia(constraints);
    }catch(err){console.log(err)};
  }
  
});


app.listen(ENV_PORT, ()=>{
  console.log(`Listening on PORT ${ENV_PORT}`);
});
