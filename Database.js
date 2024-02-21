var mysql=require('mysql')
const connection=mysql.createConnection({
    host:'localhost',
    database:'OpeninApp',
    user:'root',
    password:'Babus@2005'
})
module.exports=connection;