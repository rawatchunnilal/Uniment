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
  blogList.classList.add('blog-grid', 'row'); // Adding blog-grid and row classes

  try {
    const querySnapshot = await getDocs(collection(db, 'Blogs'));
    querySnapshot.forEach((doc) => {
      const blogData = doc.data();
      const blogItem = document.createElement('div');
      blogItem.classList.add('blog-item', 'card', 'col-lg-5', 'col-md-5', 'col-sm-12', 'mb-4'); // Adding grid classes
      blogItem.innerHTML = `
        <img src="${blogData.thumbnail || 'placeholder.png'}" alt="Blog Thumbnail" class="card-img-top" />
        <div class="card-body">
          <h3 class="card-title">${blogData.title || 'No title'}</h3>
          <p class="card-text">Uploaded by: ${blogData.author || 'No author'}</p>
          <p class="card-description">${blogData.description || 'No description'}</p>
          <a href="${blogData.link || '#'}" class="btn btn-primary">Read more...</a>
        </div>
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

  const title = document.getElementById('blog-title').value.trim() || 'No title';
  const authorName = document.getElementById('author-name').value.trim() || 'No author';
  const blogLink = document.getElementById('blog-link').value.trim() || '#';
  const blogDescription = document.getElementById('blog-description').value.trim() || 'No description';
  const thumbnailFile = document.getElementById('blog-thumbnail').files[0];

  try {
    let thumbnailURL = 'placeholder.png';
    if (thumbnailFile) {
      // Upload thumbnail to Firebase Storage in "/Blog-Thumbnails" folder
      const storageRef = ref(storage, `Blog-Thumbnails/${thumbnailFile.name}`);
      await uploadBytes(storageRef, thumbnailFile);

      // Get URL of the uploaded thumbnail
      thumbnailURL = await getDownloadURL(storageRef);
    }

    // Add blog data to Firestore
    const docRef = await addDoc(collection(db, 'Blogs'), {
      title: title,
      author: authorName,
      link: blogLink,
      description: blogDescription,
      thumbnail: thumbnailURL,
      timestamp: new Date()
    });

    alert('Blog uploaded successfully!');
    document.getElementById('blog-form').reset();

    // After successful upload, re-render the blog list to include the new blog
    renderBlogList();
  } catch (error) {
    console.error('Error uploading blog:', error);
    alert('Error uploading blog.');
  }
});
