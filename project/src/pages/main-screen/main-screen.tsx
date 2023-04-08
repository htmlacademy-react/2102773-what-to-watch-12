import {Helmet} from 'react-helmet-async';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import {Film} from '../../types/film';
import GenresList from '../../components/genres-list/genres-list';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { loadFilmById } from '../../store/action';
import { movieSelector } from '../../store/selectors';
import PromoFilm from '../../components/promo-film/promo-film';

type MainScreenProps = {
  films: Film[];
}

function MainScreen(props: MainScreenProps): JSX.Element {

  const dispatch = useAppDispatch();
  const movieInfo = useAppSelector(movieSelector);

  useEffect(() => {
    if (movieInfo.isError) {
      dispatch(loadFilmById({isError: false}));
    }
  }, [dispatch, movieInfo.isError]);

  return (
    <>
      <Helmet>
        <title>WTW Главная страница</title>
      </Helmet>
      <PromoFilm><Header/></PromoFilm>
      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>
          <GenresList films={props.films}/>
        </section>
        <Footer/>
      </div>
    </>
  );
}

export default MainScreen;
