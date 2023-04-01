import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { AppRoute, AuthorizationStatus, SIMILAR_FILMS_COUNT } from '../../const';
import {Film} from '../../types/film';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import FilmTabs from '../../components/film-tabs/film-tabs';
import MovieCard from '../../components/movie-card/movie-card';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchFilmByIdAction, fetchCommentsByIdAction, fetchSimilarByIdAction } from '../../store/api-actions';
import { loadFilmById } from '../../store/action';

type MoviePageProps = {
  films: Film[];
}

function MoviePage(props: MoviePageProps): JSX.Element {

  const params = useParams();
  const navigate = useNavigate();
  const isFilmLoadingError = useAppSelector((state) => state.isFilmLoadingError);
  const dispatch = useAppDispatch();

  useEffect(() => {

    dispatch(fetchFilmByIdAction(String(params.id)));
    dispatch(fetchCommentsByIdAction(String(params.id)));
    dispatch(fetchSimilarByIdAction(String(params.id)));

    return () => {
      dispatch(loadFilmById(undefined));
    };

  }, [dispatch, isFilmLoadingError, navigate, params.id]);

  const movieInfo = useAppSelector((state) => state.film);
  const filmReview = useAppSelector((state) => state.comments);
  const similarFilms = useAppSelector((state) => state.similarFilms);

  // исправить

  const favoriteFilms = props.films.filter((film) => film.isFavorite);

  //

  const [activeCardId, setActiveCardId] = useState<number | null>(null);

  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);

  return (
    <>
      <section className="film-card film-card--full">
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img src={movieInfo?.backgroundImage} alt={movieInfo?.name} />
          </div>

          <h1 className="visually-hidden">WTW</h1>
          <Header/>
          <div className="film-card__wrap">
            <div className="film-card__desc">
              <h2 className="film-card__title">{movieInfo?.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{movieInfo?.genre}</span>
                <span className="film-card__year">{movieInfo?.released}</span>
              </p>

              <div className="film-card__buttons">
                <button className="btn btn--play film-card__button" type="button" onClick={() => navigate(`/player/${String(movieInfo?.id)}`)}>
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
              <img src={movieInfo?.posterImage} alt={movieInfo?.name} width="218" height="327" />
            </div>
            <FilmTabs film={movieInfo} filmReview={filmReview}/>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>

          <div className="catalog__films-list">
            {similarFilms.length > 1 ? similarFilms.slice(0, SIMILAR_FILMS_COUNT).map((film) => (
              movieInfo?.id !== film.id &&
                <article className="small-film-card catalog__films-card" key={film.id}>
                  <MovieCard film={film} isActive={film.id === activeCardId} onMouseLeave={() => setActiveCardId(null)} onMouseOver={() => setActiveCardId(film.id)}/>
                </article>
            )
            ) : 'No similar films'}
          </div>
        </section>

        <Footer/>
      </div>
    </>
  );
}

export default MoviePage;
