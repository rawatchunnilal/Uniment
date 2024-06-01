// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAXKUjFT_fqQo3Q4fmkZ8HMmdNdCxGcXhE",
  authDomain: "uniment-c0c23.firebaseapp.com",
  projectId: "uniment-c0c23",
  storageBucket: "uniment-c0c23.appspot.com",
  messagingSenderId: "279054030942",
  appId: "1:279054030942:web:7f9ae196707b38250ebccf",
  measurementId: "G-TNBWNENSQE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

// Handle form submission
document.getElementById('contact_form').addEventListener('submit', async (event) => {
  event.preventDefault();

  // Get form values
  const name = document.getElementById('Uname').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('mobile').value;
  const message = document.getElementById('msg').value;

  try {
    // Add a new document with a generated id in the 'ContactForm' collection.
    const docRef = await addDoc(collection(db, "ContactForm"), {
      name: name,
      email: email,
      phone: phone,
      message: message,
      timestamp: new Date()
    });
    console.log("Document written with ID: ", docRef.id);
    alert("Your message has been sent successfully!");
  } catch (e) {
    console.error("Error adding document: ", e);
    alert("There was an error sending your message. Please try again.");
  }

  // Reset the form
  document.getElementById('contact_form').reset();
});

