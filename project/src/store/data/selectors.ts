import { NameSpace } from '../../const';
import { Film } from '../../types/film';
import { Reviews } from '../../types/review';
import { State } from '../../types/state';

export const filmsSelector = (state: State): {data: Film[]; isLoading: boolean} => state[NameSpace.Data].filmsList;
export const movieSelector = (state: State): {data: Film | null; isLoading: boolean; isError: boolean} => state[NameSpace.Data].film;
export const reviewsSelector = (state: State): {data: Reviews; isSending: boolean} => state[NameSpace.Data].comments;
export const similarFilmsSelector = (state: State): {data: Film[]; isLoading: boolean} => state[NameSpace.Data].similarFilms;
export const promoFilmSelector = (state: State): {data: Film | null; isLoading: boolean} => state[NameSpace.Data].promoFilm;
export const favoriteFilmsSelector = (state: State): {data: Film[]; isLoading: boolean} => state[NameSpace.Data].favoriteFilmsList;
