/**
 * Represents the metadata for the video player component
 */
export default interface VideoPlayer {
  /** Sets the url of the current video * */
  setURL(url: string): boolean;
  /** Sets the timestamp of the current video * */
  setTimestamp(timestamp: string): boolean;
  /** Pauses or plays the currently video * */
  setIsPaused(isPaused: boolean): boolean;
  /** A component representing this VideoPlayer * */
  videoComponent(): JSX.Element;
}
