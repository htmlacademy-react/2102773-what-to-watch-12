import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
import { logoutAction } from '../../store/api-actions';
import { getAvatar } from '../../services/token';
import { AppRoute } from '../../const';

function Avatar(): JSX.Element {

  const dispatch = useAppDispatch();
  const avatarUrl = getAvatar();
  const navigate = useNavigate();

  return (
    <ul className="user-block">
      <li className="user-block__item">
        <div className="user-block__avatar">
          <img src={avatarUrl} alt="User avatar" width="63" height="63" onClick={() => navigate(AppRoute.MyList)} />
        </div>
      </li>
      <li className="user-block__item">
        <Link className="user-block__link"
          onClick={(evt) => {
            evt.preventDefault();
            dispatch(logoutAction());
          }}
          to={'/'}
        >Sign out
        </Link>
      </li>
    </ul>
  );
}

export default Avatar;
