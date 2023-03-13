import { FilmReviews } from '../../types/review';
import { useParams } from 'react-router-dom';

type FilmReviewsProps = {
  filmReviews: FilmReviews[];
}

function FilmReviewsList(props: FilmReviewsProps): JSX.Element {
  const params = useParams();
  const [filmReviews] = props.filmReviews.filter((review) => review.id === Number(params.id));

  return (
    <div className="film-card__reviews film-card__row">
      <div className="film-card__reviews-col">
        {filmReviews.reviews.map((review) => (
          <div className="review" key={review.id}>
            <blockquote className="review__quote">
              <p className="review__text">Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the director&apos;s funniest and most exquisitely designed films in years.</p>

              <footer className="review__details">
                <cite className="review__author">Kate Muir</cite>
                <time className="review__date" dateTime="2016-12-24">December 24, 2016</time>
              </footer>
            </blockquote>

            <div className="review__rating">8,9</div>
          </div>))}

      </div>
    </div>
  );
}

export default FilmReviewsList;
