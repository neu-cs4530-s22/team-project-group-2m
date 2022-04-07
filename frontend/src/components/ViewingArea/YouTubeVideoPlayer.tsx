import React from 'react';
import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import { VideoStatus } from '../../CoveyTypes';
import VideoPlayer from "./VideoPlayer";

/**
 * youtubeLinkMatcher is a regex expression that matches upon a YouTube link
 * and upon execution returns an array of the parts of that link. A video ID can
 * be extracted from this. Adapted from:
 * https://stackoverflow.com/questions/3452546/how-do-i-get-the-youtube-video-id-from-a-url
 */
export const youtubeLinkMatcher = /(youtu.*be.*)\/(watch\?v=|embed\/|v|shorts|)(.*?((?=[&#?])|$))/gm;

/**
 * Retrieves a YouTube video ID from a YouTube link.
 * @param url - a YouTube URL.
 * @returns the video ID contained within the url.
 */
export function youtubeVideoIDFromURL(url: string): string {
  return youtubeLinkMatcher.exec(url)?.[3] ?? '';
}

type VideoStatusChangedFunction = (a: VideoStatus) => boolean;

/**
 * YouTubeVideoPlayer is a concrete implementation of a VideoPlayer
 * specifically meant to control and display videos from YouTube.
 */
export class YouTubeVideoPlayer implements VideoPlayer {

  private videoStatus: VideoStatus;

  // TODO: when implemented
  private onVideoStatusChanged: VideoStatusChangedFunction;

  constructor(videoStatus: VideoStatus, onVideoStatusChanged: VideoStatusChangedFunction) {
    this.videoStatus = videoStatus;
    this.onVideoStatusChanged = onVideoStatusChanged;
  }

  setURL(url: string): boolean {
    this.videoStatus.url = url;
    return this.onVideoStatusChanged({ ...this.videoStatus, url });
  }

  setElapsed(elapsed: number): boolean {
    this.videoStatus.elapsed = elapsed;
    return this.onVideoStatusChanged({ ...this.videoStatus, elapsed });
  }

  setIsPaused(isPaused: boolean): boolean {
    this.videoStatus.isPaused = isPaused;
    return this.onVideoStatusChanged({ ...this.videoStatus, isPaused });
  }

  /**
   * Generated the query parameters for the YouTube embed
   * @returns a string with all the query parameters we need for the embed,
   * including the start time, hiding controls, hiding the YouTube logo,
   * and disabling autoplay.
   */
  private queryParams(): string {
    let params = `start=${this.videoStatus.elapsed}`;
    // disable the embed controls
    params += '&controls=0';
    // disable autoplay
    params += 'autoplay=1';
    // remove the large YouTube logo
    params += 'modestbranding=1';
    return params;
  }

  videoComponent(): JSX.Element {
    // TODO: add url, progress bar, and play/pause button when implemented
    return (
      <LiteYouTubeEmbed
        id={youtubeVideoIDFromURL(this.videoStatus.url)}
        title={this.videoStatus.url}
        params={this.queryParams()}
      />
    );
  }

}
