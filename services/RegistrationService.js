const { User, Role } = require("../models/models");
const { hashPassword } = require('./hashingService');

class RegistrationService {
    /* register method:
    1. It takes the registration data provided by the user. And creates a User in the database.
    2. The password is stored in the form of hash
    3. Returns status as true and errorCode as null, after successful registration
    4. Otherwise returns an appropriate errorCode and status as false.
    */
    async register(userData) {
        const { roleName, name, email, password } = userData;

        // check if the user already exists
        let loadedUser;
        try {
            loadedUser = await User.findOne({ where: { email }});
        } catch (error) {
            console.log("database error");
            return {status: false, errorCode: 1}; // internal error
        }

        if(loadedUser){
            return {status: false, errorCode: 2}; // user exists
        }

        // password hashing
        let hashedPassword;
        try {
            hashedPassword = await hashPassword(password);
        } catch (error) {
            console.log(error);
            return {status: false, errorCode: 1}; // internal error
        }

        let user = {
            name,
            email,
            password: hashedPassword
        }

        // Every user registers with a role. So, here we fetch the role that the user wants so that the role can be assigned to this new user.
        let requiredRole;
        try {
            requiredRole = await Role.findOne({ where: { roleName } });
        } catch (error) {
            console.log("Could not load role from database! ");
            return {status: false, errorCode: 1}; // internal error: Role does not exist
        }

        // Now, let's save the user in the database.
        let savedUser;
        try {
            savedUser = await User.create(user);
            await savedUser.addRoles([requiredRole]);
        } catch (error) {
            console.log("Error in saving user to the database");
            return {status: false, errorCode: 1}; // internal error
        }

        if (savedUser != null){
            return {status: true, errorCode: null}; // registration success
        }

        return {status: false, errorCode: 3}; // Unknown error

    }
}

module.exports = RegistrationService;