const { User, Result } = require('../models/models');

class ResultService {

    /* addResult method:
    1. Takes the object containing result data and the user id of the teacher who is creating this result.
    2. Returns true if the result is created successfully. Otherwise it returns false.
    */
    async addResult(resultData, teacherId) {

        // Save the result in the databse.
        let result;
        try {
            result = await Result.create(resultData);
        } catch (error) {
            console.log("error while saving the result")
            return false;
        }

        // Now, we have result saved in the database. Let's load the user(teacher) object and assign the result.
        let teacher;
        try {
            teacher = await User.findByPk(teacherId);
        } catch (error) {
            console.log("error while loading teacher");
            return falsel;
        }

        try {
            await teacher.addResults([result]);
        } catch (error) {
            console.log("error while mapping the result to the teacher");
            return false;
        }

        return true;

    }

    // getResultList method: returns all the results created.
    async getResultList() {
        let results;
        try {
            results = await Result.findAll();
        } catch (error) {
            console.log("Error while loading results");
            return null;
        }

        return results;
    }

    // deleteResult method: Deletes a result by resultId. returns true if successfull, otherwise returns false.
    async deleteResult(resultId) {
        try {
            await Result.destroy({ where: { resultId } });
        } catch (error) {
            console.log("error while deleting the result");
            return false;
        }
        return true;
    }

    // findResultByRollNumberAndDob method: This method is used to find the result of a student.
    async findResultByRollAndDob(rollNumber, dob) {
        let result;
        try {
            result = Result.findOne({ where: { rollNumber, dob }, include: User })
        } catch (error) {
            console.log("error in finding result");
            return null;
        }

        return result;
    }

    // updateResult method: Used for updating a result using the resultId. Roll number is not allowed to be updated.
    async updateResult(resultId, studentName, dob, marks) {
        try {
            return await Result.update({
                studentName, dob, marks
            }, {
                where: { resultId }
            })
        } catch (error) {
            return null;
        }
    }
}

module.exports = ResultService;