import React, {FunctionComponent} from 'react';
import '../../../App.css';

const MainHeader:FunctionComponent = (props) => {
  return (
    <header className="header">
      {props.children}
    </header>
  );
};

export default MainHeader;
