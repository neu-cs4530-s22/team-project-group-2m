import React from 'react';
import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import { VideoStatus } from '../../CoveyTypes';
import VideoPlayer from "./VideoPlayer";

/**
 * Retrieves a YouTube video ID from a YouTube link.
 * @param url - a YouTube URL.
 * @returns the video ID contained within the url.
 */
export function youtubeVideoIDFromURL(url: string): string {
  const regex = /(youtu.*be.*)\/(watch\?v=|embed\/|v|shorts|)(.*?((?=[&#?])|$))/gm;
  return regex.exec(url)?.[3] ?? '';
}

type VideoStatusChangedFunction = (a: VideoStatus) => boolean;

/**
 * YouTubeVideoPlayer is a concrete implementation of a VideoPlayer
 * specifically meant to control and display videos from YouTube.
 */
export class YouTubeVideoPlayer implements VideoPlayer {

  private videoStatus: VideoStatus | undefined;

  // TODO: when implemented
  private onVideoStatusChanged: VideoStatusChangedFunction;

  constructor(videoStatus: VideoStatus | undefined, onVideoStatusChanged: VideoStatusChangedFunction) {
    this.videoStatus = videoStatus;
    this.onVideoStatusChanged = onVideoStatusChanged;
  }

  setURL(url: string): boolean {
    if (this.videoStatus) {
      this.videoStatus.url = url;
      return this.onVideoStatusChanged({ ...this.videoStatus, url });
    }
    return false;
  }

  setElapsed(elapsed: number): boolean {
    if (this.videoStatus) {
      this.videoStatus.elapsed = elapsed;
      return this.onVideoStatusChanged({ ...this.videoStatus, elapsed });
    }
    return false;
  }

  setIsPaused(isPaused: boolean): boolean {
    if (this.videoStatus) {
      this.videoStatus.isPaused = isPaused;
      return this.onVideoStatusChanged({ ...this.videoStatus, isPaused });
    }
    return false;
  }

  /**
   * Generated the query parameters for the YouTube embed
   * @returns a string with all the query parameters we need for the embed,
   * including the start time, hiding controls, hiding the YouTube logo,
   * and disabling autoplay.
   */
  private queryParams(): string {
    if (this.videoStatus) {
      let params = `start=${Math.floor(this.videoStatus.elapsed)}`;
      if (this.videoStatus.isPaused) {
        params += '&autoplay=1';
      } else {
        params += '&autoplay=0';
      }
      // disable the embed controls
      params += '&controls=0';
      // remove the large YouTube logo
      params += '&modestbranding=1';
      // disable keyboard controls
      params += '&disablekb=1';
      return params;
    }
    return '';
  }

  videoComponent(): JSX.Element {
    if (this.videoStatus) {
      return (
        <div>
          <LiteYouTubeEmbed
            id={youtubeVideoIDFromURL(this.videoStatus.url)}
            title={this.videoStatus.url}
            params={this.queryParams()}
          />
        </div>
      );
    }
    return <></>;
  }

}
