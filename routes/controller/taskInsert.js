const express = require('express');
const func = require('../utils/verifyToken')
const connection = require('../Database');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

const taskInsert = async(req, res) => {
    try {
      const taskData = {
        id : req.decodedData.id,
        title: req.body.title,
        description: req.body.description,
        due_date: req.body.due_date
      };
  
         // Set priority based on difference in days
         const currentDate = new Date();
         let diffInDays = due_date - currentDate;
         let priority;
         if (diffInDays === 0) {
             priority = 0;
         } else if (diffInDays >= 1 && diffInDays <= 2) {
             priority = 1;
         } else if (diffInDays >= 3 && diffInDays <= 4) {
             priority = 2;
         } else {
             priority = 3;
         }
      const myUUID = uuidv4();
      const query = 'INSERT INTO Task (task_id,user_id,title, description, priority, due_date) VALUES (?, ?, ?, ?, ?, ?)';
      const values = [myUUID, taskData.id,taskData.title, taskData.description, priority, taskData.due_date];
      
      
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
  };

  //getting all tasks
  const getAllTask = (req,res)=>{
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
    }

// Inserting New user into Database
const newUser = (req, res) => {
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
};


module.exports={taskInsert, getAllTask, newUser};