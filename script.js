// ===== LOADER =====
window.addEventListener('load', () => {
    setTimeout(() => document.querySelector('.loader').classList.add('hidden'), 2200);
});

// ===== CURSEUR PERSONNALISÉ =====
const cursor = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX - 4 + 'px';
    cursor.style.top = e.clientY - 4 + 'px';
    follower.style.left = e.clientX - 18 + 'px';
    follower.style.top = e.clientY - 18 + 'px';
});

document.querySelectorAll('a, button, .filter-btn').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(3)';
        follower.style.transform = 'scale(1.5)';
        follower.style.borderColor = 'var(--accent)';
    });
    el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        follower.style.transform = 'scale(1)';
        follower.style.borderColor = 'var(--primary)';
    });
});

// ===== PARTICULES =====
const particlesContainer = document.getElementById('particles');
for (let i = 0; i < 30; i++) {
    const p = document.createElement('div');
    p.classList.add('particle');
    const size = Math.random() * 6 + 2;
    p.style.cssText = `
        width: ${size}px; height: ${size}px;
        left: ${Math.random() * 100}%;
        animation-duration: ${Math.random() * 15 + 10}s;
        animation-delay: ${Math.random() * 10}s;
        background: ${Math.random() > 0.5 ? 'var(--primary)' : 'var(--accent)'};
    `;
    particlesContainer.appendChild(p);
}

// ===== NAVBAR SCROLL =====
const navbar = document.querySelector('.navbar');
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);

    // Active link
    let current = '';
    sections.forEach(s => {
        if (window.scrollY >= s.offsetTop - 200) current = s.getAttribute('id');
    });
    navLinks.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });
});

// ===== HAMBURGER =====
const hamburger = document.querySelector('.hamburger');
const navLinksContainer = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinksContainer.classList.toggle('open');
});

navLinksContainer.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinksContainer.classList.remove('open');
    });
});

// ===== SCROLL REVEAL =====
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('active'), i * 100);
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

revealElements.forEach(el => revealObserver.observe(el));

// ===== COMPTEURS ANIMÉS =====
const statNumbers = document.querySelectorAll('.stat-number');

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = +entry.target.dataset.target;
            let count = 0;
            const increment = target / 40;
            const timer = setInterval(() => {
                count += increment;
                if (count >= target) { count = target; clearInterval(timer); }
                entry.target.textContent = Math.floor(count);
            }, 40);
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(el => counterObserver.observe(el));

// ===== BARRES DE COMPÉTENCES =====
const skillBars = document.querySelectorAll('.skill-progress');

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.width = entry.target.dataset.width;
            skillObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

skillBars.forEach(el => skillObserver.observe(el));

// ===== FILTRE PROJETS =====
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;
        projectCards.forEach(card => {
            const match = filter === 'all' || card.dataset.category === filter;
            card.style.opacity = '0';
            card.style.transform = 'scale(0.8)';
            setTimeout(() => {
                card.classList.toggle('hidden', !match);
                if (match) {
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                }
            }, 300);
        });
    });
});

