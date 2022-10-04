//  References to the DOM
 const addForm = document.querySelector('.add');

 const list = document.querySelector('.todos');

 const search = document.querySelector('.search input');


//  Add a Todo
 const generateTemplate = ((todo) => {

    const html = `
        <li class="list-group-item d-flex justify-content-between align-items-center">
            <span>${todo}</span> 
            <i class="far fa-trash-alt delete"></i>
        </li>
    `;

    list.innerHTML += html;

 });

 addForm.addEventListener('submit', e => {
    e.preventDefault();
    const todo = addForm.add.value.trim();

    if(todo.length){
        generateTemplate(todo);
        addForm.reset();
    }

    // Setting up the local storage
    localStorage.setItem('Todo', todo);

 });

//  Getting the stored Item from the local storage using the tenary operator
localStorage.getItem('Todo') ? generateTemplate(localStorage.getItem('Todo')) : '';


//  Delete todos
list.addEventListener('click', e => {
    if(e.target.classList.contains('delete')){
        e.target.parentElement.remove();
    }

});

// Filter the todo from the search input field
const filterTodo = ((term) => {

    Array.from(list.children)
        .filter((todo) => {
            return !todo.textContent.toLowerCase().includes(term);
        })
        .forEach((todo) => {
            todo.classList.add('filtered')
        });

    Array.from(list.children)
        .filter((todo) => {
            return todo.textContent.toLowerCase().includes(term);
        })
        .forEach((todo) => {
            todo.classList.remove('filtered')
        });
});

// Keyup event that triggers the anonymous filter function
search.addEventListener('keyup', () => {
    const term = search.value.trim().toLowerCase();
    filterTodo(term);
});



