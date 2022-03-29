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
       
type NewViewingAreaModalProps = {
  isOpen: boolean;
  closeModal: ()=>void;
}
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
