import {Router} from "express";
import multer from "multer";
import path from "path";
import {Blog} from "../models/blog.js";


const blogRouter= Router();


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(`./public/uploads/`));
    },
    filename: function (req, file, cb) {
      const fileName = `${Date.now()}-${file.originalname}` ;
      cb(null, fileName);
    },
  })
  
  const upload = multer({ storage: storage })

  

  blogRouter.get('/add-new', (req,res)=>{
    return res.render("AddBlog",{
        user: req.user,
    });
});

blogRouter.get("/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id); // Ensure createdBy is populated
   
    if (!blog) {
      return res.status(404).send("Blog not found");
    }
    return res.render("blog", {
      user: req.user,
      blog,
    });
  } catch (error) {
    console.error("Error fetching blog:", error);
    return res.status(500).send("Server error");
  }
});



//image upload;
blogRouter.post("/", upload.single("coverImage"), async (req, res)=>{
    const {title, body} = req.body;
    const blog = await Blog.create({
        body,
        title,
        createdBy: req.user._id,
        coverImageURL: `/uploads/${req.file.filename}`
    });
    return res.redirect(`/blog/${blog._id}`);
})

blogRouter.post("/", (req, res)=>{
    console.log(req.body);
    return res.redirect("/");
})

export default blogRouter;