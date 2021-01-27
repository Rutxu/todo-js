import { Todo } from "../classes";
import { todoList } from '../index';

//Referencias
const divToDoList = document.querySelector('.todo-list');
const txtInput = document.querySelector('.new-todo');
const btnBorrar = document.querySelector('.clear-completed');
const ulFiltros = document.querySelector('.filters');
const afiltro = document.querySelectorAll('.filtro');

export const crearToDoHtml = ( todo ) => {
    
    const htmlToDo = `
        <li class="${ ( todo.completado ) ? 'completed' : '' }" data-id="${ todo.id }">
            <div class="view">
				<input class="toggle" type="checkbox" ${ ( todo.completado ) ? 'checked' : '' }>
				<label>${todo.tarea}</label>
				<button class="destroy"></button>
			</div>
			<input class="edit" value="Create a TodoMVC template">
	    </li>
    `;

    const div = document.createElement('div');
    div.innerHTML = htmlToDo;

    divToDoList.append( div.firstElementChild );

    return div.firstElementChild;

};

//Eventos
txtInput.addEventListener('keypress', ( e ) => {

    console.log(txtInput.value);

    if( e.keyCode === 13 && txtInput.value.length > 0) {
        
        const nuevoTodo = new Todo( txtInput.value );
        todoList.nuevoToDo( nuevoTodo );

        console.log(todoList);

        crearToDoHtml( nuevoTodo );
        txtInput.value = '';
    }
});

divToDoList.addEventListener('click', (e) => {

    const nombreElemento = e.target.localName; // puede ser input, label, button
    const todoElemento = e.target.parentElement.parentElement;
    const todoId = todoElemento.getAttribute('data-id');

    if ( nombreElemento.includes('input')) {
        todoList.marcarCompletado( todoId );
        todoElemento.classList.toggle('completed');

    } else if ( nombreElemento.includes('button')){
        todoList.eliminarToDo( todoId );
        divToDoList.removeChild( todoElemento );
    }

});

btnBorrar.addEventListener('click', (e) => {
    
    todoList.eliminarCompletados();

    for( let i = divToDoList.children.length - 1; i >= 0; i--) {
        const elemento = divToDoList.children[i];

        if ( elemento.classList.contains('completed')){
            divToDoList.removeChild(elemento);
        }
    }
});

ulFiltros.addEventListener('click', (e) => {

    const filtro = e.target.text;

    if ( !filtro ) {
        return;
    }

    afiltro.forEach( elem => elem.classList.remove('selected'));
    e.target.classList.add('selected');

    for ( const elemento of divToDoList.children) {

        elemento.classList.remove('hidden');
        const completada = elemento.classList.contains('completed');

        switch( filtro ) {
            case 'Pendientes':
                if( completada ){
                    elemento.classList.add('hidden');
                }
                break;

            case 'Completados':
                if( !completada ){
                    elemento.classList.add('hidden');
                }
                break;
        }
    }

});