/**
  * A regular expression that matches youtube links to youtube videos only
  * Does not match with youtube homepage, user pages, playlists, search pages, channels, or non-youtube urls
  */
export const YOUTUBE_URL_PATTERN = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/gm;

/**
  * Validates whether a given url is a url to a publicly available video streaming website
  * @param url - a publicly accessible web address
  * @param regExpPattern - a regular expression which accepts strings in the form of video links
  * @returns - whether the url is valid or not
  */
export function validURL(url: string, pattern: RegExp): boolean {
  return !!url.match(pattern);
}

/**
 * Retrieves video metadata from a given url
 * @param url - a publicly accessible web address
 * @returns a promise that resolves to video metadata for a given youtube url
 */
export async function videoDuration(url: string): Promise<string> {
  const response = await fetch(url);
  const data = await response.json();
  return data.items["0"].contentDetails.duration;
}

/**
 * Retrieves the length of a youtube video in seconds from a given url
 * @param url - a publicly accessible web address
 * @returns the length of a video in seconds from a given url
 */
export async function fetchYoutubeVideoDuration(url: string): Promise<number> {
  // get video ID from VideoStatus url
  const regex = /(youtu.*be.*)\/(watch\?v=|embed\/|v|shorts|)(.*?((?=[&#?])|$))/gm;
  const videoID = regex.exec(url)?.[3] ?? '';
  // use video ID to access API and get relevant info
  const apiURL = `https://www.googleapis.com/youtube/v3/videos?id=${videoID}&part=contentDetails&key=AIzaSyA7g-IM__xlupaBCCmU20LG4dJjC1IrUSc`;
  // get video duration in ISO 8601 format ex: PT9H1M20S -> 9 hours 1 min 20 sec
  const duration: string = await videoDuration(apiURL);
  // convert iso 8601 into hour min sec variables
  let shortenedDuration = duration.substring(2);
  let maxHours = 0;
  let maxMinutes = 0;
  let maxSeconds = 0;
  if (shortenedDuration.includes('H')) {
    maxHours = parseInt(shortenedDuration.split('H')[0], 10);
    shortenedDuration = shortenedDuration.replace(`${maxHours}H`, "");
  }
  if (shortenedDuration.includes('M')) {
    maxMinutes = parseInt(shortenedDuration.split('M')[0], 10);
    shortenedDuration = shortenedDuration.replace(`${maxMinutes}M`, "");
  }
  if (shortenedDuration.includes('S')) {
    maxSeconds = parseInt(shortenedDuration.split('S')[0], 10);
  }
  return maxHours * 360 + maxMinutes * 60 + maxSeconds
}

/**
 * VideoStatus represents the state of a video.
 */
 export type VideoStatus = {
  // The URL of the video.
  url: string;
  // The total number of seconds in the video.
  length: number;
  // The number of seconds that have passed since the video has begun.
  elapsed: number;
  // Whether or not the video is currently paused.
  isPaused: boolean;
};
