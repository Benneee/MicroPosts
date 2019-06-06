import { http } from './http';
import { ui } from './ui';

// Get Posts on DOMLoad
document.addEventListener('DOMContentLoaded', getPosts);

// Event to addd post
document.querySelector('.post-submit').addEventListener('click', submitPost);

// Event to delete posts
document.querySelector('#posts').addEventListener('click', deletePost);

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
