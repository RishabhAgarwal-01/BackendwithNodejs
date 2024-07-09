import {Router} from "express";
import express from "express";
import { User } from "../models/users.js";

const router= Router();

router.get('/signin', (req,res)=>{
    return res.render("signin");
});
router.get('/signup', (req,res)=>{
    return res.render("signup");
});

router.post("/signup", async(req, res)=>{
    const { fullName, email, password }= req.body;
    await User.create({
        fullName,
        email,
        password,
    });
    await User.save
    return res.redirect("/");
});

router.post("/signin", async (req, res)=>{
    const {email, password} = req.body;
    try {
        const token = await User.matchPasswordAndGenerateToken(email, password); 
        //if user is signed in then create a cookie with the token and redirect it to the Homepage
        return res.cookie("token", token).redirect('/');
      } catch (error) {
        return res.render("signin", {
            error: "Incorrect Email or password",
        });
      }
})

router.get("/signout", (req, res)=>{
    res.clearCookie("token").redirect("/");
})

export default router;