import {Film} from '../../types/film';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../const';
import { useState } from 'react';

type MovieCardProps = {
  film: Film;
}

function MovieCard(props: MovieCardProps): JSX.Element {

  const [card, setCard] = useState(0);
  console.log(card);

  return (
    <>
      <div onMouseOver={() => setCard(props.film.id)}
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
