const addForm = document.querySelector('.add');
const list = document.querySelector('.todos');
const search = document.querySelector('.search input');

// ==================================== INSERT ====================================

const generateTemplate = todo => {
    const html = `
        <li class="list-group-item d-flex justify-content-between align-items-center">
            <span>${todo}</span>
            <i class="far fa-trash-alt delete"></i>
        </li>
    `;
    list.innerHTML += html;
}

addForm.addEventListener('submit', e => {
    e.preventDefault();

    // addForm(the form).add(the input by name)
    const todo = addForm.add.value.trim(); // also remove white spaces, before and after

    // only call the generater if the input not empty
    if(todo.length){ 
        generateTemplate(todo);
        // addForm.add.value = ""; // we can use this instead of the following one
        addForm.reset(); 
    }
});




// ==================================== REMOVE ====================================
list.addEventListener( 'click', e => {
    // e.target.tagName === 'I' // this will work too as the condition
    if(e.target.classList.contains('delete')){
        // e.target.parentNode.remove(); // this works too
        e.target.parentElement.remove();
    }
} );




// ==================================== FILTERING ====================================
// children method - returns HTMLcollection, cannot use array methods on it
// has to be converted into an array

//**************************
// TEXT CONTENT - we used it on the li, which doesn't have a text inside is ..
//                so it checks it's childs textContent.
//**************************


const filterTodos = (term) => {


    Array.from(list.children)
    // we filter out the one's which don't match
    .filter( todo => !todo.textContent.toLocaleLowerCase().includes(term))
    .forEach( todo => todo.classList.add('filtered'));

    Array.from(list.children)
    // we filter out the one's which that match
    .filter( todo => todo.textContent.toLocaleLowerCase().includes(term))
    .forEach( todo => todo.classList.remove('filtered'));

};


search.addEventListener('keyup', () => {
    const term = search.value.trim().toLocaleLowerCase();
    filterTodos(term);

});