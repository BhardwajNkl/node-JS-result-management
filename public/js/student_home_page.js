const searchForm = document.getElementById("search-form");

/* Submit event binding on the form for searching result
1. We use the fetch API for making the request to the server.
2. The seerver responds with status 200 if result is found otherwise it responds with status 404
3. After the server responds, we modify the DOM to display the result/status.
*/
searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    fetch(
        '/api/result/find',
        {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: new URLSearchParams(formData)
        }
    ).then(success => {
        if(success.ok){
            return success.json();
        } else{
            throw new Error("Failed");
        }
    }).then(data => {
        const status = document.getElementById("status-text");
        const result = document.getElementById("result");
        // update status text
        status.innerText = "Result Found";
        // now using this data, fill the result table
        const resultStudentName = document.getElementById("result-studentName");
        const resultRollNumber = document.getElementById("result-rollNumber");
        const resultDob = document.getElementById("result-dob");
        const resultMarks = document.getElementById("result-marks");
        const resultClearStatus = document.getElementById("result-clearStatus");
        const resultTeacherName = document.getElementById("result-teacherName");

        resultStudentName.innerText = data.studentName;
        resultRollNumber.innerText = data.rollNumber;
        resultDob.innerText = data.dob;
        resultMarks.innerText = data.marks;
        resultClearStatus.innerText = data.marks >= 60 ? "Passed" : "Failed";
        resultTeacherName.innerText = data.teacherName;
        result.style.display = "block";

    }).catch(error => {
        // To check if the server responded with 404 or some other error occured, we use the below condition.
        if(error.message === "Failed"){
            const status = document.getElementById("status-text");
            const result = document.getElementById("result");
            //update the status text
            status.innerText = "Result Not Found";
            // Then hide the result table, to handle the case when it already exists on page
            result.style.display = "none";
        } else{
            alert("Some error occured! Try again!");
        }
    })
})