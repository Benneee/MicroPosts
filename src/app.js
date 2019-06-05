import { http } from './http';
import { ui } from './ui';

// Get Posts on DOMLoad
document.addEventListener('DOMContentLoaded', getPosts);

function getPosts() {
  http
    .get('http://localhost:3000/posts')
    .then(data => ui.showPosts(data))
    .catch(err => console.log(err));
}
