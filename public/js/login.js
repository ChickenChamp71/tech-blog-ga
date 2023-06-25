const loginForm = document.querySelector('#login-form');

loginForm.addEventListener('submit', sub => {
    sub.preventDefault();

    console.log('LSDJAFLKSDJ')

    console.log(document.querySelector('#login-username'));

    const userObj = {
        username: document.querySelector('#login-username').value,
        password: document.querySelector('#login-password').value,
    };

    fetch('/api/users/login',
    {
        method: 'POST',
        body: JSON.stringify(userObj),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then (res => {
        if (res.ok) {
            location.href = '/dashboard'
        } else {
            alert('Unsuccessful login attempt.');
        }
    })
});
