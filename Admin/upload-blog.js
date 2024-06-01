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

document.getElementById('blog-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const title = document.getElementById('blog-title').value;
  const authorName = document.getElementById('author-name').value;
  const blogLink = document.getElementById('blog-link').value;

  try {
    const docRef = await addDoc(collection(db, "Blogs"), {
      title: title,
      author: authorName,
      link: blogLink,
      timestamp: new Date()
    });
    alert("Blog uploaded successfully!");
    document.getElementById('blog-form').reset();
  } catch (e) {
    console.error("Error adding document: ", e);
    alert("Error uploading blog.");
  }
});
