import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppRoute, SECONDS_IN_HOUR } from '../../const';
import { useElementListener } from '../../hooks/use-element-listener';
import LoadingScreen from '../loading-screen/loading-screen';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchFilmByIdAction } from '../../store/api-actions';
import { format } from 'date-fns';
import { movieSelector } from '../../store/data/selectors';

const formatRemainingTime = (time: number) => {
  if (time < SECONDS_IN_HOUR) {
    return format(time * 1000, 'mm:ss');
  }
  else {
    return format(time * 1000, 'hh:mm:ss');
  }
};

function MoviePlayer(): JSX.Element {

  const film = useAppSelector(movieSelector);
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [remainingTime, setRemainingTime] = useState(0);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const dispatch = useAppDispatch();
  const params = useParams();

  useElementListener('loadeddata', videoRef, () => setIsLoaded(true));

  const currentTime = videoRef.current?.currentTime as number;
  const durationTime = videoRef.current?.duration as number;
  const progress = (currentTime / durationTime) * 100;

  useEffect(() => {
    if (film.data === null) {
      dispatch(fetchFilmByIdAction(String(params.id)));
    }

    if (videoRef.current === null || !isLoaded) {
      return;
    }

    if (isPlaying && isLoaded) {
      videoRef.current.muted = true;
      videoRef.current.play();
    }

    else {
      videoRef.current.pause();
    }

    videoRef.current.ontimeupdate = () => setRemainingTime(durationTime - currentTime);

  }, [currentTime, dispatch, durationTime, isLoaded, isPlaying, params.id, film]);

  if (film.data === null) {
    return <LoadingScreen/>;
  }

  const fullScreenHandler = () => {
    if (videoRef.current?.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  return (
    <div className="player">
      <video src={film.data.videoLink} ref={videoRef}
        className="player__video" poster={film.data.previewImage}
      >
      </video>

      <button type="button" className="player__exit" onClick={() => navigate(`${AppRoute.Films}${String(film.data?.id)}`)}>Exit</button>

      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress className="player__progress" value={currentTime} max={durationTime}></progress>
            <div className="player__toggler" style={{left: `${progress}%`}}>Toggler</div>
          </div>
          <div className="player__time-value">{formatRemainingTime(remainingTime)}</div>
        </div>

        <div className="player__controls-row">
          <button type="button" className="player__play" onClick={() => setIsPlaying(!isPlaying)}>
            <svg viewBox={isPlaying ? '0 0 14 21' : '0 0 19 19'} width={isPlaying ? '14' : '19'}
              height={isPlaying ? '21' : '19'}
            >
              <use xlinkHref={isPlaying ? '#pause' : '#play-s'}></use>
            </svg>
            <span>{isPlaying ? 'Pause' : 'Play'}</span>
          </button>
          <div className="player__name">Transpotting</div>

          <button type="button" className="player__full-screen" onClick={fullScreenHandler}>
            <svg viewBox="0 0 27 27" width="27" height="27">
              <use xlinkHref="#full-screen"></use>
            </svg>
            <span>Full screen</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default MoviePlayer;
