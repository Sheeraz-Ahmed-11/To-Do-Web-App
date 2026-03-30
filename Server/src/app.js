const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();
const routes = require("./routes/todo.routes");

app.use(cors({
  origin: (origin, callback) => {
    const allowed = [/^https:\/\/to-do-web-app.*\.vercel\.app$/];
    if (!origin || allowed.some(p => p.test(origin))) callback(null, true);
    else callback(new Error('Not allowed by CORS'));
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],  // ← added PATCH
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/', routes);

module.exports = app;
