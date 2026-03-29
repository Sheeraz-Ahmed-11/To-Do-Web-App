const todoModel = require("../models/todo.model");
const userModel = require("../models/user.model");
const createUser = require('../services/user.service');
const { validationResult } = require("express-validator");
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(401).json({ errors: errors.array() })
    }

    const { username, email, password } = req.body;

    const isEmailExists = await userModel.findOne({ email });

    if (isEmailExists) {
        return res.status(401).json({ message: 'User already exists' })
    }

    const hashedPassword = await userModel.hashPassword(password);

    const user = await createUser({
        username,
        email,
        password: hashedPassword
    });

    const token = user.generateAuthToken();

    res.cookie('token', token);

    res.status(201).json({ token, user, username, email });
}

const loginUser = async (req, res) => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        return res.status(401).json({ errors: errors.array() })
    }

    const { email, password } = req.body;

    const user = await userModel.findOne({ email }).select('+password');

    if (!user) {
        return res.status(401).json({ message: 'Invalid email or password '})
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password '})
    }

    const token = user.generateAuthToken();

    res.cookie('token', token);

    res.status(200).json({ token, user, username: user.username, email });
}

const logoutUser = async (req, res) => {
    res.status(200).json({ message: 'Looges Out successfully' })
}

const getTodo = async (req, res) => {
    const { category } = req.query;

    const filter = { user: req.user._id };
    if (category) filter.category = category;

    const todos = await todoModel.find(filter).lean();
    res.status(200).json(todos);
}

const createTodo = async (req, res) => {
    try {
        const { title, description, category } = req.body;

        if (!title) {
            return res.status(400).json({ message: 'Title is required' });
        }
        if (!description) {
            return res.status(400).json({ message: 'Description is required' });
        }

        const todo = await todoModel.create({
            title,
            description,
            category,
            user: req.user._id
        });

        res.status(201).json(todo);
    } catch (err) {
        console.error('createTodo error:', err.message);
        res.status(500).json({ message: err.message });
    }
};

const deleteTodo = async (req, res) => {
    const id = req.params.id;

    const isExists = await todoModel.findByIdAndDelete( id );

    if (!isExists) {
        return res.status(401).json({ message: 'Todo not found' })
    }

    res.status(200).json({ message: 'Todo is deleted with id', id });
}

const updateTodo = async (req, res) => {
    const id = req.params.id;

    const { title, description, category } = req.body;

    const isExists = await todoModel.findById( id );
    
    if (!isExists) {
        return res.status(401).json({ message: 'Todo not found' }); 
    }

    const updatedTodo = await todoModel.findByIdAndUpdate(
        id,
        { title, description, category },
        { new: true }
    )

    res.status(200).json(updatedTodo, { message: 'Todo is updated' });
}

const completeTodo = async (req, res) => {
    const todo = await todoModel.findByIdAndUpdate(
        req.params.id,
        { isCompleted: true },
        { new: true } );

    res.status(200).json({ todo, message: 'Todo is completed' });
}


module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    getTodo,
    createTodo,
    deleteTodo,
    updateTodo,
    completeTodo
}