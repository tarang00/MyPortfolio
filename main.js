document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    initPreloader();
    initThemeToggle();
    initMobileNav();
    initSmoothScroll();
    initScrollReveal();
    initParticles();
    initCustomCursor();
    initNavbarActiveState();
    initScrollProgress();
    initContactForm();
    initBackToTop();
    init3DEffects();
  });
  
  // ========== PRELOADER ==========
  function initPreloader() {
    const preloader = document.querySelector('.preloader');
    
    window.addEventListener('load', () => {
      setTimeout(() => {
        preloader.classList.add('hide');
        // Animate hero elements after preloader disappears
        document.querySelectorAll('.animate-fade-in').forEach((el, index) => {
          setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
          }, 200 * index);
        });
      }, 500);
    });
  }
  
  // ========== THEME TOGGLE ==========
  function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('i');
    
    // Check for saved theme preference or respect OS preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      document.documentElement.setAttribute('data-theme', 'dark');
      themeIcon.classList.replace('fa-moon', 'fa-sun');
    }
    
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      
      // Toggle icon
      if (newTheme === 'dark') {
        themeIcon.classList.replace('fa-moon', 'fa-sun');
      } else {
        themeIcon.classList.replace('fa-sun', 'fa-moon');
      }
      
      // Add transition effect to the body
      document.body.style.transition = 'background-color 0.5s ease, color 0.5s ease';
    });
  }
  
  // ========== MOBILE NAVIGATION ==========
  function initMobileNav() {
    const mobileToggle = document.getElementById('mobileNavToggle');
    const navLinks = document.getElementById('navLinks');
    const navLinksItems = document.querySelectorAll('.nav-link');
    
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      
      const icon = mobileToggle.querySelector('i');
      if (navLinks.classList.contains('active')) {
        icon.classList.replace('fa-bars', 'fa-times');
      } else {
        icon.classList.replace('fa-times', 'fa-bars');
      }
    });
    
    // Close mobile menu when clicking a link
    navLinksItems.forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
          navLinks.classList.remove('active');
          mobileToggle.querySelector('i').classList.replace('fa-times', 'fa-bars');
        }
      });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
      if (window.innerWidth <= 768 && 
          !e.target.closest('#navLinks') && 
          !e.target.closest('#mobileNavToggle') && 
          navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        mobileToggle.querySelector('i').classList.replace('fa-times', 'fa-bars');
      }
    });
  }
  
  // ========== SMOOTH SCROLLING ==========
  function initSmoothScroll() {
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    
    scrollLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        
        const targetId = link.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (!targetElement) return;
        
        const navbarHeight = document.querySelector('#navbar').offsetHeight;
        const targetPosition = targetElement.offsetTop - navbarHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      });
    });
  }
  
  // ========== SCROLL REVEAL ANIMATIONS ==========
  function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal-text, .reveal-fade, .reveal-left, .reveal-right');
    
    const revealHandler = () => {
      revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100 && elementBottom > 0) {
          element.classList.add('active');
        }
      });
    };
    
    // Initial check
    revealHandler();
    
    // Check on scroll
    window.addEventListener('scroll', revealHandler);
  }
  
  // ========== PARTICLES BACKGROUND ==========
  function initParticles() {
    const canvas = document.getElementById('particles');
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    let particlesArray = [];
    const numberOfParticles = Math.min(window.innerWidth / 20, 100);
    const isDarkTheme = document.documentElement.getAttribute('data-theme') === 'dark';
    
    // Set particle colors based on theme
    const particleColor = isDarkTheme ? 'rgba(99, 102, 241, 0.2)' : 'rgba(79, 70, 229, 0.1)';
    
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 5 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
      }
      
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
      }
      
      draw() {
        ctx.fillStyle = particleColor;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
      }
    }
    
    function init() {
      particlesArray = [];
      for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
      }
    }
    
    function connect() {
      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
          const dx = particlesArray[a].x - particlesArray[b].x;
          const dy = particlesArray[a].y - particlesArray[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 120) {
            const opacity = 1 - (distance / 120);
            ctx.strokeStyle = isDarkTheme ? 
              `rgba(99, 102, 241, ${opacity * 0.2})` : 
              `rgba(79, 70, 229, ${opacity * 0.1})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
            ctx.stroke();
          }
        }
      }
    }
    
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particlesArray.forEach(particle => {
        particle.update();
        particle.draw();
      });
      
      connect();
      requestAnimationFrame(animate);
    }
    
    // Handle window resize
    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    });
    
    // Initialize and start animation
    init();
    animate();
  }
  
  // ========== CUSTOM CURSOR ==========
  function initCustomCursor() {
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    // Only enable custom cursor on desktop
    if (window.innerWidth > 768) {
      document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        // Follower with slight delay using GSAP-like functionality
        setTimeout(() => {
          cursorFollower.style.left = e.clientX + 'px';
          cursorFollower.style.top = e.clientY + 'px';
        }, 70);
      });
      
      // Scale on links and buttons hover
      document.querySelectorAll('a, button, .project-card, .skill-card').forEach(item => {
        item.addEventListener('mouseenter', () => {
          cursor.style.transform = 'translate(-50%, -50%) scale(0.5)';
          cursorFollower.style.transform = 'translate(-50%, -50%) scale(1.5)';
          cursor.style.backgroundColor = 'var(--primary-color-light)';
          cursorFollower.style.borderColor = 'var(--primary-color-light)';
        });
        
        item.addEventListener('mouseleave', () => {
          cursor.style.transform = 'translate(-50%, -50%) scale(1)';
          cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
          cursor.style.backgroundColor = 'var(--primary-color)';
          cursorFollower.style.borderColor = 'var(--primary-color)';
        });
      });
    } else {
      // Hide custom cursor on mobile
      cursor.style.display = 'none';
      cursorFollower.style.display = 'none';
    }
  }
  
  // ========== NAVBAR ACTIVE STATE ==========
  function initNavbarActiveState() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
      let current = '';
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 100) {
          current = section.getAttribute('id');
        }
      });
      
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
          link.classList.add('active');
        }
      });
      
      // Add scrolled class to navbar
      const navbar = document.querySelector('.header');
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }
  
  // ========== SCROLL PROGRESS INDICATOR ==========
  function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress-bar';
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollPercent = (scrollTop / scrollHeight) * 100;
      
      progressBar.style.width = scrollPercent + '%';
      
      // Show/hide scroll indicator
      const scrollIndicator = document.querySelector('.scroll-indicator');
      if (scrollTop > 300) {
        scrollIndicator.classList.add('active');
      } else {
        scrollIndicator.classList.remove('active');
      }
    });
    
    // Scroll indicator click handler
    const scrollIndicator = document.querySelector('.scroll-indicator');
    scrollIndicator.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
  
  // ========== CONTACT FORM ==========
  function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Simple validation
        if (!name || !email || !subject || !message) {
          showFormMessage('Please fill in all fields.', 'error');
          return;
        }
        
        if (!isValidEmail(email)) {
          showFormMessage('Please enter a valid email address.', 'error');
          return;
        }
        
        // Simulating form submission
        const submitButton = contactForm.querySelector('.btn-submit');
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitButton.disabled = true;
        
        setTimeout(() => {
          // Reset form
          contactForm.reset();
          
          // Show success message
          showFormMessage('Your message has been sent successfully!', 'success');
          
          // Reset button
          submitButton.innerHTML = 'Send Message <i class="fas fa-paper-plane"></i>';
          submitButton.disabled = false;
        }, 2000);
      });
    }
    
    // Helper functions
    function isValidEmail(email) {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    }
    
    function showFormMessage(message, type) {
      // Remove existing message
      const existingMessage = document.querySelector('.form-message');
      if (existingMessage) {
        existingMessage.remove();
      }
      
      // Create new message
      const messageElement = document.createElement('div');
      messageElement.className = `form-message ${type}`;
      messageElement.textContent = message;
      
      // Add message to form
      contactForm.appendChild(messageElement);
      
      // Remove message after 5 seconds
      setTimeout(() => {
        messageElement.remove();
      }, 5000);
    }
  }
  
  // ========== BACK TO TOP BUTTON ==========
  function initBackToTop() {
    const backToTop = document.getElementById('backToTop');
    
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 500) {
        backToTop.classList.add('active');
      } else {
        backToTop.classList.remove('active');
      }
    });
    
    backToTop.addEventListener('click', (e) => {
      e.preventDefault();
      
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
  
  // ========== 3D EFFECTS ==========
  function init3DEffects() {
    // Adding 3D tilt effect to project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
      card.addEventListener('mousemove', handleTilt);
      card.addEventListener('mouseleave', resetTilt);
    });
    
    // Adding parallax effect to hero section
    const heroSection = document.querySelector('.hero');
    const heroShapes = document.querySelectorAll('.shape');
    
    window.addEventListener('mousemove', (e) => {
      if (!heroSection) return;
      
      const mouseX = e.clientX / window.innerWidth;
      const mouseY = e.clientY / window.innerHeight;
      
      heroShapes.forEach((shape, index) => {
        const depth = index + 1;
        const moveX = (mouseX - 0.5) * 50 * depth;
        const moveY = (mouseY - 0.5) * 50 * depth;
        
        shape.style.transform = `translate(${moveX}px, ${moveY}px) rotate(${moveX * 0.1}deg)`;
      });
    });
    
    // Add 3D effect to skill cards
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach(card => {
      card.addEventListener('mousemove', handleTilt);
      card.addEventListener('mouseleave', resetTilt);
    });
    
    // Handle tilt function for 3D effect
    function handleTilt(e) {
      const card = this;
      const cardRect = card.getBoundingClientRect();
      const cardWidth = cardRect.width;
      const cardHeight = cardRect.height;
      
      const centerX = cardRect.left + cardWidth / 2;
      const centerY = cardRect.top + cardHeight / 2;
      
      const mouseX = e.clientX - centerX;
      const mouseY = e.clientY - centerY;
      
      const rotateX = (mouseY / (cardHeight / 2)) * -10;
      const rotateY = (mouseX / (cardWidth / 2)) * 10;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
      card.style.transition = 'transform 0.1s ease';
      
      // Dynamic highlight effect
      if (card.querySelector('.skill-glow') || card.querySelector('.project-overlay')) {
        const glow = card.querySelector('.skill-glow') || card.querySelector('.project-overlay');
        const percentX = (mouseX / (cardWidth / 2)) * 100;
        const percentY = (mouseY / (cardHeight / 2)) * 100;
        
        glow.style.background = `radial-gradient(circle at ${50 + percentX/5}% ${50 + percentY/5}%, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 60%)`;
      }
    }
    
    function resetTilt() {
      this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
      this.style.transition = 'transform 0.5s ease';
      
      if (this.querySelector('.skill-glow') || this.querySelector('.project-overlay')) {
        const glow = this.querySelector('.skill-glow') || this.querySelector('.project-overlay');
        glow.style.background = 'none';
      }
    }
  }