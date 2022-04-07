import React from 'react'
import {
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import useMaybeVideo from '../../hooks/useMaybeVideo';
import VideoPlayer from '../ViewingArea/VideoPlayer';
import URLForm from '../ViewingArea/URLForm';
import ProgressBar from '../ViewingArea/ProgressBar';
import PlayPauseButton from '../ViewingArea/PlayPauseButton';
import { VideoStatus } from '../../CoveyTypes';
       
type NewViewingAreaModalProps = {
  isOpen: boolean;
  videoStatus: VideoStatus | undefined;
  videoPlayer: VideoPlayer;
  videoLinkRegEx: RegExp;
  closeModal: () => void;
}

/**
 * ViewingAreaModal is a modal that contains the video currently being played
 * in a specific viewing area.
 * @param props the props for a viewing area modal.
 * @returns a viewing area modal.
 */
export default function ViewingAreaModal(
  { isOpen, videoStatus, videoPlayer, videoLinkRegEx, closeModal } : NewViewingAreaModalProps,
): JSX.Element {

  const video = useMaybeVideo();

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        closeModal();
        video?.unPauseGame();
      }}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Empty Modal</ModalHeader>
        <URLForm
          regExpPattern={videoLinkRegEx}
          onURLUpdated={() => {}}
        />
        {videoPlayer.videoComponent()}
        <div>
          <PlayPauseButton
            isPlaying={videoStatus?.isPaused ?? true}
            onClick={() => {
              if (videoStatus) {
                videoPlayer.setIsPaused(!videoStatus.isPaused);
              }
            }}
          />
          {videoStatus && (
            <ProgressBar
              secondsElapsed={videoStatus.elapsed}
              videoLengthSeconds={videoStatus.length}
              onTimeChange={(newSeconds) => videoPlayer.setElapsed(newSeconds)}
            />
          )}
        </div>
        <ModalCloseButton />
      </ModalContent>
    </Modal>
  );
}
