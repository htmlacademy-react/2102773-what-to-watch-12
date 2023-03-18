import { ChangeEvent, FormEvent, useState } from 'react';

function AddReviewForm(): JSX.Element {
  const starCount = 10;
  const ratingStars = [...Array(starCount) as [number]];

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
        {ratingStars.map((_, index) => (
          <>
            <input className="rating__input" key={`${starCount - index}`} id={`star-${starCount - index}`} type="radio" name="starId" value={starCount - index} onChange={onChange}/>
            <label className="rating__label" key={`${starCount - index + 1}`} htmlFor={`star-${starCount - index}`}>Rating {starCount - index}</label>
          </>
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
