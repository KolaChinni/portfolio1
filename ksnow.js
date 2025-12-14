/* ================================
   KVSP Portfolio - Modern JavaScript
   ================================ */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 KVSP Portfolio Initializing...');
    
    // Initialize all components
    initNavigation();
    initTypedText();
    initAboutTabs();
    initCertificateCarousel();
    initProjectsCarousel();
    initContactForm();
    initScrollEffects();
    initBackToTop();
    
    console.log('✅ Portfolio initialized successfully!');
});
// Define the toggleMenu function at the top of your JS file
function toggleMenu() {
    const menu = document.getElementById('mobile-menu');
    const hamburger = document.querySelector('.hamburger');
    
    if (!menu || !hamburger) {
        console.error('Menu or hamburger element not found!');
        return;
    }
    
    // Toggle using classes (better approach)
    menu.classList.toggle('active');
    hamburger.classList.toggle('active');
    
    // Or if you prefer display toggling:
    // const isVisible = menu.style.display === 'block';
    // menu.style.display = isVisible ? 'none' : 'block';
}
/* ===== NAVIGATION ===== */
function initNavigation() {
    const header = document.querySelector('.glass-header');
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('.glass-nav');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    const navIndicator = document.querySelector('.nav-indicator');
    
    // Toggle mobile menu
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            nav.classList.toggle('active');
            document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
        });
        
        // Close menu when clicking links
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                nav.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }
    
    // Update active nav link on scroll
    function updateActiveNavLink() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
                
                // Update nav indicator position
                if (navIndicator) {
                    const linkRect = link.getBoundingClientRect();
                    const navRect = nav.getBoundingClientRect();
                    navIndicator.style.width = `${linkRect.width}px`;
                    navIndicator.style.left = `${linkRect.left - navRect.left}px`;
                }
            }
        });
    }
    
    // Header scroll effect
    function updateHeader() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    
    // Event listeners
    window.addEventListener('scroll', () => {
        updateActiveNavLink();
        updateHeader();
    });
    
    // Initialize
    updateActiveNavLink();
    updateHeader();
}

/* ===== TYPED TEXT ANIMATION ===== */
function initTypedText() {
    const typedElement = document.getElementById('typed-text');
    if (!typedElement) return;
    
    // Check if Typed.js is loaded
    if (typeof Typed === 'undefined') {
        console.warn('Typed.js not loaded, using fallback text');
        typedElement.textContent = 'AI & Machine Learning Engineer';
        return;
    }
    
    try {
        new Typed('#typed-text', {
            strings: [
                'AI & Machine Learning Engineer',
                'Deep Learning Specialist',
                'Data Science Practitioner',
                'Python Developer',
                'Neural Networks Researcher'
            ],
            typeSpeed: 50,
            backSpeed: 30,
            backDelay: 2000,
            startDelay: 1000,
            loop: true,
            showCursor: true,
            cursorChar: '|',
            smartBackspace: true
        });
    } catch (error) {
        console.error('Typed.js error:', error);
        typedElement.textContent = 'AI & Machine Learning Engineer';
    }
}

/* ===== ABOUT TABS ===== */
function initAboutTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    if (tabButtons.length === 0) return;
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            button.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Initialize first tab as active
    if (tabButtons.length > 0) {
        tabButtons[0].click();
    }
}

