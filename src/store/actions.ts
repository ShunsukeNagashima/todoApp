import actionCreatorFactory from 'typescript-fsa';
import { Todo } from '../todo.model';

const actionCreator = actionCreatorFactory();

export const Actions = {
    addTodo: actionCreator<Todo>('ADDTODO'),
    deleteTodo: actionCreator<string>('DELETETODO')
}