import actionCreatorFactory from 'typescript-fsa';
import { asyncFactory } from 'typescript-fsa-redux-thunk';
import { Dispatch} from 'redux';
import axios from '../axios-todo';
import { State } from './reducer';
import { Todo } from '../todo.model';

const actionCreator = actionCreatorFactory();

const asyncActionCreator = asyncFactory<State>(actionCreator)

interface storeResult {
    name: string
}

// asynchronous store action
export const storeTodo = asyncActionCreator<Todo, storeResult, Error>(
    'STORE_TODO',
    async(params: Todo, _dispatch: Dispatch) => {

        const res = await axios.post('/todos.json', params)

        if (res.status === 200) {  // 200 => success
            return res.data
        } else {
            throw new Error (`Error ${res.status}: ${res.statusText}`);
        }
    }
);

export const editTodo = asyncActionCreator<[string, Todo], Todo, Error>(
    'EDIT_TODO',
    async(params: [string, Todo], _dispatch: Dispatch) => {

        const res = await axios.patch(`/todos/${params[0]}.json`, {
            title: params[1].title,
            memo: params[1].memo,
            status: params[1].status,
            due: params[1].due
        },
        {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'PUT, DELETE, PATCH'
            }
        })

        if (res.status === 200) {
            return res.data
        } else {
            throw new Error (`Error ${res.status}: ${res.statusText}`);
        }
    }
)

export const fetchTodos = asyncActionCreator<{}, Todo[], Error>(
    'FETCH_TODOS',
    async() => {

        const res = await axios.get('/todos.json')

        if (res.status === 200) {
            return res.data
        } else {
            throw new Error (`Error ${res.status}: ${res.statusText}`);
        }
    }
)

export const loadTodo = asyncActionCreator<string, Todo, Error>(
    'LOAD_TODO',
    async (id: string, _dispatch: Dispatch) => {
        const res = await axios.get(`/todos/${id}.json`, {
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        })

        if ( res.status === 200) {
            return res.data
        } else {
            throw new Error (`Error ${res.status}: ${res.statusText}`);
        }
    }
)

export const deleteTodo = asyncActionCreator<string, void, Error>(
    'DELETE_TODO',
    async(id: string , _dispatch: Dispatch) => {

        const res = await axios.delete(`/todos/${[id]}.json`)

        if (res.status === 200) {
            return res.data

        } else {
            throw new Error (`Error ${res.status}: ${res.statusText}`);
        }
    }
)