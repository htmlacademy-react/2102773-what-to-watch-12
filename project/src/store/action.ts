import {createAction} from '@reduxjs/toolkit';

export const changeGenre = createAction<{genre: string}>('main/changeGenre');
export const getFilmsList = createAction('main/getFilmsList');

