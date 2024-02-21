const express = require("express");
const jwt = require("jsonwebtoken");
const connection = require('../Database');
const router = express.Router();

router.post('/', async (req, res) => {
  const phone = req.body.phone;
  const loguser = 'SELECT phone,id FROM user WHERE phone ='+phone;

  connection.query(loguser, (queryError, results) => {
    if (queryError) {
      console.error('Error executing query:', queryError);
      return;
    }

    if (results.length === 1) {
          const token = jwt.sign({
            phone: results[0].phone,
            id:results[0].id
           },"secret")
          res.cookie("mycookies", token);
           console.log(token)
           return res.json({ status: "success 200", Result: results });
          
        } else {
          console.log("Something went wrong!!!");
        }
      });
    })

module.exports = router;

