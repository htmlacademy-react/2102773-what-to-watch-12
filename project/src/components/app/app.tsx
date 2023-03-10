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

type AppScreenProps = {
  filmCardTitle: string;
  filmCardGenre: string;
  filmCardYear: number;
  cardsCount: number;
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
                cardsCount={props.cardsCount}
              />
            }
          />
          <Route
            path={AppRoute.MyList}
            element={
              <PrivateRoute
                authorizationStatus={AuthorizationStatus.NoAuth}
              >
                <MoviesList />
              </PrivateRoute>
            }
          />
          <Route path={AppRoute.Film}>
            <Route index element={<MoviePage/>} />
            <Route path={AppRoute.AddReview} element={<AddReview/>}/>
          </Route>

          <Route
            path={AppRoute.Player}
            element={<MoviePlayer/>}
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
