import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import firebase from '../firestore';
import './signinmodal.css';

function SignInModal(props) {
    const [error, setError] = useState(false);

    const googleSignin = () => {
        var provider = new firebase.auth.GoogleAuthProvider();

        firebase.auth().signInWithPopup(provider).then(function(result) {
            props.signInHandler(result.user);
        }).catch(function(error) {
            setError(true);
        });
    }

    return (
        <div className="signInModal">
            <Modal show={props.show} centered onExit={() => { setError(false); props.onHide(); }}>
                <Modal.Header style={{display: 'block'}}>
                    <i onClick={() => { setError(false); props.onHide(); }} class="bi bi-x-circle exitArrow"/>
                    <h4 className="heading" style={{marginTop: '20px'}}>Sign in with Google</h4>
                    <p className="subheading">
                        Let's keep it fast and simple. Sign in with your google <br/>
                        account to save and sync data across sessions and devices.
                    </p>
                </Modal.Header>
                <Modal.Body>
                    <div className="buttons" style={{marginTop: '10px', marginBottom: '10px', width: 'max-content', minWidth: '360px', marginLeft: 'auto', marginRight : 'auto'}}>
                        <Button onClick={() => googleSignin()} style = {{width: '100%', borderRadius: '10px', height: '45px'}} variant="danger">
                            <p className="buttonText"> <i class="bi bi-google" style={{margin: 'auto 10px'}}/> Continue With Google</p>
                        </Button>
                    </div>
                    <p style={{color: 'rgb(240, 15, 15)', fontWeight: '500', textAlign: 'center', marginTop: '0px', marginBottom: '0px', display: !error ? 'none' : 'block'}} className="subheading alert">
                        Failed to sign in. Please try again.
                    </p>
                </Modal.Body>
            </Modal>
        </div>
    );
}
 
export default SignInModal;
