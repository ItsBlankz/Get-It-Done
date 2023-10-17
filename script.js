let totalTodos = [];

const addTodo = document.querySelector("#submit-form");
const nameInput = document.querySelector("#todo-name");
const listContainer = document.querySelector(".task-list");
const doneTodoText = document.querySelector("#todo-done");
const totalTodoText = document.querySelector("#total-todo");
const mainStatus = document.querySelector("#main-text > p:nth-child(1)");
const motivation = document.querySelector("#main-text > p:nth-child(2)");

let doneTodos = 0;
let todoDoneBtns;
let removeTodoBtns;
let editTodoBtns;

function createTodoItem(name) {
    mainStatus.innerText = "Todos Done";
    motivation.innerText = "keep it up";
    index = totalTodos.indexOf(name);
    listContainer.classList.remove("hidden");
    const listItem = document.createElement("li");
    listItem.innerHTML = `<button id="todoDoneBtn-${index}">
        <img src="assets/checkmark.png" alt="" srcset="" />
    </button>
    <p class="">${name}</p>
    <form class="hidden" id="edit-todo-form-${index}">
                    <input
                        type="text"
                        id="edit-todo-text"
                        value=""
                        class="edit-form"
                    />
                </form>
    <div id="button-container">
        <button id="editTodoBtn-${index}">
            <img src="assets/edit.png" alt="" srcset="" />
        </button>
        <button id="removeTodoBtn-${index}">
            <img src="assets/delete.png" alt="" srcset="" />
        </button>
    </div>`;
    listContainer.appendChild(listItem);
    listItem.classList.add("list-item", index);
}

//you can get the Index of the button clicked and then work on other stuff using it

function otherTodoFunc() {
    todoDoneBtns = document.querySelectorAll(".list-item > button");
    editTodoBtns = document.querySelectorAll(
        "#button-container > button:nth-child(1)"
    );
    removeTodoBtns = document.querySelectorAll(
        "#button-container > button:nth-child(2)"
    );
    editTodoInp = document.querySelectorAll("li > form");

    todoDoneBtns[index].addEventListener("click", (e) => {
        e.currentTarget.nextElementSibling.classList.toggle("done");
        doneTodoText.innerText = String(
            document.querySelectorAll('p[class="done"]').length
        );
        if (
            totalTodos.length ===
            document.querySelectorAll('p[class="done"]').length
        ) {
            mainStatus.innerText = "All Done";
            motivation.innerText = "good job";
        }
    });

    removeTodoBtns[index].addEventListener("click", (e) => {
        e.currentTarget.parentElement.parentElement.remove();
        refreshList();
        totalTodoText.innerText = totalTodos.length;
        doneTodoText.innerText = String(
            document.querySelectorAll('p[class="done"]').length
        );
    });

    editTodoBtns[index].addEventListener("click", (e) => {
        let curEditID = `#edit-todo-form-${e.currentTarget.parentElement.parentElement.classList[1]}`;
        const input = document.querySelector(curEditID).firstElementChild;
        console.log(input);
        let childNodes = e.currentTarget.parentElement.parentElement.childNodes;
        let curTodoName = childNodes[2].innerText;
        childNodes[2].classList.toggle("hidden");
        editBox = document.querySelector(curEditID);
        input.setAttribute("value", curTodoName);
        editBox.classList.toggle("hidden");

        editBox.addEventListener("submit", (e) => {
            e.preventDefault();
            totalTodos[parseInt(curEditID[curEditID.length - 1])] = input.value;
            editBox.classList.toggle("hidden");
            childNodes[2].innerText = input.value;
            childNodes[2].classList.toggle("hidden");
        });
    });
}

function refreshList() {
    totalTodos = [];
    allP = document.querySelectorAll(".list-item > p");
    for (p of allP) {
        totalTodos.push(p.innerText);
    }
}

const isDuplicate = (element) => {
    for (todo of totalTodos) {
        if (todo === element) {
            return true;
        }
    }
    return false;
};

addTodo.addEventListener("click", (e) => {
    e.preventDefault();
    let todoName = nameInput.value;
    if (todoName && !isDuplicate(todoName)) {
        totalTodos.push(todoName);
        createTodoItem(todoName);
        nameInput.value = "";
        otherTodoFunc();
        refreshList();
        totalTodoText.innerText = totalTodos.length;
    }
});

/* 
for edit:

when edit button pressed -> change innerHTML to  requirement (probably a form and text box) -> add required classList (for styles)
-> assign inner value as old todoName -> get New Value -> change todoName in html and in the list
*/
