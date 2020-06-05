import React from 'react';
import './App.module.css';
import TodoList from './components/TodoList';
import NewTodo from './components/NewTodo';
import { AppState } from './store/store';
import { connect } from 'react-redux';
import { Action } from 'typescript-fsa';
import { Actions } from './store/actions';
import { Dispatch } from 'redux';
import { Todo } from './todo.model';
import classes from './App.module.css';

export interface NewTodoActions {
  onAddTodo: (todo: Todo) => Action<Todo>
}
export interface TodoListActions {
  onDeleteTodo: (id: string) => Action<string>
}

type AppProps = AppState & NewTodoActions & TodoListActions

class App extends React.Component<AppProps>  {
  render() {
    return (
      <div className={classes.container}>
        <NewTodo onAddTodo={this.props.onAddTodo}/>
        <TodoList
          todos={this.props.todos}
          onDeleteTodo={this.props.onDeleteTodo} />
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => {
  return {
      todos: Object.assign([], state.todos)
  }
};

const mapDispatchToProps = (dispatch: Dispatch<Action<Todo | string>>) => {
  return {
      onAddTodo: (todo: Todo) => dispatch(Actions.addTodo(todo)),
      onDeleteTodo: (id: string) => dispatch(Actions.deleteTodo(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
