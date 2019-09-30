import React from 'react';

import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';

import { Card, CardBody, CardTitle, CardSubtitle } from 'reactstrap';
const background: string = require('./assets/background.jpg')
const uiConfig = {
  signInFlow: 'popup',
  signInSuccessUrl: '/signedIn',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID
  ],
  callbacks: {
    signInSuccess: () => false
  }
};

export const SignIn: React.FC = (props) => {

  return (
    <div style={{ backgroundImage: `url(${background})`, height: '100vh', backgroundRepeat: 'no-repeat', backgroundSize: '100%' }}>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }} >
        <div style={{ width: '35%' }}  >
          <Card style={{ borderRadius: '40px' }}>
            <CardBody style={{ height: '400px', backgroundColor: '#b8e1ff', borderRadius: '40px' }}>
              <div style={{ marginLeft: '180px', fontFamily: 'Lora', marginTop: '50px' }}>
                <CardTitle><h1><b>TODO</b></h1></CardTitle>
              </div>
              <div style={{ marginLeft: '145px' }}>
                <CardSubtitle >Don't Remember, It's My Job</CardSubtitle>
              </div>
              <div style={{ marginTop: '30px' }}>
                <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}

