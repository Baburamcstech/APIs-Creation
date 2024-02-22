const express = require('express');
const func = require('../utils/verifyToken');
const connection = require('../Database');
const router = express.Router();
 
router.delete('/:task_id', func.verifyToken, (req, res) => {
    try {
        const task_id = req.params.task_id;
        const query = `DELETE FROM Task WHERE task_id = '${task_id}'`;
        
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
