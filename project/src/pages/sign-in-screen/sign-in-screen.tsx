import { FormEvent, useState, ChangeEvent } from 'react';
import {Helmet} from 'react-helmet-async';
import Footer from '../../components/footer/footer';
import Logo from '../../components/logo/logo';
import { useAppDispatch } from '../../hooks';
import { loginAction } from '../../store/api-actions';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../const';

function SignIn(): JSX.Element {

  const dispatch = useAppDispatch();
  const redirect = useNavigate();

  const [authData, setAuthData] = useState({
    login: '',
    password: '',
  });

  const onChange = ({target}: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    setAuthData({...authData, [target.name]: target.value});
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (authData !== null) {
      dispatch(loginAction({
        login: authData.login,
        password: authData.password,
      }));
      redirect(AppRoute.Main);
    }
  };

  return (
    <div className="user-page">
      <Helmet>
        <title>WTW Авторизация</title>
      </Helmet>
      <header className="page-header user-page__head">
        <Logo/>

        <h1 className="page-title user-page__title">Sign in</h1>
      </header>

      <div className="sign-in user-page__content">
        <form action="#" className="sign-in__form" onSubmit={handleSubmit}>
          <div className="sign-in__fields">
            <div className="sign-in__field">
              <input
                className="sign-in__input"
                type="email" placeholder="Email address"
                name="login" id="user-email"
                onChange={onChange}
              />
              <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
            </div>
            <div className="sign-in__field">
              <input
                className="sign-in__input"
                type="password" placeholder="Password"
                name="password"
                id="user-password"
                onChange={onChange}
              />
              <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
            </div>
          </div>
          <div className="sign-in__submit">
            <button className="sign-in__btn" type="submit">Sign in</button>
          </div>
        </form>
      </div>

      <Footer/>
    </div>
  );
}

export default SignIn;
