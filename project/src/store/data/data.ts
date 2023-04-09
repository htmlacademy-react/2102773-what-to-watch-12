import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../const';
import {Data} from '../../types/state';
import {fetchCommentsByIdAction, fetchFavoriteFilmsAction, fetchFilmByIdAction, fetchFilmsAction,
  fetchPromoFilmAction, fetchSimilarByIdAction, sendReviewAction} from '../api-actions';
import { Film } from '../../types/film';

const initialState: Data = {
  filmsList: {
    data: [],
    isLoading: false,
  },
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
  },
  promoFilm: {
    data: null,
    isLoading: false,
  },
  favoriteFilmsList: {
    data: [],
    isLoading: false,
  },
};

export const data = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {
    setFilmInfoError: (state, action: PayloadAction<{isError: boolean}>) => {
      const {isError} = action.payload;
      state.film.isError = isError;
    },
    loadFavoriteFilms: (state, action: PayloadAction<{favoriteFilms: Film[]}>) => {
      const {favoriteFilms} = action.payload;
      state.favoriteFilmsList.data = favoriteFilms;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchFilmsAction.pending, (state) => {
        state.filmsList.isLoading = true;
      })
      .addCase(fetchFilmsAction.fulfilled, (state, action) => {
        state.filmsList.data = action.payload;
        state.filmsList.isLoading = false;
      })
      .addCase(fetchFavoriteFilmsAction.pending, (state) => {
        state.favoriteFilmsList.isLoading = true;
      })
      .addCase(fetchFavoriteFilmsAction.fulfilled, (state, action) => {
        state.favoriteFilmsList.data = action.payload;
        state.favoriteFilmsList.isLoading = false;
      })
      .addCase(fetchPromoFilmAction.pending, (state) => {
        state.promoFilm.isLoading = true;
      })
      .addCase(fetchPromoFilmAction.fulfilled, (state, action) => {
        state.promoFilm.data = action.payload;
        state.promoFilm.isLoading = false;
      })
      .addCase(fetchCommentsByIdAction.fulfilled, (state, action) => {
        state.comments.data = action.payload;
      })
      .addCase(fetchSimilarByIdAction.pending, (state) => {
        state.similarFilms.isLoading = true;
      })
      .addCase(fetchSimilarByIdAction.fulfilled, (state, action) => {
        state.similarFilms.data = action.payload;
        state.similarFilms.isLoading = false;
      })
      .addCase(fetchFilmByIdAction.pending, (state) => {
        state.film.isError = false;
        state.film.isLoading = true;
      })
      .addCase(fetchFilmByIdAction.fulfilled, (state, action) => {
        state.film.isLoading = false;
        state.film.data = action.payload;
      })
      .addCase(fetchFilmByIdAction.rejected, (state, action) => {
        state.film.isError = true;
      })
      .addCase(sendReviewAction.pending, (state) => {
        state.comments.isSending = true;
      })
      .addCase(sendReviewAction.fulfilled, (state, action) => {
        state.comments.isSending = false;
      });
  }
});

export const {setFilmInfoError, loadFavoriteFilms} = data.actions;
