  // Initialize Firebase
  const firebaseConfig = {
    apiKey: "AIzaSyAXKUjFT_fqQo3Q4fmkZ8HMmdNdCxGcXhE",
    authDomain: "uniment-c0c23.firebaseapp.com",
    projectId: "uniment-c0c23",
    storageBucket: "uniment-c0c23.appspot.com",
    messagingSenderId: "279054030942",
    appId: "1:279054030942:web:7f9ae196707b38250ebccf",
    measurementId: "G-TNBWNENSQE"
  };
  
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();

  // Function to handle form submission
  function uploadReview() {
    const reviewerName = document.getElementById('reviewer-name').value;
    const reviewText = document.getElementById('review').value;
    const reviewImage = document.getElementById('review-image').files[0];

    // Upload review data to Firestore
    db.collection('reviews').add({
      reviewerName: reviewerName,
      reviewText: reviewText
    })
    .then((docRef) => {
      // Review uploaded successfully, now upload the image to storage
      const storageRef = firebase.storage().ref(`review_images/${docRef.id}`);
      storageRef.put(reviewImage)
        .then((snapshot) => {
          console.log('Review image uploaded successfully');
          alert('Review uploaded successfully');
        })
        .catch((error) => {
          console.error('Error uploading review image:', error);
          alert('Error uploading review image');
        });
    })
    .catch((error) => {
      console.error('Error adding review to Firestore:', error);
      alert('Error uploading review');
    });
  }