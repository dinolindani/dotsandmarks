

// ========================================
// PREMIUM HERO CAROUSEL
// ========================================

document.addEventListener('DOMContentLoaded', function() {
  
  // ========================================
  // HEADER SCROLL EFFECT
  // ========================================
  
  const siteHeader = document.getElementById('siteHeader');
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > 100) {
      siteHeader.classList.add('scrolled');
    } else {
      siteHeader.classList.remove('scrolled');
    }
  });


  
  // ========================================
  // HERO CAROUSEL
  // ========================================
  
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.dot');
  const prevBtn = document.getElementById('prevSlide');
  const nextBtn = document.getElementById('nextSlide');
  const currentCounter = document.querySelector('.slide-counter .current');
  
  let currentSlide = 0;
  let isAnimating = false;
  let autoPlayInterval;
  const autoPlayDelay = 7000; // 7 seconds per slide

  // Initialize
  updateSlide(0);
  // startAutoPlay();

  // ========================================
  // SLIDE NAVIGATION FUNCTIONS
  // ========================================

  function updateSlide(index) {
    if (isAnimating) return;
    
    isAnimating = true;

    // Remove active class from all slides and dots
    slides.forEach(slide => {
      slide.classList.remove('active');
    });
    
    dots.forEach(dot => {
      dot.classList.remove('active');
    });

    // Update current slide
    currentSlide = index;

    // Add active class to current slide and dot
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');

    // Update counter
    const slideNumber = String(currentSlide + 1).padStart(2, '0');
    currentCounter.textContent = slideNumber;

    // Reset zoom animation by triggering reflow
    const activeBg = slides[currentSlide].querySelector('.hero-bg');
    activeBg.style.animation = 'none';
    void activeBg.offsetWidth; // Trigger reflow
    activeBg.style.animation = '';

    // Reset content animation
    const activeContent = slides[currentSlide].querySelector('.hero-content');
    activeContent.style.animation = 'none';
    void activeContent.offsetWidth; // Trigger reflow
    activeContent.style.animation = '';

    // Allow next animation after transition
    setTimeout(() => {
      isAnimating = false;
    }, 1200);
  }

  function nextSlide() {
    const next = (currentSlide + 1) % slides.length;
    updateSlide(next);
  }

  function prevSlide() {
    const prev = (currentSlide - 1 + slides.length) % slides.length;
    updateSlide(prev);
  }

  // ========================================
  // AUTO PLAY
  // ========================================

  // function startAutoPlay() {
  //   autoPlayInterval = setInterval(nextSlide, autoPlayDelay);
  // }

  // function stopAutoPlay() {
  //   clearInterval(autoPlayInterval);
  // }

  // function resetAutoPlay() {
  //   stopAutoPlay();
  //   startAutoPlay();
  // }

  // ========================================
  // EVENT LISTENERS
  // ========================================

  // Arrow buttons
  nextBtn.addEventListener('click', function() {
    nextSlide();
    // resetAutoPlay();
  });

  prevBtn.addEventListener('click', function() {
    prevSlide();
    // resetAutoPlay();
  });

  // Dot navigation
  dots.forEach((dot, index) => {
    dot.addEventListener('click', function() {
      updateSlide(index);
      // resetAutoPlay();
    });
  });

  // Keyboard navigation
  document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowLeft') {
      prevSlide();
      // resetAutoPlay();
    } else if (e.key === 'ArrowRight') {
      nextSlide();
      // resetAutoPlay();
    }
  });

  // Pause on hover
  const heroCarousel = document.querySelector('.hero-carousel');
  
  // heroCarousel.addEventListener('mouseenter', function() {
  //   stopAutoPlay();
  // });

  // heroCarousel.addEventListener('mouseleave', function() {
  //   startAutoPlay();
  // });

  // Touch/Swipe support for mobile
  let touchStartX = 0;
  let touchEndX = 0;

  heroCarousel.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  heroCarousel.addEventListener('touchend', function(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });

  function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        // Swiped left - next slide
        nextSlide();
      } else {
        // Swiped right - previous slide
        prevSlide();
      }
      // resetAutoPlay();
    }
  }

  // ========================================
  // MOBILE NAVBAR TOGGLE
  // ========================================

  const navbarToggler = document.querySelector('.navbar-toggler');
  const navbarCollapse = document.querySelector('.navbar-collapse');

  if (navbarToggler && navbarCollapse) {
    // Close navbar when clicking a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        if (navbarCollapse.classList.contains('show')) {
          navbarToggler.click();
        }
      });
    });
  }

  // ========================================
  // SMOOTH SCROLLING FOR ANCHOR LINKS
  // ========================================

  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  
  anchorLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      // Skip if it's just "#" or external
      if (href === '#' || href.startsWith('http')) return;
      
      const target = document.querySelector(href);
      
      if (target) {
        e.preventDefault();
        
        const headerHeight = siteHeader.offsetHeight;
        const targetPosition = target.offsetTop - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ========================================
  // PREVENT FLASH OF UNSTYLED CONTENT
  // ========================================

  document.body.style.opacity = '0';
  
  window.addEventListener('load', function() {
    setTimeout(() => {
      document.body.style.transition = 'opacity 0.3s ease';
      document.body.style.opacity = '1';
    }, 100);
  });

});
// ------------------------------------------------------------------------------------------
// ========================================
// SCROLL ANIMATIONS (Simple AOS-like functionality)
// ========================================

