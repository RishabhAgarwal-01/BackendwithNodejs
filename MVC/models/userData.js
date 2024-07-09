const mongoose = require("mongoose");
const { timeStamp } = require("console");

const userDataSchema = new mongoose.Schema({
    firstName: {
        type: String,
        reauired: true,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    jobTitle: {
        type: String,
    },
    gender: {
        type: String,
    }
}, {timestamps : true});

const userData = mongoose.model("userdatas", userDataSchema);

module.exports=  userData;