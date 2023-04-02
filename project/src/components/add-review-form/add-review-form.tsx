import { ChangeEvent, FormEvent, Fragment, useEffect, useState } from 'react';
import { AddReview } from '../../types/review';
import { useAppDispatch } from '../../hooks';
import { addReviewAction } from '../../store/api-actions';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../const';


type AddReviewFormProps = {
  filmId: string;
}

const starCount = 10;
const ratingStars = [...Array(starCount).keys()];

function AddReviewForm(props: AddReviewFormProps): JSX.Element {

  const dispatch = useAppDispatch();
  const redirect = useNavigate();

  const [formData, setFormData] = useState({
    rating: 0,
    comment: '',
  });
  const [isDisable, setDisable] = useState(true);

  useEffect(() => {
    (formData.rating !== 0 && formData.comment.length > 50 && formData.comment.length < 400) ? setDisable(false) : setDisable(true);
  }, [formData.comment.length, formData.rating, isDisable]);

  const onChange = ({target}: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({...formData, [target.name]: target.value});
  };

  const onSubmit = (addReview: AddReview) => {
    dispatch(addReviewAction(addReview));
  };

  const formSubmitHandler = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (!isDisable) {
      onSubmit({
        rating: formData.rating,
        comment: formData.comment,
        filmId: props.filmId
      });
      redirect(`${AppRoute.Films}${String(props.filmId)}`);
    }
  };

  return (
    <form action="#" className="add-review__form" onSubmit={formSubmitHandler}>
      <div className="rating__stars">
        {ratingStars.map((ratingStar) => (
          <Fragment key={ratingStar}>
            <input className="rating__input" id={`star-${starCount - ratingStar}`} type="radio" name="rating" value={starCount - ratingStar} onChange={onChange}/>
            <label className="rating__label" htmlFor={`star-${starCount - ratingStar}`}>Rating {starCount - ratingStar}</label>
          </Fragment>
        ))}
      </div>

      <div className="add-review__text">
        <textarea className="add-review__textarea" name="comment" id="review-text" placeholder="Review text" value={formData.comment} onChange={onChange}>
        </textarea>
        <div className="add-review__submit">
          <button className="add-review__btn" type="submit" disabled={isDisable}>Post</button>
        </div>
      </div>
    </form>
  );
}

export default AddReviewForm;
