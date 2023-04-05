import {Route, Routes} from 'react-router-dom';
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
import ScrollToTop from '../scroll-to-top/scroll-to-top';
import { useAppSelector } from '../../hooks';
import LoadingScreen from '../../pages/loading-screen/loading-screen';
import { filmsSelector, movieSelector } from '../../store/selectors';
import HistoryRouter from '../history-route/history-route';
import browserHistory from '../../browser-history';

type AppScreenProps = {
  filmCardTitle: string;
  filmCardGenre: string;
  filmCardYear: number;
}

function App(props: AppScreenProps): JSX.Element {

  const filmsList = useAppSelector(filmsSelector);
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const film = useAppSelector(movieSelector);

  if (authorizationStatus === AuthorizationStatus.Unknown || filmsList.isLoading) {
    return (
      <LoadingScreen/>
    );
  }

  return (
    <HelmetProvider>
      <HistoryRouter history={browserHistory}>
        <ScrollToTop />
        <Routes>
          <Route
            path={AppRoute.Main}
            element={
              <MainScreen
                filmCardTitle={props.filmCardTitle}
                filmCardGenre={props.filmCardGenre}
                filmCardYear={props.filmCardYear}
                films={filmsList.data}
              />
            }
          />
          <Route
            path={AppRoute.MyList}
            element={
              <PrivateRoute
                authorizationStatus={authorizationStatus}
              >
                <MoviesList films={filmsList.data} />
              </PrivateRoute>
            }
          />
          <Route path={AppRoute.Films}>
            <Route path={AppRoute.Film}>
              <Route index element={!film.isError ? <MoviePage films={filmsList.data}/> : <PageNotFound/>}/>

              <Route
                path={AppRoute.AddReview}
                element={
                  <PrivateRoute
                    authorizationStatus={authorizationStatus}
                  >
                    <AddReview/>
                  </PrivateRoute>
                }
              />
            </Route>

          </Route>

          <Route
            path={AppRoute.Player}
            element={<MoviePlayer films={filmsList.data}/>}
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
      </HistoryRouter>
    </HelmetProvider>
  );
}

export default App;
