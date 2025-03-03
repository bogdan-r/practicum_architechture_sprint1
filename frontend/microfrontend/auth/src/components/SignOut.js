export default function SignOut() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  function handleSignOut() {
    // при вызове обработчика onSignOut происходит удаление jwt
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    // После успешного вызова обработчика onSignOut происходит редирект на /signin
    history.push("/signin");
  }

  return (
    <div className="header__wrapper">
      <p className="header__user">{ email }</p>
      <button className="header__logout" onClick={handleSignOut}>Выйти</button>
    </div>
  );
}