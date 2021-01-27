import { Todo } from './todo.class';

export class ToDoList {

    constructor() {
        // this.toDos = [];
        this.cargarLocalStorage();
    }

    nuevoToDo( toDo ) {
        this.toDos.push( toDo );
        this.guardarLocalStorage();
    }

    eliminarToDo( id ) {
        this.toDos = this.toDos.filter( todo => todo.id != id);
        this.guardarLocalStorage();
    }

    marcarCompletado( id ) {
        for ( const todo of this.toDos) {
            if ( todo.id == id) {
                todo.completado = !todo.completado;
                this.guardarLocalStorage();
                break;
            }
        }
    }

    eliminarCompletados() {
        this.toDos = this.toDos.filter( todo => !todo.completado );
        this.guardarLocalStorage();
    }

    guardarLocalStorage() {

        localStorage.setItem('todo', JSON.stringify( this.toDos));
    }

    cargarLocalStorage() {

        if ( localStorage.getItem('todo') ){
            this.toDos = JSON.parse(localStorage.getItem('todo'));

        } else {
            this.toDos = [];
        }

        this.toDos = this.toDos.map( Todo.fromJson );
    }


}