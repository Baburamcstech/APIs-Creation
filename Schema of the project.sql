create database OpeninApp;
use OpeninApp;
CREATE TABLE user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    phone BIGINT(10), -- Assuming phone numbers are 10-digit integers
    priority INT DEFAULT 0 CHECK (priority IN (0, 1, 2))
);
drop table user;
CREATE TABLE Task(
                  task_id int,
                  user_id int default 1,
                  Title varchar(250),
                  Description varchar(300),
                  Priority int default 0 check (priority IN (0,1,2)),
                  due_date Date,
                  FOREIGN KEY (user_id) REFERENCES user(id) ON UPDATE CASCADE,
                  primary key (user_id, task_id)
                  );
 CREATE TABLE Subtask(
                      task_id int,
                      status int default 0 check (status IN (0,1)),
					  created_at date,
                      updated_at date,
					  deleted_at date,   --  --fk_task_id
                      FOREIGN KEY (task_id) 
                      REFERENCES Task(task_id) ON UPDATE CASCADE
                      );

 ALTER TABLE Subtask
MODIFY COLUMN task_id varchar(100);
 Alter table Subtask
 MODIFY COLUMN deleted_at date default NOW();
SET foreign_key_checks = 0;

alter table Task add column due_date date;
alter table Task modify column user_id int default 1;
 
ALTER TABLE Subtask 
DROP FOREIGN KEY fk_task_id; -- Drop the existing foreign key constraint
ALTER TABLE Subtask 
ADD CONSTRAINT fk_task_id 
FOREIGN KEY (task_id) 
REFERENCES Task(task_id) 
ON DELETE CASCADE 
ON UPDATE CASCADE; -- Add new foreign key constraint with cascade delete and update

SET fk_task_id = 0;
CREATE INDEX idx_task_id ON Task(task_id);
 Alter table Subtask drop constraint fk_task_id;
 delete from Task where task_id="0cb61e46-bf77-4fa5-b2dd-cfb9d26a4d76";
 delete from Subtask where task_id="0";
select * from user;
select * from Task;
select * from Subtask;
desc Task;
             