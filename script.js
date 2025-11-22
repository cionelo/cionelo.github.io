/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * Portfolio Website - Core JavaScript & Minecraft Hearth Animation
 * Author: Nehemiah Cionelo
 * Last Updated: 2024-11-21
 * Version: 2.1.0
 * 
 * CHANGELOG:
 * - Added resume dropdow n toggle functionality
 * - Integrated F3 debug mode activation system
 * - Implemented HearthFireAnimation class for Minecraft easter egg
 * - Added debug stats overlay with real-time metrics
 * - Enhanced navigation scroll detection
 * - Added mobile menu toggle support
 * - Implemented smooth scroll for anchor links
 * - Added intersection observer for fade-in animations
 * 
 * CORE FEATURES:
 * 1. Navigation (scroll shadow, mobile toggle, active link highlighting)
 * 2. Resume Dropdown (toggle on click, close on outside click)
 * 3. F3 Debug Mode (Minecraft-themed easter egg)
 * 4. HearthFireAnimation (dual-fire canvas animation with ember particles)
 * 5. Intersection Observer (fade-in animations for sections)
 * 6. Smooth Scroll Navigation
 * 7. Email Copy to Clipboard
 * 8. Image Lazy Loading Error Handling
 * 
 * F3 MODE (MINECRAFT HEARTH):
 * - Activation: Press F3 key
 * - Features: Debug stats overlay, animated fire textures, floating ember particles
 * - Fire Animation: 32-frame sprite sheet with dual-layer rendering
 * - Performance: ~60 FPS target with requestAnimationFrame loop
 * - Textures Required:
 *   - textures/fire_layer_0.png (base fire layer)
 *   - textures/fire_layer_1.png (overlay fire layer)
 *   - textures/cobblestone.png (back wall)
 *   - textures/stonebrick.png (inner walls)
 *   - textures/stonebrick_carved.png (frame/corners)
 * 
 * HEARTH ANIMATION SPECS:
 * - Canvas Size: 512x512px
 * - Frame Count: 32 frames
 * - Frame Size: 32x32px
 * - Animation Speed: 3 FPS (configurable)
 * - Ember Spawn Rate: 1500ms intervals
 * - Max Embers: 4 concurrent
 * - Ember Lifetime: 3000ms
 * 
 * DEBUG COMMANDS (console):
 * - testHearth() - Activate F3 mode and log hearth status
 * - spawnTestEmber() - Manually spawn an ember particle
 * - setFireSpeed(fps) - Adjust fire animation speed
 * - setEmberRate(ms) - Adjust ember spawn interval
 * 
 * EASTER EGG HINTS:
 * - Console message on page load
 * - Footer hint: "Psst... try pressing F3 👀"
 * - localStorage tracks F3 discovery
 * 
 * DEPENDENCIES:
 * - No external libraries (vanilla JS)
 * - Requires textures in /textures/ directory
 * - Coordinates with styles.css for .minecraft-theme class
 * 
 * BROWSER SUPPORT:
 * - Modern browsers with Canvas API support
 * - requestAnimationFrame support
 * - IntersectionObserver API support
 * - localStorage support (for F3 discovery tracking)
 * 
 * PERFORMANCE NOTES:
 * - Fire animation uses imageSmoothingEnabled: false for pixel-perfect rendering
 * - Canvas cleared and redrawn only when frame updates
 * - Ember particles use CSS animations (GPU-accelerated)
 * - Debug stats update on 1-second interval when active
 * ═══════════════════════════════════════════════════════════════════════════════
 */
// ================================
// NAVIGATION - Scroll & Mobile (safe)
// ================================

const nav = document.getElementById('nav');
const mobileToggle = document.getElementById('mobileToggle');   
const navLinks = document.getElementById('navLinks');

// Add shadow to nav on scroll (guard nav)
window.addEventListener('scroll', () => {
    if (!nav) return;
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Mobile menu toggle (guard elements)
if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileToggle.classList.toggle('active');
    });
}

// Close mobile menu when clicking a link (guard elements)
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks && mobileToggle) {
            navLinks.classList.remove('active');
            mobileToggle.classList.remove('active');
        }
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (!href || href === '#') return;
        const target = document.querySelector(href);
        if (!target) return;

        e.preventDefault();
        const offsetTop = target.offsetTop - 70;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    });
});

// ================================
// RESUME DROPDOWN (safe)
// ================================

const resumeBtn = document.getElementById('resumeBtn');
const resumeBtnBottom = document.getElementById('resumeBtnBottom');
const resumeDropdown = document.getElementById('resumeDropdown');

