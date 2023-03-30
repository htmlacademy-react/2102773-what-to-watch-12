import {createAction} from '@reduxjs/toolkit';
import { Film } from '../types/film';

export const setGenre = createAction<{genre: string}>('main/setGenre');
export const loadFilms = createAction<Film[]>('data/loadFilms');
export const setFilmsDataLoadingStatus = createAction<boolean>('data/setFilmsDataLoadingStatus');

