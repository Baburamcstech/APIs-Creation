const express = require('express');
const func = require('../utils/verifyToken')
const connection = require('../Database');
const router = express.Router();

router.delete('/task_id', func.verifyToken, async(req, res) => {
    try {
         const task_id = req.body.task_id;
      const query = 'DELETE FROM Task where task_id ='+task_id;
  
      connection.query(query, (queryError, results) => {
        if (queryError) {
          console.error('Error executing query:', queryError);
          return res.status(500).json({ status: "error", message: "Internal Server Error" });
        }
        return res.json({ status: "success", result: results });
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ status: "error", message: "Internal Server Error in Deletion" });
    }
  });
  
  module.exports = router;