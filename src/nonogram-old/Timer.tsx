import { FunctionComponent } from 'react';
import { Result, State } from './types';
import { useTimer } from './timerHook';

export const Timer: FunctionComponent<{ state: State; }> = ({ state }) => {

  const time = useTimer({
    start: state.win === Result.undefined,
    pause: state.win !== Result.undefined,
    reset: false,
    initialTime: { minutes: 30, seconds: 0 }
  });

  if (time.minutes === 0 && time.seconds === 0) {
    state.win = Result.lost;
    state.msg = "You ran out of time.";
  }

  return <>
    <div className="timer">
      {time.minutes.toString().padStart(2, "0") +
        ":" +
        time.seconds.toString().padStart(2, "0")}
    </div>
  </>;
};
