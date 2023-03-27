import {createAction} from '@reduxjs/toolkit';

export const setGenre = createAction<{genre: string}>('main/setGenre');
