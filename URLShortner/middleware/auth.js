import { getUser } from "../service/auth.js";
async function restrictToLoggedInUserOnly(req, res, next){
    // const userUid = req.cookies?.uid;

    const userUid = req.headers["authorization"];

    if(!userUid) return res.redirect("/login");
    const token = userUid.split("Bearer")[1]; //Bearerjaksdjfkjd => [Bearer ,akjgiasigidjsaip] => 1st index is token    const user= getUser(userUid);
    const user = getUser(token);
    if(!user) return res.redirect("/login");

    req.user= user;
    next();
}
export {restrictToLoggedInUserOnly};