import React from 'react';
import { BrowserRouter, Switch, Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import { Todo } from './todo.model';
import { AppState} from './store/store';
import { storeTodo, fetchTodos, loadTodo, editTodo, deleteTodo} from './store/actions';
import NewTodo from './todo/pages/NewTodo';
import UpdateTodo from './todo/pages/UpdateTodo';
import TodoList from './todo/pages/TodoList';
import MainNavigation from './shared/components/Navigaton/ManiNavigation';

import './App.css';

type AppProps = AppState & ReturnType<typeof mapDispatchToProps>

class App extends React.Component<AppProps>  {

  componentDidMount() {
    this.props.onFetchTodos();
  }

  render() {
    return (
      <BrowserRouter>
        <MainNavigation />
        <main className="container">
          <Switch>
              <Route path="/todos/:id" exact>
                <UpdateTodo
                  loading={this.props.loading}
                  onLoadTodo={this.props.onLoadTodo}
                  onEditTodo={this.props.onEditTodo}
                  onDeleteTodo={this.props.onDeleteTodo}/>
              </Route>
              <Route path="/new" exact>
                <NewTodo onAddTodo={this.props.onStoreTodo} loading={this.props.loading} />
              </Route>
              <Route path="/" exact render={() => <TodoList loading={this.props.loading} todos={this.props.todos} />} />
              <Redirect to="/"/>
          </Switch>
        </main>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state: AppState) => {
  return {
      todos: Object.assign([], state.todos),
      loading: state.loading
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


export default connect(mapStateToProps, mapDispatchToProps)(App);
