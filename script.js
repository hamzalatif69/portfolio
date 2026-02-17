// DOM Elements
const navbar = document.getElementById('navbar');
const navMenu = document.getElementById('nav-menu');
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelectorAll('.nav-link');
const contactForm = document.getElementById('contact-form');
const modal = document.getElementById('project-modal');
const closeModal = document.getElementById('close-modal');
const viewProjectButtons = document.querySelectorAll('.view-project');

// Project Data
const projects = {
    1: {
        title: 'E-Commerce Platform',
        description: 'A full-featured e-commerce platform built with modern web technologies. Features include user authentication, product catalog, shopping cart, payment integration, and admin dashboard. The platform is fully responsive and optimized for performance.',
        technologies: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Node.js', 'MongoDB', 'Stripe API'],
        liveLink: '#',
        codeLink: '#'
    },
    2: {
        title: 'Business Website',
        description: 'Professional corporate website for a local Multan business. Includes company information, services showcase, client testimonials, and contact forms. Built with SEO optimization to improve local search rankings.',
        technologies: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap', 'SEO Optimization'],
        liveLink: '#',
        codeLink: '#'
    },
    3: {
        title: 'Portfolio Site',
        description: 'Creative portfolio website for a professional photographer. Features image galleries, project categorization, smooth animations, and contact forms. Optimized for fast loading and excellent user experience.',
        technologies: ['HTML5', 'CSS3', 'JavaScript', 'GSAP Animations', 'Responsive Design'],
        liveLink: '#',
        codeLink: '#'
    },
    4: {
        title: 'Restaurant Website',
        description: 'Modern restaurant website with online ordering system. Features menu display, reservation system, customer reviews, and integrated payment gateway. Mobile-optimized for customers on the go.',
        technologies: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Firebase', 'Payment Integration'],
        liveLink: '#',
        codeLink: '#'
    },
    5: {
        title: 'Educational Platform',
        description: 'Interactive learning management system for online education. Includes video lectures, quizzes, progress tracking, and certificate generation. Built with scalability and user engagement in mind.',
        technologies: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Node.js', 'WebRTC', 'Database'],
        liveLink: '#',
        codeLink: '#'
    },
    6: {
        title: 'Real Estate Website',
        description: 'Comprehensive property listing website with advanced search functionality. Features property filters, virtual tours, agent profiles, and mortgage calculator. Optimized for local SEO in Multan.',
        technologies: ['HTML5', 'CSS3', 'JavaScript', 'Vue.js', 'Map Integration', 'SEO'],
        liveLink: '#',
        codeLink: '#'
    }
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initScrollReveal();
    initTypingAnimation();
    initModal();
    initContactForm();
    initActiveNavHighlight();
});

// Navigation functionality
function initNavigation() {
    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Active navigation highlight
function initActiveNavHighlight() {
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });
}

// Scroll reveal animations
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    
    const revealOnScroll = function() {
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('active');
            }
        });
    };

    // Initial check
    revealOnScroll();
    
    // Check on scroll
    window.addEventListener('scroll', revealOnScroll);
}

// Typing animation for hero tagline
function initTypingAnimation() {
    const typingText = document.querySelector('.typing-text');
    if (!typingText) return;

    const text = typingText.textContent;
    typingText.textContent = '';
    typingText.style.opacity = '1';

    let index = 0;
    const typeSpeed = 50;

    function type() {
        if (index < text.length) {
            typingText.textContent += text.charAt(index);
            index++;
            setTimeout(type, typeSpeed);
        }
    }

    // Start typing after a short delay
    setTimeout(type, 1000);
}

// Modal functionality
function initModal() {
    // Open modal when clicking on view project buttons
    viewProjectButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const projectId = this.getAttribute('data-project-id');
            openModal(projectId);
        });
    });

    // Close modal when clicking on close button
    closeModal.addEventListener('click', closeModalFunction);

    // Close modal when clicking outside the modal content
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModalFunction();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeModalFunction();
        }
    });
}

function openModal(projectId) {
    const project = projects[projectId];
    if (!project) return;

    // Update modal content
    document.getElementById('modal-title').textContent = project.title;
    document.getElementById('modal-description').innerHTML = `<p>${project.description}</p>`;
    
    // Update technologies
    const techList = document.getElementById('modal-tech-list');
    techList.innerHTML = '';
    project.technologies.forEach(tech => {
        const techTag = document.createElement('span');
        techTag.className = 'tech-tag';
        techTag.textContent = tech;
        techList.appendChild(techTag);
    });

    // Update links
    document.getElementById('modal-live-link').href = project.liveLink;
    document.getElementById('modal-code-link').href = project.codeLink;

    // Show modal
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeModalFunction() {
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
}

// Contact form validation and submission
function initContactForm() {
    if (!contactForm) return;

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            submitForm();
        }
    });

    // Real-time validation
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            clearError(this);
        });
    });
}

