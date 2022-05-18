
const express = require("express");

const login = express.Router();

const {getOneUserByEmail} = require("../queries/users");

// Get a user for login by email
login.get('/:email', async (req, res) => {
    const { email } = req.params;
    console.log("GET /:email from users");
    try{
        const oneUser = await getOneUserByEmail(email);
        oneUser.result ? 
        res.status(404).send({
            success: false,
            payload: `/User ${email} not found`
        }) : res.json({
            success: true,
            payload: oneUser
        })
    } catch (err) {
        throw err
    }
});




module.exports = login