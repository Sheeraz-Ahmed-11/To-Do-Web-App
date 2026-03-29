const userModel = require("../models/user.model");

const createUser = async ({ username, email, password }) => {
    if (!username) {
        throw new Error('Username is required')
    }

    if (!email) {
        throw new Error('Email is required')
    }

    if (!password) {
        throw new Error('Password is required')
    }

    const user = await userModel.create({
        username,
        email,
        password
    })

    return user;
}

module.exports = createUser