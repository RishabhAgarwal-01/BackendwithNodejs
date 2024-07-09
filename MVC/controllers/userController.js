const userData = require("../models/userData");

// Controller for getting all users
async function handleGetAllUser(req, res) {
    try {
        const allDbUsers = await userData.find({}); // Await the resolution of the find query
        return res.json(allDbUsers);
    } catch (error) {
        console.error("Error fetching all users:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

// Controller for creating a new user
async function handleCreateNewUser(req, res) {
    try {
        const body = req.body;
        if (!body || !body.firstName || !body.email) {
            return res.status(400).json({ msg: "Error in post req" });
        }
        const newUser = await userData.create({ // Await the resolution of the create query
            firstName: body.firstName,
            lastName: body.lastName,
            email: body.email,
            jobTitle: body.jobTitle,
            gender: body.gender,
        });
        console.log(newUser);
        return res.status(201).json({ msg: "Success", user: newUser }); // Send the newly created user in the response
    } catch (error) {
        console.error("Error creating new user:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

// Controller for getting a user by ID
async function handleGetUserWithID(req, res) {
    try {
        const userWithID = await userData.findById(req.params.id); // Await the resolution of the findById query
        if (!userWithID) {
            return res.status(404).json({ msg: "User not found" });
        }
        return res.json(userWithID);
    } catch (error) {
        console.error("Error fetching user by ID:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

// Controller for updating a user by ID
async function handleUpdateUserWithID(req, res) {
    try {
        const userUpdate = await userData.findByIdAndUpdate(req.params.id, { lastName: req.params.id , firstName : req.body.firstName}, { new: true }); // Await the resolution of the findByIdAndUpdate query and pass { new: true } to return the updated document
        if (!userUpdate) {
            return res.status(404).json({ msg: "User not found" });
        }
        return res.json(userUpdate);
    } catch (error) {
        console.error("Error updating user by ID:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

// Controller for deleting a user by ID
async function handleDeleteUserWithID(req, res) {
    try {
        const userDelete = await userData.findByIdAndDelete(req.params.id); // Await the resolution of the findByIdAndDelete query
        if (!userDelete) {
            return res.status(404).json({ msg: "User not found" });
        }
        return res.status(200).json({ msg: "User deleted" });
    } catch (error) {
        console.error("Error deleting user by ID:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

module.exports = {
    handleGetAllUser,
    handleCreateNewUser,
    handleGetUserWithID,
    handleUpdateUserWithID,
    handleDeleteUserWithID
};
