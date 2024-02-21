const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  email: { type: String, unique: true },
  password: { type: String },
  tasks: [
    {
        title: { type: String, required: true },
        description: { type: String },
        due_date: { type: Date },
        priority: { type: Number, default: 0 }, // 0 - default priority
        status: { type: String, enum: ['TODO', 'DONE'], default: 'TODO' },
        created_at: { type: Date, default: Date.now },
        updated_at: { type: Date, default: Date.now },
        deleted_at: { type: Date, default: null }, // Soft deletion
        subtask_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true } // Reference to User model
      }
   ] // Reference to Task model
});

const User = mongoose.model('User', userSchema);

module.exports = User;