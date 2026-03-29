const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

const authUser = async (req, res, next) => {
    const token = req.cookies?.token || req.headers.authorization?.split(' ')[ 1 ];

    if (!token) {
        return res.status(401).json({ message: 'TOken not found' })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await userModel.findById(decoded._id);

        if (!user) {
            return res.status(401).json({ message: 'Unauthorizred' })
        }

        req.user = user;

        return next();
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: 'Server error:', err })
    }
}

module.exports = authUser;