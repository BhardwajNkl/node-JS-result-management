const logoutBtn = document.getElementById('logout');

/*Logout button event binding
1. We use the Javascript's fetch API to make a logout request to the server.
2. Then, we redirect the user to the signin page.
*/
logoutBtn.addEventListener("click", () => {
    fetch('/api/logout', {
        method: 'POST',
        credentials: 'same-origin'
    }).then(
        (response) => {
            if(response.ok){
                window.location.href = "/signin";
            } else{
                throw new Error("Failed")
            }
        }
    ).catch(
        (error) => {
            alert("Could not log out! Try again!");
        }
    )
});