import React from 'react'
import {
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import useMaybeVideo from '../../hooks/useMaybeVideo';
       
type NewViewingAreaModalProps = {
  isOpen: boolean;
  closeModal: ()=>void;
}

/**
 * ViewingAreaModal is a modal that contains the video currently being played
 * in a specific viewing area.
 * @param props the props for a viewing area modal.
 * @returns a viewing area modal.
 */
export default function ViewingAreaModal( {isOpen, closeModal} : NewViewingAreaModalProps): JSX.Element {
  const video = useMaybeVideo()
  return (
    <Modal isOpen={isOpen} onClose={()=>{closeModal(); video?.unPauseGame()}}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Empty Modal</ModalHeader>
        <ModalCloseButton />
      </ModalContent>
    </Modal>
  );
}
