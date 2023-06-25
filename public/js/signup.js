const signupForm = document.querySelector('#signup-form');

signupForm.addEventListener('submit', sub => {

    console.log('GOES HERE !')
    sub.preventDefault();

    const userObj = {
        username: document.querySelector('#signup-username').value,

        password: document.querySelector('#signup-password').value
    };

    fetch ('/api/users', {
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
            location.reload();
            console.log('failed');
        };
    });
});