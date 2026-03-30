require('dotenv').config();
const server = require('./src/app');
const connectToDb = require('./src/config/db');

const port = process.env.PORT;
connectToDb();

server.listen(port, () => {
    console.log("server is running on port:", port);
});
