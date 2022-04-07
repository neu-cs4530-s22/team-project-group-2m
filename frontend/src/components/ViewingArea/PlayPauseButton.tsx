import React from 'react';
import { Button } from '@chakra-ui/react';

type PlayPauseButtonProps = {
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
  { isPlaying, onClick }: PlayPauseButtonProps,
): JSX.Element {

  return (
    <Button onClick={onClick}>
        {isPlaying ? 'Pause' : 'Play'}!
    </Button>
  );
}