function validateForm() {
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');
    
    let isValid = true;

    // Validate name
    if (!validateField(name)) {
        isValid = false;
    }

    // Validate email
    if (!validateField(email)) {
        isValid = false;
    }

    // Validate message
    if (!validateField(message)) {
        isValid = false;
    }

    return isValid;
}

function validateField(field) {
    const fieldName = field.name;
    const fieldValue = field.value.trim();
    const errorElement = document.getElementById(`${fieldName}-error`);

    // Clear previous error
    clearError(field);

    // Name validation
    if (fieldName === 'name') {
        if (fieldValue.length < 2) {
            showError(field, 'Name must be at least 2 characters long');
            return false;
        }
        if (!/^[a-zA-Z\s]+$/.test(fieldValue)) {
            showError(field, 'Name should only contain letters and spaces');
            return false;
        }
    }

    // Email validation
    if (fieldName === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(fieldValue)) {
            showError(field, 'Please enter a valid email address');
            return false;
        }
    }

    // Message validation
    if (fieldName === 'message') {
        if (fieldValue.length < 10) {
            showError(field, 'Message must be at least 10 characters long');
            return false;
        }
        if (fieldValue.length > 1000) {
            showError(field, 'Message must be less than 1000 characters');
            return false;
        }
    }

    return true;
}

function showError(field, message) {
    const errorElement = document.getElementById(`${field.name}-error`);
    errorElement.textContent = message;
    field.style.borderColor = 'var(--accent-pink)';
}

function clearError(field) {
    const errorElement = document.getElementById(`${field.name}-error`);
    errorElement.textContent = '';
    field.style.borderColor = '';
}

function submitForm() {
    const submitBtn = contactForm.querySelector('.submit-btn');
    const successMessage = document.getElementById('success-message');
    
    // Show loading state
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;

    // Simulate form submission (replace with actual form submission logic)
    setTimeout(function() {
        // Hide loading state
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;

        // Show success message
        successMessage.classList.add('show');

        // Reset form
        contactForm.reset();

        // Hide success message after 5 seconds
        setTimeout(function() {
            successMessage.classList.remove('show');
        }, 5000);

        // Log form data (replace with actual submission)
        console.log('Form submitted successfully!');
    }, 2000);
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href').slice(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Add reveal classes to elements
function addRevealClasses() {
    // Hero elements
    const heroContent = document.querySelector('.hero-content');
    const heroVisual = document.querySelector('.hero-visual');
    
    if (heroContent) heroContent.classList.add('reveal-left');
    if (heroVisual) heroVisual.classList.add('reveal-right');

    // About section
    const aboutText = document.querySelector('.about-text');
    const aboutStats = document.querySelector('.about-stats');
    
    if (aboutText) aboutText.classList.add('reveal-left');
    if (aboutStats) aboutStats.classList.add('reveal-right');

    // Service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        card.classList.add('reveal');
        card.style.transitionDelay = `${index * 0.1}s`;
    });

    // Portfolio items
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    portfolioItems.forEach((item, index) => {
        item.classList.add('reveal');
        item.style.transitionDelay = `${index * 0.1}s`;
    });

    // Feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        card.classList.add('reveal');
        card.style.transitionDelay = `${index * 0.1}s`;
    });

    // Contact section
    const contactInfo = document.querySelector('.contact-info');
    const contactFormElement = document.querySelector('.contact-form');
    
    if (contactInfo) contactInfo.classList.add('reveal-left');
    if (contactFormElement) contactFormElement.classList.add('reveal-right');
}

// Initialize reveal classes when DOM is loaded
document.addEventListener('DOMContentLoaded', addRevealClasses);

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll event listeners
const debouncedScrollReveal = debounce(initScrollReveal, 10);
const debouncedActiveNav = debounce(initActiveNavHighlight, 10);

window.addEventListener('scroll', debouncedScrollReveal);
window.addEventListener('scroll', debouncedActiveNav);

// Add loading animation for images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', lazyLoadImages);

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Tab navigation enhancement
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-nav');
});

// Add focus styles for keyboard navigation
const style = document.createElement('style');
style.textContent = `
    .keyboard-nav *:focus {
        outline: 2px solid var(--accent-blue) !important;
        outline-offset: 2px !important;
    }
`;
document.head.appendChild(style);

// Console message for developers
console.log('%c Hamza Web Solutions - Best Website Developer in Multan', 
            'background: linear-gradient(135deg, #00d4ff, #7c3aed); color: white; font-size: 16px; padding: 10px; border-radius: 5px;');
console.log('%c Software Developer in Multan | Web Solutions in Multan', 
            'color: #00d4ff; font-size: 12px;');
