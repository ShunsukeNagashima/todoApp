import { Actions } from './actions';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { Todo } from '../todo.model';

interface Todos {
    todos: Todo[]
}

const initialState: Todos = {
    todos:[]
}

const reducer = reducerWithInitialState(initialState)
    .case(Actions.addTodo, (state, todo) => {
       return {
           ...state,
           todos: state.todos.concat(todo)
       }
    })
    .case(Actions.deleteTodo, (state, id) => {
        return {
            ...state,
            todos: state.todos.filter(todo => todo.id !== id)
        }
    })

export default reducer;