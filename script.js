// ========== INITIALISATION ==========
document.addEventListener('DOMContentLoaded', () => {
    initPreloader();
    initLucideIcons();
    initNavbar();
    initTypewriter();
    initStatsCounter();
    initSkillsAnimation();
    initPortfolioFilter();
    initContactForm();
    initScrollAnimations();
    initBackToTop();
    initScrollIndicator();
    initHeroAnimation();
    
    console.log('%c🎨 Portfolio d\'Alfred AYITOU', 'color: #5900ff; font-size: 18px; font-weight: bold;');
    console.log('%c💻 Développeur web Orienté IA , Designer UI/UX & Ingénieur IA', 'color: #9d57ffff; font-size: 14px;');
    console.log('%c📍 Lomé, Togo | 📧 alfredayitou@gmail.com', 'color: #4f0beeff; font-size: 12px;');
});

// ========== PRELOADER ==========
function initPreloader() {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                preloader.classList.add('hidden');
            }, 500);
        });
    }
}

// ========== LUCIDE ICONS ==========
function initLucideIcons() {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

// ========== NAVBAR ==========
function initNavbar() {
    const header = document.querySelector('header');
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            const isActive = navLinks.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if (icon) {
                icon.setAttribute('data-lucide', isActive ? 'x' : 'menu');
                initLucideIcons();
            }
        });

        // Close menu when clicking on links
        navLinksItems.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                if (icon) {
                    icon.setAttribute('data-lucide', 'menu');
                    initLucideIcons();
                }
            });
        });
    }

    // Header scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Update active nav link
        updateActiveNavLink();
    });

    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '#!') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const headerHeight = header.offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Update active nav link on scroll
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const headerHeight = document.querySelector('header').offsetHeight;
        
        if (scrollY >= (sectionTop - headerHeight - 100)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// ========== TYPEWRITER EFFECT ==========
function initTypewriter() {
    const typewriter = document.getElementById('typewriter');
    if (!typewriter) return;
    
    const text = typewriter.textContent;
    typewriter.textContent = '';
    let i = 0;
    
    function type() {
        if (i < text.length) {
            typewriter.textContent += text.charAt(i);
            i++;
            setTimeout(type, 50);
        } else {
            // Add blinking cursor
            typewriter.innerHTML += '<span class="cursor">|</span>';
        }
    }
    
    // Start after delay
    setTimeout(type, 1500);
}

// ========== STATS COUNTER ==========
function initStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number[data-count]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const stat = entry.target;
                const target = parseInt(stat.getAttribute('data-count'));
                const duration = 2000;
                const increment = target / (duration / 16);
                let current = 0;
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    stat.textContent = Math.floor(current);
                }, 16);
                
                observer.unobserve(stat);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => observer.observe(stat));
}

// ========== SKILLS ANIMATION ==========
function initSkillsAnimation() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const targetWidth = progressBar.getAttribute('data-width');
                
                // Animate the progress bar
                setTimeout(() => {
                    progressBar.style.width = targetWidth + '%';
                }, 300);
                
                observer.unobserve(progressBar);
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
    });
    
    skillBars.forEach(bar => {
        bar.style.width = '0%';
        observer.observe(bar);
    });
}

// ========== PORTFOLIO FILTER ==========
function initPortfolioFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            // Filter projects
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || category.includes(filter)) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// ========== CONTACT FORM ==========
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message')
        };
        
        // Validation
        if (!validateForm(data)) return;
        
        // Submit button
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        // Loading state
        submitBtn.innerHTML = '<i data-lucide="loader" class="spinner"></i> Envoi en cours...';
        submitBtn.disabled = true;
        initLucideIcons();
        
        try {
            // Simulate API call (replace with real API)
            await simulateApiCall(data);
            
            // Success
            showFormStatus('Message envoyé avec succès !', 'success');
            contactForm.reset();
            
            // Reset button
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                initLucideIcons();
            }, 2000);
            
        } catch (error) {
            // Error
            showFormStatus('Erreur lors de l\'envoi. Veuillez réessayer.', 'error');
            
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            initLucideIcons();
        }
    });
    
    // Real-time validation
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            clearFieldError(this);
        });
    });
}

function validateForm(data) {
    let isValid = true;
    
    if (!data.name || data.name.trim().length < 2) {
        showFieldError('name', 'Le nom doit contenir au moins 2 caractères');
        isValid = false;
    }
    
    if (!data.email || !isValidEmail(data.email)) {
        showFieldError('email', 'Veuillez entrer un email valide');
        isValid = false;
    }
    
    if (!data.subject || data.subject.trim().length < 3) {
        showFieldError('subject', 'Le sujet doit contenir au moins 3 caractères');
        isValid = false;
    }
    
    if (!data.message || data.message.trim().length < 10) {
        showFieldError('message', 'Le message doit contenir au moins 10 caractères');
        isValid = false;
    }
    
    return isValid;
}

