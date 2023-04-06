import { SIMILAR_FILMS_COUNT } from '../../const';
import { Film } from '../../types/film';
import MovieCard from '../movie-card/movie-card';
import { useState } from 'react';

type SimilarFilmsProps = {
  movieInfo: {
    data: Film | null;
  };
  similarFilms: {
    data: Film[];
  };
}

function SimilarFilms(props: SimilarFilmsProps): JSX.Element {
  const [activeCardId, setActiveCardId] = useState<number | null>(null);

  return (
    <> {props.similarFilms.data.length > 1 ? props.similarFilms.data.slice(0, SIMILAR_FILMS_COUNT).map((film) => (
      props.movieInfo.data?.id !== film.id &&
      <article className="small-film-card catalog__films-card" key={film.id}>
        <MovieCard film={film} isActive={film.id === activeCardId} onMouseLeave={() => setActiveCardId(null)} onMouseOver={() => setActiveCardId(film.id)}/>
      </article>
    )
    ) : 'No similar films'}
    </>
  );

}

export default SimilarFilms;
