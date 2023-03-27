import { PropsWithChildren } from 'react';

function Header(props: PropsWithChildren): JSX.Element {
  return (
    <header className="page-header user-page__head">
      {props.children}
    </header>
  );
}

export default Header;