function toggleResumeDropdown(e) {
    if (!resumeDropdown) return;
    e.stopPropagation();
    resumeDropdown.classList.toggle('active');
}

if (resumeBtn) {
    resumeBtn.addEventListener('click', toggleResumeDropdown);
}

if (resumeBtnBottom) {
    resumeBtnBottom.addEventListener('click', toggleResumeDropdown);
}

if (resumeDropdown) {
    document.addEventListener('click', (e) => {
        if (
            !resumeDropdown.contains(e.target) &&
            e.target !== resumeBtn &&
            e.target !== resumeBtnBottom
        ) {
            resumeDropdown.classList.remove('active');
        }
    });
}

// ================================
// INTERSECTION OBSERVER - Fade in animations
// ================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

const animatedElements = document.querySelectorAll(
    '.project-card, .project-featured, .stat-card, .timeline-item, .contact-card, .skills-category'
);

animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ================================
// F3 DEBUG MODE (MINECRAFT THEME)
// ================================

let minecraftMode = false;
let debugStatsElement = null;

document.addEventListener('keydown', (e) => {
    if (e.key === 'F3' || e.keyCode === 114) {
        e.preventDefault();
        toggleMinecraftMode();
    }
});

// ================================
// DEBUG STATS OVERLAY (F3 Screen)
// ================================

function showDebugStats() {
    if (!debugStatsElement) {
        debugStatsElement = document.createElement('div');
        debugStatsElement.id = 'debug-stats';
        debugStatsElement.style.cssText = `
            position: fixed;
            top: 80px;
            left: 10px;
            background-color: rgba(0, 0, 0, 0.5);
            color: white;
            font-family: 'Courier New', monospace;
            font-size: 12px;
            padding: 10px;
            border-radius: 4px;
            z-index: 9999;
            line-height: 1.4;
            pointer-events: none;
            max-width: 300px;
        `;
        document.body.appendChild(debugStatsElement);
    }

    updateDebugStats();
    debugStatsElement.style.display = 'block';

    window.debugStatsInterval = setInterval(updateDebugStats, 1000);
}

function hideDebugStats() {
    if (debugStatsElement) {
        debugStatsElement.style.display = 'none';
    }
    if (window.debugStatsInterval) {
        clearInterval(window.debugStatsInterval);
    }
}

function updateDebugStats() {
    if (!debugStatsElement) return;

    const stats = {
        fps: 60,
        loadTime: (performance.now() / 1000).toFixed(2),
        scrollY: window.scrollY,
        viewportWidth: window.innerWidth,
        viewportHeight: window.innerHeight,
        section: getCurrentSection()
    };

    debugStatsElement.innerHTML = `
        <strong>Portfolio Debug Screen (F3)</strong><br><br>
        FPS: ${stats.fps} | Load Time: ${stats.loadTime}s<br>
        Position: ${stats.section}<br>
        Scroll: ${stats.scrollY}px<br>
        Viewport: ${stats.viewportWidth}x${stats.viewportHeight}<br><br>
        <span style="color: #4ade80;">Minecraft Mode: Active</span><br>
        <span style="color: #94a3b8;">Press F3 to toggle</span>
    `;
}

function getCurrentSection() {
    const sections = document.querySelectorAll('section[id]');
    let currentSection = 'Hero';

    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
            currentSection = section.id.charAt(0).toUpperCase() + section.id.slice(1);
        }
    });

    return currentSection;
}

// ================================
// PERFORMANCE MONITORING
// ================================

window.addEventListener('load', () => {
    const loadTime = (performance.now() / 1000).toFixed(2);
    console.log(`⚡ Page loaded in ${loadTime}s`);
});

// ================================
// FIRE ANIMATION PLACEHOLDER
// ================================

function initFireAnimation() {
    console.log('🔥 Fire animation will be implemented in Week 2');
}

// ================================
// EASTER EGGS & ENHANCEMENTS
// ================================

console.log('%c👋 Hey there!', 'font-size: 20px; font-weight: bold;');
console.log(
    '%cLooks like you found the console. Try pressing F3 for a surprise! 🎮',
    'font-size: 14px; color: #3b82f6;'
);

if (localStorage.getItem('discoveredF3') === 'true') {
    console.log('%c🎮 Welcome back! F3 mode is available.', 'color: #4ade80;');
} else {
    setTimeout(() => {
        if (!minecraftMode) {
            console.log(
                '%c💡 Hint: Try pressing F3...',
                'color: #94a3b8; font-style: italic;'
            );
        }
    }, 10000);
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'F3' || e.keyCode === 114) {
        localStorage.setItem('discoveredF3', 'true');
    }
});

// ================================
// ACTIVE NAV LINK HIGHLIGHTING
// ================================

