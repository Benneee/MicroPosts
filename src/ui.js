class UI {
  constructor() {
    this.post = document.querySelector('#posts');
    this.titleInput = document.querySelector('#title');
    this.bodyInput = document.querySelector('#body');
    this.idInput = document.querySelector('#id');
    this.postSubmit = document.querySelector('.post-submit');
    this.formState = 'add';
  }

  showPosts(posts) {
    let output = '';
    // console.log(posts);
    posts.forEach(post => {
      output += `
      <div class="card mb-3>
        <div class ="card-body">
          <h4 class="card-title">${post.title}</h4>
          <p class="card-text"> ${post.body}</p>
            <a href="#" class="edit card-link" data-id="${post.id}">
              <i class="fa fa-pencil"></i>
            </a>

            <a href="#" class="delete card-link" data-id="${post.id}">
              <i class="fa fa-remove"></i>
            </a>
        </div>
      </div>
      `;
    });
    this.post.innerHTML = output;
  }

  showAlert(message, className) {
    this.clearAlert();
    const div = document.createElement('div');
    div.className = className;
    div.appendChild(document.createTextNode(message));

    // Insert into DOM
    // The parent element
    const container = document.querySelector('.postsContainer');

    // The next sibling
    const posts = document.querySelector('#posts');

    // Insert into the DOM
    container.insertBefore(div, posts);

    // Timeout
    setTimeout(() => {
      this.clearAlert();
    }, 3000);
  }

  // clear alert
  clearAlert() {
    const currentAlert = document.querySelector('.alert');
    currentAlert ? currentAlert.remove() : null;
  }

  // Clear input fields
  clearFields() {
    this.titleInput.value = '';
    this.bodyInput.value = '';
  }

  // Fill form to edit
  fillForm(data) {
    this.titleInput.value = data.title;
    this.bodyInput.value = data.body;
    this.idInput.value = data.id;

    this.changeFormState('edit');
  }

  // Clear hidden field ID
  clearIdInput() {
    this.idInput.value = '';
  }

  changeFormState(type) {
    if (type === 'edit') {
      this.postSubmit.textContent = 'Update Post';
      this.postSubmit.className = 'post-submit btn btn-warning btn-block';

      // Create a Cancel Button
      const cancelBtn = document.createElement('button');
      cancelBtn.className = 'post-cancel btn btn-danger btn-block';
      cancelBtn.appendChild(document.createTextNode('Cancel Edit'));

      // Insert into the DOM

      // Get the parent - card-form
      const cardForm = document.querySelector('.card-form');

      // Get the element to insert before - form-end
      const formEnd = document.querySelector('.form-end');

      // Inserting...
      cardForm.insertBefore(cancelBtn, formEnd);
    } else {
      this.postSubmit.textContent = 'Post It';
      this.postSubmit.className = 'post-submit btn btn-primary btn-block';

      // Remove cancelBtn if present
      let button = document.querySelector('.post-cancel');
      if (button) {
        button.remove();
      }

      // Clear ID from hidden field
      this.clearIdInput();

      // Clear Text fields
      this.clearFields();
    }
  }
}

export const ui = new UI();
