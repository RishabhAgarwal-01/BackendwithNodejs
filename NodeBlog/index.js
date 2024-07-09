import express from "express";
import path from "path";
import router from "./routes/user.js";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import { checkForAuthenticationCookie } from "./middleware/authentication.js";
import blogRouter from "./routes/blog.js";
import {Blog} from "./models/blog.js";

const app = express();
const PORT = 8000;

mongoose.connect('mongodb://127.0.0.1:27017/NodeBlogDB')
        .then((e)=>console.log("monogodb connected"));

//setting up middlewares for the app
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));
app.use(express.static(path.resolve("./public"))) //middleware to tell the express that it can serve the static assests

//setting view engines and path for views
app.set("view engine", "ejs")
app.set("views", path.resolve("./views")) 


app.get("/", async (req, res)=>{
    const allBlogs = await Blog.find({});
    
    res.render("Home", {
        user: req.user,  //passing the user object we got from the req made from the redirect("/") in ./routes/user when a post request for /user/signin is made;
        blogs: allBlogs,
    });
});
 

app.use("/user", router);
app.use("/blog", blogRouter);

app.listen(PORT, ()=>{
    console.log(`server started at PORT: ${PORT}`)
})