const pageSections = document.querySelectorAll('section[id]');
const navLinksArray = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';

    pageSections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= (sectionTop - 100)) {
            current = section.id;
        }
    });

    navLinksArray.forEach(link => {
        link.classList.toggle(
            'active',
            link.getAttribute('href') === `#${current}`
        );
    });
});

// ================================
// COPY EMAIL ON CLICK
// ================================

const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
emailLinks.forEach(link => {
    link.addEventListener('click', () => {
        const email = link.getAttribute('href').replace('mailto:', '');
        if (navigator.clipboard) {
            navigator.clipboard.writeText(email).then(() => {
                console.log('📧 Email copied to clipboard!');
            });
        }
    });
});

// ================================
// IMAGE LAZY LOADING ERROR HANDLING
// ================================

document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function () {
        console.warn(`Failed to load image: ${this.src}`);
        this.style.backgroundColor = '#e2e8f0';
        this.alt = 'Image not found';
    });
});

// ================================
// INITIALIZATION
// ================================

(function init() {
    console.log('🚀 Portfolio initialized');
    console.log('📊 JavaScript loaded successfully');

    const criticalElements = ['nav', 'hero', 'projects', 'contact'];
    criticalElements.forEach(id => {
        if (!document.getElementById(id)) {
            console.warn(`⚠️ Missing critical element: ${id}`);
        }
    });
})();

/* ================================
   MINECRAFT HEARTH - FIRE ANIMATION
   ================================ */

class HearthFireAnimation {
    constructor() {
        this.canvas = document.getElementById('fireCanvas');
        this.ctx = this.canvas ? this.canvas.getContext('2d') : null;
        this.emberContainer = document.getElementById('emberContainer');

        this.fireLayer0 = null;
        this.fireLayer1 = null;
        this.currentFrame = 0;
        this.frameCount = 32;
        this.frameSize = 32;

        this.fireWidth = 256;
        this.fireHeight = 512;
        this.totalWidth = 512;

        this.animationSpeed = 3;
        this.frameTimer = 0;
        this.lastTimestamp = 0;

        this.emberTimer = 0;
        this.emberInterval = 1500;
        this.maxEmbers = 4;
        this.activeEmbers = 0;

        this.isActive = false;
        this.animationFrameId = null;

        this.loadTextures();
    }

    loadTextures() {
        this.fireLayer0 = new Image();
        this.fireLayer1 = new Image();

        let loaded = 0;
        const checkLoaded = () => {
            loaded++;
            if (loaded === 2) {
                console.log('🔥 Fire textures loaded successfully');
            }
        };

        this.fireLayer0.onload = checkLoaded;
        this.fireLayer1.onload = checkLoaded;

        this.fireLayer0.onerror = () => console.error('❌ Failed to load fire_layer_0.png');
        this.fireLayer1.onerror = () => console.error('❌ Failed to load fire_layer_1.png');

        this.fireLayer0.src = 'textures/fire_layer_0.png';
        this.fireLayer1.src = 'textures/fire_layer_1.png';
    }

    start() {
        if (!this.canvas || !this.ctx) {
            console.warn('⚠️ Fire canvas not found');
            return;
        }

        this.canvas.width = this.totalWidth;
        this.canvas.height = this.fireHeight;

        this.isActive = true;
        this.lastTimestamp = performance.now();
        this.animate(this.lastTimestamp);
        console.log('🔥 Hearth fire started - Dual fires rendering');
    }

    stop() {
        this.isActive = false;
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
            this.animationFrameId = null;
        }

