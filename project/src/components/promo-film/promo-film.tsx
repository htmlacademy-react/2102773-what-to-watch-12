import { PropsWithChildren, useEffect } from 'react';
import DefaultLoader from '../loader/loader';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useNavigate } from 'react-router-dom';
import { fetchFilmByIdAction, sendFavoriteStatusAction } from '../../store/api-actions';
import { promoFilmSelector, favoriteFilmsSelector } from '../../store/data/selectors';
import { AppRoute, AuthorizationStatus } from '../../const';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import { loadFavoriteFilms } from '../../store/data/data';

function PromoFilm(props: PropsWithChildren): JSX.Element {
  const dispatch = useAppDispatch();

  const promoFilm = useAppSelector(promoFilmSelector);
  const favoriteFilms = useAppSelector(favoriteFilmsSelector);
  const navigate = useNavigate();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  useEffect(() => {
    if (authorizationStatus !== AuthorizationStatus.Auth) {
      dispatch(loadFavoriteFilms({favoriteFilms: []}));
    }

  }, [authorizationStatus, dispatch, navigate]);

  if (!promoFilm.data) {
    return <DefaultLoader/>;
  }

  const isFavorite = favoriteFilms.data.map((film) => film.id).includes(Number(promoFilm.data.id));

  const buttonClickHandler = () => {
    if(authorizationStatus !== AuthorizationStatus.Auth) {
      navigate(AppRoute.SignIn);
    }
    dispatch(sendFavoriteStatusAction({
      status: Number(!isFavorite),
      filmId: String(promoFilm.data?.id)
    }));
  };

  return (
    <section className="film-card">
      <div className="film-card__bg">
        <img src={promoFilm.data.backgroundImage} alt={promoFilm.data.name} />
      </div>

      <h1 className="visually-hidden">WTW</h1>
      {props.children}
      <div className="film-card__wrap">

        <div className="film-card__info">
          <div className="film-card__poster">
            <img src={promoFilm.data.posterImage} alt={promoFilm.data.name} width="218" height="327" />
          </div>

          <div className="film-card__desc">
            <h2 className="film-card__title">{promoFilm.data.name}</h2>
            <p className="film-card__meta">
              <span className="film-card__genre">{promoFilm.data.genre}</span>
              <span className="film-card__year">{promoFilm.data.released}</span>
            </p>

            <div className="film-card__buttons">
              <button className="btn btn--play film-card__button" type="button"
                onClick={() => {dispatch(fetchFilmByIdAction(String(promoFilm.data?.id))); navigate(`${AppRoute.Player}${String(promoFilm.data?.id)}`);}}
              >
                <svg viewBox="0 0 19 19" width="19" height="19">
                  <use xlinkHref="#play-s"></use>
                </svg>
                <span>Play</span>
              </button>
              <button className="btn btn--list film-card__button" type="button" onClick={buttonClickHandler}>
                <svg viewBox={isFavorite ? '0 0 19 19' : '0 0 19 20'} width="19" height={isFavorite ? '19' : '20'}>
                  <use xlinkHref={isFavorite ? '#in-list' : '#add'}></use>
                </svg>
                <span>My list</span>
                <span className="film-card__count">{favoriteFilms.data.length}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PromoFilm;
