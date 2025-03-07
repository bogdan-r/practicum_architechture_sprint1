import React from 'react';
import { CurrentUserContext } from '../../../../src/contexts/CurrentUserContext';
import api from '../../utils/api';
import { useHistory } from 'react-router-dom';

export default function Profile({onAddPlace}) {
  const currentUser = React.useContext(CurrentUserContext);

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleUpdateUser(userUpdate) {
    api
      .setUserInfo(userUpdate)
      .then((newUserData) => {
        setCurrentUser(newUserData);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateAvatar(avatarUpdate) {
    api
      .setUserAvatar(avatarUpdate)
      .then((newUserData) => {
        setCurrentUser(newUserData);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  const history = useHistory();

  // Запрос к API за информацией о пользователе и массиве карточек выполняется единожды, при монтировании.
  React.useEffect(() => {
    api
      .getAppInfo()
      .then(([cardData, userData]) => {
        setCurrentUser(userData);
        setCards(cardData);
      })
      .catch((err) => console.log(err));
  }, []);

  // при монтировании App описан эффект, проверяющий наличие токена и его валидности
  React.useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      auth
        .checkToken(token)
        .then((res) => {
          setEmail(res.data.email);
          setIsLoggedIn(true);
          history.push("/");
        })
        .catch((err) => {
          localStorage.removeItem("jwt");
          console.log(err);
        });
    }
  }, [history]);

  const imageStyle = { backgroundImage: `url(${currentUser.avatar})` };

  return (
    <>
    <section className="profile page__section">
      <div className="profile__image" onClick={handleEditAvatarClick} style={imageStyle}></div>
      <div className="profile__info">
        <h1 className="profile__title">{currentUser.name}</h1>
        <button className="profile__edit-button" type="button" onClick={handleEditProfileClick}></button>
        <p className="profile__description">{currentUser.about}</p>
      </div>
      <button className="profile__add-button" type="button" onClick={onAddPlace}></button>
    </section>
    <EditProfilePopup
      isOpen={isEditProfilePopupOpen}
      onUpdateUser={handleUpdateUser}
      onClose={closeAllPopups}
    />
        
    <EditAvatarPopup
      isOpen={isEditAvatarPopupOpen}
      onUpdateAvatar={handleUpdateAvatar}
      onClose={closeAllPopups}
    />
    </>
  );
}