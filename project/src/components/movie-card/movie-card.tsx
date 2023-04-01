import {Film} from '../../types/film';
import {Link, useNavigate} from 'react-router-dom';
import {AppRoute} from '../../const';
import { MouseEventHandler } from 'react';
import VideoPlayer from '../video-player/video-player';


type MovieCardProps = {
  film: Film;
  isActive: boolean;
  onMouseLeave: MouseEventHandler<HTMLElement>;
  onMouseOver: MouseEventHandler<HTMLElement>;
}

function MovieCard(props: MovieCardProps): JSX.Element {
  const navigate = useNavigate();

  return (
    <>
      <VideoPlayer src={props.film.previewVideoLink} poster={props.film.previewImage} alt={props.film.name}
        isPlaying={props.isActive} onMouseOver={props.onMouseOver} onMouseLeave={props.onMouseLeave} onClick={() => navigate(`${AppRoute.Films}${props.film.id}`)}
      />
      <h3 className="small-film-card__title">
        <Link className="small-film-card__link" to={`${AppRoute.Films}${props.film.id}`}>
          {props.film.name}
        </Link>
      </h3>
    </>
  );
}

export default MovieCard;

