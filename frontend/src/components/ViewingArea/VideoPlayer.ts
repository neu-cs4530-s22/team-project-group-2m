import { VideoStatus } from "../../Utils";

/**
 * Represents the metadata for the video player component
 */
export default interface VideoPlayer {
  /** Represents the ID for the VideoPlayer */
  playerID: string;
  /** Represents the RegExp needed to extract a video ID */
  videoIDRegex: RegExp;
  /** A component representing this VideoPlayer * */
  videoComponent(videoStatus: VideoStatus | undefined): JSX.Element;
  /** Function to extract a video ID given a URL */
  videoIDFromURL: (url: string) => string;
}