// ===== MODAL PROJETS =====
const projectData = {
    lms: {
        icon: '<i class="fas fa-graduation-cap"></i>',
        title: 'Plateforme LMS',
        category: 'Web',
        desc: 'Système de gestion d\'apprentissage complet pour l\'Université Loyola du Congo/ICAM, permettant la gestion des cours, étudiants et évaluations.',
        tech: 'React, Node.js, MongoDB, Express, Socket.io',
        objectives: 'Digitaliser l\'enseignement, faciliter l\'accès aux cours en ligne, automatiser la gestion des notes et le suivi des étudiants.',
        results: 'Plus de 500 étudiants actifs, réduction de 60% du temps administratif, taux de satisfaction de 92%.',
        tags: ['React', 'Node.js', 'MongoDB']
    },
    iot: {
        icon: '<i class="fas fa-microchip"></i>',
        title: 'Système IoT Intelligent',
        category: 'IoT',
        desc: 'Écosystème IoT connecté avec capteurs intelligents et analyse de données en temps réel pour le monitoring environnemental.',
        tech: 'Python, MQTT, AWS IoT, Raspberry Pi, TensorFlow',
        objectives: 'Collecter et analyser des données environnementales en temps réel, prédire les anomalies via l\'IA.',
        results: 'Déploiement de 50+ capteurs, détection d\'anomalies avec 95% de précision, réduction de 40% des coûts de maintenance.',
        tags: ['Python', 'MQTT', 'AWS IoT']
    },
    cadx: {
        icon: '<i class="fas fa-drafting-compass"></i>',
        title: 'CADXStudio',
        category: 'Design',
        desc: 'Studio de conception assistée par ordinateur avec outils de modélisation 3D avancés et rendu en temps réel.',
        tech: 'C++, OpenGL, Qt, GLSL Shaders',
        objectives: 'Créer un outil de CAO accessible et performant pour les ingénieurs et designers.',
        results: 'Rendu 3D en temps réel, export multi-formats, utilisé par 3 équipes de conception.',
        tags: ['C++', 'OpenGL', '3D']
    },
    ecommerce: {
        icon: '<i class="fas fa-globe"></i>',
        title: 'Plateforme E-commerce',
        category: 'Web',
        desc: 'Site e-commerce moderne avec panier, paiement sécurisé et gestion complète des commandes.',
        tech: 'React, Node.js, MongoDB, Stripe API',
        objectives: 'Offrir une expérience d\'achat fluide avec paiement sécurisé et gestion automatisée des stocks.',
        results: 'Plus de 200 produits listés, taux de conversion de 4.5%, temps de chargement < 2s.',
        tags: ['React', 'Node.js', 'MongoDB']
    },
    fitness: {
        icon: '<i class="fas fa-mobile-alt"></i>',
        title: 'Application Fitness',
        category: 'Mobile',
        desc: 'App mobile de suivi d\'entraînement avec statistiques détaillées et plans personnalisés.',
        tech: 'Flutter, Firebase, Dart, Google Fit API',
        objectives: 'Permettre un suivi personnalisé des entraînements avec des recommandations basées sur les données.',
        results: '1000+ téléchargements, note de 4.6/5, rétention utilisateur de 68%.',
        tags: ['Flutter', 'Firebase', 'Dart']
    },
    dashboard: {
        icon: '<i class="fas fa-chart-line"></i>',
        title: 'Dashboard Analytics',
        category: 'Web',
        desc: 'Tableau de bord interactif pour la visualisation de données en temps réel avec graphiques dynamiques.',
        tech: 'React, D3.js, API REST, WebSocket',
        objectives: 'Centraliser les KPIs et offrir une visualisation claire des données métier en temps réel.',
        results: 'Réduction de 50% du temps d\'analyse, 15+ types de graphiques, rafraîchissement en temps réel.',
        tags: ['React', 'D3.js', 'API REST']
    },
    chatbot: {
        icon: '<i class="fas fa-robot"></i>',
        title: 'Chatbot IA',
        category: 'Web',
        desc: 'Assistant virtuel intelligent intégré à un site de support client avec compréhension du langage naturel.',
        tech: 'Python, NLP, AWS Lambda, DynamoDB',
        objectives: 'Automatiser le support client et réduire le temps de réponse grâce à l\'intelligence artificielle.',
        results: 'Résolution automatique de 75% des requêtes, temps de réponse < 2s, satisfaction client +35%.',
        tags: ['Python', 'NLP', 'AWS']
    },
    delivery: {
        icon: '<i class="fas fa-map-marked-alt"></i>',
        title: 'App de Livraison',
        category: 'Mobile',
        desc: 'Application de livraison avec suivi GPS en temps réel, notifications push et optimisation des itinéraires.',
        tech: 'React Native, Node.js, Maps API, Socket.io',
        objectives: 'Optimiser les livraisons avec un suivi en temps réel et une gestion intelligente des itinéraires.',
        results: 'Réduction de 30% des délais de livraison, suivi GPS précis, 98% de livraisons réussies.',
        tags: ['React Native', 'Node.js', 'Maps API']
    }
};

const modal = document.getElementById('projectModal');
const modalClose = document.getElementById('modalClose');

document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => {
        const key = card.dataset.project;
        const data = projectData[key];
        if (!data) return;

        document.getElementById('modalIcon').innerHTML = data.icon;
        document.getElementById('modalTitle').textContent = data.title;
        document.getElementById('modalCategory').textContent = data.category;
        document.getElementById('modalDesc').textContent = data.desc;
        document.getElementById('modalTech').textContent = data.tech;
        document.getElementById('modalObjectives').textContent = data.objectives;
        document.getElementById('modalResults').textContent = data.results;

        const tagsContainer = document.getElementById('modalTags');
        tagsContainer.innerHTML = data.tags.map(t => `<span>${t}</span>`).join('');

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

modalClose.addEventListener('click', () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
});

modal.addEventListener('click', e => {
    if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// ===== FORMULAIRE =====
document.getElementById('contactForm').addEventListener('submit', e => {
    e.preventDefault();
    const btn = e.target.querySelector('button');
    btn.innerHTML = '<i class="fas fa-check"></i> Envoyé !';
    btn.style.background = 'linear-gradient(135deg, #00b894, #00cec9)';
    setTimeout(() => {
        btn.innerHTML = '<span>Envoyer</span><i class="fas fa-paper-plane"></i>';
        btn.style.background = '';
        e.target.reset();
    }, 3000);
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(a.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
});

// ===== TILT EFFECT SUR LES CARTES =====
document.querySelectorAll('.skill-card, .project-card').forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `translateY(-8px) perspective(1000px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg)`;
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});
