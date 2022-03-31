import React from 'react';
import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import { VideoStatus } from '../../../../services/townService/src/CoveyTypes';
import VideoPlayer from "./VideoPlayer";

/**
 * YouTubeVideoPlayer is a concrete implementation of a VideoPlayer
 * specifically meant to control and display videos from YouTube.
 */
class YouTubeVideoPlayer implements VideoPlayer {

  private videoStatus: VideoStatus;

  constructor(videoStatus: VideoStatus) {
    this.videoStatus = videoStatus;
  }

  setURL(url: string): boolean {
    this.videoStatus.url = url;
    return true;
  }

  setTimestamp(timestamp: string): boolean {
    this.videoStatus.timestamp = timestamp;
    return true;
  }

  setIsPaused(isPaused: boolean): boolean {
    this.videoStatus.isPaused = isPaused;
    return true;
  }

  /**
   * Retrieves a YouTube video ID from a YouTube link.
   * @returns the video ID contained within the url.
   */
  private videoID(): string {
    // adapted from https://stackoverflow.com/questions/3452546/how-do-i-get-the-youtube-video-id-from-a-url
    const regex = /(youtu.*be.*)\/(watch\?v=|embed\/|v|shorts|)(.*?((?=[&#?])|$))/gm;
    return regex.exec(this.videoStatus.url)?.[3] ?? '';
  }

  /**
   * Converts the timestamp (in the form MM:SS) to a number of seconds.
   * @returns the number of seconds represented by the timestamp.
   */
  private timestampToSeconds(): number {
    const { timestamp } = this.videoStatus;
    const minutesString = timestamp.substring(0, timestamp.indexOf(':'));
    const secondsString = timestamp.substring(timestamp.indexOf(':') + 1);
    return parseInt(minutesString, 10) * 60 + parseInt(secondsString, 10);
  }

  /**
   * Generated the query parameters for the YouTube embed
   * @returns a string with all the query parameters we need for the embed,
   * including the start time, hiding controls, hiding the YouTube logo,
   * and disabling autoplay.
   */
  private queryParams(): string {
    let params = `start=${this.timestampToSeconds()}`;
    // disable the embed controls
    params += '&controls=0';
    // disable autoplay
    params += 'autoplay=1';
    // remove the large YouTube logo
    params += 'modestbranding=1';
    return params;
  }

  videoComponent(): JSX.Element {
    return (
      <LiteYouTubeEmbed
        id={this.videoID()}
        title={this.videoStatus.url}
        params={this.queryParams()}
      />
    );
  }

}
