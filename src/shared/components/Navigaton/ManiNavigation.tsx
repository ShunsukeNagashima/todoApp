import React from 'react';

import MainHeader from './MainHeader';
import Links from './Links';

type MainNavProps = {
  className?: string
}

const MainNavigation = (props: MainNavProps) => {
  return (
    <React.Fragment>
      <MainHeader>
        <Links />
      </MainHeader>
    </React.Fragment>
  );
};


export default MainNavigation