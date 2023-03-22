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

const moviePageTabs = Object.values(MoviePageState);

function FilmTabs(props: FilmTabsProps): JSX.Element {
  const [tab, setActiveTab] = useState(MoviePageState.Overview);
  const renderTab = () => {
    switch (tab) {
      case MoviePageState.Overview:
        return <FilmOverviewList films={props.films}/>;
      case MoviePageState.Reviews:
        return <FilmReviewsList filmReview={props.filmReview}/>;
      case MoviePageState.Details:
        return <FilmDetailsList films={props.films}/>;
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

