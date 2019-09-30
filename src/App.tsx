import React, { useState, useEffect } from 'react';
import { SignIn } from './SignIn'
import { Dashboard } from './Dashboard';
import firebase from 'firebase'
import { Spinner } from 'reactstrap';


let signedInStatus: boolean = false;
let userType: string = '';
let imageType: string = '';

const App: React.FC = (props) => {
  const [signedIn, setSignedIn] = useState(signedInStatus);
  const [user, setUser] = useState(userType);
  const [userImg, setUserImg] = useState(imageType)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      setSignedIn(!!user);
      setLoading(false);
    })

    let user: any = firebase.auth().currentUser;

    if (user != null) {
      let name: string = user.displayName;
      let photoUrl: string = user.photoURL;
      setUser(name);
      setUserImg(photoUrl);

    }
  });

  return (
    <div className="App">
      {
        loading ?
          <Spinner color='secondary' style={{ marginLeft: '50%', marginTop: '30px' }} /> :
          signedIn ? (<Dashboard userName={user} photo={userImg} />) : (<SignIn />)
      }
      {console.clear()}
    </div>
  );
}

export default App;
