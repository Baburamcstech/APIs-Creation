const express = require("express");
const connection = require('./Database');
const cron = require('node-cron');
const { updateTaskPrioritiesAndDelete } = require('./utils/Cronlogic');
const cookiesparser=require('cookie-parser');
const Insert = require('./routes/taskInsert.js');
const Delete = require('./routes/taskDelete.js');
const Update = require('./routes/taskUpdate.js');
const login = require('./routes/auth.js');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookiesparser());

// cron.schedule('*/20 * * * * *', () => {
//     console.log('Running task priority update and deletion...');
//     updateTaskPrioritiesAndDelete();
// });
// Mount the taskInsert route as middleware
app.use('/taskInsert', Insert);
app.use('/update', Update);
app.use('/delete', Delete);
app.use('/register', Insert);
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

// cron logic
