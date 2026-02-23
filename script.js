/* ===========================
   SCRIPT.JS — Portfolio Logic
   =========================== */

// ---- DEFAULT PROJECTS ----
const defaultProjects = [
    {
        id: 'default-1',
        title: 'AIClinix — Healthcare AI Platform',
        description: 'Multi-disease detection system using Python Flask. AI/ML models for heart, stroke, liver, pneumonia, and diabetes diagnosis with up to 99% accuracy.',
        tags: ['Python', 'Flask', 'TensorFlow', 'ML', 'Healthcare'],
        github: 'https://github.com/ZainMushtaq9/Heart2',
        live: ''
    },
    {
        id: 'default-2',
        title: 'Crop Prediction System',
        description: 'Machine learning model for crop yield prediction using environmental and soil data. Built with Jupyter Notebook and Scikit-learn.',
        tags: ['Python', 'ML', 'Jupyter', 'Data Science'],
        github: 'https://github.com/ZainMushtaq9/Crop-Prediction',
        live: ''
    },
    {
        id: 'default-3',
        title: 'CodePromptX',
        description: 'AI-powered prompt engineering tool for code generation. Automates code snippet creation from natural language descriptions.',
        tags: ['Python', 'AI', 'NLP', 'Automation'],
        github: 'https://github.com/ZainMushtaq9/CodePromptX',
        live: ''
    },
    {
        id: 'default-4',
        title: 'CodePromptX Website Generator',
        description: 'Generates complete websites from AI prompts. Converts natural language descriptions into functional HTML/CSS/JS code.',
        tags: ['Python', 'AI', 'Web Dev', 'Automation'],
        github: 'https://github.com/ZainMushtaq9/CodePromptX-Website-generator-',
        live: ''
    },
    {
        id: 'default-5',
        title: 'AI Exam Paper Generator',
        description: 'Full-stack web application for generating AI-powered bilingual exam papers. Built with Node.js, EJS templates, and AI integration.',
        tags: ['Node.js', 'AI', 'EJS', 'Web App'],
        github: 'https://github.com/ZainMushtaq9/Paper-Generator',
        live: ''
    },
    {
        id: 'default-6',
        title: 'TikTok Video Downloader',
        description: 'Web application for downloading TikTok videos. Supports bulk downloads and playlist extraction with optimized speed.',
        tags: ['HTML', 'JavaScript', 'API', 'Web Scraping'],
        github: 'https://github.com/ZainMushtaq9/TikTok-Downloader',
        live: ''
    },
    {
        id: 'default-7',
        title: 'Smart Calculator',
        description: 'Multi-tool AI-themed calculator web application with dark mode, animations, and advanced computation capabilities.',
        tags: ['HTML', 'CSS', 'JavaScript', 'Web App'],
        github: 'https://github.com/ZainMushtaq9/Calculator',
        live: ''
    },
    {
        id: 'default-8',
        title: 'Cybersecurity Detection System',
        description: 'ML-based detection system for DDoS and SQL injection attacks. Uses pattern recognition and anomaly detection algorithms.',
        tags: ['Python', 'ML', 'Cybersecurity', 'Scikit-learn'],
        github: 'https://github.com/ZainMushtaq9/Cyber2',
        live: ''
    },
    {
        id: 'default-9',
        title: 'Weather Prediction Model',
        description: 'Machine learning model for weather forecasting using historical data and multiple environmental parameters.',
        tags: ['Python', 'ML', 'Data Science', 'Prediction'],
        github: 'https://github.com/ZainMushtaq9/Weather-Prediction',
        live: ''
    },
    {
        id: 'default-10',
        title: 'Invoice Generator',
        description: 'Professional invoice generation web application with PDF export, customizable templates, and Google AdSense integration.',
        tags: ['HTML', 'CSS', 'JavaScript', 'Web App'],
        github: 'https://github.com/ZainMushtaq9/invoice',
        live: ''
    },
    {
        id: 'default-11',
        title: 'Book Translator',
        description: 'AI-powered book translation tool supporting multiple languages. Preserves formatting while translating content automatically.',
        tags: ['Python', 'NLP', 'AI', 'Translation'],
        github: 'https://github.com/ZainMushtaq9/book-translator',
        live: ''
    },
    {
        id: 'default-12',
        title: 'Web Page Link Scraper',
        description: 'Python scraping tool for extracting and analyzing all links from web pages. Supports recursive crawling and link validation.',
        tags: ['Python', 'Web Scraping', 'Automation'],
        github: 'https://github.com/ZainMushtaq9/Web-Page-Link-Scraper',
        live: ''
    }
];

