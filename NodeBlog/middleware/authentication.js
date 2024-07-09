import { validateToken } from "../services/authentication.js";


//since this is a middleware which when called returns a callback to the calling route, and since it is the middleware
//it will automatically have the access to the req, res and next of the routing call and also the cookieName passed as it 
//part of the closure for checkForAuthenticationCookie
const checkForAuthenticationCookie = (cookieName)=>{
   return (req, res, next)=>{  //callback within the arrow function
       const tokenCookieValue=  req.cookies[cookieName];
       if(!tokenCookieValue){
        return next();
       }

      try {
        const userPayload = validateToken(tokenCookieValue);
        req.user = userPayload;
    } catch (error) {}
       return next();
    };
}

export {checkForAuthenticationCookie};