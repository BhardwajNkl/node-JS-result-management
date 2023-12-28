const express = require("express");
const logoutApi = require("./logout_api");
const resultApi = require("./result_api");

const router = express.Router();

module.exports = (data)=>{
    router.use("/logout", logoutApi());
    router.use("/result", resultApi());

    return router;
}