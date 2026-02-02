/**
 * ALAADIN'S PORTFOLIO
 * Main Application Script
 */

class Portfolio {
    constructor() {
        this.currentLang = localStorage.getItem('portfolio-lang') || 'en';
        this.currentTheme = localStorage.getItem('portfolio-theme') || 'dark';
        this.init();
    }

    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }

    setup() {
        this.applyTheme();
        this.applyLanguage();
        this.setupEventListeners();
        this.initializeParticles();
        this.initializeTypingEffect();
        this.initializeScrollEffects();
        this.initializeProjectFilters();
        this.initializeRotatingBadge();
        this.hideLoadingOverlay();
    }

    // ============================================
    // THEME MANAGEMENT
    // ============================================
    applyTheme() {
        document.documentElement.setAttribute('data-theme', this.currentTheme);
        this.updateThemeButton();
    }

    toggleTheme() {
        this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        localStorage.setItem('portfolio-theme', this.currentTheme);
        this.applyTheme();
    }

    updateThemeButton() {
        const themeBtn = document.getElementById('themeToggle');
        if (themeBtn) {
            const icon = themeBtn.querySelector('i');
            if (icon) {
                icon.className = this.currentTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
            }
        }
    }

    // ============================================
    // LANGUAGE MANAGEMENT
    // ============================================
    applyLanguage() {
        const html = document.documentElement;

        if (this.currentLang === 'ar') {
            html.setAttribute('dir', 'rtl');
            html.setAttribute('lang', 'ar');
        } else {
            html.setAttribute('dir', 'ltr');
            html.setAttribute('lang', 'en');
        }

        this.updateLanguageButtons();
        this.translatePage();
    }

    switchLanguage(lang) {
        this.currentLang = lang;
        localStorage.setItem('portfolio-lang', lang);
        this.applyLanguage();
    }

    updateLanguageButtons() {
        const langBtns = document.querySelectorAll('.lang-btn');
        langBtns.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.lang === this.currentLang) {
                btn.classList.add('active');
            }
        });
    }

    translatePage() {
        if (typeof translations === 'undefined') return;

        const t = translations[this.currentLang];
        if (!t) return;

        // Translate all elements with data-translate attribute
        document.querySelectorAll('[data-translate]').forEach(el => {
            const key = el.dataset.translate;
            const value = this.getNestedValue(t, key);
            if (value) {
                el.textContent = value;
            }
        });

        // Translate placeholders
        document.querySelectorAll('[data-translate-placeholder]').forEach(el => {
            const key = el.dataset.translatePlaceholder;
            const value = this.getNestedValue(t, key);
            if (value) {
                el.placeholder = value;
            }
        });

        // Update typing text if it exists
        if (this.typingEffect && t.hero && t.hero.typingTexts) {
            this.typingEffect.texts = t.hero.typingTexts;
        }
    }

    getNestedValue(obj, path) {
        return path.split('.').reduce((current, key) => current && current[key], obj);
    }

    // ============================================
    // EVENT LISTENERS
    // ============================================
    setupEventListeners() {
        // Theme toggle
        const themeBtn = document.getElementById('themeToggle');
        if (themeBtn) {
            themeBtn.addEventListener('click', () => this.toggleTheme());
        }

        // Language switcher
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.addEventListener('click', () => this.switchLanguage(btn.dataset.lang));
        });

        // Mobile menu toggle
        const menuToggle = document.querySelector('.menu-toggle');
        const navList = document.querySelector('.nav-list');
        if (menuToggle && navList) {
            menuToggle.addEventListener('click', () => {
                menuToggle.classList.toggle('active');
                navList.classList.toggle('active');
            });

            // Close menu when clicking a link
            navList.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', () => {
                    menuToggle.classList.remove('active');
                    navList.classList.remove('active');
                });
            });
        }

        // Smooth scroll for nav links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = anchor.getAttribute('href');
                if (targetId === '#') return;

                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const headerOffset = 90;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });

                    // Update URL without page reload
                    history.pushState(null, null, targetId);
                }
            });
        });

        // Back to top button
        const backToTop = document.querySelector('.back-to-top');
        if (backToTop) {
            backToTop.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }

        // Contact form
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => this.handleContactForm(e));
        }
    }

    // ============================================
    // PARTICLES ANIMATION
    // ============================================
    initializeParticles() {
        const particlesContainer = document.querySelector('.particles');
        if (!particlesContainer) return;

        // Clear existing particles
        particlesContainer.innerHTML = '';

        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.width = (Math.random() * 8 + 4) + 'px';
            particle.style.height = particle.style.width;
            particle.style.animationDelay = (Math.random() * 5) + 's';
            particle.style.animationDuration = (Math.random() * 5 + 5) + 's';
            particlesContainer.appendChild(particle);
        }
    }

    // ============================================
    // TYPING EFFECT
    // ============================================
    initializeTypingEffect() {
        const typingElement = document.querySelector('.typing-text');
        if (!typingElement) return;

        const t = translations[this.currentLang];
        const texts = t && t.hero ? t.hero.typingTexts : ['AI Specialist', 'Data Engineer', 'Data Analyst'];

        this.typingEffect = new TypingEffect(typingElement, texts);
        this.typingEffect.start();
    }

    // ============================================
    // SCROLL EFFECTS
    // ============================================
    initializeScrollEffects() {
        const header = document.querySelector('.header');
        const backToTop = document.querySelector('.back-to-top');
        const navLinks = document.querySelectorAll('.nav-link');
        const sections = document.querySelectorAll('section[id]');

        const handleScroll = () => {
            const scrollY = window.pageYOffset;

            // Header scroll effect
            if (header) {
                header.classList.toggle('scrolled', scrollY > 50);
            }

            // Back to top visibility
            if (backToTop) {
                backToTop.classList.toggle('visible', scrollY > 300);
            }

            // Active nav link based on section
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 150;
                const sectionHeight = section.clientHeight;
                if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + current) {
                    link.classList.add('active');
                }
            });
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Initial check

        // Intersection Observer for animations
        this.initializeIntersectionObserver();
    }

    initializeIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    // Don't unobserve to allow re-animation if needed
                }
            });
        }, observerOptions);

        // Observe all animatable elements
        document.querySelectorAll('.glass-card, .skill-item, .project-card, .education-card, .experience-card').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });

        // Add animate-in styles
        const style = document.createElement('style');
        style.textContent = `
            .animate-in {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
        `;
        document.head.appendChild(style);
    }

    // ============================================
    // PROJECT FILTERS
    // ============================================
    initializeProjectFilters() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        const projectCards = document.querySelectorAll('.project-card');

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Update active button
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filter = btn.dataset.filter;

                projectCards.forEach(card => {
                    const category = card.dataset.category;

                    if (filter === 'all' || category === filter) {
                        card.style.display = 'block';
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

    // ============================================
    // CONTACT FORM
    // ============================================
    handleContactForm(e) {
        // Form is handled by FormSubmit.co, just add loading state
        const btn = e.target.querySelector('button[type="submit"]');
        if (btn) {
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            btn.disabled = true;
        }
    }

    // ============================================
    // LOADING OVERLAY
    // ============================================
    hideLoadingOverlay() {
        const overlay = document.querySelector('.loading-overlay');
        if (overlay) {
            setTimeout(() => {
                overlay.classList.add('hidden');
            }, 500);
        }
    }

    // ============================================
    // ROTATING BADGE
    // ============================================
    initializeRotatingBadge() {
        const badge = document.getElementById('rotatingBadge');
        if (!badge) return;

        const contents = badge.querySelectorAll('.badge-content');
        if (contents.length === 0) return;

        let currentIndex = 0;

        const rotateBadge = () => {
            contents.forEach(content => content.classList.remove('active'));
            currentIndex = (currentIndex + 1) % contents.length;
            contents[currentIndex].classList.add('active');
        };

        // Rotate every 3 seconds
        setInterval(rotateBadge, 3000);

        // Also rotate on click
        badge.addEventListener('click', rotateBadge);
    }
}

// ============================================
// TYPING EFFECT CLASS
// ============================================
class TypingEffect {
    constructor(element, texts) {
        this.element = element;
        this.texts = texts;
        this.textIndex = 0;
        this.charIndex = 0;
        this.isDeleting = false;
        this.typingSpeed = 80;
        this.deletingSpeed = 40;
        this.pauseTime = 2500;
    }

    start() {
        this.type();
    }

    type() {
        const currentText = this.texts[this.textIndex];

        if (this.isDeleting) {
            this.element.textContent = currentText.substring(0, this.charIndex - 1);
            this.charIndex--;
        } else {
            this.element.textContent = currentText.substring(0, this.charIndex + 1);
            this.charIndex++;
        }

        let typeSpeed = this.isDeleting ? this.deletingSpeed : this.typingSpeed;

        if (!this.isDeleting && this.charIndex === currentText.length) {
            typeSpeed = this.pauseTime;
            this.isDeleting = true;
        } else if (this.isDeleting && this.charIndex === 0) {
            this.isDeleting = false;
            this.textIndex = (this.textIndex + 1) % this.texts.length;
            typeSpeed = 400;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

// ============================================
// COUNTER ANIMATION
// ============================================
class CounterAnimation {
    constructor(element, target, duration = 2000) {
        this.element = element;
        this.target = target;
        this.duration = duration;
        this.startTime = null;
        this.started = false;
    }

    start() {
        if (this.started) return;
        this.started = true;
        requestAnimationFrame((timestamp) => this.animate(timestamp));
    }

    // Easing function for smooth animation
    easeOutQuart(t) {
        return 1 - Math.pow(1 - t, 4);
    }

    animate(timestamp) {
        if (!this.startTime) this.startTime = timestamp;

        const elapsed = timestamp - this.startTime;
        const progress = Math.min(elapsed / this.duration, 1);
        const easedProgress = this.easeOutQuart(progress);
        const current = Math.floor(easedProgress * this.target);

        this.element.textContent = current;

        if (progress < 1) {
            requestAnimationFrame((ts) => this.animate(ts));
        } else {
            this.element.textContent = this.target;
        }
    }
}

// ============================================
// INITIALIZE PORTFOLIO
// ============================================
const portfolio = new Portfolio();

// Initialize counter animations when visible
const observeCounters = () => {
    const counters = document.querySelectorAll('.stat-number[data-target]');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.dataset.target) || 0;
                const counter = new CounterAnimation(entry.target, target, 2500);
                counter.start();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    counters.forEach(counter => observer.observe(counter));
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', observeCounters);
} else {
    observeCounters();
}
