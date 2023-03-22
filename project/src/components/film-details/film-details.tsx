import { Film } from '../../types/film';

type FilmDetailsProps = {
  film: Film | undefined;
}

function getTimeFromMins(mins: number) {
  const hours = Math.trunc(mins / 60);
  const minutes = mins % 60;
  return `${hours }h ${ minutes }m`;
}

function FilmDetailsList(props: FilmDetailsProps): JSX.Element {

  return (
    <div className="film-card__text film-card__row">
      <div className="film-card__text-col">
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Director</strong>
          <span className="film-card__details-value">{props.film?.director}</span>
        </p>
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Starring</strong>
          <span className="film-card__details-value">
            {props.film?.starring.join(', \n')}
          </span>
        </p>
      </div>

      <div className="film-card__text-col">
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Run Time</strong>
          <span className="film-card__details-value">{getTimeFromMins(props.film?.runTime as number)}</span>
        </p>
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Genre</strong>
          <span className="film-card__details-value">{props.film?.genre}</span>
        </p>
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Released</strong>
          <span className="film-card__details-value">{props.film?.released}</span>
        </p>
      </div>
    </div>
  );
}

export default FilmDetailsList;
