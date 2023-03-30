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
import { FilmReview } from '../../types/review';
import ScrollToTop from '../scroll-to-top/scroll-to-top';
import { useAppSelector } from '../../hooks';
import LoadingScreen from '../../pages/loading-screen/loading-screen';

type AppScreenProps = {
  filmCardTitle: string;
  filmCardGenre: string;
  filmCardYear: number;
  reviews: FilmReview[];
}

function App(props: AppScreenProps): JSX.Element {

  const filmsList = useAppSelector((state) => state.filmsList);
  const isFilmsDataLoading = useAppSelector((state) => state.isFilmsDataLoading);

  if (isFilmsDataLoading) {
    return (
      <LoadingScreen/>
    );
  }

  return (
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route
            path={AppRoute.Main}
            element={
              <MainScreen
                filmCardTitle={props.filmCardTitle}
                filmCardGenre={props.filmCardGenre}
                filmCardYear={props.filmCardYear}
                films={filmsList}
              />
            }
          />
          <Route
            path={AppRoute.MyList}
            element={
              <PrivateRoute
                authorizationStatus={AuthorizationStatus.Auth}
              >
                <MoviesList films={filmsList} />
              </PrivateRoute>
            }
          />
          <Route path={AppRoute.Films}>
            <Route path={AppRoute.Film}>
              <Route index element={<MoviePage films={filmsList} filmReviews={props.reviews}/>}/>

              <Route
                path={AppRoute.AddReview}
                element={
                  <PrivateRoute
                    authorizationStatus={AuthorizationStatus.Auth}
                  >
                    <AddReview films={filmsList}/>
                  </PrivateRoute>
                }
              />
            </Route>

          </Route>

          <Route
            path={AppRoute.Player}
            element={<MoviePlayer films={filmsList}/>}
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
