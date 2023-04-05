import {createAction} from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../const';
import { Film } from '../types/film';
import { Reviews } from '../types/review';

export const setGenre = createAction<{genre: string}>('main/setGenre');
export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');
export const loadFilms = createAction<{data?: Film[]; isLoading?: boolean}>('data/loadFilms');
export const loadFilmById = createAction<{data?: Film | null; isError?: boolean; isLoading?: boolean }>('data/loadFilmById');
export const loadCommentsById = createAction<{data?: Reviews; isSending?: boolean}>('data/loadCommentsById');
export const loadSimilarFilms = createAction<Film[]>('data/loadSimilarFilms');
export const redirectToRoute = createAction<string>('main/redirectToRoute');


