import { http } from './http';
import { ui } from './ui';

// Get Posts on DOMLoad
document.addEventListener('DOMContentLoaded', getPosts);

// Event to addd post
document.querySelector('.post-submit').addEventListener('click', submitPost);

// Event to delete post
document.querySelector('#posts').addEventListener('click', deletePost);

// Event to edit state
document.querySelector('#posts').addEventListener('click', enableEdit);

// TO-DO
// Event For Cancel

// Get Posts
function getPosts() {
  http
    .get('http://localhost:3000/posts')
    .then(data => ui.showPosts(data))
    .catch(err => console.log(err));
}

// Add Posts
function submitPost() {
  const title = document.querySelector('#title').value;
  const body = document.querySelector('#body').value;

  if (title === '' && body === '') {
    ui.showAlert('Please fill in all fields', 'alert alert-danger');
  } else {
    const data = {
      title,
      body
    };

    // Create Post
    http
      .post('http://localhost:3000/posts', data)
      .then(data => {
        ui.showAlert('Post added', 'alert alert-success');
        ui.clearFields();
        getPosts();
      })
      .catch(err => console.log(err));
  }
}

// Delete post
// Event delegation is employed here

function deletePost(e) {
  if (e.target.parentElement.classList.contains('delete')) {
    const id = e.target.parentElement.dataset.id;
    // console.log('item id', id);
    http
      .delete(`http://localhost:3000/posts/${id}`)
      .then(data => {
        ui.showAlert('Post removed', 'alert alert-success');
        getPosts();
      })
      .catch(err => console.log(err));
  }

  e.preventDefault();
}

// Enable Edit State
// We will be using event delegation here as well
function enableEdit(e) {
  // console.log(e.target);
  if (e.target.parentElement.classList.contains('edit')) {
    const id = e.target.parentElement.dataset.id;
    const title = e.target.parentElement.previousElementSibling.previousElementSibling.textContent;
    const body = e.target.parentElement.previousElementSibling.textContent;

    const data = {
      id,
      title,
      body
    };

    // Populate the form with data collected above
    ui.fillForm(data);
  }

  e.preventDefault();
}
