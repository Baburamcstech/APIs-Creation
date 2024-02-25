const express = require('express');
const func = require('../utils/verifyToken')
const router = express.Router();
const contfunc = require('../controller/taskInsert');

//create new task into Database
router.route('/').post(func.verifyToken,contfunc.taskInsert);

//Getting all task of user
router.route('/tasks/:sort').get( func.verifyToken, contfunc.getAllTask);

// create new user
router.post('/user', contfunc.newUser);

module.exports = router;
