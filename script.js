/* ═══════════════════════════════════════════════════════════════
   ENGINEERING PORTFOLIO - SCRIPT.JS
   Mohamed Adel Mousa | Cybersecurity & IT Infrastructure Engineer
   ═══════════════════════════════════════════════════════════════ */

/**
 * TypingAnimator - Creates a typewriter effect for hero title
 * Cycles through an array of strings with typing and deleting animations
 */
class TypingAnimator {
    constructor(element, strings, options = {}) {
        this.element = element;
        this.strings = strings;
        this.currentStringIndex = 0;
        this.currentCharIndex = 0;
        this.isDeleting = false;

        // Timing options
        this.typingSpeed = options.typingSpeed || 100;
        this.deletingSpeed = options.deletingSpeed || 50;
        this.pauseDuration = options.pauseDuration || 2000;

        // Check for reduced motion preference
        this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }

    start() {
        // If user prefers reduced motion, just show the first string
        if (this.prefersReducedMotion) {
            this.element.textContent = this.strings[0];
            return;
        }

        this.type();
    }

    type() {
        const currentString = this.strings[this.currentStringIndex];

        if (this.isDeleting) {
            // Remove one character
            this.currentCharIndex--;
            this.element.textContent = currentString.substring(0, this.currentCharIndex);

            if (this.currentCharIndex === 0) {
                // Finished deleting, move to next string
                this.isDeleting = false;
                this.currentStringIndex = (this.currentStringIndex + 1) % this.strings.length;
                setTimeout(() => this.type(), 500);
            } else {
                setTimeout(() => this.type(), this.deletingSpeed);
            }
        } else {
            // Add one character
            this.currentCharIndex++;
            this.element.textContent = currentString.substring(0, this.currentCharIndex);

            if (this.currentCharIndex === currentString.length) {
                // Finished typing, pause then start deleting
                this.isDeleting = true;
                setTimeout(() => this.type(), this.pauseDuration);
            } else {
                setTimeout(() => this.type(), this.typingSpeed);
            }
        }
    }
}

/**
 * HamburgerMenu - Handles mobile navigation toggle
 * Manages menu open/close state and outside click detection
 */
class HamburgerMenu {
    constructor(hamburgerSelector, navLinksSelector) {
        this.hamburger = document.querySelector(hamburgerSelector);
        this.navLinks = document.querySelectorAll(navLinksSelector);
        this.body = document.body;
        this.isOpen = false;
    }

    init() {
        if (!this.hamburger) return;

        // Toggle menu on hamburger click
        this.hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggle();
        });

        // Close menu when a nav link is clicked
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.close();
            });
        });

        // Close menu on outside click
        document.addEventListener('click', (e) => {
            if (this.isOpen && !e.target.closest('.nav-container')) {
                this.close();
            }
        });

        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.close();
            }
        });
    }

    toggle() {
        if (this.isOpen) {
            this.close();
        } else {
            this.open();
        }
    }

    open() {
        this.body.classList.add('nav-open');
        this.hamburger.setAttribute('aria-expanded', 'true');
        this.isOpen = true;
    }

    close() {
        this.body.classList.remove('nav-open');
        this.hamburger.setAttribute('aria-expanded', 'false');
        this.isOpen = false;
    }
}

/**
 * SmoothScroll - Handles smooth scrolling to anchor links
 * Provides smooth scroll behavior for navigation links
 */
class SmoothScroll {
    constructor(linkSelector) {
        this.links = document.querySelectorAll(linkSelector);
    }

    init() {
        this.links.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');

                // Only handle internal anchor links
                if (href && href.startsWith('#')) {
                    e.preventDefault();

                    const targetId = href.substring(1);
                    const targetElement = document.getElementById(targetId);

                    if (targetElement) {
                        // Calculate offset for fixed header
                        const headerOffset = 70;
                        const elementPosition = targetElement.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                        window.scrollTo({
                            top: offsetPosition,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
    }
}

/**
 * ScrollAnimator - Handles scroll-triggered animations
 * Uses IntersectionObserver to add .visible class when elements enter viewport
 */
class ScrollAnimator {
    constructor(selector, options = {}) {
        this.elements = document.querySelectorAll(selector);
        this.options = {
            threshold: options.threshold || 0.15,
            rootMargin: options.rootMargin || '0px 0px -50px 0px'
        };
    }

    observe() {
        // Fallback for browsers without IntersectionObserver support
        if (!('IntersectionObserver' in window)) {
            this.elements.forEach(el => el.classList.add('visible'));
            return;
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // Optionally unobserve after animation (performance optimization)
                    // observer.unobserve(entry.target);
                }
            });
        }, this.options);

        this.elements.forEach(el => observer.observe(el));
    }
}

/**
 * NavHighlighter - Highlights active navigation link based on scroll position
 * Uses IntersectionObserver to detect which section is currently in view
 */
class NavHighlighter {
    constructor(sectionSelector, navLinkSelector) {
        this.sections = document.querySelectorAll(sectionSelector);
        this.navLinks = document.querySelectorAll(navLinkSelector);
        this.currentActive = null;
    }

    observe() {
        if (!('IntersectionObserver' in window)) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionId = entry.target.getAttribute('id');
                    this.setActiveLink(sectionId);
                }
            });
        }, {
            threshold: 0.3,
            rootMargin: '-100px 0px -66% 0px'
        });

        this.sections.forEach(section => observer.observe(section));
    }

    setActiveLink(sectionId) {
        // Remove active class from all links
        this.navLinks.forEach(link => {
            link.classList.remove('active');
        });

        // Add active class to matching link
        const activeLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
            this.currentActive = activeLink;
        }
    }
}

/**
 * Initialize all modules when DOM is ready
 */
document.addEventListener('DOMContentLoaded', () => {
    // Initialize typing animation
    try {
        const typingElement = document.querySelector('.typing-text');
        if (typingElement) {
            const titles = [
                'Cybersecurity & IT Infrastructure Engineer',
                'SOC Analyst',
                'Network Engineer',
                'Security Operations Specialist'
            ];
            const typingAnimator = new TypingAnimator(typingElement, titles, {
                typingSpeed: 80,
                deletingSpeed: 40,
                pauseDuration: 2500
            });
            typingAnimator.start();
        }
    } catch (e) {
        console.warn('TypingAnimator initialization failed:', e);
    }

    // Initialize hamburger menu
    try {
        const hamburgerMenu = new HamburgerMenu('.hamburger', '.nav-links a');
        hamburgerMenu.init();
    } catch (e) {
        console.warn('HamburgerMenu initialization failed:', e);
    }

    // Initialize smooth scroll
    try {
        const smoothScroll = new SmoothScroll('.nav-links a, .hero-cta a');
        smoothScroll.init();
    } catch (e) {
        console.warn('SmoothScroll initialization failed:', e);
    }

    // Initialize scroll animations
    try {
        const scrollAnimator = new ScrollAnimator('.animate-on-scroll');
        scrollAnimator.observe();
    } catch (e) {
        console.warn('ScrollAnimator initialization failed:', e);
    }

    // Initialize navigation highlighter
    try {
        const navHighlighter = new NavHighlighter(
            'section[id]',
            '.nav-links a'
        );
        navHighlighter.observe();
    } catch (e) {
        console.warn('NavHighlighter initialization failed:', e);
    }
});
