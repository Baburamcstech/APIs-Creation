const express = require("express");
const connection = require('./Database');
const cookiesparser=require('cookie-parser');
const taskInsert = require('./routes/taskInsert.js');
const user = require('./routes/taskInsert.js');
const login = require('./routes/auth.js');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookiesparser());

// Mount the taskInsert route as middleware
app.use('/taskInsert', taskInsert);
app.use('/register', taskInsert);
app.use('/login', login);

const port = 3002;

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
    connection.connect(function(err) {
        if (err) console.log(err);
        else {
            console.log("Connected to MySQL");
        }
    });
});
