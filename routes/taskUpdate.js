const express = require('express');
const func = require('../utils/verifyToken')
const connection = require('../Database');
const router = express.Router();

router.put('/task_id', func.verifyToken, async(req, res) => {
    try {
         const query = 'UPDATE Subtask SET status=? WHERE task_id=?';
         const values = [req.body.Status, req.body.task_id];
         
         connection.query(query, values, (queryError, results) => {
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
  module.exports = router;  