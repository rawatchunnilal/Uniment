const firebaseConfig = {
  apiKey: "AIzaSyCHbJeBDBqRYgoBFL4oMJW86z8KAmgyG4Y",
  authDomain: "uniment-5d053.firebaseapp.com",
  databaseURL: "https://uniment-5d053-default-rtdb.firebaseio.com",
  projectId: "uniment-5d053",
  storageBucket: "uniment-5d053.appspot.com",
  messagingSenderId: "411317673097",
  appId: "1:411317673097:web:c993f8e11bfd01fef83a58"
};


// initialization
firebase.initializeApp(firebaseConfig);

// reference
const ContactFormDB = firebase.database().ref('ContactForm');

document.getElementById("contact_form").addEventListener("submit", submitForm);

function submitForm(e){
  e.preventDefault();

  var Uname = getElementVal('Uname');
  var email = getElementVal('email');
  var mobile = getElementVal('mobile');
  var message = getElementVal('msg');

  // console.log(Uname, email, mobile, message);
  saveMsg(Uname, email, mobile, message);

  // enable alert
  document.querySelector( ".alert" ).style.display = "block";
  // close the alert after 3 seconds
setTimeout(() => {
  document.querySelector(".alert").style.display = "none";
}, 3000);

  // reset form
  document.getElementById("contact_form").reset();
}
const saveMsg =(Uname, email, mobile, message) =>{
  var newContactForm = ContactFormDB.push();
  newContactForm.set({
    UserName : Uname,
    Email : email,
    mobile : mobile,
    message : message,
});
};

const getElementVal = (id) => {
  return document.getElementById(id).value;
};
