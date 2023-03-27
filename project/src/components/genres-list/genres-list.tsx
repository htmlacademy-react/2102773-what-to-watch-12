import { Link } from 'react-router-dom';
import { useState } from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {setGenre} from '../../store/action';
import { Film } from '../../types/film';
import cn from 'classnames';
import { DEFAULT_FILTER, MOVIE_CARDS_COUNT } from '../../const';
import FilmsList from '../movies-list/films-list';
import ShowMoreButton from '../show-more-button/show-more-button';
import { filterFilms } from '../../selectors/filter';

type GenresListProps = {
  films: Film[];
}

const createGenresList = (films: Film[]) => {
  const filmsGenres = films.map((film) => film.genre);
  filmsGenres.unshift(DEFAULT_FILTER);
  const uniqGenres = new Set(filmsGenres);
  return [...uniqGenres];
};

const sliceFilmsList = (filmsList: Film[], count: number) => {
  if (filmsList.length > MOVIE_CARDS_COUNT) {
    const slicedFilmsList = filmsList.slice(0, MOVIE_CARDS_COUNT + count);
    return slicedFilmsList;
  }
  return filmsList;
};

function GenresList(props: GenresListProps): JSX.Element {
  const genre = useAppSelector((state) => state.genre);
  const dispatch = useAppDispatch();

  const filteredFilmsList = filterFilms(props.films, genre);

  const[count, setCount] = useState(0);
  const slicedFilms = sliceFilmsList(filteredFilmsList, count);

  const newLength = Math.min(filteredFilmsList.length, slicedFilms.length);

  return (
    <>
      <ul className="catalog__genres-list">
        {createGenresList(props.films).map((filmsGenre) => (
          <li className={cn('catalog__genres-item', { 'catalog__genres-item--active': genre === filmsGenre })} key={filmsGenre}>
            <Link to='' className="catalog__genres-link" onClick={() => {
              dispatch(setGenre({ genre: filmsGenre }));
              setCount(0);
            }}
            >{filmsGenre}
            </Link>
          </li>
        ))}
      </ul>
      <FilmsList films={slicedFilms} />
      {filteredFilmsList.length > slicedFilms.length &&
         <ShowMoreButton onShowMoreButtonClick={() => setCount(newLength)}/>}
    </>
  );
}

export default GenresList;
