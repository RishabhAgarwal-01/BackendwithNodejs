import jwt from "jsonwebtoken";

const secret ="abcd1234" //secret key
function setUser( user){
   return jwt.sign({
    _id: user._id,  //payload mounting
    email: user.email, 
   }, secret);  //create a token and passed it to the calling function
}

function getUser(token){    //get a token from calling funtion
    if(!token) return null;   
    try {
        return jwt.verify(token, secret);  //verify the token 
    } catch (error) {
        return null;
    }
    
}


export {setUser, getUser};