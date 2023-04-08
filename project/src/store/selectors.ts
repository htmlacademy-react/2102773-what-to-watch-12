import { Store } from '../types/store';

export const filmsSelector = (state: Store) => state.filmsList;
export const movieSelector = (state: Store) => state.film;
export const reviewsSelector = (state: Store) => state.comments;
export const similarFilmsSelector = (state: Store) => state.similarFilms;
export const authorizationStatusSelector = (state: Store) => state.authorizationStatus;
export const promoFilmSelector = (state: Store) => state.promoFilm;
export const favoriteFilmsSelector = (state: Store) => state.favoriteFilmsList;
