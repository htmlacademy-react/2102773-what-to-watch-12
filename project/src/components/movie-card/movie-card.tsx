import {Film} from '../../types/film';
import {Link} from 'react-router-dom';
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

  return (
    <>
      <VideoPlayer src={props.film.previewVideoLink} poster={props.film.previewImage} alt={props.film.name}
        isPlaying={props.isActive} onMouseOver={props.onMouseOver} onMouseLeave={props.onMouseLeave}
      />
      <h3 className="small-film-card__title">
        <Link className="small-film-card__link" to={`${AppRoute.Films}${props.film.id}`}>{props.film.name}</Link>
      </h3>
    </>
  );
}

export default MovieCard;

// {props.isActive ? <video src={props.film.previewVideoLink} className="player__video" poster={props.film.previewImage} autoPlay muted></video> :
// <img src={props.film.previewImage} alt={props.film.name} width="280" height="175" />}

/* <div
onMouseOver={props.onMouseOver}
onMouseLeave={props.onMouseLeave}
className="small-film-card__image"
>

{props.isActive ? <video src={props.film.previewVideoLink} className="player__video" poster={props.film.previewImage} autoPlay muted></video> :
  <img src={props.film.previewImage} alt={props.film.name} width="280" height="175" />}
</div> */
