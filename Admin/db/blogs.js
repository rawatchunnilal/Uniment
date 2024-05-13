 // reference
 const BlogsFormDB = firebase.database().ref('Blogs');
  
 document.getElementById("upload-blog").addEventListener("submit", submitForm);
 
 function submitForm(e){
   e.preventDefault();
 
   var title = getElementVal('blog-title');
   var author = getElementVal('uploader-name');
   var date = getElementVal('upload-date');
   var url = getElementVal('blog-link');
 

   console.log("prashant");
   console.log(Uname, author, date, url);
   saveMsg(title, author, date, url);
 
   // enable alert
   document.querySelector( ".alert" ).style.display = "block";
   // close the alert after 3 seconds
 setTimeout(() => {
   document.querySelector(".alert").style.display = "none";
 }, 3000);
 
   // reset form
   document.getElementById("upload-blog").reset();
 }
 const saveMsg =(title, author, date, url) =>{
   var newBlogForm = BlogsFormDB.push();
   newContactForm.set({
     title : title,
     author : author,
     date : date,
     url : url,
 });
 };
 
 const getElementVal = (id) => {
   return document.getElementById(id).value;
 };
 