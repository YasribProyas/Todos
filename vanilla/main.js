import './styles/style.scss';

class Todo {
    constructor(todoText) {
        this.todoText = todoText;
        this.id = String(Math.random());
        this.htmlElement = this.getHTML();
    }

    getHTML = () => {
        const todoElement = document.createElement("div");

        todoElement.classList.add("todo");
        todoElement.dataset.id = this.id;

        todoElement.innerHTML = `<span class="todo-text">
                                <input type="checkbox" name="todo1" id="todo1" />
                                <p>${this.todoText}</p>
                            </span>
                            <span class="todo-options">
                                <button>edit</button>
                                <button onclick="deleteTodo(${this.id})">delete</button>
                            </span>`;
        return todoElement;
    }
}

let todos = [];


window.addTodo = function (textInput, todosSection) {
    if (!textInput.value) return;
    const todo = new Todo(textInput.value)
    textInput.value = "";
    todos.push(todo);
    todosSection.prepend(todo.htmlElement);
};

window.deleteTodo = function (id) {
    todos = todos.filter(todo => todo.id != id);
    const todoElement = document.querySelector(`[data-id="${id}"]`);
    todoElement.parentElement.removeChild(todoElement);
}