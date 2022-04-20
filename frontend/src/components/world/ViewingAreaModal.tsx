import React from 'react'
import {
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import ReactPlayer from 'react-player';
import useMaybeVideo from '../../hooks/useMaybeVideo';
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
  videoPlayerRef: React.RefObject<ReactPlayer>;
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
export default function ViewingAreaModal({
  isOpen,
  videoStatus,
  videoPlayerRef,
  videoLinkRegEx,
  closeModal,
  setVideoStatus,
} : ViewingAreaModalProps): JSX.Element {

  const video = useMaybeVideo();

  function videoComponent() {
    if (videoStatus) {
      return (
        <div className='player-wrapper'>
          <ReactPlayer
            className='react-player'
            url={videoStatus.url}
            playing={!videoStatus.isPaused}
            ref={videoPlayerRef}
            onProgress={({ playedSeconds }) => {
              if (videoPlayerRef.current && videoStatus) {
                const atEnd = playedSeconds + 6 >= videoStatus.length;
                // only update if 5 seconds out of sync
                if (!atEnd && Math.abs(videoStatus.elapsed - playedSeconds) > 5) {
                  videoPlayerRef.current.seekTo(videoStatus.elapsed);
                }
              }
            }}
            onPause={() => setVideoStatus({ ...videoStatus, isPaused: true })}
            onPlay={() => setVideoStatus({ ...videoStatus, isPaused: false })}
            // restart the video and pause when it ends
            onEnded={() => setVideoStatus({
              ...videoStatus,
              isPaused: true,
              elapsed: 0,
            })}
            width='100%'
            height='100%'
          />
        </div>
      );
    }
    return <></>;
  }

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
        <ModalHeader>Watch Party</ModalHeader>
        <URLForm
          regExpPattern={videoLinkRegEx}
          onVideoStatusCreated={newVideoStatus => setVideoStatus(newVideoStatus)}
          fetchVideoDuration={fetchYoutubeVideoDuration}
        />
        {videoComponent()}
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <PlayPauseButton
            visible={!!videoStatus}
            isPlaying={!videoStatus?.isPaused ?? false}
            onClick={() => {
              if (videoStatus) {
                setVideoStatus({ ...videoStatus, isPaused: !videoStatus.isPaused });
              }
            }}
          />
          <div style={{ width: 10 }}/>
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
