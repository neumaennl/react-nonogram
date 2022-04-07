import { CellCoords } from './types'

// Changes field coords into convenient Map key
export function coordsToKey([x, y]: CellCoords): string {
  return `[${x},${y}]`;
}

/**
 * Parses number of seconds to (HH:)MM:SS format
 */
export function formatSeconds(secondsCount: number): string {
  let hours: number | string = Math.floor(secondsCount / 3600);
  let minutes: number | string = Math.floor((secondsCount - hours * 3600) / 60);
  let seconds: number | string = secondsCount - hours * 3600 - minutes * 60;

  if (hours < 10) {
    hours = `0${hours}`;
  }

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  return `${hours !== '00' ? `${hours}:` : ``}${minutes}:${seconds}`;
}
