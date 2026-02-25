const apiURL = 'https://jsonplaceholder.typicode.com/todos';
const todoList = document.getElementById('todo-list');
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const messageBox = document.getElementById('message');

// RÉCUPÉRER (GET) les 5 premières tâches
async function fetchTodos() {
    try {
        const response = await fetch(`${apiURL}?_limit=5`); 
        const todos = await response.json();
        todos.forEach(todo => renderTodo(todo));
    } catch (error) {
        console.error("Erreur lors de la récupération :", error);
    }
}

// AFFICHER une tâche dans la liste
function renderTodo(todo) {
    const li = document.createElement('li');
    li.innerHTML = `
        <span class="${todo.completed ? 'completed' : ''}">${todo.title}</span>
        ${!todo.completed ? `<button onclick="completeTodo(${todo.id}, this)">Terminé</button>` : ''}
    `;
    todoList.prepend(li);
}

// CRÉER (POST) une nouvelle tâche
todoForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const newTitle = todoInput.value;
    // Simuler la création d'une tâche
    const response = await fetch(apiURL, {
        method: 'POST',
        body: JSON.stringify({ title: newTitle, completed: false, userId: 1 }),
        headers: { 'Content-type': 'application/json; charset=UTF-8' }
    });
    // Simuler la réponse avec l'ID généré
    const createdTodo = await response.json();
    renderTodo(createdTodo);
    todoInput.value = '';
    showMessage("Tâche ajoutée avec succès !");
});

// METTRE À JOUR (PUT) une tâche comme terminée
async function completeTodo(id, button) {
    try {
        const response = await fetch(`${apiURL}/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ completed: true }),
            headers: { 'Content-type': 'application/json; charset=UTF-8' }
        });
        // Simuler la mise à jour dans le DOM
        if (response.ok) {
            const span = button.previousElementSibling;
            span.classList.add('completed');
            button.remove();
            showMessage("Tâche marquée comme terminée !");
        }
    } catch (error) {
        console.error("Erreur lors de la mise à jour :", error);
    }
}

// AFFICHER un message de succès
function showMessage(text) {
    messageBox.textContent = text;
    messageBox.classList.remove('hidden');
    setTimeout(() => messageBox.classList.add('hidden'), 3000);
}

fetchTodos();