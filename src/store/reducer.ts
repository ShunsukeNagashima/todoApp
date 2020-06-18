import { storeTodo, fetchTodos, loadTodo, editTodo, deleteTodo } from './actions';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { Todo } from '../todo.model';

export interface State {
    todos: Todo[],
}

const initialState: State = {
    todos:[],
}

const reducer = reducerWithInitialState(initialState)
    .case(storeTodo.async.started, state => {
        return {
            ...state
        }
    })
    .case(storeTodo.async.done, (state, res) => {
        console.log(typeof(res.result.name))
        return {
            ...state,
            todos: state.todos.concat({...res.params, id: res.result.name}),        }
    })
    .case(storeTodo.async.failed, state => {
        return {
            ...state,
            Error
        }
    })
    .case(fetchTodos.async.started, state => {
        return {
            ...state
        }
    })
    .case(fetchTodos.async.done, (state, res) => {
        const fetchedTodos = [];
        for (let key in res.result) {
            fetchedTodos.push({
                ...res.result[key],
                id: key
            })
        }
        return {
            ...state,
            todos: fetchedTodos
        }
    })
    .case(fetchTodos.async.failed, state => {
        return {
            ...state,
            Error
        }
    })
    .case(loadTodo.async.started, state => {
        return {
            ...state
        }
    })
    .case(loadTodo.async.done, (state, res) => {
        return {
            ...state
        }
    })
    .case(loadTodo.async.failed, state => {
        return {
            ...state,
            Error
        }
    })
    .case(editTodo.async.started, state => {
        return {
            ...state
        }
    })
    .case(editTodo.async.done, (state, res) => {
        const editedTodo = state.todos.find(todo => todo.id === res.params[0])!
        const newTodos = [...state.todos]
        newTodos.splice(newTodos.indexOf(editedTodo), 1, {...res.params[1], id: res.params[0]})
        return {
            ...state,
            todos: newTodos
        }
    })
    .case(editTodo.async.failed, state => {
        return {
            ...state,
            Error
        }
    })
    .case(deleteTodo.async.started, state => {
        return {
            ...state
        }
    })
    .case(deleteTodo.async.done, (state, res) => {

        return {
            ...state,
            todos: state.todos.filter(todo => todo.id !== res.params)
        }
    })
    .case(deleteTodo.async.failed, (state) => {
        return {
            ...state
        }
    })



export default reducer;