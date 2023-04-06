import {createReducer} from '@reduxjs/toolkit';
import {loadCommentsById, loadFilmById, loadFilms, loadSimilarFilms, requireAuthorization, setGenre} from './action';
import {AuthorizationStatus, DEFAULT_FILTER} from '../const';
import { Store } from '../types/store';

const initialState: Store = {
  genre: DEFAULT_FILTER,
  filmsList: {
    data: [],
    isLoading: false,
  },
  authorizationStatus: AuthorizationStatus.Unknown,
  similarFilms: {
    data: [],
    isLoading: false,
  },
  film: {
    data: null,
    isError: false,
    isLoading: false,
  },
  comments: {
    data: [],
    isSending: false,
  }
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setGenre, (state, action) => {
      const {genre} = action.payload;
      state.genre = genre;
    })
    .addCase(loadFilms, (state, action) => {
      state.filmsList.data = action.payload.data ?? [];
      state.filmsList.isLoading = action.payload.isLoading ?? false;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(loadFilmById, (state, action) => {
      state.film.data = action.payload.data ?? null;
      state.film.isError = action.payload.isError ?? false;
      state.film.isLoading = action.payload.isLoading ?? false;
    })
    .addCase(loadCommentsById, (state, action) => {
      state.comments.data = action.payload.data ?? [];
      state.comments.isSending = action.payload.isSending ?? false;
    })
    .addCase(loadSimilarFilms, (state, action) => {
      state.similarFilms.data = action.payload.data ?? [];
      state.similarFilms.isLoading = action.payload.isLoading ?? false;
    });
});

export {reducer};
