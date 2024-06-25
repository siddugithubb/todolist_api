const express = require('express');
const todolistrouter =require('./routes/todolist')
const app = express();


const port = 3000;
app.listen(port,()=>console.log("running express server"));
app.use(express.json());
app.use(express.urlencoded());
app.use('/todos', todolistrouter);