// ---- PARTICLE BACKGROUND ----
function initParticles() {
    const canvas = document.getElementById('particleCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let particles = [];
    let mouse = { x: null, y: null };

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    window.addEventListener('mousemove', e => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    class Particle {
        constructor() {
            this.reset();
        }
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2.5 + 0.5;
            this.speedX = (Math.random() - 0.5) * 0.6;
            this.speedY = (Math.random() - 0.5) * 0.6;
            this.opacity = Math.random() * 0.5 + 0.1;
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            // Mouse repulsion
            if (mouse.x && mouse.y) {
                const dx = this.x - mouse.x;
                const dy = this.y - mouse.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 120) {
                    const force = (120 - dist) / 120;
                    this.x += (dx / dist) * force * 2;
                    this.y += (dy / dist) * force * 2;
                }
            }

            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0, 212, 255, ${this.opacity})`;
            ctx.fill();
        }
    }

    // Fewer particles on mobile
    const count = window.innerWidth < 768 ? 40 : 80;
    for (let i = 0; i < count; i++) {
        particles.push(new Particle());
    }

    function connectParticles() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 150) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(0, 212, 255, ${0.08 * (1 - dist / 150)})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        connectParticles();
        requestAnimationFrame(animate);
    }
    animate();
}

// ---- TYPING ANIMATION ----
function initTyping() {
    const el = document.getElementById('typingText');
    if (!el) return;

    const phrases = [
        'AI & Web Developer',
        'Machine Learning Engineer',
        'FastAPI Specialist',
        'Deep Learning Enthusiast',
        'Healthcare AI Researcher',
        'Chatbot Developer'
    ];

    let phraseIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let speed = 80;

    function type() {
        const current = phrases[phraseIdx];
        if (isDeleting) {
            el.textContent = current.substring(0, charIdx - 1);
            charIdx--;
            speed = 40;
        } else {
            el.textContent = current.substring(0, charIdx + 1);
            charIdx++;
            speed = 80;
        }

        if (!isDeleting && charIdx === current.length) {
            speed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIdx === 0) {
            isDeleting = false;
            phraseIdx = (phraseIdx + 1) % phrases.length;
            speed = 400;
        }

        setTimeout(type, speed);
    }
    type();
}

// ---- NAVBAR SCROLL EFFECT ----
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link:not(.nav-cta)');

    window.addEventListener('scroll', () => {
        // Scrolled class
        navbar.classList.toggle('scrolled', window.scrollY > 50);

        // Active link
        let current = '';
        sections.forEach(section => {
            const top = section.offsetTop - 100;
            if (window.scrollY >= top) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// ---- HAMBURGER MENU ----
function initHamburger() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    if (!hamburger || !navMenu) return;

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close on link click
    navMenu.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close on outside click
    document.addEventListener('click', e => {
        if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// ---- SKILL BAR ANIMATION ----
function initSkillBars() {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const fills = entry.target.querySelectorAll('.skill-fill');
                fills.forEach(fill => {
                    const width = fill.getAttribute('data-width');
                    fill.style.width = width + '%';
                    fill.classList.add('animated');
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    const skillsSection = document.getElementById('skills');
    if (skillsSection) observer.observe(skillsSection);
}

// ---- COUNTER ANIMATION ----
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-count'));
                let current = 0;
                const step = target / 40;
                const timer = setInterval(() => {
                    current += step;
                    if (current >= target) {
                        entry.target.textContent = target;
                        clearInterval(timer);
                    } else {
                        entry.target.textContent = Math.floor(current);
                    }
                }, 40);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(c => observer.observe(c));
}

// ---- PROJECTS LOADING ----
function getAllProjects() {
    const adminProjects = JSON.parse(localStorage.getItem('zm_admin_projects') || '[]');
    return [...adminProjects, ...defaultProjects];
}

function getProjectIcon(tags) {
    const tagStr = (tags || []).join(' ').toLowerCase();
    if (tagStr.includes('healthcare') || tagStr.includes('medical')) return 'fa-heartbeat';
    if (tagStr.includes('ai') || tagStr.includes('ml') || tagStr.includes('machine')) return 'fa-brain';
    if (tagStr.includes('web') || tagStr.includes('html')) return 'fa-globe';
    if (tagStr.includes('cybersecurity') || tagStr.includes('security')) return 'fa-shield-halved';
    if (tagStr.includes('data')) return 'fa-chart-bar';
    if (tagStr.includes('nlp') || tagStr.includes('translation')) return 'fa-language';
    if (tagStr.includes('scraping') || tagStr.includes('automation')) return 'fa-robot';
    if (tagStr.includes('prediction') || tagStr.includes('weather')) return 'fa-cloud-sun';
    return 'fa-code';
}

function renderProjects() {
    const grid = document.getElementById('projectsGrid');
    if (!grid) return;

    const projects = getAllProjects();
    grid.innerHTML = '';

    projects.forEach((project, i) => {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.setAttribute('data-aos', 'fade-up');
        card.setAttribute('data-aos-delay', String(Math.min(i * 80, 400)));

        const icon = getProjectIcon(project.tags);

        let linksHTML = '';
        if (project.github) {
            linksHTML += `<a href="${project.github}" target="_blank" title="GitHub"><i class="fab fa-github"></i></a>`;
        }
        if (project.live) {
            linksHTML += `<a href="${project.live}" target="_blank" title="Live Demo"><i class="fas fa-external-link-alt"></i></a>`;
        }

        const tagsHTML = (project.tags || []).map(t =>
            `<span class="project-tag">${t}</span>`
        ).join('');

        card.innerHTML = `
            <div class="project-header">
                <div class="project-icon"><i class="fas ${icon}"></i></div>
                <div class="project-links">${linksHTML}</div>
            </div>
            <div class="project-body">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="project-tags">${tagsHTML}</div>
            </div>
        `;

        grid.appendChild(card);
    });

    // Refresh AOS for dynamically added items
    if (typeof AOS !== 'undefined') {
        AOS.refresh();
    }
}

// ---- INITIALIZE ----
document.addEventListener('DOMContentLoaded', () => {
    // AOS
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-out-cubic',
            once: true,
            offset: 60,
        });
    }

    initParticles();
    initTyping();
    initNavbar();
    initHamburger();
    initSkillBars();
    initCounters();
    renderProjects();
});
