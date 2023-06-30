document.querySelector('form').addEventListener('submit', sub => {
    sub.preventDefault();

    const postObj = {
        title: document.querySelector('#title').value,
        content: document.querySelector('#content').value,
    };
    fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify(postObj),
        headers: {
            'Content-Type':'application/json'
        }
    })
    .then (res => {
        if (res.ok) {
            location.reload();
        } else {
            alert({ message: 'Post submit failed.' });
        };
    });
});

const delBtns = document.querySelectorAll('.del-btn');

delBtns.forEach(button => {
    button.addEventListener('click', () => {
        const delId = button.getAttribute('data-post-id');

        fetch(`/api/posts/${delId}`, {
            method: 'DELETE',
        })
        .then(res => {
            if (res.ok) {
                location.reload();
            } else {
                alert({ message: 'Delete failed.' });
            };
        });
    });
});