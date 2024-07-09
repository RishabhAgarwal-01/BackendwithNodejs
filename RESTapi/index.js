const express = require("express");
const users = require('./MOCK_DATA.json');
const fs = require("fs");
const { error, timeStamp } = require("console");
const mongoose = require("mongoose");

const app = express();
const PORT = 8000;

//conncetion with mongoose
mongoose.connect('mongodb://127.0.0.1:27017/RESTapiDB')
    .then(() => console.log("MongoDB connected sccuessfuly"))
    .catch((error) => console.log("Mongo DB connection Error", error));

//Schema
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        reauired: true,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    jobTitle: {
        type: String,
    },
    gender: {
        type: String,
    }
},{ timestamps: true})

//model
const User = mongoose.model("user", userSchema);


//Middleware
app.use(express.urlencoded({ extended: false }));

app.get("/api/users", async (req, res) => {
    const allDbUsers = await User.find({});
    return res.json(allDbUsers);
});
/* app.get("/users", (req, res) => {
    const html = `
    <ul>
     ${users.map((user) => `<li>${user.first_name} ${user.last_name}</li>`).join("")}
    </ul>
    `
    return res.send(html);
}); */

//db post routes
app.post("/api/users", async (req, res)=>{
    const body = req.body;
    console.log(body)
    if( !body || !body.firstName || !body.email)
      {
        return res.status(400).json({msg : "All fields are req"});
      }

      const result = await User.create({
        firstName : body.firstName,
        lastName: body.lastName,
        email: body.email,
        jobTitle: body.jobTitle,
        gender : body.gender,
      });
      console.log(result)
      return res.status(201).json({msg: "Success" });
      
});

//db get request
app.get("/users", async (req, res) => {
    
    const allDbUsers = await User.find({});

    const html = `
    <ul>
     ${allDbUsers.map((user) => `<li>${user.firstName} ${user.lastName}- ${user.email}</li>`).join("")}
    </ul>
    `
    return res.send(html);
});

/* app.post("/api/users", (req, res) => {
    const body = req.body;
    users.push({ ...body, id: users.length + 1 });
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (error, data) => {
        return res.json({ staus: "pending" });
    });

}) */

/* app.route("/api/users/:id")

    .get((req, res) => {
        const id = Number(req.params.id)
        const user = users.find((user) => user.id === id)
        return res.json(user);
    })
    //edit user with id
    .patch((req, res) => {
        return res.json({ status: pending })

    })
    //delete
    .delete((req, res) => {
        return res.json({ status: pending })
    }); */

    app.route("/api/users/:id")

    .get(async (req, res) => {
        const userWithID = await User.findById(req.params.id);
       if(!userWithID) return res.status(400).json({msg:"failed"})

       console.log(userWithID)
        return res.json(userWithID);
    })
    //edit user with id
    .patch(async (req, res) => {
        const userUpdate = await User.findByIdAndUpdate(req.params.id, {lastName : "Changed"})
        return res.json(userUpdate);

    })
    //delete
    .delete(async (req, res) => {
        const userDelete = await User.findByIdAndDelete(req.params.id);
        return res.status(200).json({msg: "User Deleted"});
      
    });

app.listen(PORT, () => console.log(`Server started at ${PORT}`));