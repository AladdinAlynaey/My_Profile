/**
 * INTERACTIVE BACKGROUND EFFECT
 * Creates elegant cursor glow + background dots that move apart from mouse
 */

class InteractiveBackground {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
        this.targetMouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
        this.particles = [];
        this.dots = [];
        this.animationId = null;
        this.hue = 250;

        // Only enable on desktop
        this.isMobile = window.innerWidth <= 768 || 'ontouchstart' in window;

        // Only enable on homepage (index.html), not on detail pages
        const isDetailPage = window.location.pathname.includes('/experience/') ||
            window.location.pathname.includes('/projects/');

        if (!this.isMobile && !isDetailPage) {
            this.init();
        }
    }

    init() {
        this.createCanvas();
        this.createBackgroundDots();
        this.setupEventListeners();
        this.animate();
    }

    createCanvas() {
        this.canvas = document.createElement('canvas');
        this.canvas.id = 'interactive-bg';
        this.canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
        `;
        document.body.insertBefore(this.canvas, document.body.firstChild);
        this.ctx = this.canvas.getContext('2d');
        this.resize();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.createBackgroundDots();
    }

    createBackgroundDots() {
        this.dots = [];

        // More dots for better coverage - adjust density based on screen size
        const area = this.canvas.width * this.canvas.height;
        const numDots = Math.floor(area / 8000); // More dots

        for (let i = 0; i < numDots; i++) {
            const x = Math.random() * this.canvas.width;
            const y = Math.random() * this.canvas.height;

            this.dots.push({
                x: x,
                y: y,
                baseX: x,
                baseY: y,
                size: Math.random() * 3 + 1.5, // Slightly larger dots
                alpha: Math.random() * 0.5 + 0.3, // More visible
                hue: 250 + (Math.random() - 0.5) * 40 // Purple-blue range
            });
        }
    }

    setupEventListeners() {
        window.addEventListener('mousemove', (e) => {
            this.targetMouse.x = e.clientX;
            this.targetMouse.y = e.clientY;

            // Add trailing particles occasionally
            if (Math.random() > 0.6) {
                this.addParticle(e.clientX, e.clientY);
            }
        });

        window.addEventListener('resize', () => this.resize());

        // Fade effect based on scroll
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            const fadeStart = window.innerHeight * 0.3;
            const fadeEnd = window.innerHeight * 1.2;

            if (scrollY < fadeStart) {
                this.canvas.style.opacity = '1';
            } else if (scrollY > fadeEnd) {
                this.canvas.style.opacity = '0';
            } else {
                this.canvas.style.opacity = String(1 - (scrollY - fadeStart) / (fadeEnd - fadeStart));
            }
        });
    }

    addParticle(x, y) {
        this.particles.push({
            x: x + (Math.random() - 0.5) * 10,
            y: y + (Math.random() - 0.5) * 10,
            size: Math.random() * 3 + 1.5,
            speedX: (Math.random() - 0.5) * 1.5,
            speedY: (Math.random() - 0.5) * 1.5,
            life: 1,
            decay: 0.02 + Math.random() * 0.01,
            hue: this.hue + (Math.random() - 0.5) * 30
        });

        if (this.particles.length > 40) {
            this.particles.shift();
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Smooth mouse following
        this.mouse.x += (this.targetMouse.x - this.mouse.x) * 0.12;
        this.mouse.y += (this.targetMouse.y - this.mouse.y) * 0.12;

        // Draw background dots first
        this.updateBackgroundDots();

        // Draw connections between dots
        this.drawConnections();

        // Draw cursor glow
        this.drawGlowOrb();

        // Draw trailing particles
        this.updateParticles();

        // Slowly shift hue
        this.hue = 250 + Math.sin(Date.now() * 0.0005) * 20;

        this.animationId = requestAnimationFrame(() => this.animate());
    }

    updateBackgroundDots() {
        const mouseRadius = 180; // Larger area of influence
        const pushStrength = 50; // How far dots get pushed

        for (const dot of this.dots) {
            // Calculate distance from mouse
            const dx = this.mouse.x - dot.baseX;
            const dy = this.mouse.y - dot.baseY;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < mouseRadius) {
                // Push dot away from mouse
                const force = (mouseRadius - distance) / mouseRadius;
                const angle = Math.atan2(dy, dx);
                const pushX = -Math.cos(angle) * force * pushStrength;
                const pushY = -Math.sin(angle) * force * pushStrength;

                // Smooth movement towards pushed position
                dot.x += (dot.baseX + pushX - dot.x) * 0.15;
                dot.y += (dot.baseY + pushY - dot.y) * 0.15;
            } else {
                // Smooth return to base position
                dot.x += (dot.baseX - dot.x) * 0.08;
                dot.y += (dot.baseY - dot.y) * 0.08;
            }

            // Draw dot with glow
            const gradient = this.ctx.createRadialGradient(
                dot.x, dot.y, 0,
                dot.x, dot.y, dot.size * 2
            );
            gradient.addColorStop(0, `hsla(${dot.hue}, 70%, 65%, ${dot.alpha})`);
            gradient.addColorStop(0.5, `hsla(${dot.hue}, 60%, 55%, ${dot.alpha * 0.4})`);
            gradient.addColorStop(1, 'transparent');

            this.ctx.beginPath();
            this.ctx.arc(dot.x, dot.y, dot.size * 2, 0, Math.PI * 2);
            this.ctx.fillStyle = gradient;
            this.ctx.fill();

            // Bright center
            this.ctx.beginPath();
            this.ctx.arc(dot.x, dot.y, dot.size * 0.6, 0, Math.PI * 2);
            this.ctx.fillStyle = `hsla(${dot.hue}, 75%, 75%, ${dot.alpha * 0.8})`;
            this.ctx.fill();
        }
    }

    drawConnections() {
        const maxDistance = 100;

        for (let i = 0; i < this.dots.length; i++) {
            for (let j = i + 1; j < this.dots.length; j++) {
                const dx = this.dots[i].x - this.dots[j].x;
                const dy = this.dots[i].y - this.dots[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < maxDistance) {
                    const alpha = (1 - distance / maxDistance) * 0.2;
                    this.ctx.beginPath();
                    this.ctx.strokeStyle = `hsla(${this.hue}, 60%, 60%, ${alpha})`;
                    this.ctx.lineWidth = 0.8;
                    this.ctx.moveTo(this.dots[i].x, this.dots[i].y);
                    this.ctx.lineTo(this.dots[j].x, this.dots[j].y);
                    this.ctx.stroke();
                }
            }
        }
    }

    drawGlowOrb() {
        const x = this.mouse.x;
        const y = this.mouse.y;

        // Outer glow
        const outerGlow = this.ctx.createRadialGradient(x, y, 0, x, y, 120);
        outerGlow.addColorStop(0, `hsla(${this.hue}, 70%, 60%, 0.2)`);
        outerGlow.addColorStop(0.5, `hsla(${this.hue}, 70%, 50%, 0.08)`);
        outerGlow.addColorStop(1, 'transparent');

        this.ctx.beginPath();
        this.ctx.arc(x, y, 120, 0, Math.PI * 2);
        this.ctx.fillStyle = outerGlow;
        this.ctx.fill();

        // Middle glow
        const middleGlow = this.ctx.createRadialGradient(x, y, 0, x, y, 50);
        middleGlow.addColorStop(0, `hsla(${this.hue}, 80%, 65%, 0.5)`);
        middleGlow.addColorStop(0.6, `hsla(${this.hue + 10}, 75%, 55%, 0.2)`);
        middleGlow.addColorStop(1, 'transparent');

        this.ctx.beginPath();
        this.ctx.arc(x, y, 50, 0, Math.PI * 2);
        this.ctx.fillStyle = middleGlow;
        this.ctx.fill();

        // Inner core
        const innerGlow = this.ctx.createRadialGradient(x, y, 0, x, y, 15);
        innerGlow.addColorStop(0, `hsla(${this.hue}, 85%, 80%, 0.7)`);
        innerGlow.addColorStop(0.6, `hsla(${this.hue}, 80%, 60%, 0.3)`);
        innerGlow.addColorStop(1, 'transparent');

        this.ctx.beginPath();
        this.ctx.arc(x, y, 15, 0, Math.PI * 2);
        this.ctx.fillStyle = innerGlow;
        this.ctx.fill();

        // Center point
        this.ctx.beginPath();
        this.ctx.arc(x, y, 3, 0, Math.PI * 2);
        this.ctx.fillStyle = `hsla(${this.hue}, 90%, 85%, 0.9)`;
        this.ctx.fill();

        // Pulsing ring
        const pulseSize = 25 + Math.sin(Date.now() * 0.004) * 6;
        this.ctx.beginPath();
        this.ctx.arc(x, y, pulseSize, 0, Math.PI * 2);
        this.ctx.strokeStyle = `hsla(${this.hue}, 75%, 65%, 0.35)`;
        this.ctx.lineWidth = 2;
        this.ctx.stroke();
    }

    updateParticles() {
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];

            p.x += p.speedX;
            p.y += p.speedY;
            p.life -= p.decay;

            if (p.life <= 0) {
                this.particles.splice(i, 1);
                continue;
            }

            // Particle glow
            const gradient = this.ctx.createRadialGradient(
                p.x, p.y, 0,
                p.x, p.y, p.size * 2.5
            );
            gradient.addColorStop(0, `hsla(${p.hue}, 80%, 70%, ${p.life * 0.8})`);
            gradient.addColorStop(0.6, `hsla(${p.hue}, 70%, 60%, ${p.life * 0.3})`);
            gradient.addColorStop(1, 'transparent');

            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size * 2.5, 0, Math.PI * 2);
            this.ctx.fillStyle = gradient;
            this.ctx.fill();

            // Particle center
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size * 0.4, 0, Math.PI * 2);
            this.ctx.fillStyle = `hsla(${p.hue}, 85%, 80%, ${p.life})`;
            this.ctx.fill();
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        window.interactiveBg = new InteractiveBackground();
    }, 300);
});
