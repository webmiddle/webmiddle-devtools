export function formatTimestamp(timestamp, options = {}) {
  const date = new Date(timestamp);

  let hours = date.getHours();
  if (hours < 10) {
    hours = "0" + hours;
  }

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = "0" + minutes;
  }

  let seconds = date.getSeconds();
  if (seconds < 10) {
    seconds = "0" + seconds;
  }

  let milliseconds = date.getMilliseconds();
  if (milliseconds < 10) {
    milliseconds = "00" + milliseconds;
  } else if (milliseconds < 100) {
    milliseconds = "0" + milliseconds;
  }

  const timeString = `${hours}:${minutes}:${seconds}.${milliseconds}`;
  const dateString =
    date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear();

  return options.includeDate ? dateString + " " + timeString : timeString;
}
