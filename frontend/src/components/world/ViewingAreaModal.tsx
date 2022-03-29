import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast,
} from '@chakra-ui/react';
import React,{ useCallback,useState } from 'react'
import useMaybeVideo from '../../hooks/useMaybeVideo';
      
/**
 * Represents a type New Viewing Area Modal Props.
 */
type NewViewingAreaModalProps = {
  isOpen: boolean;
  closeModal: ()=>void;
}

/**
 * Creates a modal for the Viewing Area
 * @param {boolean} isOpen opens the modal
 * @param {void} closeModal closes the modal
 * @returns {NewViewingAreaModalProps} the new viewing area modal
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
