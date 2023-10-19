// this file contains the classes required to manage the todos
import { nanoid } from "https://cdn.skypack.dev/nanoid@4.0.2";

//construct a todo class to be managed in the application
export class Todo {
    constructor({id = nanoid(), title, duration, done = false}) {
            this._id = id,
            this.title = title,
            this.duration = duration,
            this.complete = done
    }

    markDone() {
        this.done = true;
    }

    markNotDone() {
        this.done = false;
    }
}

//todo app that manages the todos for a person

export class TodoApp {
    todos = [];

    constructor({todos = []}) {
        this.todos = todos;
    }

    //create
    createTodo(title, duration) {
        const newTodo = new Todo(title, duration)
        this.todos.push(newTodo)
        return newTodo
    }

    //read
    // get todo by Id
    getTodoById(id) {
        return this.todos.find(function(todo) {
            return todo._id === id;
        })
    }

    getTodoByTitle(title) {
        return this.todos.find(function(todo) {
            return todo.title === title;
        })
    }

    //update
    //update an existing todo with new values
    //updates are an object with the values
    updateTodo(id, updates) {
        const todo = this.getTodoById(id)
        console.log(todo)
        if (!todo) {
            throw new Error(`No todo with this Id`)
        }
        //merge updates
        Object.assign(todo, updates)

        return todo;
    }


    //mark done
    markDone(todo) {
        todo.markDone()
    }

    markNotDone(todo) {
        todo.markNotDone()
    }

    //delete
    removeTodo(todo) {
        const idx = this.todos.findIndex(function(t) {
            return todo._id === t._id;
        })

        if (idx === -1) {
            throw new Error(`No to do with id: ${todo._id}`)
        }

        this.todos.splice(idx, 1)

        return this;
    }
}

// map from local storage to todo instance

export function mapToToDoInstances(data) {
    return data.map(item => new Todo(item))
}