/* ===== CERTIFICATE CAROUSEL ===== */
function initCertificateCarousel() {
    const track = document.getElementById('certificateTrack');
    const prevBtn = document.getElementById('certPrevBtn');
    const nextBtn = document.getElementById('certNextBtn');
    const dotsContainer = document.getElementById('certDots');
    
    if (!track || !prevBtn || !nextBtn) return;
    
    // Certificate data
    const certificates = [
        { src: 'certi-images/image-1.png', alt: 'Certificate 1' },
        { src: 'certi-images/image-2.png', alt: 'Certificate 2' },
        { src: 'certi-images/image-3.png', alt: 'Certificate 3' },
        { src: 'certi-images/image-4.png', alt: 'Certificate 4' },
        { src: 'certi-images/image-5.png', alt: 'Certificate 5' },
        { src: 'certi-images/image-6.png', alt: 'Certificate 6' },
        { src: 'certi-images/image-7.png', alt: 'Certificate 7' },
        { src: 'certi-images/image-8.png', alt: 'Certificate 8' },
        { src: 'certi-images/image-9.png', alt: 'Certificate 9' },
        { src: 'certi-images/image-10.png', alt: 'Certificate 10' },
        { src: 'certi-images/image-11.png', alt: 'Certificate 11' },
        { src: 'certi-images/image-12.png', alt: 'Certificate 12' },
        { src: 'certi-images/image-13.png', alt: 'Certificate 13' },
        { src: 'certi-images/image-14.png', alt: 'Certificate 14' }
    ];
    
    // Create certificate elements
    certificates.forEach(cert => {
        const img = document.createElement('img');
        img.src = cert.src;
        img.alt = cert.alt;
        img.loading = 'lazy';
        
        // Add error handling
        img.onerror = function() {
            this.src = 'other-images/placeholder-cert.png';
            this.alt = 'Certificate placeholder';
        };
        
        track.appendChild(img);
    });
    
    // Create dots
    certificates.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = 'dot';
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToCertSlide(index));
        dotsContainer.appendChild(dot);
    });
    
    const slides = track.querySelectorAll('img');
    const dots = dotsContainer.querySelectorAll('.dot');
    let currentSlide = 0;
    const slideWidth = 300; // Fixed width from CSS
    const gap = 20; // Gap from CSS
    
    function goToCertSlide(index) {
        if (index < 0) index = slides.length - 1;
        if (index >= slides.length) index = 0;
        
        currentSlide = index;
        const scrollPosition = index * (slideWidth + gap);
        
        track.scrollTo({
            left: scrollPosition,
            behavior: 'smooth'
        });
        
        updateCertDots();
    }
    
    function updateCertDots() {
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }
    
    // Button event listeners
    prevBtn.addEventListener('click', () => goToCertSlide(currentSlide - 1));
    nextBtn.addEventListener('click', () => goToCertSlide(currentSlide + 1));
    
    // Touch/swipe support
    let isDragging = false;
    let startPos = 0;
    let currentTranslate = 0;
    
    track.addEventListener('touchstart', (e) => {
        isDragging = true;
        startPos = e.touches[0].clientX;
        currentTranslate = track.scrollLeft;
    });
    
    track.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const currentPos = e.touches[0].clientX;
        const diff = startPos - currentPos;
        track.scrollLeft = currentTranslate + diff * 2;
    });
    
    track.addEventListener('touchend', () => {
        if (!isDragging) return;
        isDragging = false;
        
        // Snap to nearest slide
        const scrollPos = track.scrollLeft;
        const newIndex = Math.round(scrollPos / (slideWidth + gap));
        goToCertSlide(newIndex);
    });
    
    // Mouse drag support
    track.addEventListener('mousedown', (e) => {
        isDragging = true;
        startPos = e.pageX;
        currentTranslate = track.scrollLeft;
        track.style.cursor = 'grabbing';
        e.preventDefault();
    });
    
    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        const currentPos = e.pageX;
        const diff = startPos - currentPos;
        track.scrollLeft = currentTranslate + diff * 2;
    });
    
    document.addEventListener('mouseup', () => {
        if (!isDragging) return;
        isDragging = false;
        track.style.cursor = 'grab';
        
        // Snap to nearest slide
        const scrollPos = track.scrollLeft;
        const newIndex = Math.round(scrollPos / (slideWidth + gap));
        goToCertSlide(newIndex);
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            goToCertSlide(currentSlide - 1);
        } else if (e.key === 'ArrowRight') {
            goToCertSlide(currentSlide + 1);
        }
    });
    
    // Update dots on scroll
    track.addEventListener('scroll', () => {
        if (!isDragging) {
            const scrollPos = track.scrollLeft;
            const newIndex = Math.round(scrollPos / (slideWidth + gap));
            if (newIndex !== currentSlide) {
                currentSlide = newIndex;
                updateCertDots();
            }
        }
    });
    
    // Initialize
    updateCertDots();
}

