const express = require('express');

const signInRouter = require('./signin_router');
const signUpRouter = require('./signup_router');
const homeRouter = require('./home_router');
const apiRouter = require("./api_router");

const router = express.Router();

module.exports = (data)=>{
    // Handling the root route of the application.
    router.get("/",(req,res)=>{
        res.redirect("/signin");
    });

    // Let's define sub routes
    router.use("/signin", signInRouter());
    router.use("/signup", signUpRouter());
    router.use("/home",homeRouter());
    router.use("/api", apiRouter());
    
    return router;
}