const express = require("express");

const todo = require("./Route/todoroute");

const db = require("./config/db");

const cors = require("cors");

const app = express();
db();

app.use(express.json()); //body parser

app.use(cors()); //use to handle communication between two server
app.use("/api", todo);
app.listen(5000, console.log("SERVER Running  http://localhost:5000"));

//shortcut  nodeexpress for model of node ======>>>>>>>>>> extension is node snippet
