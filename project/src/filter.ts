import { DEFAULT_FILTER } from './const';
import { Film } from './types/film';

export const filterFilms = (films: Film[], genre: string) => {
  let filmsByGenre: Film[];
  if (genre === DEFAULT_FILTER) {
    return (filmsByGenre = films);
  }
  filmsByGenre = films.filter((film) => film.genre === genre);
  return filmsByGenre;
};
