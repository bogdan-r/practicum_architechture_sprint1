import React from "react";
import { Route, useHistory, Switch } from "react-router-dom";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import api from "../../../src/utils/api.js";
import { CurrentUserContext } from "../../../../src/contexts/CurrentUserContext.js";
import Register from "../../../auth/src/components/Register.js";
import Login from "../../../auth/src/components/Login.js";
import ProtectedRoute from "./ProtectedRoute.js";
import * as auth from "../../../auth/src/utils/auth.js";

function App() {

  // В корневом компоненте App создана стейт-переменная currentUser. Она используется в качестве значения для провайдера контекста.
  const [currentUser, setCurrentUser] = React.useState({});

  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  //В компоненты добавлены новые стейт-переменные: email — в компонент App
  const [email, setEmail] = React.useState("");




  function closeAllPopups() {
    // Use PubSub instead of direct state manipulation
    PubSub.publish('closeAllPopups');
  }

  return (
    // В компонент App внедрён контекст через CurrentUserContext.Provider
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page__content">
        <Header email={email} onSignOut={onSignOut} />
        <Switch>
          <ProtectedRoute
            exact
            path="/"
            component={Main}
            loggedIn={isLoggedIn}
          />
          <Route path="/signup">
            <Register />
          </Route>
          <Route path="/signin">
            <Login />
          </Route>
        </Switch>
        <Footer />
        
        
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
