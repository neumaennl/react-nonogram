import { useState, useEffect } from "react";

export const useTimer = ({ start, pause, reset, initialTime }: { start: boolean, pause: boolean, reset: boolean, initialTime: { minutes: number, seconds: number } }) => {
  const [time, setTime] = useState(initialTime);

  useEffect(() => {
    const DecrementTimer = () => {
      setTime(c => {
        let s = c.seconds,
          m = c.minutes;
        if (s - 1 < 0) {
          if (m !== 0) {
            s = 59;
            if (m - 1 < 0) {
              m = 0;
            } else {
              m--;
            }
          }
        } else {
          s--;
        }

        return { seconds: s, minutes: m };
      });
    };

    const ResetTimer = () => {
      setTime(initialTime);
    };

    let timerId: number | undefined;
    if (start && !reset) {
      timerId = window.setInterval(DecrementTimer, 1000);
    } else if (pause) {
      if (timerId) {
        clearInterval(timerId);
      }
    } else if (reset) {
      if (timerId) {
        clearInterval(timerId);
      }
      ResetTimer();
    }

    return () => {
      clearInterval(timerId);
    };
  }, [setTime, pause, start, reset, initialTime]);

  return time;
};