/* ===== PROJECTS CAROUSEL ===== */
function initProjectsCarousel() {
    const container = document.getElementById('projectsContainer');
    const prevBtn = document.getElementById('projectPrevBtn');
    const nextBtn = document.getElementById('projectNextBtn');
    const dotsContainer = document.getElementById('projectDots');
    
    if (!container) return;
    
    // Project data
    const projects = [
        {
            title: "Fetal Health Prediction",
            tag: "Machine Learning",
            image: "project-images/fetalProject.jpeg",
            description: "A neural network-based model that predicts fetal health (normal, suspect, pathological) using cardiotocography (CTG) data.",
            tech: ["Python", "TensorFlow", "Neural Networks", "Healthcare AI"],
            features: ["Real-time prediction", "High accuracy", "Clinical application"],
            liveUrl: "https://linearregression-msz5sz7ksqxmuxjyr4cuvs8.streamlit.app/",
            codeUrl: "#"
        },
        {
            title: "Simple Linear Regression",
            tag: "Data Science",
            image: "project-images/simplelinearregression.png",
            description: "An interactive web app that visually demonstrates multiple types of linear regression techniques for single-variable datasets.",
            tech: ["Streamlit", "Scikit-learn", "Plotly", "Python"],
            features: ["Multiple algorithms", "Real-time plots", "Educational tool"],
            liveUrl: "https://linearregression-msz5sz7ksqxmuxjyr4cuvs8.streamlit.app/",
            codeUrl: "#"
        },
        {
            title: "Multiple Linear Regression",
            tag: "Machine Learning",
            image: "project-images/multiplelinearregression.png",
            description: "An interactive app that visualizes and compares multiple linear regression techniques on multi-feature datasets.",
            tech: ["Python", "Multiple Models", "Visualization", "Data Analysis"],
            features: ["Model comparison", "Error metrics", "Real-time visualization"],
            liveUrl: "https://linearregression-msz5sz7ksqxmuxjyr4cuvs8.streamlit.app/",
            codeUrl: "#"
        },
        {
            title: "Coming Soon",
            tag: "Full Stack",
            image: "images/image-1.png",
            description: "Exciting new project under development. Stay tuned for updates on this innovative application.",
            tech: ["React", "Node.js", "MongoDB", "Modern Stack"],
            features: ["Modern stack", "Responsive design", "Coming soon"],
            liveUrl: "#",
            codeUrl: "#"
        },
        {
            title: "Future Project",
            tag: "Data Analysis",
            image: "images/image-1.png",
            description: "Another exciting project is in the pipeline. This will demonstrate cutting-edge data analysis techniques.",
            tech: ["Python", "API", "Data Analysis", "Visualization"],
            features: ["Data visualization", "API integration", "Advanced analytics"],
            liveUrl: "#",
            codeUrl: "#"
        }
    ];
    
    // Create project cards
    projects.forEach((project, index) => {
        const card = document.createElement('div');
        card.className = 'project-card';
        
        card.innerHTML = `
            <div class="project-image">
                <img src="${project.image}" alt="${project.title}" loading="lazy">
            </div>
            <div class="project-content">
                <div class="project-tag">${project.tag}</div>
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-tech">
                    ${project.tech.map(tech => `<span class="tech-item">${tech}</span>`).join('')}
                </div>
                <div class="project-actions">
                    <a href="${project.liveUrl}" target="_blank" class="btn-view">
                        <i class="fas fa-external-link-alt"></i>
                        <span>Live Demo</span>
                    </a>
                    <a href="${project.codeUrl}" class="btn-code">
                        <i class="fab fa-github"></i>
                        <span>View Code</span>
                    </a>
                </div>
            </div>
        `;
        
        // Add error handling for images
        const img = card.querySelector('img');
        img.onerror = function() {
            this.src = 'other-images/placeholder-project.png';
            this.alt = 'Project placeholder';
        };
        
        container.appendChild(card);
    });
    
    // Create dots
    projects.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = 'dot';
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToProjectSlide(index));
        dotsContainer.appendChild(dot);
    });
    
    const cards = container.querySelectorAll('.project-card');
    const dots = dotsContainer.querySelectorAll('.dot');
    let currentSlide = 0;
    const slidesPerView = getSlidesPerView();
    
    function getSlidesPerView() {
        if (window.innerWidth < 768) return 1;
        if (window.innerWidth < 1200) return 2;
        return 3;
    }
    
    function goToProjectSlide(index) {
        if (index < 0) index = projects.length - 1;
        if (index >= projects.length) index = 0;
        
        currentSlide = index;
        
        // Update grid layout for carousel effect
        cards.forEach((card, i) => {
            card.style.display = 'none';
            card.classList.remove('active');
        });
        
        // Show current slide and adjacent slides
        for (let i = 0; i < slidesPerView; i++) {
            const slideIndex = (currentSlide + i) % projects.length;
            if (cards[slideIndex]) {
                cards[slideIndex].style.display = 'block';
                if (i === 0) cards[slideIndex].classList.add('active');
            }
        }
        
        updateProjectDots();
    }
    
    function updateProjectDots() {
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }
    
    // Button event listeners
    if (prevBtn) {
        prevBtn.addEventListener('click', () => goToProjectSlide(currentSlide - 1));
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => goToProjectSlide(currentSlide + 1));
    }
    
    // Touch/swipe support for mobile
    let startX = 0;
    let isSwiping = false;
    
    container.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isSwiping = true;
    });
    
    container.addEventListener('touchmove', (e) => {
        if (!isSwiping) return;
        e.preventDefault();
    });
    
    container.addEventListener('touchend', (e) => {
        if (!isSwiping) return;
        isSwiping = false;
        
        const endX = e.changedTouches[0].clientX;
        const diff = startX - endX;
        
        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                goToProjectSlide(currentSlide + 1); // Swipe left
            } else {
                goToProjectSlide(currentSlide - 1); // Swipe right
            }
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            goToProjectSlide(currentSlide - 1);
        } else if (e.key === 'ArrowRight') {
            goToProjectSlide(currentSlide + 1);
        }
    });
    
    // Handle window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            goToProjectSlide(currentSlide);
        }, 250);
    });
    
    // Initialize
    goToProjectSlide(0);
}

