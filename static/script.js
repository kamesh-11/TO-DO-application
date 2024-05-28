document.getElementById('todo-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const todoInput = document.getElementById('todo-input');
    const todoText = todoInput.value.trim();
    
    if (todoText) {
        addTodo(todoText);
        todoInput.value = '';
    }
});

function addTodo(todoText) {
    fetch('/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ todo: todoText }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            const todoList = document.getElementById('todo-list');
            const newTodo = document.createElement('li');
            newTodo.textContent = todoText;

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', () => {
                deleteTodo(newTodo, todoText);
            });

            newTodo.appendChild(deleteButton);
            todoList.appendChild(newTodo);
        }
    });
}

function deleteTodo(todoElement, todoText) {
    fetch('/delete', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ todo: todoText }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            todoElement.remove();
        }
    });
}
