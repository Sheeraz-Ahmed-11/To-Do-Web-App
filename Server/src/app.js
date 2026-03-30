const express = require('express');
const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

const cookieParser = require('cookie-parser');
const cors = require('cors');
const routes = require("./routes/todo.routes");

app.use(cors({
  origin: (origin, callback) => {
    const allowed = [/^https:\/\/to-do-web-app.*\.vercel\.app$/];
    if (!origin || allowed.some(p => p.test(origin))) callback(null, true);
    else callback(new Error('Not allowed by CORS'));
  },
  methods: ['GET', 'POST', 'PUT, DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.options('/(.*)', cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/', routes);

module.exports = app;