function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('aos-animate');
      }
    });
  }, observerOptions);

  // Observe all elements with data-aos attribute
  const animatedElements = document.querySelectorAll('[data-aos]');
  animatedElements.forEach(el => observer.observe(el));
}

// Initialize animations when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  initScrollAnimations();
  
  // Counter animation for stats
  animateCounters();
});

// ========================================
// COUNTER ANIMATION
// ========================================

function animateCounters() {
  const counters = document.querySelectorAll('.stat-number');
  const speed = 200; // Animation speed

  const observerOptions = {
    threshold: 0.5
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
        entry.target.classList.add('counted');
        animateCounter(entry.target);
      }
    });
  }, observerOptions);

  counters.forEach(counter => observer.observe(counter));

  function animateCounter(counter) {
    const target = counter.innerText;
    const isPercentage = target.includes('%');
    const numericValue = parseInt(target.replace(/\D/g, ''));
    const increment = numericValue / speed;
    let current = 0;

    const updateCounter = () => {
      current += increment;
      if (current < numericValue) {
        counter.innerText = Math.ceil(current) + (isPercentage ? '%' : '+');
        requestAnimationFrame(updateCounter);
      } else {
        counter.innerText = target;
      }
    };

    updateCounter();
  }
}

// ========================================
// PROJECT FILTERING
// ========================================

document.addEventListener('DOMContentLoaded', function() {
  
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectItems = document.querySelectorAll('.project-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const filter = this.getAttribute('data-filter');

      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');

      // Filter projects
      projectItems.forEach(item => {
        const category = item.getAttribute('data-category');
        
        if (filter === 'all' || category === filter) {
          item.classList.remove('hidden');
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 10);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.8)';
          setTimeout(() => {
            item.classList.add('hidden');
          }, 500);
        }
      });
    });
  });

  // Prevent default link behavior for demo
  const projectLinks = document.querySelectorAll('.project-link');
  projectLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      // You can add modal or page navigation here
    });
  });

});


// ========================================
// CONTACT FORM HANDLING
// ========================================

document.addEventListener('DOMContentLoaded', function() {
  
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form values
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const phone = document.getElementById('phone').value;
      const service = document.getElementById('service').value;
      const message = document.getElementById('message').value;
      
      // Here you would typically send the form data to your server
      console.log('Form submitted:', { name, email, phone, service, message });
      
      // Show success message (you can customize this)
      alert('Thank you for your message! We will get back to you soon.');
      
      // Reset form
      contactForm.reset();
    });
  }

  // Newsletter form
  const newsletterForm = document.querySelector('.newsletter-form');
  
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const email = this.querySelector('input[type="email"]').value;
      console.log('Newsletter subscription:', email);
      alert('Thank you for subscribing to our newsletter!');
      this.reset();
    });
  }

  // ========================================
  // SCROLL TO TOP BUTTON
  // ========================================

  const scrollToTopBtn = document.getElementById('scrollToTop');

  window.addEventListener('scroll', function() {
    if (window.scrollY > 500) {
      scrollToTopBtn.classList.add('visible');
    } else {
      scrollToTopBtn.classList.remove('visible');
    }
  });

  scrollToTopBtn.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

});