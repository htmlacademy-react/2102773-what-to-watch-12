import { PropsWithChildren, useState } from 'react';
import {Film} from '../../types/film';
import MovieCard from '../movie-card/movie-card';

type FilmsListProps = PropsWithChildren<{
  films: Film[];
}>

function FilmsList(props: FilmsListProps): JSX.Element {

  const [activeCardId, setActiveCardId] = useState<number | null>(null);

  return (
    <>
      <div className="catalog__films-list">
        {props.films.map((film) => (
          <article className="small-film-card catalog__films-card" key={film.id}>
            <MovieCard film={film} isActive={film.id === activeCardId} onMouseLeave={() => setActiveCardId(null)} onMouseOver={() => setActiveCardId(film.id)}/>
          </article>
        ))}
      </div>
      {props.children}
    </>
  );
}

export default FilmsList;
