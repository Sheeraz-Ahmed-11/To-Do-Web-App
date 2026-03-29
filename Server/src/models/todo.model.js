const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    title: {
        type: String,
        required: true,
    },

    description: {
        type: String,
        required: true,
    },

    isCompleted: {
        type: Boolean,
        default: false
    },

    category: { 
        type: String,
    }
});

const todoModel = mongoose.model('todo', todoSchema);

module.exports = todoModel;