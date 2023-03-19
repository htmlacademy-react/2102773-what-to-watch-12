import {useEffect, useRef, MouseEventHandler} from 'react';

type VideoPlayerProps = {
  src: string;
  poster: string;
  isPlaying: boolean;
  onMouseOver: MouseEventHandler<HTMLElement>;
  onMouseLeave: MouseEventHandler<HTMLElement>;
}

function VideoPlayer(props: VideoPlayerProps): JSX.Element {

  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {

    if (videoRef.current === null) {
      return;
    }

    if (props.isPlaying) {
      videoRef.current.play();
      //console.log('1');
      return;
    }

    videoRef.current.pause();
    videoRef.current.currentTime = 0;
    videoRef.current.src = props.src;

    // return () => {
    //   console.log('3');
    //   //isVideoPlayerMounted = false;
    // };
  }, [props.isPlaying, props.src]);

  return (
    <div
      onMouseOver={props.onMouseOver}
      onMouseLeave={props.onMouseLeave}
      className="small-film-card__image"
    >
      <video src={props.src} className="player__video" poster={props.poster} ref={videoRef} muted></video>
    </div>
  );
}

export default VideoPlayer;
