// Hamburger menu toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', (e) => {
        e.stopPropagation();
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when a nav link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        const isClickInsideNav = navMenu.contains(e.target);
        const isClickOnHamburger = hamburger.contains(e.target);
        
        if (!isClickInsideNav && !isClickOnHamburger && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// Smooth scrolling for navigation links with navbar offset
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navbar = document.querySelector('.navbar');
            const navbarHeight = navbar ? navbar.offsetHeight : 0;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Active nav link styling
const sections = document.querySelectorAll('section[id]');
const allNavLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    allNavLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// CTA Button click handler
const ctaButton = document.querySelector('.cta-button');
if (ctaButton) {
    ctaButton.addEventListener('click', () => {
        const contactSection = document.querySelector('#contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
}

// Add fade-in animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.service-card, .contact-box').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'all 0.6s ease-out';
    observer.observe(element);
});

// Load and display comments from JSON file
async function loadComments() {
    try {
        const response = await fetch('assets/comments.json');
        if (!response.ok) {
            throw new Error('Failed to load comments');
        }
        const comments = await response.json();
        displayComments(comments);
    } catch (error) {
        console.error('Error loading comments:', error);
        const container = document.getElementById('comments-container');
        if (container) {
            container.innerHTML = '<p style="text-align: center; color: var(--color-text-secondary);">Unable to load comments at this time.</p>';
        }
    }
}

function displayComments(comments) {
    const container = document.getElementById('comments-container');
    if (!container) return;

    container.innerHTML = '';

    comments.forEach((comment, index) => {
        const commentCard = document.createElement('div');
        commentCard.className = 'comment-card';
        commentCard.style.opacity = '0';
        commentCard.style.transform = 'translateY(20px)';
        commentCard.style.transition = `all 0.6s ease-out ${index * 0.1}s`;

        const commentHTML = `
            <div class="comment-header">
                <div class="comment-user">
                    <div class="comment-user-name">${escapeHtml(comment.userName)}</div>
                    <div class="comment-date">${new Date(comment.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</div>
                </div>
                <div class="comment-rating">${generateStars(comment.rating)}</div>
            </div>
            <div class="comment-text">${escapeHtml(comment.comment)}</div>
        `;

        commentCard.innerHTML = commentHTML;
        container.appendChild(commentCard);

        // Trigger animation
        setTimeout(() => {
            commentCard.style.opacity = '1';
            commentCard.style.transform = 'translateY(0)';
        }, 10);

        // Observe for fade-in on scroll
        observer.observe(commentCard);
    });
}

// Helper function to escape HTML special characters
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

// Helper function to generate star rating
function generateStars(rating) {
    let stars = '';
    for (let i = 0; i < 5; i++) {
        stars += i < rating ? '★' : '☆';
    }
    return stars;
}

// Load comments when page loads
document.addEventListener('DOMContentLoaded', loadComments);

