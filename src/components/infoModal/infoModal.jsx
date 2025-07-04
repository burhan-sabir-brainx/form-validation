import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function InfoModal({ show, onHide, formData }) {
    return (
        <Modal show={show} onHide={onHide} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Form Submission Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {formData && (
                    <div>
                        <h5>Submitted Information:</h5>
                        <hr />
                        <div className="row">
                            <div className="col-md-6">
                                <p><strong>Full Name:</strong> {formData.fullName}</p>
                                <p><strong>Email:</strong> {formData.email}</p>
                                <p><strong>Age:</strong> {formData.age || 'Not provided'}</p>
                            </div>
                            <div className="col-md-6">
                                <p><strong>Gender:</strong> {formData.gender}</p>
                                <p><strong>Terms Accepted:</strong> {formData.terms ? 'Yes' : 'No'}</p>
                            </div>
                        </div>
                    </div>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
