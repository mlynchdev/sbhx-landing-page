/**
 * SBHX - Santa Barbara Hackerspace
 * Main JavaScript
 */

(function() {
  'use strict';

  // ========================================
  // Theme Toggle
  // ========================================
  const themeToggle = document.getElementById('themeToggle');

  function getStoredTheme() {
    return localStorage.getItem('theme');
  }

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }

  function initTheme() {
    const stored = getStoredTheme();
    if (stored) {
      setTheme(stored);
    } else {
      // Default to dark mode
      setTheme('dark');
    }
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', function() {
      const current = document.documentElement.getAttribute('data-theme');
      setTheme(current === 'dark' ? 'light' : 'dark');
    });
  }

  // Initialize theme on load
  initTheme();

  // ========================================
  // Mobile Navigation
  // ========================================
  const navToggle = document.getElementById('navToggle');
  const nav = document.getElementById('nav');

  if (navToggle && nav) {
    navToggle.addEventListener('click', function() {
      nav.classList.toggle('open');
      navToggle.classList.toggle('active');

      // Update aria-expanded
      const isOpen = nav.classList.contains('open');
      navToggle.setAttribute('aria-expanded', isOpen);

      // Prevent body scroll when nav is open
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close nav when clicking a link
    nav.querySelectorAll('.nav-link').forEach(function(link) {
      link.addEventListener('click', function() {
        nav.classList.remove('open');
        navToggle.classList.remove('active');
        document.body.style.overflow = '';
      });
    });

    // Close nav on escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && nav.classList.contains('open')) {
        nav.classList.remove('open');
        navToggle.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // ========================================
  // Scroll Reveal Animations
  // ========================================
  const revealElements = document.querySelectorAll('.reveal, .reveal-stagger');

  if (revealElements.length > 0 && 'IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(function(el) {
      revealObserver.observe(el);
    });
  } else {
    // Fallback for browsers without IntersectionObserver
    revealElements.forEach(function(el) {
      el.classList.add('visible');
    });
  }

  // ========================================
  // Equipment Filter
  // ========================================
  const filterButtons = document.querySelectorAll('.filter-btn');
  const equipmentGrid = document.getElementById('equipmentGrid');

  if (filterButtons.length > 0 && equipmentGrid) {
    const equipmentCards = equipmentGrid.querySelectorAll('.equipment-card');

    filterButtons.forEach(function(btn) {
      btn.addEventListener('click', function() {
        const filter = this.dataset.filter;

        // Update active button
        filterButtons.forEach(function(b) {
          b.classList.remove('active');
        });
        this.classList.add('active');

        // Filter cards
        equipmentCards.forEach(function(card) {
          const category = card.dataset.category;

          if (filter === 'all' || category === filter) {
            card.style.display = '';
            card.style.animation = 'fadeIn 0.3s ease forwards';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // ========================================
  // FAQ Accordion
  // ========================================
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(function(item) {
    const question = item.querySelector('.faq-question');

    if (question) {
      question.addEventListener('click', function() {
        const isOpen = item.classList.contains('open');

        // Close all other items
        faqItems.forEach(function(otherItem) {
          if (otherItem !== item) {
            otherItem.classList.remove('open');
          }
        });

        // Toggle current item
        item.classList.toggle('open');

        // Update aria-expanded
        question.setAttribute('aria-expanded', !isOpen);
      });
    }
  });

  // ========================================
  // Contact Form
  // ========================================
  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

      // Get form data
      const formData = new FormData(contactForm);
      const data = Object.fromEntries(formData);

      // Simple validation
      if (!data.name || !data.email || !data.message) {
        alert('Please fill in all required fields.');
        return;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.email)) {
        alert('Please enter a valid email address.');
        return;
      }

      // In a real implementation, you would send this to a server
      // For now, just show a success message
      alert('Thank you for your message! We\'ll get back to you soon.');
      contactForm.reset();
    });
  }

  // ========================================
  // Header Scroll Effect
  // ========================================
  const header = document.querySelector('.header');

  if (header) {
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
      const currentScroll = window.pageYOffset;

      // Add shadow when scrolled
      if (currentScroll > 10) {
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
      } else {
        header.style.boxShadow = 'none';
      }

      lastScroll = currentScroll;
    }, { passive: true });
  }

  // ========================================
  // Smooth Scroll for Anchor Links
  // ========================================
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');

      if (targetId === '#') return;

      const target = document.querySelector(targetId);

      if (target) {
        e.preventDefault();
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ========================================
  // Add CSS Animation for Filter
  // ========================================
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `;
  document.head.appendChild(style);

  // ========================================
  // Prefers Reduced Motion
  // ========================================
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  if (prefersReducedMotion.matches) {
    // Disable animations for users who prefer reduced motion
    document.documentElement.style.setProperty('--transition-fast', '0ms');
    document.documentElement.style.setProperty('--transition-base', '0ms');
    document.documentElement.style.setProperty('--transition-slow', '0ms');
  }

  // ========================================
  // Console Easter Egg
  // ========================================
  console.log('%c◈ SBHX', 'color: #00ff41; font-size: 24px; font-weight: bold;');
  console.log('%cthink it. build it. break it.', 'color: #00ff41; font-size: 14px;');
  console.log('%cWant to help build this site? Join us at sbhackerspace.com!', 'color: #a0a0a0; font-size: 12px;');

})();
