export const createTodoHTML = ({_id, title, duration, done}) => {

    //make the li

    const li = document.createElement(`li`)
    li.classList.add('list-group-item', 'todo')

    if (done) {
        li.classList.add("done", "bg-success")
    }

    // make title span class
    const titleSpan = document.createElement('span');
    titleSpan.className = "todo-title";
    titleSpan.textContent = title;
    li.append(titleSpan)

    // make duration span class
    const durationSpan = document.createElement('span');
    durationSpan.className = "todo-duration";
    durationSpan.textContent = `(${duration})`;
    li.append(durationSpan)


    const controlsDiv = document.createElement('div');
    controlsDiv.className = 'controls'
    //add done button class
    const doneButton = document.createElement('button');
    doneButton.dataset.id = _id;
    doneButton.className = "done-btn btn btn-secondary"
    doneButton.textContent = `Mark as ${done ? "not" : ""} done`;
    controlsDiv.append(doneButton)

    //add updatebutton class
    const updateButton = document.createElement('button');
    updateButton.dataset.id = _id;
    updateButton.className = "update-btn btn btn-warning"
    updateButton.innerHTML = `<i class="fa-solid fa-pen"></i>`;
    controlsDiv.append(updateButton)

    //add delete button class
    const deleteButton = document.createElement('button');
    deleteButton.dataset.id = _id;
    deleteButton.className = "delete-btn btn btn-danger"
    deleteButton.innerHTML = `<i class="fa-solid fa-trash"></i>`;
    controlsDiv.append(deleteButton)

   
    li.append(controlsDiv)
    return li
}

const noItemsWarning = document.createElement('p')
noItemsWarning.textContent = 'You dont have any todos yet'
noItemsWarning.classList.add("alert", "alert-success")
export const renderList = (listNode = document.body, data = [], createHTMLfn = createTodoHTML) => {
    const fragment = document.createDocumentFragment()

    if (!data.length) {
        listNode.before(noItemsWarning)
    } else {
        noItemsWarning.remove()
    }
    //loop over data
    for (const todo of data) {
         //create an li element
        const li = createHTMLfn(todo)
         // append li to fragment
        fragment.append(li)
    }
    listNode.replaceChildren(fragment)
}