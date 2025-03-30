document.addEventListener('DOMContentLoaded', function() {
    // Menu toggle functionality
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    if (menuToggle && nav) {
      menuToggle.addEventListener('click', function() {
        nav.classList.toggle('active');
        menuToggle.classList.toggle('active');
      });
    }
  
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        // Only apply smooth scrolling to anchors that point to sections on the same page
        if (this.getAttribute('href').startsWith('#')) {
          e.preventDefault();
          
          // Close mobile menu if open
          if (nav && nav.classList.contains('active')) {
            nav.classList.remove('active');
            if (menuToggle) menuToggle.classList.remove('active');
          }
          
          const targetId = this.getAttribute('href');
          
          // Special handling for "back to main" links
          if (targetId === '#' && this.classList.contains('back-to-main')) {
            // Hide all article pages
            document.querySelectorAll('.full-article').forEach(article => {
              article.style.display = 'none';
            });
            
            // Show main content
            const mainContent = document.getElementById('main-content');
            if (mainContent) {
              mainContent.style.display = 'block';
            }
            
            // Scroll to blog section
            const blogSection = document.getElementById('blog');
            if (blogSection) {
              window.scrollTo({
                top: blogSection.offsetTop - 80,
                behavior: 'smooth'
              });
            }
            return;
          }
          
          const targetElement = document.querySelector(targetId);
          
          if (targetElement) {
            window.scrollTo({
              top: targetElement.offsetTop - 80, 
              behavior: 'smooth'
            });
            
            // Update active nav link
            document.querySelectorAll('nav a').forEach(link => {
              link.classList.remove('active');
            });
            this.classList.add('active');
          }
        }
      });
    });
  
    // Accordion functionality
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    accordionItems.forEach(item => {
      const header = item.querySelector('.accordion-header');
      
      if (header) {
        header.addEventListener('click', function() {
          const isActive = item.classList.contains('active');
          
          // Close all accordion items
          accordionItems.forEach(accordionItem => {
            accordionItem.classList.remove('active');
          });
          
          // Open the clicked item if it wasn't already open
          if (!isActive) {
            item.classList.add('active');
          }
        });
      }
    });
  
    // Form submission handling
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        if (!name || !email || !subject || !message) {
          alert('Por favor, completa todos los campos del formulario.');
          return;
        }
        
        // Aquí puedes agregar código para enviar el correo electrónico a lopezsolutions46@gmail.com
        // Por ejemplo, podrías usar un servicio como EmailJS, FormSubmit o similar
        
        alert('¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.');
        contactForm.reset();
      });
    }
  
    // Read more functionality
    const readMoreButtons = document.querySelectorAll('.read-more');
    
    readMoreButtons.forEach(button => {
      button.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Get the article ID from the data attribute
        const articleId = this.getAttribute('data-article');
        
        if (articleId) {
          // Hide main content
          const mainContent = document.getElementById('main-content');
          if (mainContent) {
            mainContent.style.display = 'none';
          }
          
          // Show the selected article
          const articleElement = document.getElementById(articleId);
          if (articleElement) {
            articleElement.style.display = 'block';
            
            // Scroll to top
            window.scrollTo({
              top: 0,
              behavior: 'smooth'
            });
          }
        }
      });
    });
  
    // Back to main content functionality
    const backButtons = document.querySelectorAll('.back-to-main');
    
    backButtons.forEach(button => {
      button.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Hide all article pages
        document.querySelectorAll('.full-article').forEach(article => {
          article.style.display = 'none';
        });
        
        // Show main content
        const mainContent = document.getElementById('main-content');
        if (mainContent) {
          mainContent.style.display = 'block';
        }
        
        // Scroll to blog section
        const blogSection = document.getElementById('blog');
        if (blogSection) {
          window.scrollTo({
            top: blogSection.offsetTop - 80,
            behavior: 'smooth'
          });
        }
      });
    });
  
    // Highlight active navigation item based on scroll position
    window.addEventListener('scroll', function() {
      const scrollPosition = window.scrollY;
      
      const sections = document.querySelectorAll('section');
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) { 
          document.querySelectorAll('nav a').forEach(link => {
            link.classList.remove('active');
          });
  
          const activeLink = document.querySelector(`nav a[href="#${sectionId}"]`);
          if (activeLink) {
            activeLink.classList.add('active');
          }
        }
      });
    });
  
    // Animations on scroll
    function fadeInOnScroll() {
      const elements = document.querySelectorAll('.service-card, .support-card, .blog-card, .about-content, .contact-wrapper');
      
      elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementPosition < windowHeight - 50) {
          element.style.opacity = '1';
          element.style.transform = 'translateY(0)';
        }
      });
    }
    
    // Set initial opacity and transform for animated elements
    const animatedElements = document.querySelectorAll('.service-card, .support-card, .blog-card, .about-content, .contact-wrapper');
    
    animatedElements.forEach(element => {
      element.style.opacity = '0';
      element.style.transform = 'translateY(20px)';
      element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Check for animations when page loads and on scroll
    fadeInOnScroll();
    window.addEventListener('scroll', fadeInOnScroll);
  });