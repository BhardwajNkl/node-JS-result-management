const express = require('express');

const router = express.Router();

module.exports = (data)=>{
    router.post("/",(req, res)=>{
        //Delete the 'token cookie', if it is already set.
        if(req.cookies.token){
            res.clearCookie('token');
        }
        /* Here, the server does not send a redirect. This request is coming from Javascript fetch API.
           So, we are just sending a success code, redirect will be handled by client side.
        */
        res.status(200).send();
    });

    return router;
}