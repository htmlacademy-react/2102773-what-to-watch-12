import { AuthorizationStatus } from '../const';
import { Film } from './film';
import { Reviews } from './review';

export type Store = {
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
}
