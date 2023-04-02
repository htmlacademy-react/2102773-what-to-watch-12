import {Helmet} from 'react-helmet-async';
import Avatar from '../../components/avatar/avatar';
import Logo from '../../components/logo/logo';
import { Link, useParams } from 'react-router-dom';
import AddReviewForm from '../../components/add-review-form/add-review-form';
import {AppRoute} from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchFilmByIdAction } from '../../store/api-actions';
import { useEffect } from 'react';

function AddReview(): JSX.Element {

  const dispatch = useAppDispatch();
  const params = useParams();

  useEffect(() => {
    dispatch(fetchFilmByIdAction(String(params.id)));
  }, [dispatch, params.id]);

  const movieInfo = useAppSelector((state) => state.film);

  return (
    <section className="film-card film-card--full">
      <Helmet>
        <title>WTW Новый комментарий</title>
      </Helmet>

      <div className="film-card__header">
        <div className="film-card__bg">
          <img src={movieInfo?.backgroundImage} alt={movieInfo?.name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header">

          <Logo/>

          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <Link className="breadcrumbs__link" to={`${AppRoute.Films}${String(movieInfo?.id)}`}>{movieInfo?.name}</Link>
              </li>
              <li className="breadcrumbs__item">
                <a className="breadcrumbs__link">Add review</a>
              </li>
            </ul>
          </nav>

          <Avatar/>
        </header>

        <div className="film-card__poster film-card__poster--small">
          <img src={movieInfo?.posterImage} alt={movieInfo?.name} width="218" height="327" />
        </div>
      </div>
      <div className="rating">
        <div className="add-review">
          <AddReviewForm filmId={String(movieInfo?.id)}/>
        </div>
      </div>

    </section>
  );
}

export default AddReview;
