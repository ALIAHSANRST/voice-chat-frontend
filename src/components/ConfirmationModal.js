import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ConfirmationModal({ show, handleClose, handleShow }) {
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Start Confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body>Before you start, Make sure to sit in a quite environment. So we can hear you properly.</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ConfirmationModal;