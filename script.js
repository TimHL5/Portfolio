/**
 * Consulting Recruiting Mentorship - Interactive Scripts
 * Author: Timothy Liu
 * No jQuery - Pure Vanilla JavaScript
 */

// ==========================================
// MOBILE NAVIGATION MENU
// ==========================================

const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle mobile menu
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    }
});

// ==========================================
// NAVBAR SCROLL EFFECT
// ==========================================

const navbar = document.getElementById('navbar');
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    lastScrollY = window.scrollY;
});

// ==========================================
// FAQ ACCORDION
// ==========================================

const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        const isActive = faqItem.classList.contains('active');

        // Close all FAQ items
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
            item.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
        });

        // Open clicked item if it wasn't active
        if (!isActive) {
            faqItem.classList.add('active');
            question.setAttribute('aria-expanded', 'true');
        }
    });
});

// ==========================================
// SCROLL TO TOP BUTTON
// ==========================================

const scrollTopBtn = document.getElementById('scroll-top');

// Show/hide scroll to top button
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

// Scroll to top when button is clicked
if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ==========================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ==========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');

        // Only handle internal anchor links
        if (href !== '#' && href.length > 1) {
            e.preventDefault();

            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                // Calculate offset for sticky navbar
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navbarHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ==========================================
// INTERSECTION OBSERVER FOR FADE-IN ANIMATIONS (Optional)
// ==========================================

// Add fade-in animation to sections as they come into view
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections (optional - can be enabled for subtle animations)
// Uncomment the lines below to enable fade-in animations
/*
const sections = document.querySelectorAll('section');
sections.forEach(section => {
    observer.observe(section);
});
*/

// ==========================================
// KEYBOARD ACCESSIBILITY
// ==========================================

// Add keyboard support for FAQ items
faqQuestions.forEach(question => {
    question.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            question.click();
        }
    });
});

// ==========================================
// PREVENT FOUC (Flash of Unstyled Content)
// ==========================================

// Add loaded class to body when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('loaded');
});

// ==========================================
// PERFORMANCE: DEBOUNCE SCROLL EVENTS
// ==========================================

function debounce(func, wait = 10, immediate = true) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Apply debounce to scroll-intensive functions for better performance
const debouncedScrollHandler = debounce(() => {
    // Any additional scroll handling can go here
}, 20);

window.addEventListener('scroll', debouncedScrollHandler);

// ==========================================
// CONSOLE MESSAGE (Optional branding)
// ==========================================

console.log('%c🎯 Built with precision | Timothy Liu Consulting',
    'color: #822433; font-size: 14px; font-weight: bold; padding: 10px;');
console.log('%cInterested in consulting recruiting mentorship? Book a call at https://cal.com/timh.liu/intro',
    'color: #333; font-size: 12px; padding: 5px;');
