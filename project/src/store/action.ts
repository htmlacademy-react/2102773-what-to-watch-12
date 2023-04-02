import {createAction} from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../const';
import { Film } from '../types/film';
import { Reviews } from '../types/review';

export const setGenre = createAction<{genre: string}>('main/setGenre');
export const loadFilms = createAction<Film[]>('data/loadFilms');
export const setFilmsDataLoadingStatus = createAction<boolean>('data/setFilmsDataLoadingStatus');
export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');
export const loadFilmById = createAction<Film | undefined>('data/loadFilmById');
export const loadCommentsById = createAction<Reviews>('data/loadCommentsById');
export const loadSimilarFilms = createAction<Film[]>('data/loadSimilarFilms');
export const setFilmLoadingError = createAction<boolean>('data/setFilmLoadingError');
export const setReviewSendingStatus = createAction<boolean>('data/setReviewSendingStatus');
