import {useEffect, useRef, MouseEventHandler} from 'react';
import { DELAY } from '../../const';

type VideoPlayerProps = {
  src: string;
  poster: string;
  isPlaying: boolean;
  alt: string;
  onMouseOver: MouseEventHandler<HTMLElement>;
  onMouseLeave: MouseEventHandler<HTMLElement>;
}

function VideoPlayer(props: VideoPlayerProps): JSX.Element {

  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {

    if (videoRef.current === null) {
      return;
    }

    setTimeout(() => {
      if (props.isPlaying && videoRef.current) {
        videoRef.current.play();
        videoRef.current.muted = true;
      }
    }, DELAY);

  }, [props.isPlaying]);

  return (
    <div onMouseOver={props.onMouseOver} onMouseLeave={props.onMouseLeave} className="small-film-card__image">

      {props.isPlaying ? <video src={props.src} className="player__video" poster={props.poster} ref={videoRef}></video> :
        <img src={props.poster} alt={props.alt} width="280" height="175" />}

    </div>
  );
}

export default VideoPlayer;
