// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDdmexgsqNZTwVYjU0X1EB5nXCskq_8LnY",
    authDomain: "fir-test-bcff5.firebaseapp.com",
    databaseURL: "https://fir-test-bcff5.firebaseio.com",
    projectId: "fir-test-bcff5",
    storageBucket: "fir-test-bcff5.appspot.com",
    messagingSenderId: "7724828234",
    appId: "1:7724828234:web:60c4cfe5f53c710c98c8b3"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


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



function writeUserData(userId, name, email, symptoms, covidProb) {

    if(userId === null)throw new Error('invalid userId provided');

  firebase.database().ref('users/' + userId).set({
    username: name,
    email: email,
    symptoms: symptoms,
    covidProb: covidProb,
  });

}


