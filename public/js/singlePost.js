const form = document.querySelector('#comment-form');
const commentBtn = document.querySelector('#comment-btn');
const editForm = document.querySelector('#edit-form');
const delBtn = document.querySelector('.del-btn');
const editBtn = document.querySelector('.edit-btn');

editBtn.addEventListener('click', () => {
    editForm.style.display = 'block';
});

commentBtn.addEventListener('click', () => {
    form.style.display = 'block';
});

form.addEventListener("submit", (sub) => {
    sub.preventDefault();

    const commentText = document.querySelector('#comment-text');
    const postId = document.querySelector('h2').getAttribute('data-post-id');

    const commentObj = {
        content: commentText.value,
        post_id: postId
    };
    
    fetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify(commentObj),
        headers: {
            'Content-Type':'application/json'
        }
    })
    .then (res => {
        if (res.ok) {
            location.reload();
        } else {
            alert('Comment submit failed.' );
        };
    });
});

delBtn.addEventListener('click', () => {

    const delId = delBtn.getAttribute('data-post-id');

    fetch(`/api/posts/${delId}`, {
        method: 'DELETE'
    })
    .then(res => {
        if (res.ok) {
            location.href = "/dashboard";
        } else {
            alert('Delete failed.');
        };
    });
});

const title = document.querySelector('#title');
const content = document.querySelector('#content-text');

editForm.addEventListener('submit', () => {

    const editId = editBtn.getAttribute('data-post-id');

    const postObj = {
        id: editId,
        title: title.value,
        content: content.value
    }

    fetch(`/api/posts/${editId}`, {
        method: 'PUT',
        body: JSON.stringify(postObj),
        headers: {
            'Content-Type':'application/json'
        }
    })
    .then (res => {
        if (res.ok) {
            location.reload();
        } else {
            alert('Post edit failed.');
        };
    });
})