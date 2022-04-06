import { validURL, YOUTUBE_URL_PATTERN } from './URLForm';

describe('URLForm', () => {
  describe('YouTube', () => {
    describe('validURL', () => {
      const VALID_STANDARD_URL = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
      const VALID_START_TIME_URL = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ&t=1';
      const VALID_EMBED_URL = 'https://www.youtube.com/embed/dQw4w9WgXcQ';
      const VALID_YT_INTERRUPT_URL = 'https://youtu.be/dQw4w9WgXcQ&feature=channel';
      const VALID_NO_COOKIE_URL = 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ';
      const VALID_LONG_URL = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ&list=PLGup6kBfcU7Le5laEaCLgTKtlDcxMqGxZ&index=108'
      const VALID_SHORT_URL = 'https://youtu.be/dQw4w9WgXcQ';

      it('should accept a standard youtube url with youtube regular expression', () => {
        expect(validURL(VALID_STANDARD_URL, YOUTUBE_URL_PATTERN)).toBe(true);
      });
      it('should accept a timestamp youtube url with youtube regular expression', () => {
        expect(validURL(VALID_START_TIME_URL, YOUTUBE_URL_PATTERN)).toBe(true);
      });
      it('should accept an embed youtube url with youtube regular expression', () => {
        expect(validURL(VALID_EMBED_URL, YOUTUBE_URL_PATTERN)).toBe(true);
      });
      it('should accept a youtube interrupt url with youtube regular expression', () => {
        expect(validURL(VALID_YT_INTERRUPT_URL, YOUTUBE_URL_PATTERN)).toBe(true);
      });
      it('should accept a no-cookie youtube url with youtube regular expression', () => {
        expect(validURL(VALID_NO_COOKIE_URL, YOUTUBE_URL_PATTERN)).toBe(true);
      });
      it('should accept a long youtube url with youtube regular expression', () => {
        expect(validURL(VALID_LONG_URL, YOUTUBE_URL_PATTERN)).toBe(true);
      });
      it('should accept a youtube short url', () => {
        expect(validURL(VALID_SHORT_URL, YOUTUBE_URL_PATTERN)).toBe(true);
      });
      it('should reject a non-youtube url with youtube regular expression', () => {
        expect(validURL('https://www.google.com', YOUTUBE_URL_PATTERN)).toBe(false);
      });
      it('should reject youtube homepage url', () => {
        expect(validURL('https://www.youtube.com/', YOUTUBE_URL_PATTERN)).toBe(false);
      });
      it('should reject youtube channel url', () => {
        expect(validURL('https://www.youtube.com/channel/UC-9-kyTW8ZkZNDHQJ6FgpwQ', YOUTUBE_URL_PATTERN)).toBe(false);
      });
      it('should reject youtube user url', () => {
        expect(validURL('https://www.youtube.com/user/TheVerge', YOUTUBE_URL_PATTERN)).toBe(false);
      });
      it('should reject youtube playlist url', () => {
        expect(validURL('https://www.youtube.com/playlist?list=PL634F2B56B8C346A2', YOUTUBE_URL_PATTERN)).toBe(false);
      });
      it('should reject youtube search url', () => {
        expect(validURL('https://www.youtube.com/results?search_query=test', YOUTUBE_URL_PATTERN)).toBe(false);
      });
      it('should reject empty input', () => {
        expect(validURL('', YOUTUBE_URL_PATTERN)).toBe(false);
      });
      it('should reject nonsense input', () => {
        expect(validURL('!1q@2w#3e', YOUTUBE_URL_PATTERN)).toBe(false);
      });
    });
  });
});
