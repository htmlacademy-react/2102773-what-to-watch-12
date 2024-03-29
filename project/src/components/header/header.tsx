import { Link } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { useAppSelector } from '../../hooks';
import Avatar from '../avatar/avatar';
import Logo from '../logo/logo';
import { getAuthorizationStatus } from '../../store/user-process/selectors';

function Header(): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  return (
    <header className="page-header user-page__head">
      <Logo/>
      {authorizationStatus === AuthorizationStatus.Auth ? <Avatar/> :
        <div className="user-block">
          <Link to={AppRoute.SignIn} className="user-block__link">Sign in</Link>
        </div>}
    </header>
  );
}

export default Header;
