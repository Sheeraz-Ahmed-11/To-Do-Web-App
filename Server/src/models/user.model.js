const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlenght: [ 3, 'User name must be at least 3 characters long' ]
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true,
        minlenght: [ 6, 'Password must be at least 6 characters long' ],
        select: false
    }
});

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({_id: this._id,  username: this.username}, process.env.JWT_SECRET, { expiresIn: '7d' });
    return token;
};

userSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
};

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;