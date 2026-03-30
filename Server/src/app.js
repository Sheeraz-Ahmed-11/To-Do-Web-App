const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();
const cors = require("cors");
const routes = require("./routes/todo.routes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: [
    "https://to-do-web-app-ochre.vercel.app",
    "https://to-do-web-app-git-main-sheeraz-ahmed-11s-projects.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  credentials: true
}));
app.use(cookieParser());


app.use('/', routes);

module.exports = app;
