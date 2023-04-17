import { Link, useNavigate, useParams } from 'react-router-dom';
import { AuthorizationStatus, AppRoute } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { sendFavoriteStatusAction } from '../../store/api-actions';
import { Film } from '../../types/film';
import { PropsWithChildren, useEffect } from 'react';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import { favoriteFilmsSelector } from '../../store/data/selectors';
import { loadFavoriteFilms } from '../../store/data/data';

type MovieInfoProps = PropsWithChildren<{
  movieInfo: Film;
}>;

function MovieInfo (props: MovieInfoProps): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const favoriteFilms = useAppSelector(favoriteFilmsSelector);
  const isFavorite = favoriteFilms.data.map((film) => film.id).includes(Number(params.id));

  useEffect(() => {
    if (authorizationStatus !== AuthorizationStatus.Auth) {
      dispatch(loadFavoriteFilms({favoriteFilms: []}));
    }
  }, [authorizationStatus, dispatch]);

  const buttonClickHandler = () => {
    if(authorizationStatus !== AuthorizationStatus.Auth) {
      navigate(AppRoute.SignIn);
    }
    dispatch(sendFavoriteStatusAction({
      status: Number(!isFavorite),
      filmId: String(props.movieInfo.id)
    }));
  };

  return (
    <div className="film-card__hero">
      <div className="film-card__bg">
        <img src={props.movieInfo.backgroundImage} alt={props.movieInfo.name} />
      </div>
      <h1 className="visually-hidden">WTW</h1>
      {props.children}
      <div className="film-card__wrap">
        <div className="film-card__desc">
          <h2 className="film-card__title">{props.movieInfo.name}</h2>
          <p className="film-card__meta">
            <span className="film-card__genre">{props.movieInfo.genre}</span>
            <span className="film-card__year">{props.movieInfo.released}</span>
          </p>

          <div className="film-card__buttons">
            <button className="btn btn--play film-card__button" type="button" onClick={() => navigate(`${AppRoute.Player}${String(props.movieInfo?.id)}`)}>
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
            {authorizationStatus === AuthorizationStatus.Auth ?
              <Link to={`${AppRoute.AddReview}`} className="btn film-card__button">Add review</Link>
              : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieInfo;
