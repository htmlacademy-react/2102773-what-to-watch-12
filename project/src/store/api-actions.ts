import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { APIRoute, AppRoute, AuthorizationStatus, REDIRECT_ACTION_NAME} from '../const';
import { dropToken, saveToken } from '../services/token';
import { AuthData } from '../types/auth-data';
import { Film } from '../types/film';
import { AppDispatch, State } from '../types/state';
import { UserData } from '../types/user-data';
import { loadCommentsById, loadFilmById, loadFilms, loadSimilarFilms, requireAuthorization } from './action';
import { AddReview, Reviews } from '../types/review';

const redirectToRoute = createAction<string>(REDIRECT_ACTION_NAME);

export const fetchFilmsAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchFilms',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(loadFilms({isLoading: true}));
    const {data} = await api.get<Film[]>(APIRoute.Films);
    dispatch(loadFilms({isLoading: false}));
    dispatch(loadFilms({data}));
  },
);

export const fetchFilmByIdAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchFilmById',
  async (filmId, {dispatch, extra: api}) => {
    try {
      dispatch(loadFilmById({isError: false}));
      dispatch(loadFilmById({isLoading: true}));
      const {data} = await api.get<Film>(`${APIRoute.Films}${filmId}`);
      dispatch(loadFilmById({isLoading: false}));
      dispatch(loadFilmById({data}));
    } catch {
      dispatch(loadFilmById({isError: true}));
    }
  },
);

export const fetchCommentsByIdAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchCommentsById',
  async (filmId, {dispatch, extra: api}) => {
    const {data} = await api.get<Reviews>(`${APIRoute.Comments}${filmId}`);
    dispatch(loadCommentsById({data}));
  },
);

export const fetchSimilarByIdAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchSimilarById',
  async (filmId, {dispatch, extra: api}) => {
    dispatch(loadSimilarFilms({isLoading: true}));
    const {data} = await api.get<Film[]>(`${APIRoute.Films}${filmId}${APIRoute.Similar}`);
    dispatch(loadSimilarFilms({isLoading: false}));
    dispatch(loadSimilarFilms({data}));
  },
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    try {
      await api.get(APIRoute.Login);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({login: email, password}, {dispatch, extra: api}) => {
    const {data: {token, avatarUrl}} = await api.post<UserData>(APIRoute.Login, {email, password});
    saveToken(token, avatarUrl);
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
    dispatch(redirectToRoute(AppRoute.Main));
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
  },
);

export const sendReviewAction = createAsyncThunk<void, AddReview, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/AddReview',
  async ({comment, rating, filmId}, {dispatch, extra: api}) => {
    dispatch(loadCommentsById({isSending: true}));
    await api.post<AddReview>(`${APIRoute.Comments}${filmId}`, {comment, rating});
    dispatch(loadCommentsById({isSending: false}));
    dispatch(redirectToRoute(`${AppRoute.Films}${filmId}`));
  },
);
