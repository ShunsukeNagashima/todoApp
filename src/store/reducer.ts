import { storeTodo, fetchTodos, loadTodo, editTodo, deleteTodo } from './actions';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { Todo } from '../todo.model';

export interface State {
    todos: Todo[],
    loading: boolean
}

const initialState: State = {
    todos:[],
    loading: false
}

const reducer = reducerWithInitialState(initialState)
    .case(storeTodo.async.started, state => {
        return {
            ...state,
            loading: true
        }
    })
    .case(storeTodo.async.done, (state, res) => {
        console.log(typeof(res.result.name))
        return {
            ...state,
            todos: state.todos.concat({...res.params, id: res.result.name}),
            loading: false
        }
    })
    .case(storeTodo.async.failed, state => {
        return {
            ...state,
            Error,
            loading: false
        }
    })
    .case(fetchTodos.async.started, state => {
        return {
            ...state,
            loading: true
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
            todos: fetchedTodos,
            loading: false
        }
    })
    .case(fetchTodos.async.failed, state => {
        return {
            ...state,
            Error,
            loading: false
        }
    })
    .case(loadTodo.async.started, state => {
        return {
            ...state,
            loading: true
        }
    })
    .case(loadTodo.async.done, (state, res) => {
        return {
            ...state,
            loading: false
        }
    })
    .case(loadTodo.async.failed, state => {
        return {
            ...state,
            loading: false,
            Error
        }
    })
    .case(editTodo.async.started, state => {
        return {
            ...state,
            loading: true
        }
    })
    .case(editTodo.async.done, (state, res) => {
        const editedTodo = state.todos.find(todo => todo.id === res.params[0])!
        const newTodos = [...state.todos]
        newTodos.splice(newTodos.indexOf(editedTodo), 1, {...res.params[1], id: res.params[0]})
        return {
            ...state,
            todos: newTodos,
            loading: false
        }
    })
    .case(editTodo.async.failed, state => {
        return {
            ...state,
            Error,
            loading: false
        }
    })
    .case(deleteTodo.async.started, state => {
        return {
            ...state,
            loading: true
        }
    })
    .case(deleteTodo.async.done, (state, res) => {

        return {
            ...state,
            todos: state.todos.filter(todo => todo.id !== res.params),
            loading: false
        }
    })
    .case(deleteTodo.async.failed, (state) => {
        return {
            ...state,
            Error,
            loading: false
        }
    })



export default reducer;