const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  phone: { type: String, unique: true },
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }] // Reference to Task model
});

const User = mongoose.model('User', userSchema);

module.exports = User;

// Task schema
const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  due_date: { type: Date },
  priority: { type: Number, default: 0 }, // 0 - default priority
  status: { type: String, enum: ['TODO', 'DONE'], default: 'TODO' },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  deleted_at: { type: Date, default: null }, // Soft deletion
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true } // Reference to User model
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;


const SubTask = mongoose.model('SubTask', subTaskSchema);

module.exports = SubTask;
