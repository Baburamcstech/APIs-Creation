const express = require('express');
const func = require('../utils/verifyToken')
const connection = require('../Database');
const router = express.Router();
const contfunc = require('../controller/insert');
const { v4: uuidv4 } = require('uuid');

//create new task into Database
router.route('/').post(func.verifyToken,contfunc.taskInsert);

//Getting all task of user
router.route.get('/tasks/:sort', func.verifyToken, contfunc.getAllTask);

// create new user
router.route.post('/user', contfunc.newUser);
//Update Task
module.exports = router;
