
function previewImage(imageSrc, docName) {
   document.getElementById('modalImage').src = imageSrc;
   document.getElementById('modalTitle').textContent = docName;
   const downloadBtn = document.getElementById('downloadBtn');
   // if download doc
   downloadBtn.href = imageSrc;
   // downloadBtn.download = docName.replace(/\s+/g, '_') + '.jpg';
}
// scroll 
window.addEventListener('scroll', function () {
   const sidebar = document.getElementById('sidebar');
   const header = document.querySelector('header');
   const headerHeight = header.offsetHeight;

   if (window.scrollY > headerHeight) {
      sidebar.classList.add('fixed');
   } else {
      sidebar.classList.remove('fixed');
   }
});
// notification function 
const sidebar = document.getElementById("notification_sidebar");
const toggleBtn = document.getElementById("notification-btn");
const closeBtn = document.getElementById("closeBtn");

toggleBtn.addEventListener("click", () => {
   sidebar.classList.toggle("open");
});

closeBtn.addEventListener("click", () => {
   sidebar.classList.remove("open");
});
// close 
// darl light theme 
const btn = document.getElementById('themeToggle');
if (localStorage.getItem('theme') === 'dark') {
   document.body.classList.add('dark');
}

btn.addEventListener('click', () => {
   const isDark = document.body.classList.toggle('dark');
   localStorage.setItem('theme', isDark ? 'dark' : 'light');
});