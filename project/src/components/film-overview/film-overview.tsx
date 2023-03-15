import { useParams } from 'react-router-dom';
import { Films } from '../../types/film';

type FilmOverviewProps = {
  films: Films;
}

function FilmOverviewList(props: FilmOverviewProps): JSX.Element {
  const params = useParams();
  const [movieInfo] = props.films.filter((film) => film.id === Number(params.id));

  function setFilmRating (rating: number) {
    if (rating > 0 && movieInfo.rating < 3) {
      return 'Bad';
    }
    if (rating >= 3 && movieInfo.rating < 5) {
      return 'Normal';
    }
    if (rating >= 5 && movieInfo.rating < 8) {
      return 'Good';
    }
    if (rating >= 8 && movieInfo.rating < 10) {
      return 'Very good';
    }
    if (rating === 10) {
      return 'Awesome';
    }
  }

  return (
    <>
      <div className="film-rating">
        <div className="film-rating__score">{movieInfo.rating}</div>
        <p className="film-rating__meta">
          <span className="film-rating__level">
            {setFilmRating(movieInfo.rating)}
          </span>
          <span className="film-rating__count">{movieInfo.scoresCount}</span>
        </p>
      </div>
      <div className="film-card__text">
        <p>{movieInfo.description}</p>

        <p></p>

        <p className="film-card__director"><strong>Director: {movieInfo.director}</strong></p>

        <p className="film-card__starring"><strong>Starring: {movieInfo.starring.join(', ')} and other</strong></p>
      </div>
    </>
  );
}

export default FilmOverviewList;
