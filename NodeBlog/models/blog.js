import {Schema, model } from "mongoose";

const blogSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    body: {
        type:String,
        required: true,
    },
    coverImageURL: {
            type : String,
            required: false
        },
    cratedBy: { //automatically points to user model
        type: Schema.Types.ObjectId,
        ref: "user" //I have given the reference for the id from the user model
    }
}, {timestamps: true});

const Blog = model("blog", blogSchema);

export {Blog};