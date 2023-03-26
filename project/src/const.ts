export enum AppRoute {
  SignIn = '/login',
  MyList = '/mylist',
  Films = '/films/',
  Film = ':id',
  Main = '/',
  AddReview = 'review',
  Player = '/player/:id'
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

export const SIMILAR_FILMS_COUNT = 4;
export const DELAY = 1000;
export const DEFAULT_FILTER = 'All genres';
export const MOVIE_CARDS_COUNT = 3;
