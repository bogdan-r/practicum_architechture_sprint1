import React from 'react';
import { CurrentUserContext } from '../../../../src/contexts/CurrentUserContext';
import Profile from '../../../profile/src/components/Profile';
import Places from '../../../places/src/components/Places';

function Main() {
  const currentUser = React.useContext(CurrentUserContext);


  return (
    <main className="content">
      <Profile />
      <Places />
    </main>
  );
}

export default Main;
