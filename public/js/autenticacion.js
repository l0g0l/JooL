
// web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCJHzspnHlZx8wFc5VYi_O9ztiuEhZW0NY",
  authDomain: "movieapp-c6dbc.firebaseapp.com",
  projectId: "movieapp-c6dbc",
  storageBucket: "movieapp-c6dbc.appspot.com",
  messagingSenderId: "660221340799",
  appId: "1:660221340799:web:af0ff2c03600a39f48e34a"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

function signin () {
  let provider = new firebase.auth.FacebookAuthProvider()
  provider.addScope('user_birthday, email');
  firebase.auth().signInWithPopup(provider).then((result) => {
    // let token = result.credential.accessToken;
    document.querySelector('#signout').style.display = 'block';
    
    let user = result.user
    console.log(user);
    let userimage = document.querySelector('#user-image')

    let avatar = document.createElement("img")
    avatar.src = user.photoURL
    userimage.append(avatar)

    let useremail = document.querySelector('#user-email')
    useremail.innerHTML = user.email
    console.log(user.email);
    
  }).catch (e => alert(e.message))
  
  }
  function signout() {
    firebase.auth().signOut().then(function() {
      console.log('Signed Out');
    }).catch (e => console.error('Sign Out Error', error))
    
  }
 