const express = require('express');
const func = require('../utils/verifyToken');
const connection = require('../Database');
const router = express.Router();

router.put('/:task_id', func.verifyToken, (req, res) => {
    try {
        const task_id = req.params.task_id; // Extract task_id from route params
        const status = req.body.status; // Assuming status is sent in the request body

        const query = 'UPDATE Subtask SET status=? WHERE task_id=?';
        const values = [status, task_id];

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
