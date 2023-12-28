const TokenService = require('./TokenService');

/* Authentication middleware:
1. We extract the JWT token from request cookie, if it exists.
2. If we get a valid token, the authentication is successfull and the request is forwarded to the next middleware.
3. If, token is missing or invalid, we redirect the user to the signin page.
*/
const authenticate = (req, res, next) => {
    const token = req.cookies.token ? req.cookies.token : null;
    if (token != null) {
        const tokenService = new TokenService();
        const payLoad = tokenService.validateToken(token);
        if (payLoad) {
            next();
        } else {
            res.redirect("/signin");
        }
    } else{
        res.redirect("/signin")
    }

}

/*Input: request object and a roleName as String
  Output: true, if the user who is trying to access the page has the role(we extract it using the token
    which is there in the request object) that we want to check. Otherwise, false.
*/
function doesTheUserHaveRole(userReq, roleToCheck){
    const token = userReq.cookies.token;
    const tokenService = new TokenService();
    const payLoad = tokenService.validateToken(token);
    const roleUserHas = payLoad.roleName;
    return roleUserHas === roleToCheck;
}


/* Authorization middleware for Student's Home Page access
1. Only a user with role STUDENT can get access to Student Home Page.
2. If authorization fails, we display a page indication the user about Unauthorized Access.
*/
const studentAccessOnly = (req, res, next)=>{
    /* authentication middleware has already done it's job. So, we just need to check if the user has
    the correct role or not.
    */

    if(doesTheUserHaveRole(req, "STUDENT")){
        next();
    } else{
        res.render("unauthorized_access_page.ejs");
    }
   
}

/* Authorization middleware for Teacher's Home Page access
1. Only a user with role TEACHER can get access to Teacher Home Page.
2. If authorization fails, we display a page indication the user about Unauthorized Access.
*/
const teacherAccessOnly = (req, res, next)=>{
     /* authentication middleware has already done it's job. So, we just need to check if the user has
    the correct role or not.
    */

    if(doesTheUserHaveRole(req, "TEACHER")){
        next();
    } else{
        res.render("unauthorized_access_page.ejs");
    }

}

module.exports = {authenticate, studentAccessOnly, teacherAccessOnly};