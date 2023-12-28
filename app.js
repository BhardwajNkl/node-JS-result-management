const express = require('express');

const router = require('./routes/router');

const sequelize = require("./DB/DBconfig");

const { Role } = require('./models/models');

const ejs = require('ejs');

const path = require('path');

const bodyParser = require('body-parser');

const cookieParser = require('cookie-parser');

const app = express();

//setting static files directories
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "node_modules")));// for bootstrap css

//setting view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, "views"));

//using body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//using cookie-parser
app.use(cookieParser());

//using router
app.use("/", router());

// For handling requests that do not match any handlled route
app.use((req,res)=>{
    res.render("not_found_page.ejs")
})

// Before starting the server we want connect to the database and also persist the roles which will be used by the application.
sequelize.sync({ force: true }).then(() => {
    console.log("connected to database!");
    Role.bulkCreate(
        [{
            roleName: "STUDENT"
        },
        {
            roleName: "TEACHER"
        }
        ]
    ).then((data) => {
        console.log("Roles persisted! ");
        app.listen(3000, () => {
            console.log("server started on port 3000!");
        });
    }).catch((err) => {
        console.log("Error in persisting roles! Roles already created.");
    })
}).catch(err => {
    console.log("Error in connecting to database!");
});
