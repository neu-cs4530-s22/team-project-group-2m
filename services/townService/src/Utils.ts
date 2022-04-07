/**
 * This function exists solely to help satisfy the linter + typechecker when it looks over the
 * stubbed (not yet implemented by you) functions. Remove calls to it as you go.
 *
 * @param _args
 */
// eslint-disable-next-line
export function removeThisFunctionCallWhenYouImplementThis(_args1?: any, _args2?: any): Error {
  return new Error('Unimplemented');
}

// eslint-disable-next-line
export function logError(err: any): void {
  // eslint-disable-next-line no-console
  console.trace(err);
}

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
