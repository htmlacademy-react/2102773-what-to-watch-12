import {Helmet} from 'react-helmet-async';
import Avatar from '../../components/avatar/avatar';
import Logo from '../../components/logo/logo';
import { Link, useParams } from 'react-router-dom';
import {Films} from '../../types/film';
import AddReviewForm from '../../components/add-review-form/add-review-form';
import {AppRoute} from '../../const';

type AddReviewProps = {
  films: Films;
}

function AddReview(props: AddReviewProps): JSX.Element {
  const params = useParams();
  const [movieInfo] = props.films.filter((film) => film.id === Number(params.id));

  return (
    <section className="film-card film-card--full">
      <Helmet>
        <title>WTW Новый комментарий</title>
      </Helmet>

      <div className="film-card__header">
        <div className="film-card__bg">
          <img src={movieInfo.backgroundImage} alt={movieInfo.name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header">

          <Logo/>

          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <Link className="breadcrumbs__link" to={`${AppRoute.Films}${movieInfo.id}`}>{movieInfo.name}</Link>
              </li>
              <li className="breadcrumbs__item">
                <a className="breadcrumbs__link">Add review</a>
              </li>
            </ul>
          </nav>

          <Avatar/>
        </header>

        <div className="film-card__poster film-card__poster--small">
          <img src={movieInfo.posterImage} alt={movieInfo.name} width="218" height="327" />
        </div>
      </div>
      <AddReviewForm/>
    </section>
  );
}

export default AddReview;
