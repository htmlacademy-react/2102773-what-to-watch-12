export enum AppRoute {
  SignIn = '/login',
  MyList = '/mylist',
  Films = '/films/',
  FilmId = ':id',
  Main = '/',
  AddReview = 'review',
  Player = '/player/'
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum MoviePageState {
  Overview = 'Overview',
  Details = 'Details',
  Reviews = 'Reviews'
}

export const SIMILAR_FILMS_COUNT = 5;
export const DELAY = 1000;
export const DEFAULT_FILTER = 'All genres';
export const MOVIE_CARDS_COUNT = 8;
export const SECONDS_IN_HOUR = 3600;
export const MAX_GANRE_COUNT = 10;

export enum APIRoute {
  Films = '/films/',
  Promo = '/promo',
  Favorite = '/favorite/',
  Comments = '/comments/',
  Login = '/login',
  Logout = '/logout',
  Similar = '/similar'
}

export enum ReviewLength {
  Min = 50,
  Max = 400
}

export const REDIRECT_ACTION_NAME = 'main/redirectToRoute';

export enum NameSpace {
  Data = 'DATA',
  Main = 'MAIN',
  User = 'USER',
}

export enum TOAST_MESSAGES {
  Error = 'Сообщение не отправлено',
  Success = 'Сообщение отправлено'
}
