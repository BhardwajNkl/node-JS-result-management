const express = require('express');
const ResultService = require('../services/ResultService');
const TokenService = require('../services/TokenService');
const { authenticate, studentAccessOnly, teacherAccessOnly } = require('../services/AuthService');

const router = express.Router();

module.exports = (data) => {
    /*
    student's home route:
    1. Authentication requred. Otherwise, we redirect the user on the signin page.
    2. User must have the role of STUDENT. Otherwise, we display a page indicating Unauthorized access.
    */
    router.get("/student", authenticate, studentAccessOnly, (req, res) => {
        // The authentication and authorization are successfull. We are again using the tokenService just to get the name of the user who is logged in.
        const tokenService = new TokenService();
        const payLoad = tokenService.validateToken(req.cookies.token);
        const loggedUserName = payLoad.name;
        res.render("student_home_page", { loggedUserName });
    });

    /*teacher's home route:
    1. Authentication requred. Otherwise, we redirect the user on the signin page.
    2. User must have the role of TEACHER. Otherwise, we display a page indicating Unauthorized access.
    */
    router.get("/teacher", authenticate, teacherAccessOnly, async (req, res) => {
        // The authentication and authorization are successfull. We are again using the tokenService just to get the name of the user who is logged in.
        const tokenService = new TokenService();
        const payLoad = tokenService.validateToken(req.cookies.token);
        const loggedUserName = payLoad.name;

        //we need the list of results to display to the teacher.
        const resultService = new ResultService();
        let results=[];
        try{
            results = await resultService.getResultList();
        } catch(error){
            console.log("Error while fetching results");
            results = [];
        }
        
        res.render("teacher_home_page", {results, loggedUserName});
    });

    return router;
}