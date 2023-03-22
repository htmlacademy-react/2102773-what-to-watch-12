import { FilmReviews } from '../../types/review';
import dayjs from 'dayjs';

type FilmReviewsProps = {
  filmReview: FilmReviews | undefined;
}

function FilmReviewsList(props: FilmReviewsProps): JSX.Element {

  return (
    <div className="film-card__reviews film-card__row">
      <div className="film-card__reviews-col">
        {props.filmReview?.reviews.map((review) => (
          <div className="review" key={review.id}>
            <blockquote className="review__quote">
              <p className="review__text">{review.comment}</p>

              <footer className="review__details">
                <cite className="review__author">{review.user.name}</cite>
                <time className="review__date" dateTime={review.date}>{dayjs(review.date).format('MMMM DD, YYYY')}</time>
              </footer>
            </blockquote>

            <div className="review__rating">{review.rating}</div>
          </div>))}

      </div>
    </div>
  );
}

export default FilmReviewsList;
