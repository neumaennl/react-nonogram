import { useState, useEffect } from "react";

export const useTimer = ({ start, pause, reset }) => {
  const [time, setTime] = useState({ seconds: 0, minutes: 0 });

  useEffect(() => {
    const IncrementTimer = () => {
      setTime(c => {
        let s = c.seconds,
          m = c.minutes;
        if (s + 1 > 60) {
          s = 0;
          m++;
        } else {
          s++;
        }

        return { seconds: s, minutes: m };
      });
    };

    const ResetTimer = () => {
      setTime({ seconds: 0, minutes: 0 });
    };

    let timerId;
    if (start && !reset) {
      timerId = setInterval(IncrementTimer, 1000);
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
  }, [setTime, pause, start, reset]);

  return time;
};
