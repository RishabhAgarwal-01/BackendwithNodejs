import express from "express";
import { connectToMongo } from "./connect.js"; 
import { urlRouter } from "./Route/url.js";
import { URL } from "./Model/url.js"; // Import the URL model
import path from "path"
import { staticRouter } from "./Route/staticRouter.js";
import { userRouter } from "./Route/user.js";
import cookieParser from "cookie-parser";
import {restrictToLoggedInUserOnly} from "./middleware/auth.js"
const app = express();
const PORT = 8001;

connectToMongo('mongodb://127.0.0.1:27017/short-url')
    .then(() => console.log("MongoDB connected"))
    .catch(error => console.error("MongoDB connection error:", error));

//Ejs templating
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json()); // Middleware to parse JSON bodies

//to parses the form data
app.use(express.urlencoded({extended : false}));

//cookie parsing middleware
app.use(cookieParser());

app.use('/url', restrictToLoggedInUserOnly, urlRouter); // Mount the URL router
app.use("/", staticRouter);
app.use("/user", userRouter);

app.listen(PORT, () => console.log(`Server started at PORT ${PORT}`));
