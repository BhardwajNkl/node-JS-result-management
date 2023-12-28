const addResultBtn = document.getElementById("add-result"); // Button which brings the form for creating a new result.
const addResultCancel = document.getElementById("add-result-cancel"); // Button to hide the form for creating new result.
const editResultBtnList = document.getElementsByClassName("edit-btn");// Button which brings the form for updating a result.
const editResultCancel = document.getElementById("edit-result-cancel"); // Button to hide the form for updating a result.
const deleteResultBtnList = document.getElementsByClassName("delete-btn"); // Button to delete a result

const addForm = document.getElementById("add-form"); // Reference to the form for creating new result.
const editForm = document.getElementById("edit-form"); // reference to the form updating a result.

/* Binding the click event on addResultButton:
NOTE: The same area of page is being used for 'add result form', 'update result form' and a 'status text for these operations'.
So, we need to ensure that only one of the three components is displayed at a time.

1. The form for creating a new result is displayed.
2. We ensure that the 'update form' and 'status text' are hidden, in case any of the two already displayed.
*/
addResultBtn.addEventListener("click", () => {
    const addresultArea = document.getElementById("add-result-area");
    const editResultArea = document.getElementById("edit-result-area");
    const statusTextArea = document.getElementById("status-text-area");

    editResultArea.style.display = "none";
    statusTextArea.style.display = "none";
    addresultArea.style.display = "block";
});

/*Handling the 'cancel' operation on 'add result' form
1. We just need to hide the 'add result' form from user's view.
*/
addResultCancel.addEventListener("click", () => {
    const addresultArea = document.getElementById("add-result-area");
    addresultArea.style.display = "none";
});

/*Handling the 'submit' event on 'add result' form
1. We post the data to the server using fetch API.
2. The server responds with status code 201 if result is successfully created.
3. If the server fails to create the result, it responds with status code 422.
4. Based on the status sent by the server, we display a status text to the user.
*/
addForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    fetch(
        '/api/result',
        {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: new URLSearchParams(formData)
        }
    ).then(success => {
        if (success.status === 201) {
            const addresultArea = document.getElementById("add-result-area");
            const statusTextArea = document.getElementById("status-text-area");

            addresultArea.style.display = "none";
            statusTextArea.style.display = "block";
            statusTextArea.innerHTML = "<b>Result added successfully!</b>";

            setTimeout(() => {
                window.location.href = "/home/teacher";
            }, 1000);
        } else {
            throw new Error("Failed");
        }
    }).catch(error => {
        if (error.message === "Failed") {
            const addresultArea = document.getElementById("add-result-area");
            const statusTextArea = document.getElementById("status-text-area");

            addresultArea.style.display = "none";
            statusTextArea.style.display = "block";
            statusTextArea.innerHTML = "<b>Could not add result! try again!</b>";
        } else {
            alert("Something went wrong! Try again!")
        }
    })
})


/* Event binding on 'edit result' buttons
1. The form for updating a result is displayed.
2. We ensure that the 'add result form' and 'status text' are hidden, in case any of the two already displayed.
*/
for (i = 0; i < editResultBtnList.length; i++) {
    const editResultBtn = editResultBtnList[i];
    editResultBtn.addEventListener("click", () => {
        const addresultArea = document.getElementById("add-result-area");
        const editResultArea = document.getElementById("edit-result-area");
        const statusTextArea = document.getElementById("status-text-area");

        addresultArea.style.display = "none";
        statusTextArea.style.display = "none";
        editResultArea.style.display = "block";

        /*
        we will need the resultId of the result for update operation.
        So, we get it from the button and then set it to the form.
        */
        const resultId = editResultBtn.getAttribute("data-resultId");
        const editForm = document.getElementById("edit-form");
        editForm.setAttribute('data-resultId', resultId);

        // Now, let's fill the update form from existing data.
        const resultRow = document.getElementById(resultId);
        const tdElements = resultRow.getElementsByTagName("td");
        const formFields = editForm.querySelectorAll("input[name]");
        for (let i = 0; i < tdElements.length - 1; i++) {
            formFields[i].value = tdElements[i].innerText;
        }
    });
}

/*Handling the 'cancel' operation on 'update result' form
1. We just need to hide the 'update result' form from user's view.
*/
editResultCancel.addEventListener("click", () => {
    const editresultArea = document.getElementById("edit-result-area");
    editresultArea.style.display = "none";
})

/*Handling the 'submit' event on 'update result' form
1. We post the data to the server using fetch API.
2. The server responds with status code 200 if result is successfully updated.
3. If the server fails to update the result, it responds with status code 422.
4. Based on the status sent by the server, we display a status text to the user.
*/
editForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const resultId = editForm.getAttribute('data-resultId'); // gettinng the Id of result to be updated.
    const formData = new FormData(event.target);
    formData.append('resultId', resultId);
    fetch(
        '/api/result',
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: new URLSearchParams(formData)
        }
    ).then(success => {
        if (success.ok) {
            const editResultArea = document.getElementById("edit-result-area");
            const statusTextArea = document.getElementById("status-text-area");

            editResultArea.style.display = "none";
            statusTextArea.style.display = "block";
            statusTextArea.innerHTML = "<b>Result updated successfully!</b>";
            setTimeout(() => {
                window.location.href = "/home/teacher";
            }, 1000);
        } else {
            throw new Error("Failed");
        }
    }).catch(error => {
        if (error.message === "Failed") {
            const editResultArea = document.getElementById("edit-result-area");
            const statusTextArea = document.getElementById("status-text-area");

            editResultArea.style.display = "none";
            statusTextArea.style.display = "block";
            statusTextArea.innerHTML = "<b>Could not updated the result! try again!</b>";
            setTimeout(() => {
                window.location.href = "/home/teacher";
            }, 1000);
        } else {
            alert("Something went wrong! try again!")
        }
    })

})


/* Event binding on 'delete result' buttons
1. We make a delete request to the server using the result id.
2. Server responds with status code 204, if the result is successfully deleted.
3. Server responds with status code 404 if the result did not exist.
*/
for (i = 0; i < deleteResultBtnList.length; i++) {
    const deleteResultBtn = deleteResultBtnList[i];
    deleteResultBtn.addEventListener("click", () => {
        const resultId = deleteResultBtn.getAttribute("data-resultId");
        fetch(
            '/api/result',
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ resultId })
            }
        ).then(success => {
            if (success.status === 204) {
                const statusTextArea = document.getElementById("status-text-area");
                statusTextArea.style.display = "block";
                statusTextArea.innerHTML = "<b>Result deleted successfully!</b>";
                setTimeout(() => {
                    window.location.href = "/home/teacher";
                }, 1000);
            } else {
                throw new Error("Failed");
            }

        }).catch(error => {
            if (error.message === "Failed") {
                const statusTextArea = document.getElementById("status-text-area");
                statusTextArea.style.display = "block";
                statusTextArea.innerHTML = "<b>Could not delete! try again!</b>";
                setTimeout(() => {
                    window.location.href = "/home/teacher";
                }, 1000);
            } else {
                alert("Something went wrong retry!");
            }
        })
    });
}

