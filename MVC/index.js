const express = require("express");
const{connectMongoDB}= require("./connection")
const userRouter = require("./routes/user");
const {logReqRes}= require("../MVC/middlewares/logmiddleware");

//express app
const app= express();


//port
const PORT= 5000;
app.listen(PORT, () => console.log(`Server started at ${PORT}`));

//connecction with db
connectMongoDB("mongodb://127.0.0.1:27017/MvcDB");

//middlewares
app.use(express.urlencoded({ extended: false }));
app.use(logReqRes("log.txt"));

//Routes
app.use("/users", userRouter);



