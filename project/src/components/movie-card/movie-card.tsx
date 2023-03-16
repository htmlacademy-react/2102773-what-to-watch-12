import {Film} from '../../types/film';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../const';
import { MouseEventHandler } from 'react';

type MovieCardProps = {
  film: Film;
  // eslint-disable-next-line react/no-unused-prop-types
  isActive: boolean;
  onMouseLeave: MouseEventHandler<HTMLElement>;
  onMouseOver: MouseEventHandler<HTMLElement>;
}

function MovieCard(props: MovieCardProps): JSX.Element {

  return (
    <>
      <div
        onMouseOver={props.onMouseOver}
        onMouseLeave={props.onMouseLeave}
        className="small-film-card__image"
      >
        <img src={props.film.previewImage} alt={props.film.name} width="280" height="175" />
      </div>
      <h3 className="small-film-card__title">
        <Link className="small-film-card__link" to={`${AppRoute.Films}${props.film.id}`}>{props.film.name}</Link>
      </h3>
    </>
  );
}

export default MovieCard;
