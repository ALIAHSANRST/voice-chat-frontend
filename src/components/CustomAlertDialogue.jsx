'use client'

import React from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'react-bootstrap';
import { Cancel, Done } from '@mui/icons-material';

const CustomAlertDialogue = ({
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
            className='text-uppercase d-flex justify-content-center align-items-center pe-3'
            onClick={negativeCallback}
            variant='danger'>
            <Cancel style={{ marginRight: '0.25rem', fontSize: '1.25rem' }} />
            {negativeMessage}
          </Button>
        }
        {
          positiveMessage &&
          <Button
            className='text-uppercase d-flex justify-content-center align-items-center pe-3'
            onClick={positiveCallback}
            variant='success'>
            <Done style={{ marginRight: '0.25rem', fontSize: '1.25rem' }} />
            {positiveMessage}
          </Button>
        }
      </ModalFooter>
    </Modal>
  );
};

export default CustomAlertDialogue;