import React from 'react';
import { VideoStatus } from '../../../../services/townService/src/CoveyTypes';
import VideoPlayer from "./VideoPlayer";

/**
 * YouTubeVideoPlayer is a concrete implementation of a VideoPlayer
 * specifically meant to control and display videos from YouTube.
 */
class YouTubeVideoPlayer implements VideoPlayer {

  // TODO THIS IS ALL A STUB!

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

  videoComponent(): JSX.Element {
    return (
      <div>
        {this.videoStatus.url}
      </div>
    );
  }

}
