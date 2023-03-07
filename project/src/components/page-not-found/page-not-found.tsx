import {Link} from 'react-router-dom';
import {Helmet} from 'react-helmet-async';
import {AppRoute} from '../../const';
import Footer from '../footer/footer';
import Logo from '../logo/logo';

function PageNotFound(): JSX.Element {
  return (

    <div className="user-page">
      <Helmet>
        <title>WTW Страница не найдена</title>
      </Helmet>
      <header className="page-header user-page__head">
        <Logo/>
      </header>
      <section className="catalog">
        <h1>
          404.
          <br />
          <br />
          <small>Page not found</small>
        </h1>
        <Link to={AppRoute.Main}>Go to main page</Link>
      </section>

      <Footer />
    </div>
  );
}

export default PageNotFound;
