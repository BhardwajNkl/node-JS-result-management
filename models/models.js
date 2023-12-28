const { DataTypes } = require('sequelize')
const sequelize = require('../DB/DBconfig');

/*User model:
Represents the users of the application.
Teacher and Student are not considered seperately.
Users are differentiated based on the roles they choose at the time of registration.
*/

const User = sequelize.define(
    'user',
    {
        userId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        freezeTableName: true,
        timestamps: false
    }
);

/*Role model:
Represents a role that a user may have in the application.
A user can have the role of TEACHER or STUDENT.
We have defined a many-to-many mapping between User and Role only for future scaling purposes.
But, currently a user can have only one role and that is chosen at the time of registration.
*/
const Role = sequelize.define(
    'role',
    {
        roleId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        roleName: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    },
    {
        freezeTableName: true,
        timestamps: false
    }
);

/* UserRole model:
This is the join table model for User and Role mapping.
*/
const UserRole = sequelize.define(
    'user_role',
    {

    },
    {
        timestamps: false,
        freezeTableName: true
    }
)

/*Result model:
Represents a resut in the application.
Every result is associated with a User[with role TEACHER] who has created it.
The relation between User to Result is one-to-many
*/
const Result = sequelize.define(
    'result',
    {
        resultId : {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        studentName: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        rollNumber: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },

        dob: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },

        marks: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },

    {
        freezeTableName: true,
        timestamps: false
    }
)

// Let's define the User-Role many-to-many relationship.
User.belongsToMany(Role, { through: UserRole });
Role.belongsToMany(User, { through: UserRole });

// And lastly, let's define the User-Result one-to-many mapping.
User.hasMany(Result);
Result.belongsTo(User);

module.exports = { User, Role, Result };