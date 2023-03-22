import {Helmet} from 'react-helmet-async';
import Avatar from '../../components/avatar/avatar';
import Footer from '../../components/footer/footer';
import Logo from '../../components/logo/logo';
import {Film} from '../../types/film';
import MovieCard from '../../components/movie-card/movie-card';
import { useState } from 'react';

type MoviesListProps = {
  films: Film[];
}

function MoviesList(props: MoviesListProps): JSX.Element {
  const favoriteFilms = props.films.filter((film) => film.isFavorite);

  const [activeCardId, setActiveCardId] = useState<number | null>(null);

  return (
    <div className="user-page">
      <Helmet>
        <title>WTW Мои фильмы</title>
      </Helmet>
      <header className="page-header user-page__head">
        <Logo/>

        <h1 className="page-title user-page__title">My list <span className="user-page__film-count">{favoriteFilms.length}</span></h1>

        <Avatar/>
      </header>

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        <div className="catalog__films-list">
          {favoriteFilms.map((film) => (
            <article className="small-film-card catalog__films-card" key={film.id}>
              <MovieCard film={film} isActive={film.id === activeCardId} onMouseLeave={() => setActiveCardId(null)} onMouseOver={() => setActiveCardId(film.id)}/>
            </article>
          )
          )}
        </div>
      </section>

      <Footer/>
    </div>
  );
}

export default MoviesList;
