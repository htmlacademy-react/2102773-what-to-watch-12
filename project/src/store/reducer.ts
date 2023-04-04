import {createReducer} from '@reduxjs/toolkit';
import {loadCommentsById, loadFilmById, loadFilms, loadSimilarFilms, requireAuthorization, setGenre} from './action';
import {AuthorizationStatus, DEFAULT_FILTER} from '../const';
import { Film } from '../types/film';
import { Reviews } from '../types/review';

type InitialState = {
  genre: string;
  filmsList: {
    data: Film[];
    isLoading: boolean;
  };
  authorizationStatus: AuthorizationStatus;
  film: {
    data: Film | null;
    isError: boolean;
    isLoading: boolean;
  };
  comments: {
    data: Reviews;
    isSending: boolean;
  };
  similarFilms: Film[];
}

const initialState: InitialState = {
  genre: DEFAULT_FILTER,
  filmsList: {
    data: [],
    isLoading: false,
  },
  authorizationStatus: AuthorizationStatus.Unknown,
  similarFilms: [],
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
      state.similarFilms = action.payload;
    });
});

export {reducer};
