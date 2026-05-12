(function() {
  // Navbar scroll effect
  const navbar = document.getElementById('navbar');
  let lastScroll = 0;
  window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    if (currentScroll > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    lastScroll = currentScroll;
  });

  // Mobile nav toggle
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  toggle.addEventListener('click', function() {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', !expanded);
    links.classList.toggle('open');
    toggle.classList.toggle('active');
  });

  // Close mobile nav on link click
  document.querySelectorAll('.nav-links a').forEach(function(link) {
    link.addEventListener('click', function() {
      links.classList.remove('open');
      toggle.classList.remove('active');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Smooth scrolling
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const offset = navbar.offsetHeight + 16;
        const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  // Program tabs
  document.querySelectorAll('.tab-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.tab-btn').forEach(function(b) { b.classList.remove('active'); });
      document.querySelectorAll('.program-day').forEach(function(d) { d.classList.remove('active'); });
      btn.classList.add('active');
      document.getElementById(btn.dataset.tab).classList.add('active');
    });
  });

  // Scroll reveal
  const revealElements = document.querySelectorAll('.about-card, .timeline-item, .highlight-card, .location-detail, .plant-text, .plant-visual, .organizer-image, .organizer-text, .sponsor-card');
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
  revealElements.forEach(function(el) { observer.observe(el); });

  // Hero image carousel
  (function() {
    var hero = document.getElementById('hero');
    var slides = hero.querySelectorAll('.hero-slide');
    var dots = hero.querySelectorAll('.carousel-dot');
    if (slides.length <= 1) return;

    var current = 0;
    var interval = parseInt(hero.dataset.carouselInterval, 10) || 5000;
    var timer = null;

    function goTo(index) {
      slides[current].classList.remove('active');
      if (dots.length) dots[current].classList.remove('active');
      current = (index + slides.length) % slides.length;
      slides[current].classList.add('active');
      if (dots.length) dots[current].classList.add('active');
    }

    function startAutoplay() {
      if (interval > 0) {
        timer = setInterval(function() { goTo(current + 1); }, interval);
      }
    }

    function resetAutoplay() {
      clearInterval(timer);
      startAutoplay();
    }

    dots.forEach(function(dot) {
      dot.addEventListener('click', function() {
        goTo(parseInt(this.dataset.slide, 10));
        resetAutoplay();
      });
    });

    startAutoplay();
  })();
})();