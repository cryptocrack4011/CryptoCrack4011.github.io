// Cybersecurity Portfolio - Main JavaScript
// Counter animations, tab switching, and interactive features

document.addEventListener('DOMContentLoaded', function() {
    
    // ===== SMOOTH SCROLL NAVIGATION =====
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
                
                // Update active nav link
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
    
    // ===== ANIMATED COUNTER =====
    function animateCounter(element, target, duration = 2000) {
        const start = 0;
        const increment = target / (duration / 16); // 60fps
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            // Format numbers with commas
            element.textContent = Math.floor(current).toLocaleString();
        }, 16);
    }
    
    // ===== INTERSECTION OBSERVER FOR COUNTERS =====
    const statValues = document.querySelectorAll('.stat-value');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                entry.target.classList.add('counted');
                const target = parseInt(entry.target.getAttribute('data-target'));
                animateCounter(entry.target, target);
            }
        });
    }, { threshold: 0.5 });
    
    statValues.forEach(stat => counterObserver.observe(stat));
    
    // ===== PROGRESS BAR ANIMATION =====
    const progressBars = document.querySelectorAll('.progress-fill');
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progress = entry.target.getAttribute('data-progress');
                entry.target.style.width = progress + '%';
            }
        });
    }, { threshold: 0.5 });
    
    progressBars.forEach(bar => progressObserver.observe(bar));
    
    // ===== LAB TAB SWITCHING =====
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            this.classList.add('active');
            const activeTab = document.getElementById(tabName);
            if (activeTab) {
                activeTab.classList.add('active');
            }
        });
    });
    
    // ===== SCROLL REVEAL ANIMATION =====
    const revealElements = document.querySelectorAll('.achievement-card, .stat-card, .cert-card');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100); // Stagger animation
            }
        });
    }, { threshold: 0.1 });
    
    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        revealObserver.observe(el);
    });
    
    // ===== ACTIVE SECTION HIGHLIGHTER =====
    const sections = document.querySelectorAll('.content-section, .hero-section');
    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, { threshold: 0.3 });
    
    sections.forEach(section => navObserver.observe(section));
    
    // ===== GLITCH TEXT EFFECT (Optional Enhancement) =====
    const glitchText = document.querySelector('.glitch-text');
    if (glitchText) {
        glitchText.addEventListener('mouseenter', function() {
            this.style.animation = 'glitch 0.3s ease';
        });
        
        glitchText.addEventListener('animationend', function() {
            this.style.animation = 'none';
        });
    }
    
    // ===== CONSOLE LOG ASCII ART =====
    console.log(`
    ╔═══════════════════════════════════════════════════════╗
    ║                                                       ║
    ║        ERIC CASE - CYBERSECURITY PORTFOLIO           ║
    ║                                                       ║
    ║   🔐 OT/ICS Security Architect                       ║
    ║   🎓 B.S. Information Security (Dec 2025)            ║
    ║   🏆 7 Professional Certifications                   ║
    ║   🥇 NCL Top 6% (473/7,874)                          ║
    ║                                                       ║
    ║   Status: OPERATIONAL                                ║
    ║                                                       ║
    ╚═══════════════════════════════════════════════════════╝
    
    GitHub: https://github.com/cryptocrack4011
    LinkedIn: https://linkedin.com/in/eric-case-412803197
    Credly: https://www.credly.com/users/eric-case.412803197
    `);
});

// ===== GLITCH ANIMATION KEYFRAMES (Added via JS for dynamic use) =====
const style = document.createElement('style');
style.textContent = `
    @keyframes glitch {
        0% { transform: translate(0); }
        20% { transform: translate(-2px, 2px); }
        40% { transform: translate(-2px, -2px); }
        60% { transform: translate(2px, 2px); }
        80% { transform: translate(2px, -2px); }
        100% { transform: translate(0); }
    }
`;
document.head.appendChild(style);
