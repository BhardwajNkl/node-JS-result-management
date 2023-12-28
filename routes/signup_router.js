const express = require('express');
const RegistrationService = require('../services/RegistrationService');

const router = express.Router();

module.exports = (data)=>{
    // Handling the GET request for signup page.
    router.get("/",(req,res)=>{
        res.render("signup_page",{message:""});
    });

    // Handling the POST request for new registration
    router.post("/", async (req,res)=>{
        //getting the user data
        const userData = req.body;

        //using the RegistrationService
        let registrationService = new RegistrationService();
        let response; // Registration service's register method returns an object with a status flag and an error code.
        let message; // A message to be displayed to the user indicating success/ failure of signup.
        
        try{
            response = await registrationService.register(userData);
        } catch(error){
            console.log("Some error while registering!");
            response = {status: false, errorCode: 1}; // internal error
        }

        if(response.errorCode){
            switch (response.errorCode) {
                case 1: {
                    message = "Internal Server Error! Try again!";
                    res.render("signup_page", {message, className: "alert alert-danger"});
                    break;
                }

                case 2: {
                    message = "Email is already taken!";
                    res.render("signup_page", {message, className: "alert alert-danger"});
                    break;
                }

                case 3: {
                    message = "Unknown error! Try again!";
                    res.render("signup_page", {message, className: "alert alert-danger"});
                    break;
                }

                default: {
                    message = "Unknown error! Try again!";
                    res.render("signup_page", {message, className: "alert alert-danger"});
                    break;
                }

            }
        } else if(response.status){
            message = "Registration successful!";
            res.render("signup_page", {message, className:"alert alert-success"});
        } else{
            message = "Unknown Error! Try again!";
            res.render("signup_page", {message, className:"alert alert-danger"});
        }
    });

    return router;
}