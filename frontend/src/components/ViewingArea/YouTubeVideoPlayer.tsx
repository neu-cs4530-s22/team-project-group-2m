import React from 'react';
import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import { VideoStatus } from '../../Utils';
import VideoPlayer from "./VideoPlayer";

/**
 * YouTubeVideoPlayer is a concrete implementation of a VideoPlayer
 * specifically meant to control and display videos from YouTube.
 */
export default class YouTubeVideoPlayer implements VideoPlayer {

  videoIDRegex: RegExp;

  constructor(videoIDRegex: RegExp) {
    this.videoIDRegex = videoIDRegex;
  }

  videoIDFromURL(url: string) {
    return this.videoIDRegex.exec(url)?.[3] ?? '';
  };

  /**
   * Generated the query parameters for the YouTube embed
   * @returns a string with all the query parameters we need for the embed,
   * including the start time, hiding controls, hiding the YouTube logo,
   * and disabling autoplay.
   */
  private static queryParams(elapsed: number, isPaused: boolean): string {
    let params = `start=${Math.floor(elapsed)}`;
    if (isPaused) {
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

  videoComponent(videoStatus: VideoStatus): JSX.Element {
    if (videoStatus) {
      return (
        <div>
          <LiteYouTubeEmbed
            id={this.videoIDFromURL(videoStatus.url)}
            title={videoStatus.url}
            params={YouTubeVideoPlayer.queryParams(videoStatus.elapsed, videoStatus.isPaused)}
          />
        </div>
      );
    }
    return <></>;
  }

}
