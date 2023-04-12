import {Helmet} from 'react-helmet-async';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import GenresList from '../../components/genres-list/genres-list';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import PromoFilm from '../../components/promo-film/promo-film';
import { filmsSelector, movieSelector } from '../../store/data/selectors';
import { setFilmInfoError } from '../../store/data/data';
import LoadingScreen from '../loading-screen/loading-screen';

function MainScreen(): JSX.Element {

  const dispatch = useAppDispatch();
  const filmsList = useAppSelector(filmsSelector);
  const movieInfo = useAppSelector(movieSelector);

  useEffect(() => {
    if (movieInfo.isError) {
      dispatch(setFilmInfoError({isError: false}));
    }
  }, [dispatch, movieInfo.isError]);

  if (filmsList.isLoading) {
    return (
      <LoadingScreen/>
    );
  }

  return (
    <>
      <Helmet>
        <title>WTW Главная страница</title>
      </Helmet>
      <PromoFilm><Header/></PromoFilm>
      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>
          <GenresList films={filmsList}/>
        </section>
        <Footer/>
      </div>
    </>
  );
}

export default MainScreen;
