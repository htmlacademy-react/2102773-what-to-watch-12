import { AuthorizationStatus } from '../const';
import { Film } from '../types/film';
import { Reviews } from '../types/review';

export const filmsSelector = (state: { filmsList: {data: Film[]; isLoading: boolean}}) => state.filmsList;
export const movieSelector = (state: { film: {data: Film | null; isError: boolean; isLoading: boolean} }) => state.film;
export const commentsSelector = (state: { comments: {data: Reviews; isSending: boolean} }) => state.comments;
export const similarFilmsSelector = (state: { similarFilms: Film[] }) => state.similarFilms;
export const authorizationStatusSelector = (state: {authorizationStatus: AuthorizationStatus}) => state.authorizationStatus;
