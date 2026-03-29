const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const { registerUser, loginUser, createTodo, deleteTodo, updateTodo, getTodo, completeTodo, logoutUser } = require("../controllers/todo.controller");
const authUser = require("../middlewares/authUser.middleware");

router.post('/signup', [
    body('username').isLength({ min: 3 }).withMessage('Username must be at least 3 characters long'),
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
],
    registerUser
);

router.post('/login', [
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
],
    loginUser
);

router.post('/logout', authUser, logoutUser);

router.get('/get/todo', authUser, getTodo);

router.post('/create/todo', authUser, [
    body('title').isLength({ min: 3 }).withMessage('Title must be at least 3 characters long'),
    body('description').isLength({ min: 3 }).withMessage('Description must be at least 3 characters long')
],
    createTodo
);

router.patch('/complete/todo/:id', authUser, completeTodo);

router.delete('/delete/todo/:id', authUser, deleteTodo);

router.put('/update/todo/:id', authUser, updateTodo);

module.exports = router;