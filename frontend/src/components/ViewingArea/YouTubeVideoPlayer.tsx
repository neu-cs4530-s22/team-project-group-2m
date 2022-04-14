import React from 'react';
import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import { VideoStatus } from '../../Utils';
import VideoPlayer from "./VideoPlayer";

/**
 * YouTubeVideoPlayer is a concrete implementation of a VideoPlayer
 * specifically meant to control and display videos from YouTube.
 */
export default class YouTubeVideoPlayer implements VideoPlayer {

  playerID: string;

  videoIDRegex: RegExp;

  playerReference: YT.Player | undefined;

  constructor() {
    this.playerID = 'youtubePlayer';
    this.videoIDRegex = /(youtu.*be.*)\/(watch\?v=|embed\/|v|shorts|)(.*?((?=[&#?])|$))/gm;
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
  private static queryParams(elapsed: number): string {
    let params = `start=${Math.floor(elapsed)}`;
    // disable the embed controls
    params += '&controls=0';
    // remove the large YouTube logo
    params += '&modestbranding=1';
    // disable keyboard controls
    params += '&disablekb=1';
    // enable pausing via exposed JavaScript functions
    params += '&enablejsapi=1';
    return params;
  }

  videoComponent(videoStatus: VideoStatus): JSX.Element {
    if (videoStatus) {

      // Inject YouTube API script, adapted from
      // https://stackoverflow.com/questions/42496121/youtube-iframe-api-not-pausing-video
      const tag = document.createElement('script');
      tag.src = "//www.youtube.com/player_api";
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

      return (
        <div>
          <LiteYouTubeEmbed
            id={this.videoIDFromURL(videoStatus.url)}
            title={videoStatus.url}
            iframeClass={this.playerID}
            onIframeAdded={() => {
              setTimeout(() => {
                const iframe = document.getElementsByClassName(this.playerID)[0];
                if (iframe) {
                  iframe.id = this.playerID;
                }
                this.playerReference = new YT.Player(this.playerID, {});
                if (videoStatus.isPaused) {
                  this.playerReference.pauseVideo();
                }
              }, 500);
            }}
            params={YouTubeVideoPlayer.queryParams(videoStatus.elapsed)}
          />
        </div>
      );
    }
    return <></>;
  }

}
