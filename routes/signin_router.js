const express = require('express');

const LoginService = require('../services/LoginService');
const TokenService = require('../services/TokenService');

const router = express.Router();

module.exports = (data) => {
    // Handling the GET request for signin page.
    router.get("/", (req, res) => {
        res.render("signin_page", { message: null });
    });

    // Handling the POST request for signin.
    router.post("/", async (req, res) => {
        // Get the submitted login credentials.
        const userData = req.body;

        /* Now, we use the loginService's login method to verify the user.
           The method returns an object that has fields for loadedUser and errorCode.
           If, the errorCode is set, it means loggin failed and an appropriate message is displayed to the user.
           Otherwise, login is successful and user is redirected to right page.
        */
        let loginService = new LoginService();
        let loadedUser;
        let response;
        let message;

        try {
            response = await loginService.login(userData);
        } catch (error) {
            console.log("Error while logging in");
            loadedUser = null;
            response = { loadedUser, errorCode: 1 }; // errorCode 1: Internal error
        }

        if (response.errorCode) {
            switch (response.errorCode) {
                case 1: {
                    message = "Internal Server Error! Try again!";
                    res.render("signin_page", { message });
                    break;
                }

                case 2: {
                    message = "Email does not exist!";
                    res.render("signin_page", { message });
                    break;
                }

                case 3: {
                    message = "Wrong credentials!";
                    res.render("signin_page", { message });
                    break;
                } case 4: {
                    message = "Role is not valid!";
                    res.render("signin_page", { message });
                    break;
                }

                default: {
                    message = "Unknown error! Try again!";
                    res.render("signin_page", { message });
                    break;
                }

            }
        } else if (response.loadedUser === null) {
            message = "Unknown error! Try again!";
            res.render("signin_page", { message });
        }
        // Else, we are sure that we have a user with given credentials.
        else {
            // Let's generate the JWT token using the tokenService.
            const tokenService = new TokenService();
            const { userId, name, email } = response.loadedUser;
            const payLoad = {
                userId, name, email, roleName: userData.roleName
            }
            const token = tokenService.generateToken(payLoad);

            // Now, we set a cookie to hold the JWT.
            res.cookie('token', token);

            // Now, we do a redirect to 'teacher home page' or 'student home page' based on the role.
            payLoad.roleName === "STUDENT" ? res.redirect("/home/student") : res.redirect("/home/teacher");
        }


    });

    return router;
}