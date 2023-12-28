const jwt = require('jsonwebtoken');
class TokenService{
    SECRET; // this secret is used for signing the JWT tokens.

    constructor(){
        this.SECRET = "my secret is not so secret";
    }

    /* generateToken method:
    1. takes a payload(user information object) and generates a JWT token
    */
    generateToken(payLoad) {
        const token = jwt.sign(payLoad, this.SECRET);
        return token;
    }

    /* validateToken method:
    1. Takes a string(token) and checks if this is a valid JWT token signed by this server or not.
    2. Returns the payload (user information object) if the JWT token is valid, otherwise returns null.
    */
    validateToken(token){
        const payLoad = jwt.verify(token, this.SECRET);
        return payLoad;
    }
}

module.exports = TokenService;