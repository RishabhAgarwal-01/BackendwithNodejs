const mongoose = require("mongoose");

async function connectMongoDB(url) {
    mongoose.connect('mongodb://127.0.0.1:27017/MvcDB')
        .then(() => console.log("connected successfully"))
        .catch((error) => console.log("Error in connection with the database::", error));
}

module.exports = {
    connectMongoDB,
};