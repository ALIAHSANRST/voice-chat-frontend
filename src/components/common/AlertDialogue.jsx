'use client'

import React from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'react-bootstrap';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const AlertDialogue = ({
  title,
  positiveMessage,
  positiveCallback,
  negativeMessage,
  negativeCallback,
  handleClose,
  show,
  children,
}) => {
  return (
    <Modal
      show={show}
      onHide={handleClose}
      backdrop='static'
      keyboard={false}>
      <ModalHeader closeButton>
        <Modal.Title>{title}</Modal.Title>
      </ModalHeader>
      <ModalBody>{children}</ModalBody>
      <ModalFooter>
        {
          negativeMessage && <Button
            className='d-flex justify-content-center align-items-center gap-2'
            onClick={negativeCallback}
            variant='danger'>
            <FontAwesomeIcon icon={faTimes} />
            {negativeMessage}
          </Button>
        }
        {
          positiveMessage &&
          <Button
            className='d-flex justify-content-center align-items-center gap-2'
            onClick={positiveCallback}
            variant='success'>
            <FontAwesomeIcon icon={faCheck} />
            {positiveMessage}
          </Button>
        }
      </ModalFooter>
    </Modal>
  );
};

export default AlertDialogue;