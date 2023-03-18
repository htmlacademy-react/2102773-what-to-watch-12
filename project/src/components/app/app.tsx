import {Route, BrowserRouter, Routes} from 'react-router-dom';
import {HelmetProvider} from 'react-helmet-async';
import {AppRoute, AuthorizationStatus} from '../../const';
import MainScreen from '../../pages/main-screen/main-screen';
import AddReview from '../../pages/add-review-screen/add-review-screen';
import MoviePage from '../../pages/movie-page-screen/movie-page-screen';
import MoviePlayer from '../../pages/movie-player-screen/movie-player-screen';
import MoviesList from '../../pages/movies-list-screen/movies-list-screen';
import SignIn from '../../pages/sign-in-screen/sign-in-screen';
import PageNotFound from '../page-not-found/page-not-found';
import PrivateRoute from '../private-route/private-route';
import {Film} from '../../types/film';
import { FilmReviews } from '../../types/review';

type AppScreenProps = {
  filmCardTitle: string;
  filmCardGenre: string;
  filmCardYear: number;
  films: Film[];
  reviews: FilmReviews[];
}

function App(props: AppScreenProps): JSX.Element {

  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path={AppRoute.Main}
            element={
              <MainScreen
                filmCardTitle={props.filmCardTitle}
                filmCardGenre={props.filmCardGenre}
                filmCardYear={props.filmCardYear}
                films={props.films}
              />
            }
          />
          <Route
            path={AppRoute.MyList}
            element={
              <PrivateRoute
                authorizationStatus={AuthorizationStatus.Auth}
              >
                <MoviesList films={props.films} />
              </PrivateRoute>
            }
          />
          <Route path={AppRoute.Films}>
            <Route path={AppRoute.Film}>
              <Route index element={<MoviePage films={props.films} filmReviews={props.reviews}/>}/>

              <Route
                path={AppRoute.AddReview}
                element={
                  <PrivateRoute
                    authorizationStatus={AuthorizationStatus.Auth}
                  >
                    <AddReview films={props.films}/>
                  </PrivateRoute>
                }
              />
            </Route>

          </Route>

          <Route
            path={AppRoute.Player}
            element={<MoviePlayer films={props.films}/>}
          />
          <Route
            path={AppRoute.SignIn}
            element={<SignIn/>}
          />
          <Route
            path="*"
            element={<PageNotFound/>}
          />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
