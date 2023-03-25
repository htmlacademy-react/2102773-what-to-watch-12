import {createReducer} from '@reduxjs/toolkit';
import {changeGenre, gettingFilmsList, sliceFilmsList} from './action';
import {films} from '../mocks/films';
import { DEFAULT_FILTER, MOVIE_CARD_COUNT } from '../const';
import { makeFilteredFilmsArray } from '../filter';
import { Film } from '../types/film';

// const sliceFilmCards = (filmsList: Film[], n: number) => {
//   if (filmsList.length > MOVIE_CARD_COUNT) {
//     const filmCardsArray = filmsList.slice(0, MOVIE_CARD_COUNT + n);
//     return filmCardsArray;
//   }
//   return filmsList;
// };

//const sliceFilmsArr = sliceFilmCards(films, 0);

const initialState = {
  genre: DEFAULT_FILTER,
  filmsList: films,
  //sliceFilms: sliceFilmsArr,
  n: 0
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeGenre, (state, action) => {
      const {genre} = action.payload;
      state.genre = genre;
    })
    // .addCase(sliceFilmsList, (state, action) => {
    //   const {n} = action.payload;
    //   state.sliceFilms = sliceFilmCards(state.filmsList, n);
    // })
    .addCase(gettingFilmsList, (state, action) => {
      const {genre} = action.payload;
      state.filmsList = makeFilteredFilmsArray(films, genre);
      //state.sliceFilms = sliceFilmCards(state.filmsList, 0);
    });
});

export {reducer};
