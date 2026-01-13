document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis();

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // 1. Entrance Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const scrollElements = document.querySelectorAll('.scroll-reveal');
    scrollElements.forEach((el) => {
        observer.observe(el);
    });

    // 2. 3D Tilt Effect
    const cards = document.querySelectorAll('.link-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -10; // Max 10deg rotation
            const rotateY = ((x - centerX) / centerX) * 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0) rotateY(0) scale(1)`;
        });
    });

    // 3. Typing Animation
    const typeWriterElement = document.querySelector('.typewriter');
    const textToType = typeWriterElement.getAttribute('data-text');
    let charIndex = 0;

    function type() {
        if (charIndex < textToType.length) {
            typeWriterElement.textContent += textToType.charAt(charIndex);
            charIndex++;
            setTimeout(type, 100); // 100ms per character
        } else {
            // Typing finished, add glitch class
            typeWriterElement.classList.add('glitch');
        }
    }
    // Start typing after a short delay
    setTimeout(type, 1000);



    // 5. Background Particles
    const particlesContainer = document.getElementById('particles');
    const particleCount = 20;

    function createParticle() {
        const particle = document.createElement('div');
        particle.classList.add('particle');

        // Random size
        const size = Math.random() * 5 + 2 + 'px';
        particle.style.width = size;
        particle.style.height = size;

        // Random position
        particle.style.left = Math.random() * 100 + 'vw';

        // Random animation duration
        const duration = Math.random() * 5 + 5 + 's';
        particle.style.animationDuration = duration;

        // Random delay
        particle.style.animationDelay = Math.random() * 5 + 's';

        particlesContainer.appendChild(particle);

        // Remove particle after animation to prevent DOM overflow (optional if infinite, but cleaner to recycle)
        // Since we used infinite animation in CSS, we don't strictly *need* to remove them if we just spawn a fixed set.
        // Let's just spawn a fixed set once.
    }

    for (let i = 0; i < particleCount; i++) {
        createParticle();
    }
});
