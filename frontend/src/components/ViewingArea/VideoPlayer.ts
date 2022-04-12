import { VideoStatus } from "../../Utils";

/**
 * Represents the metadata for the video player component
 */
export default interface VideoPlayer {
  /** A component representing this VideoPlayer * */
  videoComponent(videoStatus: VideoStatus | undefined): JSX.Element;
  videoIDFromURL: (url: string) => string;
  videoIDRegex: RegExp;
}