/* ===== CONTACT FORM ===== */
function initContactForm() {
    const form = document.getElementById('contactForm');
    const submitBtn = form?.querySelector('.btn-submit');
    
    if (!form || !submitBtn) return;
    
    // Form validation
    const inputs = form.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
        // Add floating label functionality
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentElement.classList.remove('focused');
            }
        });
        
        // Initialize focused state
        if (input.value) {
            input.parentElement.classList.add('focused');
        }
    });
    
    // Form submission
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Show loading state
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        
        // Get form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        try {
            // Send to Google Sheets (your existing script)
            const scriptURL = 'https://script.google.com/macros/s/AKfycbwOMzCwUUUdVUNBwhTDTDQCgS3Cr1vbThqrYaLB8UXOfnsCStGcj5NzVqtTvn7U786o/exec';
            
            const response = await fetch(scriptURL, {
                method: 'POST',
                body: formData
            });
            
            if (response.ok) {
                // Success
                submitBtn.classList.remove('loading');
                submitBtn.classList.add('success');
                
                // Show success message
                showNotification('Message sent successfully!', 'success');
                
                // Reset form
                form.reset();
                inputs.forEach(input => {
                    input.parentElement.classList.remove('focused');
                });
                
                // Reset button after delay
                setTimeout(() => {
                    submitBtn.classList.remove('success');
                    submitBtn.disabled = false;
                }, 2000);
            } else {
                throw new Error('Network response was not ok');
            }
        } catch (error) {
            console.error('Error:', error);
            
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
            
            showNotification('Failed to send message. Please try again.', 'error');
        }
    });
    
    // Notification function
    function showNotification(message, type) {
        // Remove existing notifications
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create notification
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        // Add to body
        document.body.appendChild(notification);
        
        // Show notification
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        // Close button
        notification.querySelector('.notification-close').addEventListener('click', () => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        });
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.classList.remove('show');
                setTimeout(() => {
                    notification.remove();
                }, 300);
            }
        }, 5000);
    }
    
    // Add notification styles dynamically
    const notificationStyles = document.createElement('style');
    notificationStyles.textContent = `
        .notification {
            position: fixed;
            top: 100px;
            right: 20px;
            background: var(--dark-bg);
            border-left: 4px solid var(--primary);
            padding: 1rem 1.5rem;
            border-radius: 8px;
            display: flex;
            align-items: center;
            gap: 1rem;
            box-shadow: var(--shadow-lg);
            transform: translateX(120%);
            transition: transform 0.3s ease;
            z-index: 9999;
            max-width: 400px;
        }
        
        .notification.show {
            transform: translateX(0);
        }
        
        .notification.success {
            border-left-color: var(--success);
        }
        
        .notification.error {
            border-left-color: var(--danger);
        }
        
        .notification i {
            font-size: 1.2rem;
        }
        
        .notification.success i {
            color: var(--success);
        }
        
        .notification.error i {
            color: var(--danger);
        }
        
        .notification span {
            color: var(--text-primary);
            flex: 1;
        }
        
        .notification-close {
            background: none;
            border: none;
            color: var(--text-secondary);
            cursor: pointer;
            padding: 0.25rem;
            transition: color 0.2s ease;
        }
        
        .notification-close:hover {
            color: var(--text-primary);
        }
        
        @media (max-width: 768px) {
            .notification {
                top: auto;
                bottom: 20px;
                left: 20px;
                right: 20px;
                max-width: none;
            }
        }
    `;
    document.head.appendChild(notificationStyles);
}

