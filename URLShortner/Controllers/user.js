import { User } from "../Model/users.js";
import {v4 as uuidv4} from "uuid";
import {setUser} from "../service/auth.js"  //calling the jwt function from auth service to tokenize my cookie data

async function handleUserSignup(req, res){
    const {name, email, password}= req.body;
    await User.create({
        name : name, 
        email: email, 
        password: password,
    });
    return res.render("Home");
}

async function handleUserLogin(req, res){
    const {email, password}= req.body;
    console.log(email, password)
    const user = await User.findOne({
       email, password
    });
    console.log(user)
    if(!user){
        return res.render("Login", {error: "Invalid user credentials"});
    }
    // const sessionId = uuidv4(); //uuid generation for the session
    // setUser(sessionId, user); //auth service maintaining the state
    // res.cookie("uid", sessionId); //cookie generation
    const token = setUser(user);
    // res.cookie("uid", token);
    return res.json({token});
    // return res.render("Home");
}
export {handleUserSignup, handleUserLogin};