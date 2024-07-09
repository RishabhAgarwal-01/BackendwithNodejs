import {mongoose }from "mongoose"

async function connectToMongo(url){
    return mongoose.connect(url);
}

export {
    connectToMongo,
}