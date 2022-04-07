/**
 * A regular expression that matches youtube links to youtube videos only
 * Does not match with youtube homepage, user pages, playlists, search pages, channels, or non-youtube urls
 */
 export const YOUTUBE_URL_PATTERN = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/gm;

 /**
    * Validates whether a given url is a url to a publicly available video streaming website
    * @param url - a publicly accessible web address
    * @param regExpPattern - a regular expression which accepts strings in the form of video links
    * @returns - a valid url or undefined
    */
  export function validURL(url: string, pattern: RegExp): boolean {
   return !!url.match(pattern);
 }
 