import React from 'react'
import TodoList from '../components/TodoList';
import { Route, NavLink, Switch } from 'react-router-dom';
import { AppState } from '../store/store';
import { connect } from 'react-redux';
import { Action } from 'redux';
import { storeTodo, fetchTodos, loadTodo, editTodo, deleteTodo} from '../store/actions';
import { Todo } from '../todo.model';
import { ThunkDispatch } from 'redux-thunk';
import  classes from '../App.module.css';
import FullTodo from '../components/FullTodo';
import NewTodo from '../components/NewTodo';

type AppProps = AppState & ReturnType<typeof mapDispatchToProps>

class TodoContainer extends React.Component<AppProps> {

    componentDidMount() {
        this.props.onFetchTodos();
    }

    render () {
        return (
            <div className={classes.container}>
                <header className={classes.header}>
                    <ul className={classes.header__list}>
                        <li className={classes.header__item}>
                            <NavLink
                                className={classes.header__link}
                                to='/new'
                                exact
                                activeStyle={{
                                    color: '#fa923f',
                                    textDecoration: 'underline'
                                }}>
                                New Todo
                            </NavLink>
                        </li>
                        <li className={classes.header__item}>
                            <NavLink
                                className={classes.header__link}
                                to='/'
                                exact
                                activeStyle={{
                                    color: '#fa923f',
                                    textDecoration: 'underline'
                                }}>
                                Todos
                            </NavLink>
                        </li>
                    </ul>
                </header>
                <Switch>
                    <Route path="/todos/:id" exact render={() => <FullTodo onLoadTodo={this.props.onLoadTodo} onEditTodo={this.props.onEditTodo} onDeleteTodo={this.props.onDeleteTodo}/>} />
                    <Route path="/new" render={() => <NewTodo onAddTodo={this.props.onStoreTodo}/>}/>
                    <Route path="/" render={() => <TodoList todos={this.props.todos} />} />
                </Switch>
            </div>
        )
    }
}

const mapStateToProps = (state: AppState) => {
    return {
        todos: Object.assign([], state.todos)
    }
};

const mapDispatchToProps = (dispatch: ThunkDispatch<AppState,{}, Action<Todo>>) => {
return {
    onStoreTodo: (todo: Todo) => dispatch(storeTodo.action(todo)),
    onFetchTodos: () => dispatch(fetchTodos.action()),
    onLoadTodo: (id: string) => dispatch(loadTodo.action(id)),
    onEditTodo: (id: string, todo: Todo) => dispatch(editTodo.action([id, todo])),
    onDeleteTodo: (id: string) => dispatch(deleteTodo.action(id))
}

}

export default connect(mapStateToProps, mapDispatchToProps)(TodoContainer);