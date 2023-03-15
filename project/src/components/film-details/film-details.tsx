import { useParams } from 'react-router-dom';
import { Films } from '../../types/film';

type FilmDetailsProps = {
  films: Films;
}

function FilmDetailsList(props: FilmDetailsProps): JSX.Element {
  const params = useParams();
  const [movieInfo] = props.films.filter((film) => film.id === Number(params.id));

  function getTimeFromMins(mins: number) {
    const hours = Math.trunc(mins / 60);
    const minutes = mins % 60;
    return `${hours }h ${ minutes }m`;
  }

  return (
    <div className="film-card__text film-card__row">
      <div className="film-card__text-col">
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Director</strong>
          <span className="film-card__details-value">{movieInfo.director}</span>
        </p>
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Starring</strong>
          <span className="film-card__details-value">
            {movieInfo.starring.join(', \n')}
          </span>
        </p>
      </div>

      <div className="film-card__text-col">
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Run Time</strong>
          <span className="film-card__details-value">{getTimeFromMins(movieInfo.runTime)}</span>
        </p>
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Genre</strong>
          <span className="film-card__details-value">{movieInfo.genre}</span>
        </p>
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Released</strong>
          <span className="film-card__details-value">{movieInfo.released}</span>
        </p>
      </div>
    </div>
  );
}

export default FilmDetailsList;
