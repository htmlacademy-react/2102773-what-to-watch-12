import {useState} from 'react';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import {Films} from '../../types/film';
import { Link, useParams } from 'react-router-dom';
import { AppRoute, MoviePageState } from '../../const';
import { FilmReviews } from '../../types/review';
import FilmDetailsList from '../../components/film-details/film-details';
import FilmReviewsList from '../../components/film-reviews/film-reviews';
import FilmOverviewList from '../../components/film-overview/film-overview';

type MoviesPageProps = {
  films: Films;
  filmReviews: FilmReviews[];
}

function MoviePage(props: MoviesPageProps): JSX.Element {
  const params = useParams();
  const [movieInfo] = props.films.filter((film) => film.id === Number(params.id));
  const favoriteFilms = props.films.filter((film) => film.isFavorite);

  const [state, setState] = useState('overview');

  function setPageState () {
    switch (state) {
      case MoviePageState.Overview:
        return <FilmOverviewList films={props.films}/>;
      case MoviePageState.Reviews:
        return <FilmReviewsList filmReviews={props.filmReviews}/>;
      case MoviePageState.Details:
        return <FilmDetailsList films={props.films}/>;
    }
  }

  return (
    <>
      <section className="film-card film-card--full">
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img src={movieInfo.backgroundImage} alt={movieInfo.name} />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <Header/>

          <div className="film-card__wrap">
            <div className="film-card__desc">
              <h2 className="film-card__title">{movieInfo.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{movieInfo.genre}</span>
                <span className="film-card__year">{movieInfo.released}</span>
              </p>

              <div className="film-card__buttons">
                <button className="btn btn--play film-card__button" type="button">
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
                <Link to={`${AppRoute.AddReview}`} className="btn film-card__button">Add review</Link>
              </div>
            </div>
          </div>
        </div>

        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <div className="film-card__poster film-card__poster--big">
              <img src={movieInfo.posterImage} alt={movieInfo.name} width="218" height="327" />
            </div>

            <div className="film-card__desc">
              <nav className="film-nav film-card__nav">
                <ul className="film-nav__list">
                  <li className="film-nav__item film-nav__item--active">
                    <Link className="film-nav__link" onClick={() => setState(MoviePageState.Overview)} to=''>Overview</Link>
                  </li>
                  <li className="film-nav__item">
                    <Link className="film-nav__link" onClick={() => setState(MoviePageState.Details)} to=''>Details</Link>
                  </li>
                  <li className="film-nav__item">
                    <Link className="film-nav__link" onClick={() => setState(MoviePageState.Reviews)} to=''>Reviews</Link>
                  </li>
                </ul>
              </nav>
              {setPageState()}
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>

          <div className="catalog__films-list">
            <article className="small-film-card catalog__films-card">
              <div className="small-film-card__image">
                <img src="img/fantastic-beasts-the-crimes-of-grindelwald.jpg" alt="Fantastic Beasts: The Crimes of Grindelwald" width="280" height="175" />
              </div>
              <h3 className="small-film-card__title">
                <a className="small-film-card__link" href="film-page.html">Fantastic Beasts: The Crimes of Grindelwald</a>
              </h3>
            </article>

            <article className="small-film-card catalog__films-card">
              <div className="small-film-card__image">
                <img src="img/bohemian-rhapsody.jpg" alt="Bohemian Rhapsody" width="280" height="175" />
              </div>
              <h3 className="small-film-card__title">
                <a className="small-film-card__link" href="film-page.html">Bohemian Rhapsody</a>
              </h3>
            </article>

            <article className="small-film-card catalog__films-card">
              <div className="small-film-card__image">
                <img src="img/macbeth.jpg" alt="Macbeth" width="280" height="175" />
              </div>
              <h3 className="small-film-card__title">
                <a className="small-film-card__link" href="film-page.html">Macbeth</a>
              </h3>
            </article>

            <article className="small-film-card catalog__films-card">
              <div className="small-film-card__image">
                <img src="img/aviator.jpg" alt="Aviator" width="280" height="175" />
              </div>
              <h3 className="small-film-card__title">
                <a className="small-film-card__link" href="film-page.html">Aviator</a>
              </h3>
            </article>
          </div>
        </section>

        <Footer/>
      </div>
    </>
  );
}

export default MoviePage;
