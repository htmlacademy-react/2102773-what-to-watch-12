import {createReducer} from '@reduxjs/toolkit';
import {loadFilms, requireAuthorization, setFilmsDataLoadingStatus, setGenre} from './action';
import {AuthorizationStatus, DEFAULT_FILTER} from '../const';
import { Film } from '../types/film';
import { FilmReview } from '../types/review';

type InitialState = {
  genre: string;
  filmsList: Film[];
  commentsList: FilmReview[];
  isFilmsDataLoading: boolean;
  authorizationStatus: AuthorizationStatus;
  avatarUrl: string;
}

const initialState: InitialState = {
  genre: DEFAULT_FILTER,
  filmsList: [],
  commentsList: [],
  isFilmsDataLoading: false,
  authorizationStatus: AuthorizationStatus.Unknown,
  avatarUrl: '',
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setGenre, (state, action) => {
      const {genre} = action.payload;
      state.genre = genre;
    })
    .addCase(loadFilms, (state, action) => {
      state.filmsList = action.payload;
    })
    .addCase(setFilmsDataLoadingStatus, (state, action) => {
      state.isFilmsDataLoading = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    });
});

export {reducer};
