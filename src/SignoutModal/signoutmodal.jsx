import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import './signoutmodal.css';

function SignOutModal(props) {
    const [error, setError] = useState(false);

    return (
        <div className="signInModal">
            <Modal show={props.show} size="sm" centered onExit={() => { setError(false); props.onHide(); }}>
                <Modal.Header style={{display: 'block'}}>
                    <i onClick={() => { setError(false); props.onHide(); }} class="bi bi-x-circle exitArrow"/>
                    <h4 className="heading" style={{marginTop: '20px'}}>Sign Out</h4>
                    <p className="subheading">
                        Sad to see you go. <br/>
                        Hope you'll be back soon.
                    </p>
                </Modal.Header>
                <Modal.Body>
                    <div className="buttons" style={{marginTop: '10px', marginBottom: '10px', width: 'max-content', minWidth: '180px', marginLeft: 'auto', marginRight : 'auto'}}>
                        <Button onClick={() => props.signOut()} style = {{width: '100%', borderRadius: '10px', height: '45px'}} variant="danger">
                            <p className="buttonText"> <i class="bi bi-box-arrow-right" style={{margin: 'auto 10px auto 0px', fontSize: 'larger'}}/> Sign Out</p>
                        </Button>
                    </div>
                    <p style={{color: 'rgb(240, 15, 15)', fontWeight: '500', textAlign: 'center', marginTop: '0px', marginBottom: '0px', display: !error ? 'none' : 'block'}} className="subheading alert">
                        Failed to sign out. Please try again.
                    </p>
                </Modal.Body>
            </Modal>
        </div>
    );
}
 
export default SignOutModal;
