
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyA8MHYcKksTp5tWbUs8ZUtZI6ig83DqnFw",
    authDomain: "ncovtester.firebaseapp.com",
    databaseURL: "https://ncovtester.firebaseio.com",
    projectId: "ncovtester",
    storageBucket: "ncovtester.appspot.com",
    messagingSenderId: "803762412638",
    appId: "1:803762412638:web:07f09aa4e727c7ffb2a8cf",
    measurementId: "G-T6TYD6N2PE"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//   firebase.analytics();

// get elements
const preObj = document.getElementById('object');

// create references
const dbRefObj = firebase.database().
                 ref() /* reference to the root of the data base */
                //  .child('object'); /* creates a child key of object */


// sync object changes

// this event trigger each and every time there is a change(add, removed, change) of in this location in our database...
// dbRefObj.on('value', snap => console.log(snap.val()));

let currUserId =  null;

var starCountRef = firebase.database().ref();

starCountRef.on('value', function(snapshot) {

    // currUserId = 0;
    // if(snapshot.val())
    //     currUserId = (snapshot.val().users.length);

    // console.log('current user Id', currUserId);

});



function writeUserData( name, email, symptoms, covidProb) {

    // if(userId === null)throw new Error('invalid userId provided');

  firebase.database().ref('users').push({
    username: name,
    email: email,
    symptoms: symptoms,
    covidProb: covidProb,
  });

}


