import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {Film} from '../../types/film';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import FilmTabs from '../../components/film-tabs/film-tabs';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchFilmByIdAction, fetchCommentsByIdAction, fetchSimilarByIdAction } from '../../store/api-actions';
import LoadingScreen from '../loading-screen/loading-screen';
import DefaultLoader from '../../components/loader/loader';
import SimilarFilms from '../../components/similar-films/similar-films';
import MovieInfo from '../../components/movie-info/movie-info';
import { movieSelector, reviewsSelector, similarFilmsSelector } from '../../store/data/selectors';


type MoviePageProps = {
  favoriteFilms: Film[];
}

function MoviePage(props: MoviePageProps): JSX.Element {

  const params = useParams();
  const dispatch = useAppDispatch();
  const movieInfo = useAppSelector(movieSelector);
  const filmReviews = useAppSelector(reviewsSelector);
  const similarFilms = useAppSelector(similarFilmsSelector);

  useEffect(() => {
    if (!movieInfo.isError) {
      dispatch(fetchFilmByIdAction(String(params.id)));
      dispatch(fetchCommentsByIdAction(String(params.id)));
      dispatch(fetchSimilarByIdAction(String(params.id)));
    }
  }, [dispatch, movieInfo.isError, params.id]);

  const isFavorite = props.favoriteFilms.map((film) => film.id).includes(Number(params.id));

  if (movieInfo.data === null) {
    return <LoadingScreen/>;
  }

  return (
    <>
      <section className="film-card film-card--full">

        <MovieInfo favoriteFilms={props.favoriteFilms} movieInfo={movieInfo.data} isFavorite={isFavorite}>
          <Header/>
        </MovieInfo>

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
