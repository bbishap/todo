import React, { useState, useEffect } from 'react';
import { SignIn } from './SignIn'
import { Dashboard } from './Dashboard';
import firebase from 'firebase'

let signedInStatus: boolean = false;
let userType: string = '';
let imageType: string = '';

const App: React.FC = (props) => {
  const [signedIn, setSignedIn] = useState(signedInStatus);
  const [user, setUser] = useState(userType);
  const [userImg, setUserImg] = useState(imageType)


  useEffect(() => {

    firebase.auth().onAuthStateChanged(user => {
      setSignedIn(!!user);
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
      {signedIn ? (<Dashboard userName={user} photo={userImg} />) : (<SignIn />)}
    </div>
  );
}

export default App;
