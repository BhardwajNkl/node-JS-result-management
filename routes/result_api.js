const express = require('express');
const {authenticate, teacherAccessOnly, studentAccessOnly} = require('../services/AuthService');
const TokenService = require('../services/TokenService');
const ResultService = require('../services/ResultService');

const router = express.Router();

module.exports = ()=>{

    /* API for creating new result:
    1. Authentication is required.
    2. Authorization is required. Users with TEACHER role can access this API.
    */
    router.post("/",authenticate, teacherAccessOnly, async (req,res)=>{
        // Get the result data
        const receivedResultData = req.body;
        console.log(receivedResultData);
        // Get the userId of the teacher who is creating this result.
        const tokenService = new TokenService();
        const payLoad = tokenService.validateToken(req.cookies.token);
        const teacherId = payLoad.userId;

        // Now, let's save the result in the database using the resultService.
        const resultService = new ResultService();
        let resultCreationStatus;

        try{
            // addResult method returns true if result is saved successfully. Otherwise, it returns false.
            resultCreationStatus = await resultService.addResult(receivedResultData, teacherId);
        } catch(error){
            console.log("Error while saving the result.");
            resultCreationStatus = false;
        }

        if(resultCreationStatus){
            res.status(201).send();
        } else{
            res.status(422).send("failed to create result");
        }
    });

    /* Update result API:
    1. Only the studentName, D.O.B and marks can be updated.
    2. resultId and rollNumber cannot be updated by this API.
    3. Authentication is required.
    4. Authorization is required. Users with TEACHER role can access this API.
    */
    router.put("/",authenticate, teacherAccessOnly, async (req,res)=>{
        // Get update data
        const {studentName, dob, marks, resultId} = req.body;
        // Now, let's save the updates in the database with the help of resultService.
        const resultService = new ResultService();
        let updateStatus;
        try{
            // updateResult method returns the updated result object in case of success. Otherwise, it returns null.
            updateStatus = await resultService.updateResult(resultId, studentName, dob, marks);
        } catch(error){
            console.log("error while updating the result!");
            updateStatus = null;
        }

        if(updateStatus){
            res.status(200).send();
        } else{
            res.status(422).send();
        }
    });

    /* Delete result API:
    1. Deletes a result by given resultId.
    2. Authentication is required.
    3. Authorization is required. Users with TEACHER role can access this API.
    */
    router.delete("/", authenticate, teacherAccessOnly, async (req,res)=>{

        console.log("deletedata:", req.body);
        const resultId = req.body.resultId;
        const resultService = new ResultService();
        const deleteStatus = await resultService.deleteResult(resultId);
        if(deleteStatus){
            res.status(204).send();
        } else{
            res.status(404).send();
        }
    });

    /* Find result API:
    1. Authentication is required.
    2. Authorization is required. Users with STUDENT role can access this API.
    3. This API returns the result if the given rollNumber and Date of Birth match with a result.
    */
    router.post("/find",authenticate, studentAccessOnly, async(req,res)=>{
        const {rollNumber, dob} = req.body;
        const resultService = new ResultService();
        const result = await resultService.findResultByRollAndDob(rollNumber, dob);
        
        if(result){
            const resultData = { dob: result.dob,
                marks: result.marks,
                resultId: result.resultId,
                rollNumber: result.rollNumber,
                studentName: result.studentName,
                teacherName: result.user.name };
            res.status(200).send(resultData);
        } else{
            res.status(404).send("Not found")
        }
    });

    return router;
}