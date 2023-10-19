//IMPORTS

import { Todo, TodoApp, mapToToDoInstances } from "./todoManager.js";
import { createTodoHTML, renderList } from "./DOM-methods.js";
import { nanoid } from "https://cdn.skypack.dev/nanoid@4.0.0";
import { populate, serialize } from "./form-methods.js";

// VARIABLES & FUNCTIONS

const lsKey = 'todos'
function saveTodos(todos = [], key = lsKey) {
    localStorage.setItem(key, JSON.stringify(todos))
}

function loadToDos(key = lsKey) {
    console.log('getting from ls')
    const lsData = JSON.parse(localStorage.getItem(key))
    return mapToToDoInstances(lsData)
}

// Data (state)

const memoryApp = new TodoApp({
    todos: loadToDos() ||[]
}) 

console.log(memoryApp.todos, `test`)
 

// DOM NODES
const list = document.querySelector(`#todo-list`)
const todoForm = document.forms[`todo-form`]
// ACTIONS
renderList(list, memoryApp.todos)

// BINDINGS
todoForm.addEventListener('submit', (event) => {
    event.preventDefault()
    //get data from form and make an object
    const formData = serialize(todoForm)
    console.log(formData._id)
    console.log(formData)
    if (formData._id) {
        memoryApp.updateTodo(formData._id, formData)
       console.log('update')
       console.log(formData._id)
       console.log(formData)
    } else {
        //push data to todos array
    const newTodo = {...formData}
    memoryApp.createTodo(newTodo)
    console.log('new to do')
    }

    todoForm.reset()
    saveTodos(memoryApp.todos)
    renderList(list, memoryApp.todos)
    
})
list.addEventListener('click', (event) => {
    const {target} = event;
    const {id} = event.target.dataset;

    console.log(target, `TARGET`)

    if (!id) return;

    const todo = memoryApp.getTodoById(id)
    console.log(id)
    console.log(todo)

    
    if (target.matches('.done-btn')) {
        //mark as done
        if (todo.done) {
            todo.markNotDone()
        } else {
            todo.markDone()
        } 
    } else if (target.matches('.update-btn')) {
        //update
        populate(todoForm, todo)

    } else if (target.matches('.delete-btn')) {
        //delete
        memoryApp.removeTodo(todo)
    }

    saveTodos(memoryApp.todos)
    renderList(list, memoryApp.todos, createTodoHTML)
})