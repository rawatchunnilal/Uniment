// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Intersection Observer for lazy loading
const lazyImages = document.querySelectorAll('img[data-src]');
const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      observer.unobserve(img);
    }
  });
}, { rootMargin: '0px 0px 200px 0px' });

lazyImages.forEach(img => {
  observer.observe(img);
});

// Polymorphic animation
const animationElements = document.querySelectorAll('.animate');
const animateOnScroll = () => {
  animationElements.forEach(element => {
    const elementPosition = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    if (elementPosition < windowHeight - 100) {
      element.classList.add('animate-in');
    } else {
      element.classList.remove('animate-in');
    }
  });
};

window.addEventListener('scroll', animateOnScroll);
animateOnScroll();