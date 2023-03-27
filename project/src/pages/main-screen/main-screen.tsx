import {Helmet} from 'react-helmet-async';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import {Film} from '../../types/film';
import GenresList from '../../components/genres-list/genres-list';


type MainScreenProps = {
  filmCardTitle: string;
  filmCardGenre: string;
  filmCardYear: number;
  films: Film[];
}

function MainScreen(props: MainScreenProps): JSX.Element {

  const favoriteFilms = props.films.filter((film) => film.isFavorite);

  return (
    <>
      <Helmet>
        <title>WTW Главная страница</title>
      </Helmet>
      <section className="film-card">
        <div className="film-card__bg">
          <img src="img/bg-the-grand-budapest-hotel.jpg" alt="The Grand Budapest Hotel" />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <Header/>

        <div className="film-card__wrap">
          <div className="film-card__info">
            <div className="film-card__poster">
              <img src="img/the-grand-budapest-hotel-poster.jpg" alt={props.filmCardTitle} width="218" height="327" />
            </div>

            <div className="film-card__desc">
              <h2 className="film-card__title">{props.filmCardTitle}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{props.filmCardGenre}</span>
                <span className="film-card__year">{props.filmCardYear}</span>
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
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>
          <GenresList films={props.films}/>
        </section>

        <Footer/>

      </div>
    </>
  );
}

export default MainScreen;
