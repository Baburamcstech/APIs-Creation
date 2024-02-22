const express = require('express');
const func = require('../utils/verifyToken')
const connection = require('../Database');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');


router.post('/', func.verifyToken, async(req, res) => {
  try {
    const taskData = {
      id : req.decodedData.id,
      title: req.body.title,
      description: req.body.description,
      due_date: req.body.due_date
    };
    const myUUID = uuidv4();
    const query = 'INSERT INTO Task (task_id,user_id,title, description, due_date) VALUES (?, ?, ?, ?, ?)';
    const values = [myUUID, taskData.id,taskData.title, taskData.description, taskData.due_date];
    
    
    connection.query(query, values, (queryError, results) => {
      if (queryError) {
        console.error('Error executing query:', queryError);
        return res.status(500).json({ status: "error", message: "Internal Server Error" });
      }
    });
    const subquery = 'INSERT INTO Subtask (task_id) VALUES (?)';
    const subvalues = [myUUID];
    connection.query(subquery, subvalues, (queryError, results) => {
      if (queryError) {
        console.error('Error executing query:', queryError);
        return res.status(500).json({ status: "error", message: "Internal Server Error" });
      }
      return res.json({ status: "successfully updated subtask", result: results });
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
});


//Getting all task of user
router.get('/tasks/:sort', func.verifyToken, (req,res)=>{
try{
  const sort=req.params.sort;
  let query;
  if(sort==='1'){
   query = 'select * from Task order by priority asc';
  }else{
    query = 'select * from Task order by due_date acs';
  }
  connection.query(query,(queryError, results)=>{
    if(queryError){
      console.log("Error related to SQL query!!")
      return res.status(500).json({ status: "error", message: "Internal Server Error" });
    }
    return res.json({ status: "successfully fechted tasks", result: results });

  })
}
catch{
  console.log(err);
    return res.status(500).json({ status: "error", message: "Internal Server Error" });
}
})
// Inserting New user into Database
router.post('/user', (req, res) => {
  try {

    const query = 'INSERT INTO user (phone) VALUES (?)';

    connection.query(query, req.body.phone, (queryError, results) => {
      if (queryError) {
        console.error('Error executing query:', queryError);
        return res.status(500).json({ status: "error", message: "Internal Server Error" });
      }
      return res.json({ status: "success", result: results });
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
});

//Update Task
module.exports = router;
