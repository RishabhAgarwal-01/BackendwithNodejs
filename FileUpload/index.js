import express from "express";
import path from "path";
import multer from "multer";

const app = express();
const PORT = 8000;

// const upload = multer({dest: "uploads/"}); //upload basically is a middleware which just put the uploaded file data into the upload folder.

//the above upload middleware will just create a folder name upload and save the file in it but out file will not get
//open because of the internal encryption making it scraped

//using the dislStorage gives us the full control over the file upload
const storage = multer.diskStorage({
    destination: function (req, file, cb){
      return cb(null, "./uploads");
    },
    filename: function (req, file, cb){
       return cb(null, `${Date.now()}-${file.originalname}`);
    },
})
const upload = multer({storage});

app.set("view engine", "ejs");

app.set("views",path.resolve("./views"));

app.use(express.json()); //middleware for the json data
app.use(express.urlencoded({extended: false}));

app.get("/", (req, res)=>{
    return res.render("homepage");
});

app.post("/upload",upload.single('profileImage'), (req, res)=>{
   console.log(req.body);
   console.log(req.file);
   res.send("file uploaded successfully")
})
app.listen(PORT, 
    ()=> console.log(`sever started on port ${PORT}`));