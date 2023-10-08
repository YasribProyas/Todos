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
                                <input type="checkbox" name="todo1" />
                                <p>${this.todoText}</p>
                            </span>
                            <span class="todo-options">
                                <button onclick="editTodo(${this.id})">edit</button>
                                <button onclick="deleteTodo(${this.id})">delete</button>
                            </span>`;
        return todoElement;
    }
    objectify = () =>({
            todoText: this.todoText,
        })

    static objectifyAll = (todos) => todos.map(todo=>todo.objectify())
}

let todosSection = document.getElementById("todos");


let todos = (JSON.parse(localStorage.getItem("todos") || "[]"))
            .map(({todoText})=>{
                let todo = new Todo(todoText);
                todosSection.prepend(todo.htmlElement)
                return todo;
            });



console.log(todos);
// console.log((JSON.parse(localStorage.getItem("todos") || "[]")).map(({todoText})=>new Todo(todoText)));
// console.log(JSON.stringify(Todo.objectifyAll(todos)));


let todoForm = document.getElementById("todo-form");
todoForm.addEventListener("submit", e=>{
    e.preventDefault()
    addTodo(e.target[0], todosSection)
})

let addTodo = function (textInput, todosSection) {
    if (!textInput.value) return;
    let todo = new Todo(textInput.value)
    textInput.value = "";
    todos.push(todo);
    todosSection.prepend(todo.htmlElement);
    localStorage.setItem("todos", JSON.stringify(Todo.objectifyAll(todos)));
};


window.editTodoTodo = function (id) {
    todos = todos.filter(todo => todo.id != id);
    let todoElement = document.querySelector(`[data-id="${id}"]`);
    todoElement.parentElement.removeChild(todoElement);
}
window.deleteTodo = function (id) {
    todos = todos.filter(todo => todo.id != id);
    localStorage.setItem("todos", JSON.stringify(Todo.objectifyAll(todos)));
    let todoElement = document.querySelector(`[data-id="${id}"]`);
    todoElement.parentElement.removeChild(todoElement);
}