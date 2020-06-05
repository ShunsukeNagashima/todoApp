import React from 'react';
import { AppState } from '../store/store';
import { TodoListActions } from '../App';
import classes from '../App.module.css';


type TodoListProps = AppState & TodoListActions

const TodoList: React.FC<TodoListProps> = (props: TodoListProps) => {


        const activeList = props.todos.filter(todo => todo.isCompleted === false)
        const finishedList = props.todos.filter(todo => todo.isCompleted)
        return (
            <div className={classes.todoList}>
                <div className={classes.activeList}>
                <h1>TODO</h1>
                    <ul>
                        {activeList.map(listEl =>
                            <li key={listEl.id}>
                                <a href="#">{listEl.title}</a> <span>until {listEl.due}</span>
                                <button onClick={() => props.onDeleteTodo(listEl.id)}>DELETE</button>
                            </li>
                        )}
                    </ul>
                </div>

                <div className={classes.finishedList}>
                    <h1>FINISHED</h1>
                    <ul>
                        {finishedList.map(listEl =>
                            <li key={listEl.id}>
                                <a href="#">{listEl.title}</a> <span>until {listEl.due}</span>
                                <button onClick={() => props.onDeleteTodo(listEl.id)}>DELETE</button>
                            </li>
                        )}
                    </ul>
                </div>
            </div>

        );
};

export default TodoList;