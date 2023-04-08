import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
import { AppRoute } from '../../const';
import {Film} from '../../types/film';
import { useElementListener } from '../../hooks/use-element-listener';
import LoadingScreen from '../loading-screen/loading-screen';
import { useAppDispatch } from '../../hooks';
import { fetchFilmByIdAction } from '../../store/api-actions';

type MoviePlayerProps = {
  film: Film | null;
}

function MoviePlayer(props: MoviePlayerProps): JSX.Element {
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
    if (props.film === null) {
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

  }, [currentTime, dispatch, durationTime, isLoaded, isPlaying, params.id, props.film]);

  if (props.film === null) {
    return <LoadingScreen/>;
  }

  const fullScreenHandler = () => {
    if (videoRef.current?.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  return (
    <div className="player">
      <video src={props.film.videoLink} ref={videoRef}
        className="player__video" poster={props.film.previewImage}
      >
      </video>

      <button type="button" className="player__exit" onClick={() => navigate(`${AppRoute.Films}${String(props.film?.id)}`)}>Exit</button>

      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress className="player__progress" value={currentTime} max={durationTime}></progress>
            <div className="player__toggler" style={{left: `${progress}%`}}>Toggler</div>
          </div>
          <div className="player__time-value">{moment(remainingTime * 1000).format('mm:ss')}</div>
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
