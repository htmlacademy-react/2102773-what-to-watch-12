import { AuthorizationStatus } from '../const.js';
import {store} from '../store/index.js';
import { Film } from './film.js';
import { Reviews } from './review.js';

export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
  loginError: boolean;
};

export type Data = {
  filmsList: {
    data: Film[];
    isLoading: boolean;
  };
  film: {
    data: Film | null;
    isError: boolean;
    isLoading: boolean;
  };
  comments: {
    data: Reviews;
    isSending: boolean;
  };
  similarFilms: {
    data: Film[];
    isLoading: boolean;
  };
  promoFilm: {
    data: Film | null;
    isLoading: boolean;
  };
  favoriteFilmsList: {
    data: Film[];
    isLoading: boolean;
  };
};

export type Process = {
  genre: string;
};

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
