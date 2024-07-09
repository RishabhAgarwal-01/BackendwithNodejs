import express from "express"
import { URL } from "../Model/url.js";
const staticRouter = express.Router();

staticRouter.route("/")
.get(async (req, res)=>{
    const allurls = await URL.find({});
    return res.render("Home",{
        urls : allurls,
    });
})
staticRouter.get("/signup", (req, res)=>
{
    return res.render("signup");
})
staticRouter.get("/login", (req, res)=>
    {
        return res.render("Login");
    })

export {staticRouter};