import jwt from "jsonwebtoken"

const secretKey = "secretKey@123";

const createTokenForUser = (user)=>{
   const payload ={
    _id: user._id,
    email: user.email,
    profileImageURL: user.profileImageURL,
    role: user.role,
   };
   const token = jwt.sign(payload,secretKey);
   return token;
} 

const validateToken = (token)=>{
   try {
      const payload = jwt.verify(token, secretKey);
      return payload;
   } catch (error) {
      throw new Error("Invalid token");
   }
}

export {createTokenForUser,validateToken};
