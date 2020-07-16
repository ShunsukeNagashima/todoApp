import React from 'react';
import {NavLink} from 'react-router-dom';

import '../../../App.css';


const Links = () => {
  return (
    <ul className="header__list">
      <li className="header__item">
          <NavLink
              className="header__link"
              to='/new'
              exact
              activeStyle={{
                  color: '#fa923f',
                  textDecoration: 'underline'
              }}>
              New Todo
          </NavLink>
      </li>
      <li className="header__item">
          <NavLink
              className="header__link"
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
  )
};

export default Links;