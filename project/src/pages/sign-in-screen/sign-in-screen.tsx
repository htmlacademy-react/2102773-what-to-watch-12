import { FormEvent, useState, ChangeEvent, useEffect } from 'react';
import {Helmet} from 'react-helmet-async';
import Footer from '../../components/footer/footer';
import Logo from '../../components/logo/logo';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { loginAction } from '../../store/api-actions';
import { useNavigate } from 'react-router-dom';
import { AuthorizationStatus, AppRoute } from '../../const';
import { getAuthorizationStatus, getLoginError } from '../../store/user-process/selectors';
import cn from 'classnames';
import { setLoginError } from '../../store/user-process/user-process';

function SignIn(): JSX.Element {

  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const loginError = useAppSelector(getLoginError);
  const redirect = useNavigate();

  useEffect(() => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      redirect(AppRoute.Main);
    }
  }, [authorizationStatus, redirect]);

  const [authData, setAuthData] = useState({
    login: '',
    password: '',
  });

  const onChange = ({target}: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    setAuthData({...authData, [target.name]: target.value});
  };

  const validPassword = /^(?=.*\d)(?=.*[A-Za-z])(?!.*\s).*$/;

  const [isValidError, setValidError] = useState(false);

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (validPassword.test(authData.password)) {
      setValidError(false);
      dispatch(loginAction({
        login: authData.login,
        password: authData.password,
      }));
      dispatch(setLoginError({isError: false}));
    }
    else {
      setValidError(true);
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
          {isValidError &&
          <div className="sign-in__message">
            <p>Please enter a valid password</p>
          </div>}
          {loginError &&
          <div className="sign-in__message">
            <p>Please enter a valid email address</p>
          </div>}
          <div className="sign-in__fields">
            <div className={cn('sign-in__field', {'sign-in__field--error' : loginError})}>
              <input
                className="sign-in__input"
                type="email" placeholder="Email address"
                name="login" id="user-email"
                onChange={onChange}
              />
              <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
            </div>
            <div className={cn('sign-in__field', {'sign-in__field--error' : isValidError})}>
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
