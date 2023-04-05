import { Store } from '../types/store';

export const filmsSelector = (state: Store) => state.filmsList;
export const movieSelector = (state: Store) => state.film;
export const commentsSelector = (state: Store) => state.comments;
export const similarFilmsSelector = (state: Store) => state.similarFilms;
export const authorizationStatusSelector = (state: Store) => state.authorizationStatus;
