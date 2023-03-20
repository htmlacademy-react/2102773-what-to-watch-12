import {useState} from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import {Film} from '../../types/film';
import { FilmReviews } from '../../types/review';
import { MoviePageState } from '../../const';
import FilmDetailsList from '../../components/film-details/film-details';
import FilmReviewsList from '../../components/film-reviews/film-reviews';
import FilmOverviewList from '../../components/film-overview/film-overview';

type FilmTabsProps = {
  films: Film | undefined;
  filmReview: FilmReviews | undefined;
}

function FilmTabs(props: FilmTabsProps): JSX.Element {

  const [tab, setActiveTab] = useState(MoviePageState.Overview);

  function setPageState () {
    switch (tab) {
      case MoviePageState.Overview:
        return <FilmOverviewList films={props.films}/>;
      case MoviePageState.Reviews:
        return <FilmReviewsList filmReview={props.filmReview}/>;
      case MoviePageState.Details:
        return <FilmDetailsList films={props.films}/>;
    }
  }

  return (
    <div className="film-card__desc">
      <nav className="film-nav film-card__nav">
        <ul className="film-nav__list">
          <li className={cn('film-nav__item', {'film-nav__item--active': tab === MoviePageState.Overview})}>
            <Link className="film-nav__link" onClick={() => setActiveTab(MoviePageState.Overview)} to=''>Overview</Link>
          </li>
          <li className={cn('film-nav__item', {'film-nav__item--active': tab === MoviePageState.Details})}>
            <Link className="film-nav__link" onClick={() => setActiveTab(MoviePageState.Details)} to=''>Details</Link>
          </li>
          <li className={cn('film-nav__item', {'film-nav__item--active': tab === MoviePageState.Reviews})}>
            <Link className="film-nav__link" onClick={() => setActiveTab(MoviePageState.Reviews)} to=''>Reviews</Link>
          </li>
        </ul>
      </nav>
      {setPageState()}
    </div>
  );
}

export default FilmTabs;

