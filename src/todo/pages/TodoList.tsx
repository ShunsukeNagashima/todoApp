import React, { useEffect, useState } from 'react';
import { AppState } from '../../store/store';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import Spinner from '../../shared/components/UIElements/Spinner';
import '../../App.css';
import classNames from 'classnames';


type TodoListProps =  AppState & RouteComponentProps<{id: string}>

const TodoList: React.FC<TodoListProps> = (props: TodoListProps) => {

        const [formatedDate, setFormatedDate] = useState<number>(0);

        useEffect(() => {
            const today = new Date();
            const yyyy = today.getFullYear();
            const mm = (today.getMonth() + 1).toString().padStart(2, '0');
            const dd = today.getDate().toString().padStart(2, '0');

            setFormatedDate(parseInt(`${yyyy}${mm}${dd}`))
        }, [])

        const todoSelectedHandler = ( id: string | undefined ) => {
            if ( typeof id === 'undefined') {
                throw new Error ('YOU SHOULD CHOOSE EXISISTED TODO');
            }
            props.history.push('/todos/' + id);
        }

        const activeList = props.todos.filter(todo => todo.status !== 'completed');
        const finishedList = props.todos.filter(todo => todo.status === 'completed');

        if(props.loading) {
            return (
                <div className="todoList">
                    <Spinner />
                </div>
            )
        }


        return (
            <div className="todoList">
                <div className="activeList">
                <h1 className="heading1 mg_bottom_small">TODO</h1>
                    <ul>
                        {activeList.map(listEl =>
                            <li key={listEl.id}
                                onClick={() => todoSelectedHandler(listEl.id)}
                                className={classNames(
                                    listEl.status === 'active'? "activeList__item": "nonActiveItem",
                                    parseInt(listEl.due) < formatedDate ? "expired" : null)
                                }>
                                <p className="finishedList__link">{listEl.title.length > 20 ? `${listEl.title.slice(0, 19)}...` : listEl.title}</p>
                                <p className="activeList__due">
                                    {`${listEl.due.slice(0,4)}/${listEl.due.slice(4,6)}/${listEl.due.slice(6,8)}`}
                                </p>
                            </li>
                        )}
                    </ul>
                </div>
                <div className="finishedList">
                <h1 className="heading1 mg_bottom_small">FINISHED</h1>
                    <ul>
                        {finishedList.map(listEl =>
                            <li key={listEl.id} onClick={() => todoSelectedHandler(listEl.id)} className="finishedList__item">
                                <p className="finishedList__link">{listEl.title.length > 20 ? `${listEl.title.slice(0, 19)}...` : listEl.title}</p>
                                <p className="finishedList__due">
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