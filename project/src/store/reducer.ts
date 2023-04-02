import {createReducer} from '@reduxjs/toolkit';
import {loadCommentsById, loadFilmById, loadFilms, loadSimilarFilms, requireAuthorization, setFilmLoadingError, setFilmsDataLoadingStatus, setGenre, setReviewSendingStatus} from './action';
import {AuthorizationStatus, DEFAULT_FILTER} from '../const';
import { Film } from '../types/film';
import { Reviews } from '../types/review';

type InitialState = {
  genre: string;
  filmsList: Film[];
  isFilmsDataLoading: boolean;
  authorizationStatus: AuthorizationStatus;
  film: Film | undefined;
  comments: Reviews;
  similarFilms: Film[];
  isFilmLoadingError: boolean;
  isReviewDataSending: boolean;
}

const initialState: InitialState = {
  genre: DEFAULT_FILTER,
  filmsList: [],
  isFilmsDataLoading: false,
  authorizationStatus: AuthorizationStatus.Unknown,
  similarFilms: [],
  isFilmLoadingError: false,
  film: undefined,
  comments: [],
  isReviewDataSending: false,
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
    })
    .addCase(loadFilmById, (state, action) => {
      state.film = action.payload;
    })
    .addCase(loadCommentsById, (state, action) => {
      state.comments = action.payload;
    })
    .addCase(loadSimilarFilms, (state, action) => {
      state.similarFilms = action.payload;
    })
    .addCase(setFilmLoadingError, (state, action) => {
      state.isFilmLoadingError = action.payload;
    })
    .addCase(setReviewSendingStatus, (state, action) => {
      state.isReviewDataSending = action.payload;
    });
});

export {reducer};
