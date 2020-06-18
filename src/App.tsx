import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.module.css';
import TodoContainer from './containers/TodoContainer';

class App extends React.Component  {

  render() {
    return (
      <BrowserRouter>
        <div>
          <TodoContainer />
        </div>
      </BrowserRouter>
    );
  }
}
export default App;
