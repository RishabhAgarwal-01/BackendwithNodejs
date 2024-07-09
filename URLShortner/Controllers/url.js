import { nanoid } from "nanoid";
import {URL} from "../Model/url.js";

async function handleGenerateNewShortURL(req, res){
    const body= req.body;
    
    if(!body.url)
        { 
          return res.status(400).json({msg: "URL is required"});
        }
    const shortId= nanoid(8);
     
    const result = await URL.create({
        shortID: shortId ,
        redirectURL: body.url,
        visitHistory:[],
    });
    // const allUrls = await URL.find({});
    // console.log(allUrls);
    return res.render("Home", {
        shortId: shortId,
        // urls:allUrls,
    });
    // return res.json({id: shortId});
}

async function handleRedirect(req, res){
    try {
        const shortId = req.params.shortId;
        const entry = await URL.findOneAndUpdate(
            { shortID: shortId }, // Filter condition
            { // Update fields
                $push: {
                    visitHistory: {
                        timestamp: Date.now()
                    }
                }
            },
            { new: true } // Return the updated document
        );

        if (!entry) {
            return res.status(404).send("Short URL not found");
        }

        console.log("Redirecting to:", entry.redirectURL);
        res.redirect(entry.redirectURL);
    } catch (error) {
        console.error("Error handling redirect:", error);
        res.status(500).send("Internal server error");
    }
}

export {handleGenerateNewShortURL,handleRedirect,};