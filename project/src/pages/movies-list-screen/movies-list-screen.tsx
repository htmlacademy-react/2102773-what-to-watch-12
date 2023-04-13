import {Helmet} from 'react-helmet-async';
import Avatar from '../../components/avatar/avatar';
import Footer from '../../components/footer/footer';
import Logo from '../../components/logo/logo';
import MovieCard from '../../components/movie-card/movie-card';
import { useState } from 'react';
import { useAppSelector } from '../../hooks';
import { favoriteFilmsSelector } from '../../store/data/selectors';

function MoviesList(): JSX.Element {

  const favoriteFilms = useAppSelector(favoriteFilmsSelector);
  const [activeCardId, setActiveCardId] = useState<number | null>(null);

  return (
    <div className="user-page">
      <Helmet>
        <title>WTW Мои фильмы</title>
      </Helmet>
      <header className="page-header user-page__head">
        <Logo/>
        <h1 className="page-title user-page__title">My list <span className="user-page__film-count">{favoriteFilms.data.length}</span></h1>
        <Avatar/>
      </header>

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        <div className="catalog__films-list">
          {favoriteFilms.data.map((film) => (
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
