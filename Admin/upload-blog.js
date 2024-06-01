// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
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
console.log("Firebase initialized:", app);
const db = getFirestore(app);

// Handle form submission
document.getElementById('blog-form').addEventListener('submit', async (event) => {
  event.preventDefault();

  // Get form values
  const title = document.getElementById('blog-title').value;
  const author = document.getElementById('uploader-name').value;
  const link = document.getElementById('blog-link').value;

  console.log("Form Values:", { title, author, link });

  try {
    // Add a new document with a generated id in the 'Blogs' collection
    const docRef = await addDoc(collection(db, "Blogs"), {
      title: title,
      author: author,
      link: link,
      timestamp: new Date()  // Optional: remove if not needed
    });
    console.log("Document written with ID: ", docRef.id);
    alert("Blog uploaded successfully!");
  } catch (e) {
    console.error("Error adding document: ", e);
    alert("There was an error uploading the blog. Please try again.");
  }

  // Reset the form
  document.getElementById('blog-form').reset();
});
