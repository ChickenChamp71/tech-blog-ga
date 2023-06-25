const logout = document.querySelector('#logout');

logout.addEventListener('click', click => {
    click.preventDefault();

    fetch ('/api/users/logout', {
        method: 'POST',
    })
    .then (res => {
        if (res.ok) {
            location.reload();
        } else {
            alert({ message: 'Failed to logout.' });
        };
    });
});