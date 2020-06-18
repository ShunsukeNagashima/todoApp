import React, { useEffect, useState } from 'react';
import { AppState } from '../store/store';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import classes from '../App.module.css';
import classNames from 'classnames';

type TodoListProps = AppState & RouteComponentProps<{id: string}>

const TodoList: React.FC<TodoListProps> = (props: TodoListProps) => {

        const [formatedDate, setFormatedDate] = useState<number>(0);

        useEffect(() => {
            const today = new Date();
            const yyyy = today.getFullYear();
            const mm = (today.getMonth() + 1).toString().padStart(2, '0');
            const dd = today.getDate().toString().padStart(2, '0');

            setFormatedDate(parseInt(`${yyyy}${mm}${dd}`))
        }, [])

        const activeList = props.todos.filter(todo => todo.status !== 'completed');
        const finishedList = props.todos.filter(todo => todo.status === 'completed');

        const styleForH1 = classNames(
            classes.heading1,
            classes.mg_bottom_small
        );


        const todoSelectedHandler = ( id: string | undefined ) => {
            if ( typeof id === 'undefined') {
                throw new Error ('YOU SHOULD CHOOSE EXISISTED TODO');
            }
            props.history.push('/todos/' + id);
        }

        return (
            <div className={classes.todoList}>
                <div className={classes.activeList}>
                <h1 className={styleForH1}>TODO</h1>
                    <ul>
                        {activeList.map(listEl =>
                            <li key={listEl.id}
                                onClick={() => todoSelectedHandler(listEl.id)}
                                className={classNames(
                                    listEl.status === 'active'? classes.activeList__item: classes.nonActiveItem,
                                    parseInt(listEl.due) < formatedDate ? classes.expired : null)
                                }>
                                <p className={classes.finishedList__link}>{listEl.title.length > 20 ? `${listEl.title.slice(0, 19)}...` : listEl.title}</p>
                                <p className={classes.activeList__due}>
                                    {`${listEl.due.slice(0,4)}/${listEl.due.slice(4,6)}/${listEl.due.slice(6,8)}`}
                                </p>
                            </li>
                        )}
                    </ul>
                </div>

                <div className={classes.finishedList}>
                    <h1 className={styleForH1}>FINISHED</h1>
                    <ul>
                        {finishedList.map(listEl =>
                            <li key={listEl.id} onClick={() => todoSelectedHandler(listEl.id)} className={classes.finishedList__item}>
                                <p className={classes.finishedList__link}>{listEl.title.length > 20 ? `${listEl.title.slice(0, 19)}...` : listEl.title}</p>
                                <p className={classes.finishedList__due}>
                                    {`${listEl.due.slice(0,4)}/${listEl.due.slice(4,6)}/${listEl.due.slice(6,8)}`}
                                </p>
                            </li>
                        )}
                    </ul>
                </div>
            </div>

        );
};


export default withRouter(TodoList);