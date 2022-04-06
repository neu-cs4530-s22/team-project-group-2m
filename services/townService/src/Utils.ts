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

export const YOUTUBE_URL_PATTERN = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/gm;

/**
   * Validates whether a given url is a url to a publicly available video streaming website
   * @param url - a publicly accessible web address
   * @param regExpPattern - a regular expression which accepts strings in the form of video links
   * @returns - a valid url or undefined
   */
 export function validURL(url: string, pattern: RegExp): string | undefined {
  if (url.match(pattern) != null) {
    return url;
  }
  return undefined;
}
