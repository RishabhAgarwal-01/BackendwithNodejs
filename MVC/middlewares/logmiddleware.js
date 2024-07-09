const fs = require("fs")

function logReqRes(filename) {
    return (req, res, next) => {
        fs.appendFile(filename,
            `\n${Date.now()} : ${req.id} ${req.method}: ${req.path} `,
            (error, data) => {
                if (error) {
                    console.log("Error in middleware", error);
                }
                next();
            }
        );
    }
}

module.exports = {
    logReqRes,
}