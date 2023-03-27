import { DEFAULT_FILTER } from '../const';
import { Film } from '../types/film';

export const filterFilms = (films: Film[], genre: string) => {
  if (genre === DEFAULT_FILTER) {
    return films;
  }
  return films.filter((film) => film.genre === genre);
};
