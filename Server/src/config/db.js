const mongoose = require("mongoose");
const url = process.env.MONGO_URI;

const connectToDb = async () => {
    try {
        await mongoose.connect(url);
        console.log('Database connected successfully');
    } catch (err) {
        console.log('Database connection error:', err);
        process.exit(1);
    }
}

module.exports = connectToDb;