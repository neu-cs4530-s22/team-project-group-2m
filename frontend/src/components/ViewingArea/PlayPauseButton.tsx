import React from 'react';
import { Button } from '@chakra-ui/button';

/**
 * Represents a function for Play and Pause button
 * @param isPlaying sets the state of the video
 * @param onClick play or pauses the video when clicking
 * @returns returns a render of the play pause button
 */
export default function playPause(isPlaying: boolean, onClick: Function) {

    return (
        <Button onClick={() => onClick()}>
            {isPlaying ? 'Pause' : 'Play'}!
        </Button>
    );
}
