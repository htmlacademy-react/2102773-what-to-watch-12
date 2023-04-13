import {Route, Routes} from 'react-router-dom';
import {HelmetProvider} from 'react-helmet-async';
import HistoryRouter from '../history-route/history-route';
import browserHistory from '../../browser-history';
import {AppRoute, AuthorizationStatus} from '../../const';
import { useAppSelector } from '../../hooks';
import MainScreen from '../../pages/main-screen/main-screen';
import AddReview from '../../pages/add-review-screen/add-review-screen';
import MoviePage from '../../pages/movie-page-screen/movie-page-screen';
import MoviePlayer from '../../pages/movie-player-screen/movie-player-screen';
import MoviesList from '../../pages/movies-list-screen/movies-list-screen';
import SignIn from '../../pages/sign-in-screen/sign-in-screen';
import PageNotFound from '../page-not-found/page-not-found';
import PrivateRoute from '../private-route/private-route';
import ScrollToTop from '../scroll-to-top/scroll-to-top';
import LoadingScreen from '../../pages/loading-screen/loading-screen';
import { getAuthorizationStatus } from '../../store/user-process/selectors';

function App(): JSX.Element {

  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const isAuthChecked = authorizationStatus !== AuthorizationStatus.Unknown;

  if (!isAuthChecked) {
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
              <MainScreen/>
            }
          />
          <Route
            path={AppRoute.MyList}
            element={
              <PrivateRoute
                authorizationStatus={authorizationStatus}
              >
                <MoviesList/>
              </PrivateRoute>
            }
          />
          <Route path={AppRoute.Films}>
            <Route path={AppRoute.FilmId}>
              <Route index element={<MoviePage/>}/>
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

          <Route path={AppRoute.Player}>
            <Route path={AppRoute.FilmId}>
              <Route index element={<MoviePlayer/>}/>
            </Route>
          </Route>

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
