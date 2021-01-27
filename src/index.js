import './styles.css';

import { Todo, ToDoList } from './classes';
import { crearToDoHtml } from './js/components';

export const todoList = new ToDoList();

// const tarea = new Todo( 'Aprender JS');
// todoList.nuevoToDo( tarea );

// console.log(todoList);

// crearToDoHtml( tarea);

// todoList.toDos.forEach( todo => crearToDoHtml( todo )); es lo mismo que lo de abajo
todoList.toDos.forEach( crearToDoHtml);

// console.log( 'todos', todoList.todos );