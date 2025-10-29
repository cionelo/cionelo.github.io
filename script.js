// ================================
// NAVIGATION - Scroll & Mobile
// ================================

const nav = document.getElementById('nav');
const mobileToggle = document.getElementById('mobileToggle');
const navLinks = document.getElementById('navLinks');

// Add shadow to nav on scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Mobile menu toggle
mobileToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileToggle.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileToggle.classList.remove('active');
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70; // Account for fixed nav height
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ================================
// RESUME DROPDOWN
// ================================

const resumeBtn = document.getElementById('resumeBtn');
const resumeBtnBottom = document.getElementById('resumeBtnBottom');
const resumeDropdown = document.getElementById('resumeDropdown');

// Toggle dropdown
function toggleResumeDropdown(e) {
    e.stopPropagation();
    resumeDropdown.classList.toggle('active');
}

resumeBtn.addEventListener('click', toggleResumeDropdown);
resumeBtnBottom.addEventListener('click', toggleResumeDropdown);

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
    if (!resumeDropdown.contains(e.target) && e.target !== resumeBtn && e.target !== resumeBtnBottom) {
        resumeDropdown.classList.remove('active');
    }
});

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

// Observe elements for fade-in animation
const animatedElements = document.querySelectorAll('.project-card, .project-featured, .stat-card, .timeline-item, .contact-card, .skills-category');

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

// Listen for F3 key press
document.addEventListener('keydown', (e) => {
    // Check if F3 is pressed (key code 114 or 'F3')
    if (e.key === 'F3' || e.keyCode === 114) {
        e.preventDefault(); // Prevent browser's default F3 behavior
        toggleMinecraftMode();
    }
});


// ================================
// DEBUG STATS OVERLAY (F3 Screen)
// ================================

