import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";

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
const storage = getStorage(app);

async function submitReview(event) {
  event.preventDefault();

  const reviewerName = document.getElementById('reviewer-name').value.trim();
  const reviewerTag = document.getElementById('reviewer-tag').value.trim();
  const reviewText = document.getElementById('Desc').value.trim();
  const reviewImage = document.getElementById('review-image').files[0];

  try {
    // Upload review image to Firebase Storage
    const storageRef = ref(storage, `reviewer/${reviewImage.name}`);
    await uploadBytes(storageRef, reviewImage);
    const reviewImageURL = await getDownloadURL(storageRef);

    // Add review data to Firestore
    await addDoc(collection(db, 'Review'), {
      name: reviewerName,
      tag: reviewerTag,
      review: reviewText,
      image: reviewImageURL
    });

    alert('Review submitted successfully!');
    document.getElementById('review-form').reset();
  } catch (error) {
    console.error('Error submitting review:', error);
    alert('Failed to submit review.');
  }
}

document.getElementById('review-form').addEventListener('submit', submitReview);