        if (this.ctx) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }

        if (this.emberContainer) {
            this.emberContainer.innerHTML = '';
        }
        this.activeEmbers = 0;

        console.log('🔥 Hearth fire stopped');
    }

    animate(timestamp) {
        if (!this.isActive) return;

        const deltaTime = timestamp - this.lastTimestamp;
        this.lastTimestamp = timestamp;

        this.frameTimer += deltaTime;
        const frameDelay = 1000 / this.animationSpeed;

        if (this.frameTimer >= frameDelay) {
            this.frameTimer = 0;
            this.currentFrame = (this.currentFrame + 1) % this.frameCount;
            this.drawFire();
        }

        this.emberTimer += deltaTime;
        if (this.emberTimer >= this.emberInterval && this.activeEmbers < this.maxEmbers) {
            this.spawnEmber();
            this.emberTimer = 0;
        }

        this.animationFrameId = requestAnimationFrame((t) => this.animate(t));
    }

    drawFire() {
        if (!this.ctx || !this.fireLayer0 || !this.fireLayer1) return;
        if (!this.fireLayer0.complete || !this.fireLayer1.complete) return;

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.imageSmoothingEnabled = false;

        const frameHeight = this.frameSize;
        const sourceY = this.currentFrame * frameHeight;

        for (let i = 0; i < 2; i++) {
            const xPosition = i * this.fireWidth;

            this.ctx.globalCompositeOperation = 'source-over';
            this.ctx.globalAlpha = 1.0;
            this.ctx.drawImage(
                this.fireLayer0,
                0, sourceY,
                this.frameSize, frameHeight,
                xPosition, 0,
                this.fireWidth, this.fireHeight
            );

            this.ctx.globalCompositeOperation = 'lighter';
            this.ctx.globalAlpha = 0.8;
            this.ctx.drawImage(
                this.fireLayer1,
                0, sourceY,
                this.frameSize, frameHeight,
                xPosition, 0,
                this.fireWidth, this.fireHeight
            );
        }

        this.ctx.globalCompositeOperation = 'source-over';
        this.ctx.globalAlpha = 1.0;
    }

    spawnEmber() {
        if (!this.emberContainer) return;

        const ember = document.createElement('div');
        ember.className = 'ember active';

        const randomX = 300 + Math.random() * 400;
        const startY = 600;

        ember.style.left = `${randomX}px`;
        ember.style.top = `${startY}px`;

        this.emberContainer.appendChild(ember);
        this.activeEmbers++;

        setTimeout(() => {
            if (ember.parentNode) {
                ember.parentNode.removeChild(ember);
            }
            this.activeEmbers--;
        }, 3000);
    }
}

// ================================
// HEARTH INIT & MINECRAFT TOGGLE
// ================================

let hearthFire = null;

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        hearthFire = new HearthFireAnimation();
        console.log('🔥 HearthFireAnimation initialized');
    });
} else {
    hearthFire = new HearthFireAnimation();
    console.log('🔥 HearthFireAnimation initialized');
}

function toggleMinecraftMode() {
    minecraftMode = !minecraftMode;

    if (minecraftMode) {
        document.body.classList.add('minecraft-theme');
        showDebugStats();
        if (hearthFire) hearthFire.start();
        console.log('🎮 Minecraft Mode Activated!');
        console.log('🔥 Hearth fire ignited!');
    } else {
        document.body.classList.remove('minecraft-theme');
        hideDebugStats();
        if (hearthFire) hearthFire.stop();
        console.log('✨ Default Mode Restored');
    }
}

/* ================================
   HEARTH PERFORMANCE + DEBUG HELPERS
   ================================ */

let hearthFrameCount = 0;
let hearthFpsTimer = 0;

function monitorHearthPerformance() {
    if (!minecraftMode) return;

    hearthFrameCount++;
    hearthFpsTimer += 16.67;

    if (hearthFpsTimer >= 1000) {
        const fps = hearthFrameCount;
        if (fps < 55) {
            console.warn(`⚠️ Hearth FPS low: ${fps}`);
        }
        hearthFrameCount = 0;
        hearthFpsTimer = 0;
    }
}

if (typeof requestAnimationFrame !== 'undefined') {
    function hearthMonitorLoop() {
        monitorHearthPerformance();
        requestAnimationFrame(hearthMonitorLoop);
    }
    // hearthMonitorLoop(); // optional
}

window.testHearth = function () {
    console.log('🔥 Testing hearth...');
    if (!minecraftMode) {
        console.log('Activating Minecraft mode...');
        toggleMinecraftMode();
    }
    console.log('Hearth should now be visible and animating');
    console.log('Active embers:', hearthFire ? hearthFire.activeEmbers : 0);
    console.log('Current frame:', hearthFire ? hearthFire.currentFrame : 0);
};

window.spawnTestEmber = function () {
    if (hearthFire && minecraftMode) {
        hearthFire.spawnEmber();
        console.log('🔥 Spawned test ember');
    } else {
        console.log('❌ Hearth not active. Press F3 first.');
    }
};

window.setFireSpeed = function (fps) {
    if (hearthFire) {
        hearthFire.animationSpeed = fps;
        console.log(`🔥 Fire speed set to ${fps} FPS`);
    }
};

window.setEmberRate = function (milliseconds) {
    if (hearthFire) {
        hearthFire.emberInterval = milliseconds;
        console.log(`🔥 Ember spawn rate set to ${milliseconds}ms`);
    }
};

console.log('%c🔥 Hearth Fire System Loaded', 'color: #ff8c00; font-weight: bold;');
console.log('Press F3 to ignite the hearth!');
console.log('Debug commands: testHearth(), spawnTestEmber(), setFireSpeed(fps), setEmberRate(ms)');