function showDebugStats() {
    // Create debug stats element if it doesn't exist
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
    
    // Update stats
    updateDebugStats();
    debugStatsElement.style.display = 'block';
    
    // Update stats every second
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
        fps: 60, // Placeholder - would need more complex calculation for real FPS
        loadTime: (performance.now() / 1000).toFixed(2),
        scrollY: window.scrollY,
        viewportWidth: window.innerWidth,
        viewportHeight: window.innerHeight,
        section: getCurrentSection()
    };
    
    debugStatsElement.innerHTML = `
        <strong>Portfolio Debug Screen (F3)</strong><br>
        <br>
        FPS: ${stats.fps} | Load Time: ${stats.loadTime}s<br>
        Position: ${stats.section}<br>
        Scroll: ${stats.scrollY}px<br>
        Viewport: ${stats.viewportWidth}x${stats.viewportHeight}<br>
        <br>
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

// Log page load time
window.addEventListener('load', () => {
    const loadTime = (performance.now() / 1000).toFixed(2);
    console.log(`⚡ Page loaded in ${loadTime}s`);
});

// ================================
// FIRE ANIMATION (PLACEHOLDER FOR WEEK 2)
// ================================

// We'll add the canvas-based fire animation here in Week 2
// For now, we have the framework ready

function initFireAnimation() {
    // Week 2: Create canvas element, draw animated fire using Minecraft textures
    console.log('🔥 Fire animation will be implemented in Week 2');
}

// ================================
// EASTER EGGS & ENHANCEMENTS
// ================================

// Log welcome message
console.log('%c👋 Hey there!', 'font-size: 20px; font-weight: bold;');
console.log('%cLooks like you found the console. Try pressing F3 for a surprise! 🎮', 'font-size: 14px; color: #3b82f6;');

// Track if user has discovered F3 mode (could store in localStorage for persistence)
if (localStorage.getItem('discoveredF3') === 'true') {
    console.log('%c🎮 Welcome back! F3 mode is available.', 'color: #4ade80;');
} else {
    // First time visitor
    setTimeout(() => {
        if (!minecraftMode) {
            console.log('%c💡 Hint: Try pressing F3...', 'color: #94a3b8; font-style: italic;');
        }
    }, 10000); // Show hint after 10 seconds
}

// Mark that user discovered F3 mode
document.addEventListener('keydown', (e) => {
    if (e.key === 'F3' || e.keyCode === 114) {
        localStorage.setItem('discoveredF3', 'true');
    }
});

// ================================
// ACTIVE NAV LINK HIGHLIGHTING
// ================================

// Highlight active section in navigation
const sections = document.querySelectorAll('section[id]');
const navLinksArray = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 100)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinksArray.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ================================
// COPY EMAIL ON CLICK
// ================================

const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
emailLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const email = link.getAttribute('href').replace('mailto:', '');
        
        // Try to copy to clipboard
        if (navigator.clipboard) {
            navigator.clipboard.writeText(email).then(() => {
                console.log('📧 Email copied to clipboard!');
                // Could add a toast notification here in Week 2
            });
        }
    });
});

// ================================
// IMAGE LAZY LOADING ERROR HANDLING
// ================================

// Handle image loading errors gracefully
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
        console.warn(`Failed to load image: ${this.src}`);
        // Could set a placeholder image here
        this.style.backgroundColor = '#e2e8f0';
        this.alt = 'Image not found';
    });
});

// ================================
// FORM VALIDATION (IF YOU ADD CONTACT FORM LATER)
// ================================

// Placeholder for future contact form functionality
// function validateContactForm() { ... }

// ================================
// INITIALIZATION
// ================================

// Run any initialization code
(function init() {
    console.log('🚀 Portfolio initialized');
    console.log('📊 JavaScript loaded successfully');
    
    // Check if all critical elements exist
    const criticalElements = [
        'nav',
        'hero',
        'projects',
        'contact'
    ];
    
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
        
        // Fire animation state
        this.fireLayer0 = null;
        this.fireLayer1 = null;
        this.currentFrame = 0;
        this.frameCount = 32;  // Total frames in fire animation
        this.frameSize = 32;   // Original texture size
        this.displaySize = 192; // Scaled size (32 × 6)
        this.displayHeight = 128; // Scaled height (32 × 4)
        this.animationSpeed = 3; // Frames per second (medium flicker)
        this.frameTimer = 0;
        this.lastTimestamp = 0;
        
        // Ember state
        this.emberTimer = 0;
        this.emberInterval = 1500; // Spawn ember every 1.5 seconds (occasional)
        this.maxEmbers = 4;
        this.activeEmbers = 0;
        
        // Animation state
        this.isActive = false;
        this.animationFrameId = null;
        
        // Preload textures
        this.loadTextures();
    }
    
    loadTextures() {
        this.fireLayer0 = new Image();
        this.fireLayer1 = new Image();
        
        let loaded = 0;
        const checkLoaded = () => {
            loaded++;
            if (loaded === 2) {
                console.log('🔥 Fire textures loaded');
            }
        };
        
        this.fireLayer0.onload = checkLoaded;
        this.fireLayer1.onload = checkLoaded;
        
        this.fireLayer0.onerror = () => console.error('Failed to load fire_layer_0.png');
        this.fireLayer1.onerror = () => console.error('Failed to load fire_layer_1.png');
        
        this.fireLayer0.src = 'textures/fire_layer_0.png';
        this.fireLayer1.src = 'textures/fire_layer_1.png';
    }
    
    start() {
        if (!this.canvas || !this.ctx) {
            console.warn('Fire canvas not found');
            return;
        }
        
        this.isActive = true;
        this.lastTimestamp = performance.now();
        this.animate(this.lastTimestamp);
        console.log('🔥 Hearth fire started');
    }
    
    stop() {
        this.isActive = false;
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
            this.animationFrameId = null;
        }
        
        // Clear canvas
        if (this.ctx) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
        
        // Remove all embers
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
        
        // Update frame timer
        this.frameTimer += deltaTime;
        const frameDelay = 1000 / this.animationSpeed; // milliseconds per frame
        
        if (this.frameTimer >= frameDelay) {
            this.frameTimer = 0;
            this.currentFrame = (this.currentFrame + 1) % this.frameCount;
            this.drawFire();
        }
        
        // Update ember timer
        this.emberTimer += deltaTime;
        if (this.emberTimer >= this.emberInterval && this.activeEmbers < this.maxEmbers) {
            this.spawnEmber();
            this.emberTimer = 0;
        }
        
        this.animationFrameId = requestAnimationFrame((t) => this.animate(t));
    }
    
    drawFire() {
        if (!this.ctx || !this.fireLayer0 || !this.fireLayer1) return;
        
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Enable pixel-perfect rendering
        this.ctx.imageSmoothingEnabled = false;
        
        // Calculate source rectangle (which frame to draw)
        const frameHeight = this.frameSize; // 32px per frame
        const sourceY = this.currentFrame * frameHeight;
        
        // Layer 0: Base fire
        this.ctx.globalCompositeOperation = 'source-over';
        this.ctx.drawImage(
            this.fireLayer0,
            0, sourceY,              // Source x, y
            this.frameSize, frameHeight,  // Source width, height (32×32)
            0, 0,                    // Dest x, y
            this.displaySize, this.displayHeight  // Dest width, height (192×128)
        );
        
        // Layer 1: Overlay fire (additive blending for glow)
        this.ctx.globalCompositeOperation = 'lighter';
        this.ctx.globalAlpha = 0.8; // Slightly transparent for blend
        this.ctx.drawImage(
            this.fireLayer1,
            0, sourceY,
            this.frameSize, frameHeight,
            0, 0,
            this.displaySize, this.displayHeight
        );
        
        // Reset composite settings
        this.ctx.globalCompositeOperation = 'source-over';
        this.ctx.globalAlpha = 1.0;
    }
    
    spawnEmber() {
        if (!this.emberContainer) return;
        
        const ember = document.createElement('div');
        ember.className = 'ember active';
        
        // Random horizontal position within hearth opening
        const randomX = 60 + Math.random() * 130; // Between left/right frame (32px margins)
        const startY = 120; // Bottom of fire area
        
        ember.style.left = `${randomX}px`;
        ember.style.top = `${startY}px`;
        
        this.emberContainer.appendChild(ember);
        this.activeEmbers++;
        
        // Remove ember after animation completes
        setTimeout(() => {
            if (ember.parentNode) {
                ember.parentNode.removeChild(ember);
            }
            this.activeEmbers--;
        }, 3000); // Match animation duration
    }
}

// Create global hearth instance
let hearthFire = null;

// Initialize hearth when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        hearthFire = new HearthFireAnimation();
    });
} else {
    hearthFire = new HearthFireAnimation();
}

/* ================================
   UPDATE F3 TOGGLE TO CONTROL HEARTH
   ================================ */

// Update the existing toggleMinecraftMode function
function toggleMinecraftMode() {
    minecraftMode = !minecraftMode;
    
    if (minecraftMode) {
        // Enable Minecraft theme
        document.body.classList.add('minecraft-theme');
        showDebugStats();
        
        // Start hearth fire animation
        if (hearthFire) {
            hearthFire.start();
        }
        
        console.log('🎮 Minecraft Mode Activated!');
        console.log('🔥 Hearth fire ignited!');
    } else {
        // Disable Minecraft theme
        document.body.classList.remove('minecraft-theme');
        hideDebugStats();
        
        // Stop hearth fire animation
        if (hearthFire) {
            hearthFire.stop();
        }
        
        console.log('✨ Default Mode Restored');
    }
}

/* ================================
   EMBER PARTICLE SPRITE POSITION FINDER
   ================================ */

// Helper function to find ember sprite in particles.png
// Run this in console to help locate the ember sprite coordinates
function findEmberSprite() {
    console.log('%c🔍 Ember Sprite Finder', 'font-size: 16px; font-weight: bold;');
    console.log('The ember particle is typically a small orange/yellow flame icon in particles.png');
    console.log('Look at: textures/particles.png');
    console.log('Once you find it, update the ember CSS background-position');
    console.log('Example: If ember is at position (48px, 48px), use:');
    console.log('  background-position: -48px -48px;');
}

/* ================================
   PERFORMANCE MONITORING
   ================================ */

// Log hearth performance
let hearthFrameCount = 0;
let hearthFpsTimer = 0;

function monitorHearthPerformance() {
    if (!minecraftMode) return;
    
    hearthFrameCount++;
    hearthFpsTimer += 16.67; // Approximate frame time
    
    if (hearthFpsTimer >= 1000) {
        const fps = hearthFrameCount;
        if (fps < 55) {
            console.warn(`⚠️ Hearth FPS low: ${fps}`);
        }
        hearthFrameCount = 0;
        hearthFpsTimer = 0;
    }
}

// Add to animation loop if needed
if (typeof requestAnimationFrame !== 'undefined') {
    function hearthMonitorLoop() {
        monitorHearthPerformance();
        requestAnimationFrame(hearthMonitorLoop);
    }
    // Uncomment to enable performance monitoring:
    // hearthMonitorLoop();
}

/* ================================
   DEBUG HELPERS
   ================================ */

// Test fire animation (call from console)
window.testHearth = function() {
    console.log('🔥 Testing hearth...');
    if (!minecraftMode) {
        console.log('Activating Minecraft mode...');
        toggleMinecraftMode();
    }
    console.log('Hearth should now be visible and animating');
    console.log('Active embers:', hearthFire ? hearthFire.activeEmbers : 0);
    console.log('Current frame:', hearthFire ? hearthFire.currentFrame : 0);
};

// Spawn ember manually (call from console)
window.spawnTestEmber = function() {
    if (hearthFire && minecraftMode) {
        hearthFire.spawnEmber();
        console.log('🔥 Spawned test ember');
    } else {
        console.log('❌ Hearth not active. Press F3 first.');
    }
};

// Adjust animation speed (call from console)
window.setFireSpeed = function(fps) {
    if (hearthFire) {
        hearthFire.animationSpeed = fps;
        console.log(`🔥 Fire speed set to ${fps} FPS`);
    }
};

// Adjust ember spawn rate (call from console)
window.setEmberRate = function(milliseconds) {
    if (hearthFire) {
        hearthFire.emberInterval = milliseconds;
        console.log(`🔥 Ember spawn rate set to ${milliseconds}ms`);
    }
};

console.log('%c🔥 Hearth Fire System Loaded', 'color: #ff8c00; font-weight: bold;');
console.log('Press F3 to ignite the hearth!');
console.log('Debug commands: testHearth(), spawnTestEmber(), setFireSpeed(fps), setEmberRate(ms)');