function validateField(field) {
    const value = field.value.trim();
    const fieldId = field.id;
    
    switch (fieldId) {
        case 'name':
            if (value.length < 2) {
                showFieldError(field, 'Le nom doit contenir au moins 2 caractères');
                return false;
            }
            break;
            
        case 'email':
            if (!isValidEmail(value)) {
                showFieldError(field, 'Veuillez entrer un email valide');
                return false;
            }
            break;
            
        case 'subject':
            if (value.length < 3) {
                showFieldError(field, 'Le sujet doit contenir au moins 3 caractères');
                return false;
            }
            break;
            
        case 'message':
            if (value.length < 10) {
                showFieldError(field, 'Le message doit contenir au moins 10 caractères');
                return false;
            }
            break;
    }
    
    clearFieldError(field);
    return true;
}

function showFieldError(field, message) {
    if (typeof field === 'string') {
        field = document.getElementById(field);
    }
    
    clearFieldError(field);
    
    field.classList.add('error');
    
    const errorElement = document.createElement('div');
    errorElement.className = 'field-error';
    errorElement.textContent = message;
    errorElement.style.cssText = `
        color: #ff6b9d;
        font-size: 0.8rem;
        margin-top: 5px;
    `;
    
    field.parentNode.appendChild(errorElement);
}

function clearFieldError(field) {
    if (typeof field === 'string') {
        field = document.getElementById(field);
    }
    
    field.classList.remove('error');
    
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

async function simulateApiCall(data) {
    // Simulate API call delay
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Simulate 90% success rate
            Math.random() > 0.1 ? resolve() : reject();
        }, 1500);
    });
}

function showFormStatus(message, type) {
    const statusElement = document.getElementById('formStatus');
    if (!statusElement) return;
    
    statusElement.textContent = message;
    statusElement.className = `form-status ${type}`;
    
    // Hide after 5 seconds
    setTimeout(() => {
        statusElement.style.opacity = '0';
        setTimeout(() => {
            statusElement.textContent = '';
            statusElement.className = 'form-status';
            statusElement.style.opacity = '1';
        }, 300);
    }, 5000);
}

// ========== SCROLL ANIMATIONS ==========
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.fade-in-up, .fade-in');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// ========== BACK TO TOP ==========
function initBackToTop() {
    const backToTop = document.getElementById('backToTop');
    if (!backToTop) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ========== SCROLL INDICATOR ==========
function initScrollIndicator() {
    const scrollIndicator = document.getElementById('scrollIndicator');
    if (!scrollIndicator) return;
    
    scrollIndicator.addEventListener('click', () => {
        window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth'
        });
    });
    
    // Hide after first scroll
    let scrolled = false;
    window.addEventListener('scroll', () => {
        if (!scrolled && window.scrollY > 100) {
            scrolled = true;
            scrollIndicator.style.opacity = '0';
            setTimeout(() => {
                scrollIndicator.style.display = 'none';
            }, 300);
        }
    });
}

// ========== HERO ANIMATION ==========
function initHeroAnimation() {
    // Animate hero elements on load
    const heroElements = document.querySelectorAll('.hero-subtitle, .hero-name, .job-title, .hero-description, .hero-btns');
    heroElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, 300 + (index * 100));
    });
}

// ========== STAR ANIMATIONS ==========
function animateStars() {
    const stars = document.querySelectorAll('.star');
    stars.forEach(star => {
        // Random movement
        const randomX = Math.random() * 20 - 10;
        const randomY = Math.random() * 20 - 10;
        star.style.transform = `translate(${randomX}px, ${randomY}px)`;
    });
}

// Animate stars periodically
setInterval(animateStars, 3000);

// Initial star animation
setTimeout(animateStars, 1000);

// ========== WINDOW RESIZE HANDLER ==========
window.addEventListener('resize', () => {
    initLucideIcons();
    
    // Handle mobile menu on resize
    if (window.innerWidth > 768) {
        const navLinks = document.querySelector('.nav-links');
        const menuToggle = document.getElementById('menuToggle');
        if (navLinks && menuToggle) {
            navLinks.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            if (icon) {
                icon.setAttribute('data-lucide', 'menu');
                initLucideIcons();
            }
        }
    }
});

// ========== INITIALIZE ON LOAD ==========
window.addEventListener('load', () => {
    // Final initialization
    initLucideIcons();
});