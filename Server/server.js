require('dotenv').config();
const server = require('./src/app');
const cors = require('cors);
const connectToDb = require('./src/config/db');
const port = process.env.PORT;

connectToDb();

app.use(cors({
  origin: (origin, callback) => {
    const allowed = [/^https:\/\/to-do-web-app.*\.vercel\.app$/];
    if (!origin || allowed.some(p => p.test(origin))) callback(null, true);
    else callback(new Error('Not allowed by CORS'));
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

server.listen(port, () => {
    console.log("server is runing on port:", port)
});
