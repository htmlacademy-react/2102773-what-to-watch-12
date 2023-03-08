export enum AppRoute {
  SignIn = '/login',
  MyList = '/mylist',
  Film = '/films/:id',
  Main = '/',
  AddReview = ':review',
  Player = '/player/:id'
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}
