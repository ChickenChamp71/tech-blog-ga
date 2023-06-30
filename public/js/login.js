const loginForm = document.querySelector("#login-form");

loginForm.addEventListener("submit", sub => {
    sub.preventDefault();

    const userObj = {
        username: document.querySelector("#login-username").value,
        password: document.querySelector("#login-password").value,
    };

    fetch("/api/users/login",
    {
        method: "POST",
        body: JSON.stringify(userObj),
        headers: {
            "Content-Type":"application/json"
        }
    })
    .then (res => {
        if (res.status === 200) {
            location.href = "/dashboard"
        } else {
            alert("Unsuccessful login attempt.");
        }
    })
});
