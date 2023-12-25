const mysql = require("mysql2");
const dotenv = require("dotenv");
dotenv.config();

const connection = mysql.createConnection({
  host: process.env.HOST,
  user:  'root',
  password: 'codefire',
  database: process.env.DATABASE,
  
});

connection.connect((error) => {
  if (error) return console.log(error);
  console.log("connection successfull");
});

module.exports=connection;
