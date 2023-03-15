import { ChangeEvent, FormEvent, useState } from 'react';

function AddReviewForm(): JSX.Element {
  const starCount = 10;
  const ratingStars = [...Array(starCount) as [number]];

  const [formData, setFormData] = useState({
    starId: '',
    text: '',
  });

  const ratingChangeHandle = ({target}: ChangeEvent<HTMLInputElement>) => setFormData({...formData, starId: target.value});
  const textChangeHandle = ({target}: ChangeEvent<HTMLTextAreaElement>) => setFormData({...formData, text: target.value});

  const formSubmitHandler = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    //console.log(formData.text, formData.starId);
  };

  return (
    <form action="#" className="add-review__form" onSubmit={formSubmitHandler}>
      <div className="rating__stars">
        {ratingStars.map((_, index) => (
          <>
            <input className="rating__input" id={`star-${starCount - index}`} type="radio" name="rating" value={starCount - index} onChange={ratingChangeHandle}/>
            <label className="rating__label" htmlFor={`star-${starCount - index}`}>Rating {starCount - index}</label>
          </>
        ))}
      </div>

      <div className="add-review__text">
        <textarea className="add-review__textarea" name="review-text" id="review-text" placeholder="Review text" value={formData.text} onChange={textChangeHandle}></textarea>
        <div className="add-review__submit">
          <button className="add-review__btn" type="submit">Post</button>
        </div>
      </div>
    </form>
  );
}

export default AddReviewForm;
