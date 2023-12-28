const { User, Role } = require('../models/models');
const { isPasswordMatching } = require('./hashingService');

class LoginService {
    /* login method:
    1. This method takes an object (credentials sent by a user for login) and checks if a user with the provided credentials exists or not.
    2. The method returns the an object containing having fields: loadedUser and errorCode
    3. If any error occurs, loadedUser is et null and a maeningful errorCode is set.
    4. If everything is good, errorCode is null and loadedUser contains the user loaded from database.
    */
    async login(userData) {
        const { roleName, email, password } = userData;
        let loadedUser;
        let errorCode;

        try {
            loadedUser = await User.findOne({ where: { email }, include: Role });
        } catch (error) {
            console.log("database error!");
            loadedUser = null;
            errorCode = 1; // internal error
            return {loadedUser, errorCode};
        }

        if (loadedUser == null){
            errorCode = 2; // email does not exist
            return {loadedUser:null, errorCode};
        }
        
        // let's compare the login password with the stored hash
        let isPasswordCorrect;
        try {
            isPasswordCorrect = await isPasswordMatching(password, loadedUser.password);
        } catch (error) {
            console("some error in comparing passwords");
            isPasswordCorrect = false;
            errorCode = 1; // internal error
            return {loadedUser: null, errorCode};
        }

        if (!isPasswordCorrect) {
            console.log("password wrong")
            errorCode = 3; // wrong password
            return {loadedUser: null, errorCode};
        }

        /*now that we know, we have a valid user, we check if the role claimed actually belongs to
        this user or not.
        */
        let ans = loadedUser.roles.some(role => roleName === role.roleName);

        return ans ? {loadedUser, errorCode:null} : {loadedUser: null, errorCode:4}; // errorCode 4: Role error
    }
}

module.exports = LoginService;