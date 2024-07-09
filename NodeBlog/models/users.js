import mongoose from "mongoose";
import {createHmac, randomBytes} from "crypto";
import {Schema, model } from "mongoose";
import { type } from "os";
import { createTokenForUser } from "../services/authentication.js";


const userSchema = new Schema({
    fullName: {
        type:String,
        required: true,
    },
    email: {
        type:String,
        required: true,
        unique: true,
    },
    salt:{
       type: String,
    },
    password: {
        type:String,
        required:true,
        },
    profileImageURL : {
        type:String,
        default: "./public/images/default.jpg",
    },
    role:{
        type: String,
        enum: ["USER", "ADMIN"],
        default: "USER",
    },
},{timestamps : true});

//hashing of password
//during the saving of the mongodb

userSchema.pre('save', function (next) {
    const user= this; //gives current user i.e. points to current instance of user
    if(!user.isModified("password")) return;
 
    const salt = randomBytes(16).toString(); //salt is basically a random key made with randomByte fucntion of the crypto module
    const hashedPassword = createHmac('sha256', salt).update(user.password).digest("hex"); //password hashing using the sha256 algo and key - salt giving hex value in last

    this.salt = salt; //updating the values
    this.password =  hashedPassword;

    next();
})

//static function for mongoose for checking the password 
// a static method on a Mongoose schema. Static methods are methods 
//attached directly to the model, rather than instances of the model. These methods are useful for defining 
//utility functions that apply to the model as a whole, rather than to individual document instances.
//the password is hashed so we have to automatically decrypt the password
//and do password verification after that return the user object to the calling function

userSchema.static('matchPasswordAndGenerateToken', async function(email,password){
    const user= await this.findOne({email});
    if(!user) throw new Error('user not found');

    const salt = user.salt;
    const userProvidedPassword = createHmac("sha256", salt)
    .update(password)
    .digest("hex");
    const hashedPassword = user.password; 
    if(hashedPassword !== userProvidedPassword) throw new Error('incorrect password'); 
    
    //if everything is right then simply create the token and return it
    //token creating function is defined in the ./services/authentication.js
    const token = createTokenForUser(user);
    return token;
});

const User = model("user", userSchema);

export {User};