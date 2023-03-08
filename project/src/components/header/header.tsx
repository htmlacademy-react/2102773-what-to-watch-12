import Avatar from '../avatar/avatar';
import Logo from '../logo/logo';

function Header(): JSX.Element {
  return (
    <header className="page-header user-page__head">
      <Logo/>
      <Avatar/>
    </header>
  );
}

export default Header;
