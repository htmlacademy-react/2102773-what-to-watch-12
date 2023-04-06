import { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import {Film} from '../../types/film';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import FilmTabs from '../../components/film-tabs/film-tabs';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchFilmByIdAction, fetchCommentsByIdAction, fetchSimilarByIdAction } from '../../store/api-actions';
import { authorizationStatusSelector, reviewsSelector, movieSelector, similarFilmsSelector } from '../../store/selectors';
import LoadingScreen from '../loading-screen/loading-screen';
import DefaultLoader from '../../components/loader/loader';
import SimilarFilms from '../../components/similar-films/similar-films';

type MoviePageProps = {
  films: Film[];
}

function MoviePage(props: MoviePageProps): JSX.Element {

  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const movieInfo = useAppSelector(movieSelector);
  const filmReviews = useAppSelector(reviewsSelector);
  const similarFilms = useAppSelector(similarFilmsSelector);
  const authorizationStatus = useAppSelector(authorizationStatusSelector);

  useEffect(() => {
    if (!movieInfo.isError) {
      dispatch(fetchFilmByIdAction(String(params.id)));
      dispatch(fetchCommentsByIdAction(String(params.id)));
      dispatch(fetchSimilarByIdAction(String(params.id)));
    }
  }, [dispatch, movieInfo.isError, params.id]);

  // исправить
  const favoriteFilms = props.films.filter((film) => film.isFavorite);
  //

  if (movieInfo.data === null) {
    return <LoadingScreen/>;
  }

  return (
    <>
      <section className="film-card film-card--full">
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img src={movieInfo.data.backgroundImage} alt={movieInfo.data.name} />
          </div>

          <h1 className="visually-hidden">WTW</h1>
          <Header/>
          <div className="film-card__wrap">
            <div className="film-card__desc">
              <h2 className="film-card__title">{movieInfo.data.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{movieInfo.data.genre}</span>
                <span className="film-card__year">{movieInfo.data.released}</span>
              </p>

              <div className="film-card__buttons">
                <button className="btn btn--play film-card__button" type="button" onClick={() => navigate(`/player/${String(movieInfo.data?.id)}`)}>
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                <button className="btn btn--list film-card__button" type="button">
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add"></use>
                  </svg>
                  <span>My list</span>
                  <span className="film-card__count">{favoriteFilms.length}</span>
                </button>
                {authorizationStatus === AuthorizationStatus.Auth ?
                  <Link to={`${AppRoute.AddReview}`} className="btn film-card__button">Add review</Link>
                  : null}
              </div>
            </div>
          </div>
        </div>

        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <div className="film-card__poster film-card__poster--big">
              <img src={movieInfo.data.posterImage} alt={movieInfo.data.name} width="218" height="327" />
            </div>
            {movieInfo.isLoading ? <DefaultLoader/> : <FilmTabs film={movieInfo.data} filmReviews={filmReviews.data}/>}
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>

          <div className="catalog__films-list">
            {similarFilms.isLoading ? <DefaultLoader/> : <SimilarFilms similarFilms={similarFilms} movieInfo={movieInfo}/>}
          </div>
        </section>

        <Footer/>
      </div>
    </>
  );
}

export default MoviePage;
