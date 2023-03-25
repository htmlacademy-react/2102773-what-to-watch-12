import { Link } from 'react-router-dom';
import { Film } from '../../types/film';
import cn from 'classnames';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {changeGenre, gettingFilmsList} from '../../store/action';
import { DEFAULT_FILTER, MOVIE_CARD_COUNT } from '../../const';
import FilmsList from '../movies-list/films-list';
import ShowMoreButton from '../show-more-button/show-more-button';
import { useState } from 'react';

type GenresListProps = {
  films: Film[];
}

const makeFilmsGenresArray = (films: Film[]) => {
  const filmsGenres = films.map((film) => film.genre);
  filmsGenres.unshift(DEFAULT_FILTER);
  const uniqSet = new Set(filmsGenres);
  return [...uniqSet];
};

const sliceFilmCards = (filmsList: Film[], n: number) => {
  if (filmsList.length > MOVIE_CARD_COUNT) {
    const filmCardsArray = filmsList.slice(0, MOVIE_CARD_COUNT + n);
    return filmCardsArray;
  }
  return filmsList;
};

function GenresList(props: GenresListProps): JSX.Element {
  const genre = useAppSelector((state) => state.genre);
  const filteredFilmsList = useAppSelector((state) => state.filmsList);
  const dispatch = useAppDispatch();

  const[count, setCount] = useState(0);
  const sliceFilms = sliceFilmCards(filteredFilmsList, count);

  const newLength = Math.min(filteredFilmsList.length, sliceFilms.length);

  return (
    <>
      <ul className="catalog__genres-list">
        {makeFilmsGenresArray(props.films).map((filmsGenre) => (
          <li className={cn('catalog__genres-item', { 'catalog__genres-item--active': genre === filmsGenre })} key={filmsGenre}>
            <Link to='' className="catalog__genres-link" onClick={() => {
              dispatch(changeGenre({ genre: filmsGenre }));
              dispatch(gettingFilmsList());
              setCount(0);
            }}
            >{filmsGenre}
            </Link>
          </li>
        ))}
      </ul>
      <FilmsList films={sliceFilms} />
      {filteredFilmsList.length > sliceFilms.length &&
         <ShowMoreButton onShowMoreButtonClick={() => setCount(newLength)}/>}
    </>
  );
}

export default GenresList;
