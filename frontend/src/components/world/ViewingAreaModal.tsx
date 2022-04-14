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
import { VideoStatus, fetchYoutubeVideoDuration } from '../../Utils';

/**
 * ViewingAreaModalProps represents the props to be
 * passed to a ViewingAreaModal.
 */
type ViewingAreaModalProps = {
  isOpen: boolean;
  videoStatus: VideoStatus | undefined;
  videoPlayer: VideoPlayer;
  videoLinkRegEx: RegExp;
  closeModal: () => void;
  setVideoStatus: (videoStatus: VideoStatus | undefined) => void;
}

/**
 * ViewingAreaModal is a modal that contains the video currently being played
 * in a specific viewing area.
 * @param props the props for a viewing area modal.
 * @returns a viewing area modal.
 */
export default function ViewingAreaModal(
  { isOpen, videoStatus, videoPlayer, videoLinkRegEx, closeModal, setVideoStatus } : ViewingAreaModalProps,
): JSX.Element {

  const video = useMaybeVideo();

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        closeModal();
        video?.unPauseGame();
      }}
      size='3xl'
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Empty Modal</ModalHeader>
        <URLForm
          regExpPattern={videoLinkRegEx}
          onVideoStatusCreated={newVideoStatus => setVideoStatus(newVideoStatus)}
          fetchVideoDuration={fetchYoutubeVideoDuration}
        />
        {videoPlayer.videoComponent(videoStatus)}
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <PlayPauseButton
            isPlaying={!videoStatus?.isPaused ?? false}
            onClick={() => {
              if (videoStatus) {
                setVideoStatus({ ...videoStatus, isPaused: !videoStatus.isPaused });
              }
            }}
          />
          {videoStatus && (
            <ProgressBar
              secondsElapsed={videoStatus.elapsed}
              videoLengthSeconds={videoStatus.length}
              onTimeChange={(newSeconds) => {
                if (videoStatus) {
                  setVideoStatus({ ...videoStatus, elapsed: newSeconds });
                }
              }}
            />
          )}
        </div>
        <ModalCloseButton />
      </ModalContent>
    </Modal>
  );
}
