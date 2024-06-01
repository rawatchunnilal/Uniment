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

// Function to retrieve existing blog data from Firestore and render it on the page
async function renderBlogList() {
  const blogList = document.getElementById('blog-list');
  blogList.innerHTML = ''; // Clear existing blog items

  try {
    const querySnapshot = await getDocs(collection(db, 'Blogs'));
    querySnapshot.forEach((doc) => {
      const blogData = doc.data();
      const blogItem = document.createElement('div');
      blogItem.classList.add('blog-item');
      blogItem.innerHTML = `
        <h3>${blogData.title}</h3>
        <p>Uploaded by: ${blogData.author}</p>
        <img src="${blogData.thumbnail}" alt="Blog Thumbnail" />
        <a href="${blogData.link}">Click to open</a>
      `;
      blogList.appendChild(blogItem);
    });
  } catch (error) {
    console.error('Error retrieving blog data:', error);
  }
}

// Call renderBlogList() to fetch existing blog data from Firestore and render it when the page loads
window.addEventListener('DOMContentLoaded', () => {
  renderBlogList();
});

// Function to handle form submission and upload a new blog with a thumbnail image
document.getElementById('blog-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const title = document.getElementById('blog-title').value;
  const authorName = document.getElementById('author-name').value;
  const blogLink = document.getElementById('blog-link').value;
  const thumbnailFile = document.getElementById('blog-thumbnail').files[0];

  try {
    // Upload thumbnail to Firebase Storage in "/Blog-Thumbnails" folder
    const storageRef = ref(storage, `Blog-Thumbnails/${thumbnailFile.name}`);
    await uploadBytes(storageRef, thumbnailFile);

    // Get URL of the uploaded thumbnail
    const thumbnailURL = await getDownloadURL(storageRef);

    // Add blog data to Firestore
    const docRef = await addDoc(collection(db, "Blogs"), {
      title: title,
      author: authorName,
      link: blogLink,
      thumbnail: thumbnailURL,
      timestamp: new Date()
    });

    alert("Blog uploaded successfully!");
    document.getElementById('blog-form').reset();

    // After successful upload, re-render the blog list to include the new blog
    renderBlogList();
  } catch (error) {
    console.error("Error uploading blog:", error);
    alert("Error uploading blog.");
  }
});
