import {Link} from 'react-router-dom';
import {Helmet} from 'react-helmet-async';
import {AppRoute} from '../../const';
import { useAppDispatch } from '../../hooks';
import { setFilmLoadingError } from '../../store/action';

function PageNotFound(): JSX.Element {

  const dispatch = useAppDispatch();
  return (

    <div className="user-page">
      <Helmet>
        <title>WTW Страница не найдена</title>
      </Helmet>
      <header className="page-header user-page__head">
      </header>
      <section className="catalog">
        <h1>
          404.
          <br />
          <br />
          <small>Page not found</small>
        </h1>
        <Link to={AppRoute.Main} onClick={() => dispatch(setFilmLoadingError(false))}>Go to main page</Link>
      </section>
    </div>
  );
}

export default PageNotFound;
