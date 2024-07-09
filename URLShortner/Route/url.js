import express from "express";
import {handleGenerateNewShortURL, handleRedirect} from "../Controllers/url.js";
import {URL} from "../Model/url.js"
const urlRouter = express.Router();

urlRouter.post('/', handleGenerateNewShortURL);

urlRouter.route("/:shortId")
    .get(handleRedirect); 

export {urlRouter};