import {createReducer} from '@reduxjs/toolkit';
import {changeGenre, getFilmsList } from './action';
import {films} from '../mocks/films';
import { DEFAULT_FILTER} from '../const';
import { filterFilms } from '../filter';

const initialState = {
  genre: DEFAULT_FILTER,
  filmsList: films,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeGenre, (state, action) => {
      const {genre} = action.payload;
      state.genre = genre;
    })
    .addCase(getFilmsList, (state) => {
      state.filmsList = filterFilms(films, state.genre);
    });
});

export {reducer};