/* ===== SCROLL EFFECTS ===== */
function initScrollEffects() {
    // Animate elements on scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.section');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('animate');
            }
        });
    };
    
    // Initial check
    animateOnScroll();
    
    // Check on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Add animation styles
    const animationStyles = document.createElement('style');
    animationStyles.textContent = `
        .section {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .section.animate {
            opacity: 1;
            transform: translateY(0);
        }
        
        .section:nth-child(1) { transition-delay: 0.1s; }
        .section:nth-child(2) { transition-delay: 0.2s; }
        .section:nth-child(3) { transition-delay: 0.3s; }
        .section:nth-child(4) { transition-delay: 0.4s; }
    `;
    document.head.appendChild(animationStyles);
}

/* ===== BACK TO TOP ===== */
function initBackToTop() {
    const backToTopBtn = document.querySelector('.back-to-top');
    
    if (!backToTopBtn) return;
    
    // Show/hide button based on scroll position
    const toggleBackToTop = () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    };
    
    // Scroll to top when clicked
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Initial check
    toggleBackToTop();
    
    // Check on scroll
    window.addEventListener('scroll', toggleBackToTop);
}

/* ===== PERFORMANCE OPTIMIZATIONS ===== */
// Debounce function for resize events
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

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/* ===== ERROR HANDLING ===== */
// Global error handler
window.addEventListener('error', function(e) {
    console.error('Global error:', e.error);
    
    // Don't show errors in production
    if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
        return;
    }
    
    // Show user-friendly error message in development
    const errorDiv = document.createElement('div');
    errorDiv.style.cssText = `
        position: fixed;
        top: 10px;
        right: 10px;
        background: #ff4444;
        color: white;
        padding: 10px;
        border-radius: 5px;
        z-index: 99999;
        max-width: 300px;
        font-family: monospace;
        font-size: 12px;
    `;
    errorDiv.textContent = `Error: ${e.message}`;
    document.body.appendChild(errorDiv);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        errorDiv.remove();
    }, 5000);
});

// Handle images that fail to load
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('error', function() {
            console.warn(`Image failed to load: ${this.src}`);
            
            // Set placeholder for broken images
            if (!this.hasAttribute('data-placeholder-set')) {
                this.src = 'other-images/placeholder.png';
                this.setAttribute('data-placeholder-set', 'true');
                this.alt = 'Image not available';
            }
        });
    });
});

/* ===== LOADING STATES ===== */
// Show loading state while images load
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Add loaded class with delay for smooth transition
    setTimeout(() => {
        document.body.classList.add('fully-loaded');
    }, 500);
});

// Add loading styles
const loadingStyles = document.createElement('style');
loadingStyles.textContent = `
    body:not(.loaded) .section {
        opacity: 0;
    }
    
    body.loaded .section {
        opacity: 1;
        transition: opacity 0.5s ease;
    }
    
    /* Loading skeleton for images */
    .project-image,
    .certificate-track img,
    .profile-image {
        background: linear-gradient(90deg, var(--light-bg) 25%, var(--glass-bg) 50%, var(--light-bg) 75%);
        background-size: 200% 100%;
        animation: loading 1.5s infinite;
    }
    
    @keyframes loading {
        0% { background-position: 200% 0; }
        100% { background-position: -200% 0; }
    }
`;
document.head.appendChild(loadingStyles);

console.log('🎯 KVSP Portfolio JS loaded successfully!');
