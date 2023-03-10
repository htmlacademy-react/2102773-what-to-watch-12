import {Film} from '../../types/film';

type MovieCardProps = {
  film: Film;
}

function MovieCard(props: MovieCardProps): JSX.Element {

  return (
    <>
      <div className="small-film-card__image">
        <img src={props.film.previewImage} alt={props.film.name} width="280" height="175" />
      </div>
      <h3 className="small-film-card__title">
        <a className="small-film-card__link" href="film-page.html">{props.film.name}</a>
      </h3>
    </>
  );
}

export default MovieCard;
