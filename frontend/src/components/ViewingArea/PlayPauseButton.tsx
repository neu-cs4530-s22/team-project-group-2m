import React from 'react';
import { Button } from '@chakra-ui/react';

/**
 * PlayPauseButtonProps represents the props to be passed
 * to a PlayPauseButton.
 */
type PlayPauseButtonProps = {
  /**
   * If the button is visible on the screen.
   */
  visible: boolean;
  /**
   * Sets the state of the video
   */
  isPlaying: boolean;
  /**
   * Play or pauses the video when clicking.
   */
  onClick: () => void;
}

/**
 * Represents a function for a Play and Pause button.
 * @param props the props for this PlayPauseButton.
 * @returns returns a PlayPauseButton component.
 */
export default function PlayPauseButton(
  { isPlaying, onClick, visible }: PlayPauseButtonProps,
): JSX.Element {

  if (visible) {
    return (
      <Button onClick={onClick}>
          {isPlaying ? '⏸️' : '▶️'}
      </Button>
    );
  }
  return <></>;
}
