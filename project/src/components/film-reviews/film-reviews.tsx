import { Reviews } from '../../types/review';
import { format } from 'date-fns';

type FilmReviewsProps = {
  filmReviews: Reviews;
}

function FilmReviewsList(props: FilmReviewsProps): JSX.Element {

  const oneСolumnReview = props.filmReviews.slice(0, (props.filmReviews.length / 2) + 1);
  const twoColumnReviev = props.filmReviews.slice((props.filmReviews.length / 2) + 1, props.filmReviews.length);

  return (
    <div className="film-card__reviews film-card__row">
      <div className="film-card__reviews-col">
        {oneСolumnReview?.map((review) => (
          <div className="review" key={review.id}>
            <blockquote className="review__quote">
              <p className="review__text">{review.comment}</p>

              <footer className="review__details">
                <cite className="review__author">{review.user.name}</cite>
                <time className="review__date" dateTime={review.date}>{format(new Date(review.date), 'MMMM dd, yyyy')}</time>
              </footer>
            </blockquote>
            <div className="review__rating">{review.rating}</div>
          </div>))}
      </div>
      <div className="film-card__reviews-col">
        {twoColumnReviev?.map((review) => (
          <div className="review" key={review.id}>
            <blockquote className="review__quote">
              <p className="review__text">{review.comment}</p>

              <footer className="review__details">
                <cite className="review__author">{review.user.name}</cite>
                <time className="review__date" dateTime={review.date}>{format(new Date(review.date), 'MMMM dd, yyyy')}</time>
              </footer>
            </blockquote>
            <div className="review__rating">{review.rating}</div>
          </div>))}
      </div>
    </div>
  );
}

export default FilmReviewsList;
