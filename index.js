//server side
const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyParser =require('body-Parser');
const cors = require('cors');
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

app.get('api/read',(req,res)=>{
  const emailIN = req.body.email;
  //const passwordIN = req.body.password;

//result is not defined ?
  const sqlRead = "SELECT email, password FROM login WHERE email = "+emailIN+"";
  db.query(sqlRead,(error,result)=>{
    console.log(error);
  });
});

app.listen(3001, ()=>{
  console.log("PORT 3001");
});
