import {Helmet} from 'react-helmet-async';
import Avatar from '../../components/avatar/avatar';
import Logo from '../../components/logo/logo';
import { Link, useParams } from 'react-router-dom';
import AddReviewForm from '../../components/add-review-form/add-review-form';
import {AppRoute} from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchFilmByIdAction } from '../../store/api-actions';
import { useEffect } from 'react';
import PageNotFound from '../../components/page-not-found/page-not-found';
import LoadingScreen from '../loading-screen/loading-screen';
import { movieSelector } from '../../store/data/selectors';

function AddReview(): JSX.Element {

  const dispatch = useAppDispatch();
  const params = useParams();
  const movieInfo = useAppSelector(movieSelector);

  useEffect(() => {
    !movieInfo.isError && dispatch(fetchFilmByIdAction(String(params.id)));
  }, [dispatch, movieInfo.isError, params.id]);

  if (movieInfo.isError) {
    return <PageNotFound/>;
  }

  if (movieInfo.data === null) {
    return <LoadingScreen/>;
  }

  return (
    <section className="film-card film-card--full">
      <Helmet>
        <title>WTW Новый комментарий</title>
      </Helmet>

      <div className="film-card__header">
        <div className="film-card__bg">
          <img src={movieInfo.data.backgroundImage} alt={movieInfo.data.name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header">

          <Logo/>

          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <Link className="breadcrumbs__link" to={`${AppRoute.Films}${String(movieInfo.data.id)}`}>{movieInfo.data.name}</Link>
              </li>
              <li className="breadcrumbs__item">
                <Link to='' className="breadcrumbs__link">Add review</Link>
              </li>
            </ul>
          </nav>

          <Avatar/>
        </header>

        <div className="film-card__poster film-card__poster--small">
          <img src={movieInfo.data.posterImage} alt={movieInfo.data.name} width="218" height="327" />
        </div>
      </div>
      <div className="rating">
        <div className="add-review">
          <AddReviewForm filmId={String(movieInfo.data.id)}/>
        </div>
      </div>

    </section>
  );
}

export default AddReview;
