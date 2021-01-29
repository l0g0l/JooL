
// // web app's Firebase configuration
// const firebase = require ('firebase/app');
// require ('firebase/auth');
// require ('firebase/firestore');

// const firebaseConfig = {
//   apiKey: "AIzaSyCJHzspnHlZx8wFc5VYi_O9ztiuEhZW0NY",
//   authDomain: "movieapp-c6dbc.firebaseapp.com",
//   projectId: "movieapp-c6dbc",
//   storageBucket: "movieapp-c6dbc.appspot.com",
//   messagingSenderId: "660221340799",
//   appId: "1:660221340799:web:af0ff2c03600a39f48e34a"
// }
// // Initialize Firebase

// firebase.initializeApp(firebaseConfig)
// /******************************FACEBOOK*****************************/

// function signin() {
//   let providerr = new firebase.auth.FacebookAuthProvider()
//   providerr.addScope('user_birthday, email');
//   firebase.auth().signInWithRedirect(providerr).then((result) => {
//     let token = result.credential.accessToken;
//     document.querySelector('#signout').style.display = 'block';

//     let user = result.user
//     console.log(user);
//     let userimage = document.querySelector('#user-image')

//     let avatar = document.createElement("img")
//     avatar.src = user.photoURL
//     userimage.append(avatar)

//     let useremail = document.querySelector('#user-email')
//     useremail.innerHTML = user.email
//     console.log(user.email);

//   }).catch(e => console.log(e.message))
// };
// function checkingFb () {
//   fetch ('https://graph.facebook.com/v9.0/oauth/access_token?')
//   .then (item => item.json())
//   .then (data => {
//     data.client_id
//     data.redirect_uri
//     data.client_secret
  
//   })
//   if(data.client_id === '1106268346471390' && redirect_uri === 'https://movieapp-c6dbc.firebaseapp.com/__/auth/handler' && client_secret === '2382bf56e88280a1606f92c90707acd1'){
    
//   signin()

//   }else {
//     signout(error)
//   }
   
// }

// function signout() {
//   firebase.auth().signOut().then(function () {
//     console.log('Signed Out');
//   }).catch(error => console.error('Sign Out Error', error))

// }
// /***********************GOOGLE**************************************** */
// let provider = new firebase.auth.GoogleAuthProvider()

// const loginButton = document.getElementById("login-button")
// const logoutButton = document.getElementById("logout-button")

//   ; (() => {
//     loginButton.style.display = "none"
//     logoutButton.style.display = "none"
//   })

// logoutButton.addEventListener("click", () => {
//   firebase.auth().signOut()
// })

// loginButton.addEventListener("click", () => {
//   openSigninPopup()
// })

// firebase.auth().onAuthStateChanged((user) => {
//   updateUIbyAuth()
//   if (user) {
//     // User is signed in.
//     var displayName = user.displayName
//     var email = user.email
//     var emailVerified = user.emailVerified
//     var photoURL = user.photoURL
//     var isAnonymous = user.isAnonymous
//     var uid = user.uid
//     var providerData = user.providerData
//     // ...
//   } else {
//     // User is signed out.
//     // ...
//   }
// })

// const openSigninPopup = () => {
//   firebase
//     .auth()
//     .signInWithPopup(provider)
//     .then(async (result) => {
//       console.log(`signed in`)
//       var token = result.credential.accessToken
//       var user = result.user

//       await console.log(token)

//       updateUIbyAuth()
//     })
//     .catch((error) => {
//       console.log(`Error on signing in`)
//       var errorCode = error.code
//       var errorMessage = error.message
//       var email = error.email
//       var credential = error.credential
//     })
// }

// const getIdToken = () => {
//   return new Promise((resolve, reject) => {
//     firebase
//       .auth()
//       .currentUser.getIdToken()
//       .then((token) => {
//         resolve(token)
//       })
//       .catch((e) => {
//         reject(e)
//       })
//   })
// }

// const profileEl = {}
// profileEl.picture = document.querySelector("#profile-picture")
// profileEl.email = document.querySelector("#profile-email")
// profileEl.displayName = document.querySelector("#profile-name")

// function updateUIbyAuth() {
//   if (!!firebase.auth().currentUser) {
//     loginButton.style.display = "none"
//     logoutButton.style.display = "block"
//     profileEl.picture.src = firebase.auth().currentUser.photoURL
//     profileEl.email.innerHTML = firebase.auth().currentUser.email
//     profileEl.displayName.innerHTML = firebase.auth().currentUser.displayName
//     document.querySelector(".profile-section").style.visibility = "visible"
//   } else {
//     document.querySelector(".profile-section").style.visibility = "hidden"
//     loginButton.style.display = "block"
//     logoutButton.style.display = "none"
//   }
// }

