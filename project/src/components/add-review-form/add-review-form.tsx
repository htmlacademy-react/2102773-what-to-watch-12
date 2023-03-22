import { ChangeEvent, FormEvent, Fragment, useState } from 'react';

const starCount = 10;
const ratingStars = [...Array(starCount).keys()];

function AddReviewForm(): JSX.Element {

  const [formData, setFormData] = useState({
    starId: '',
    text: '',
  });

  const onChange = ({target}: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({...formData, [target.name]: target.value});
  };

  const formSubmitHandler = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
  };

  return (
    <form action="#" className="add-review__form" onSubmit={formSubmitHandler}>
      <div className="rating__stars">
        {ratingStars.map((ratingStar) => (
          <Fragment key={ratingStar}>
            <input className="rating__input" id={`star-${starCount - ratingStar}`} type="radio" name="starId" value={starCount - ratingStar} onChange={onChange}/>
            <label className="rating__label" htmlFor={`star-${starCount - ratingStar}`}>Rating {starCount - ratingStar}</label>
          </Fragment>
        ))}
      </div>

      <div className="add-review__text">
        <textarea className="add-review__textarea" name="text" id="review-text" placeholder="Review text" value={formData.text} onChange={onChange}></textarea>
        <div className="add-review__submit">
          <button className="add-review__btn" type="submit">Post</button>
        </div>
      </div>
    </form>
  );
}

export default AddReviewForm;
