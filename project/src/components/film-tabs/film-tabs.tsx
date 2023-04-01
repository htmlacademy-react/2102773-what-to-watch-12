import {useState} from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import {Film} from '../../types/film';
import { Reviews } from '../../types/review';
import { MoviePageState } from '../../const';
import FilmDetailsList from '../../components/film-details/film-details';
import FilmReviewsList from '../../components/film-reviews/film-reviews';
import FilmOverviewList from '../../components/film-overview/film-overview';

type FilmTabsProps = {
  film: Film | undefined;
  filmReview: Reviews | undefined;
}

const moviePageTabs = Object.values(MoviePageState);

function FilmTabs(props: FilmTabsProps): JSX.Element {
  const [tab, setActiveTab] = useState(MoviePageState.Overview);
  const renderTab = () => {
    switch (tab) {
      case MoviePageState.Overview:
        return <FilmOverviewList film={props.film}/>;
      case MoviePageState.Reviews:
        return <FilmReviewsList filmReview={props.filmReview}/>;
      case MoviePageState.Details:
        return <FilmDetailsList film={props.film}/>;
    }
  };

  return (
    <div className="film-card__desc">
      <nav className="film-nav film-card__nav">
        <ul className="film-nav__list">
          {moviePageTabs.map((moviePageTab) => (
            <li className={cn('film-nav__item', {'film-nav__item--active': tab === moviePageTab})} key={moviePageTab}>
              <Link className="film-nav__link" onClick={() => setActiveTab(moviePageTab)} to=''>{moviePageTab}</Link>
            </li>
          ))}
        </ul>
      </nav>
      {renderTab()}
    </div>
  );
}

export default FilmTabs;

