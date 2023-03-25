import {createAction} from '@reduxjs/toolkit';

export const changeGenre = createAction<{genre: string}>('main/changeGenre');
export const gettingFilmsList = createAction<{genre: string}>('main/gettingFilmsList');
export const sliceFilmsList = createAction<{n: number}>('main/sliceFilmsList');
