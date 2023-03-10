import {Films} from '../../types/film';
import MovieCard from '../movie-card/movie-card';

type FilmsListProps = {
  films: Films;
}

function FilmsList(props: FilmsListProps): JSX.Element {

  return (
    <> {props.films.map((film) => (
      <article className="small-film-card catalog__films-card" key={film.id}>
        <MovieCard film={film}/>
      </article>
    ))};
    </>
  );
}

export default FilmsList;
