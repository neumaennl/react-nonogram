import {useEffect, useRef} from 'react';

type IntervalCallback = () => void;

/**
 * call the given callback every `delay` milliseconds unless the delay is `null`, then don't call the callback at all.
 * @param callback the callback to call regularly
 * @param delay the delay between calls to `callback`
 */
export default function useInterval(callback: IntervalCallback, delay: number | null) {
  const savedCallback = useRef<IntervalCallback>(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const tick = () => {
      if (savedCallback.current) {
        savedCallback.current();
      }
    };
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
