const express = require('express');
const router = express.Router();
const connection = require('../Database');
const cron = require('node-cron');

// Define a function to update task priorities and delete tasks with priority 0
function updateTaskPrioritiesAndDelete() {
    console.log("Enter in cron")
    // Query to fetch tasks from the database
    const query = 'SELECT * FROM Task';
    connection.query(query, (error, results) => {
        if (error) {
            console.error('Error fetching tasks from the database:', error);
            return;
        }
        // Iterate over fetched tasks
        results.forEach(task => {
            // Calculate the difference in days between due date and current date
            const currentDate = new Date();
            const dueDate = new Date(task.due_date);
            const diffInDays = Math.floor((dueDate - currentDate) / (1000 * 60 * 60 * 24));

            // Set priority based on difference in days
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

            // Log task details and priority
            console.log(`Task ${task.id} due date: ${task.due_date}, Difference in days: ${diffInDays}, Priority: ${priority}`);

            // If priority is 0, delete the task
            if (priority === 0) {
                const deleteQuery = `DELETE FROM tasks WHERE id = ${task.id}`;
                connection.query(deleteQuery, (deleteError, deleteResults) => {
                    if (deleteError) {
                        console.error(`Error deleting task ${task.id}:`, deleteError);
                    } else {
                        console.log(`Task ${task.id} deleted successfully`);
                    }
                });
            }else{
                const UpdateQuery = `UPDATE Task WHERE task_id = ${task.id} set priority= ${priority}`;
                connection.query(UpdateQuery, (updateError, updateResults) => {
                    if (updateError) {
                        console.error(`Error deleting task ${task.id}:`, updateError);
                    } else {
                        console.log(`Priority of user with id: ${task} updated successfully`);
                    }
                });
            }
        });
    });
}


// Cron logic for updating user priority
function updateUserPrioritiesAndDelete() {
    // Query to fetch tasks from the database
    const query = 'Select user_id from (SELECT user_id,min(Priority) priority FROM Task group by user_id) as t';
    connection.query(query, (error, results) => {
        if (error) {
            console.error('Error fetching user_id from the database:', error);
            return;
        }
        // Iterate over fetched tasks
        results.forEach(user => {
            // Calculate the difference in days between due date and current date
            const currentDate = new Date();
            const dueDate = new Date(task.due_date);
            const diffInDays = Math.floor((dueDate - currentDate) / (1000 * 60 * 60 * 24));

            // Set priority based on difference in days
            let priority;
            if (diffInDays === 0) {
                priority = 0;
            } else if (diffInDays >= 1 && diffInDays <= 2) {
                priority = 1;

            } else {
                priority = 2;
            } 

            // Log task details and priority
            console.log(`Task ${user} Difference in days: ${diffInDays}, Priority: ${priority}`);


                const UpdateQuery = `UPDATE user WHERE id = ${user} set priority= ${priority}`;
                connection.query(UpdateQuery, (updateError, updateResults) => {
                    if (updateError) {
                        console.error(`Error deleting task ${task.id}:`, updateError);
                    } else {
                        console.log(`Priority of user with id: ${user} updated successfully`);
                    }
                });
        });
    });
}

module.exports = { updateTaskPrioritiesAndDelete, updateUserPrioritiesAndDelete };