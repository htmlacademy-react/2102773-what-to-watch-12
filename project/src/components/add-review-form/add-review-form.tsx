import { ChangeEvent, FormEvent, Fragment, useState } from 'react';
import { useAppDispatch } from '../../hooks';
import { sendReviewAction } from '../../store/api-actions';
import { useNavigate } from 'react-router-dom';
import { AppRoute, ReviewLength } from '../../const';

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

  const isEnable = formData.rating !== 0 && formData.comment.length > ReviewLength.Min && formData.comment.length < ReviewLength.Max;

  const onChange = ({target}: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({...formData, [target.name]: target.value});
  };

  const formSubmitHandler = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (isEnable) {
      dispatch(sendReviewAction({
        rating: formData.rating,
        comment: formData.comment,
        filmId: props.filmId
      }));
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
          <button className="add-review__btn" type="submit" disabled={!isEnable}>Post</button>
        </div>
      </div>
    </form>
  );
}

export default AddReviewForm;
