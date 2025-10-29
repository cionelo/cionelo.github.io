/* ================================
   CSS RESET & BASE STYLES
   ================================ */

{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

:root {
    /* Color Palette - Default Mode */
    --primary: #1e40af;
    --primary-light: #3b82f6;
    --primary-dark: #1e3a8a;
    --accent: #0ea5e9;
    
    --bg-primary: #ffffff;
    --bg-secondary: #f8fafc;
    --bg-tertiary: #f1f5f9;
    
    --text-primary: #0f172a;
    --text-secondary: #475569;
    --text-tertiary: #64748b;
    
    --border: #e2e8f0;
    --shadow: rgba(0, 0, 0, 0.1);
    --shadow-lg: rgba(0, 0, 0, 0.15);
    
    /* Spacing */
    --container-width: 1200px;
    --section-padding: 5rem 2rem;
    --card-padding: 2rem;
    
    /* Transitions */
    --transition: all 0.3s ease;
    --transition-fast: all 0.15s ease;
    
    /* Typography */
    --font-primary: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
    --font-mono: 'JetBrains Mono', 'Fira Code', 'Courier New', monospace;
}

html {
    scroll-behavior: smooth;
    font-size: 16px;
}

body {
    font-family: var(--font-primary);
    color: var(--text-primary);
    background-color: var(--bg-primary);
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

/* ================================
   TYPOGRAPHY
   ================================ */

h1, h2, h3, h4, h5, h6 {
    line-height: 1.2;
    font-weight: 700;
    margin-bottom: 1rem;
}

h1 { font-size: 2.5rem; }
h2 { font-size: 2rem; }
h3 { font-size: 1.5rem; }

p {
    margin-bottom: 1rem;
    color: var(--text-secondary);
}

a {
    text-decoration: none;
    color: inherit;
}

ul {
    list-style: none;
}

img {
    max-width: 100%;
    height: auto;
    display: block;
}

/* ================================
   UTILITIES
   ================================ */

.container {
    max-width: var(--container-width);
    margin: 0 auto;
    padding: 0 2rem;
}

.section-title {
    font-size: 2.5rem;
    text-align: center;
    margin-bottom: 3rem;
    color: var(--text-primary);
}

/* Button Styles */
.btn {
    display: inline-block;
    padding: 0.875rem 2rem;
    border-radius: 0.5rem;
    font-weight: 600;
    font-size: 1rem;
    cursor: pointer;
    border: 2px solid transparent;
    transition: var(--transition);
    text-align: center;
}

.btn-primary {
    background-color: var(--primary);
    color: white;
}

.btn-primary:hover {
    background-color: var(--primary-dark);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px var(--shadow-lg);
}

.btn-secondary {
    background-color: transparent;
    color: var(--primary);
    border-color: var(--primary);
}

.btn-secondary:hover {
    background-color: var(--primary);
    color: white;
    transform: translateY(-2px);
}

/* ================================
   NAVIGATION
   ================================ */

.nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background-color: var(--bg-primary);
    z-index: 1000;
    transition: var(--transition);
    border-bottom: 1px solid transparent;
}

.nav.scrolled {
    box-shadow: 0 2px 10px var(--shadow);
    border-bottom-color: var(--border);
}

.nav-container {
    max-width: var(--container-width);
    margin: 0 auto;
    padding: 1rem 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.nav-logo {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--primary);
    transition: var(--transition-fast);
}

.nav-logo:hover {
    color: var(--primary-dark);
}

.nav-links {
    display: flex;
    gap: 2rem;
    align-items: center;
}

.nav-link {
    color: var(--text-secondary);
    font-weight: 500;
    position: relative;
    transition: var(--transition-fast);
}

.nav-link:hover {
    color: var(--primary);
}

.nav-link::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 0;
    height: 2px;
    background-color: var(--primary);
    transition: var(--transition-fast);
}

.nav-link:hover::after {
    width: 100%;
}

.nav-cta {
    padding: 0.625rem 1.5rem;
    background-color: var(--primary);
    color: white;
    border: none;
    border-radius: 0.5rem;
    font-weight: 600;
    cursor: pointer;
    transition: var(--transition);
}

.nav-cta:hover {
    background-color: var(--primary-dark);
    transform: translateY(-2px);
}

/* Mobile Toggle */
.nav-mobile-toggle {
    display: none;
    flex-direction: column;
    gap: 4px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.5rem;
}

.nav-mobile-toggle span {
    width: 24px;
    height: 3px;
    background-color: var(--text-primary);
    border-radius: 2px;
    transition: var(--transition);
}

/* Resume Dropdown */
.resume-dropdown {
    position: fixed;
    top: 70px;
    right: 2rem;
    background-color: var(--bg-primary);
    border: 1px solid var(--border);
    border-radius: 0.5rem;
    box-shadow: 0 4px 20px var(--shadow-lg);
    padding: 1rem;
    display: none;
    flex-direction: column;
    gap: 0.5rem;
    min-width: 300px;
    z-index: 999;
}

.resume-dropdown.active {
    display: flex;
}

.resume-option {
    padding: 1rem;
    border-radius: 0.375rem;
    transition: var(--transition-fast);
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
}

.resume-option:hover {
    background-color: var(--bg-secondary);
}

.resume-title {
    font-weight: 600;
    color: var(--text-primary);
}

.resume-desc {
    font-size: 0.875rem;
    color: var(--text-tertiary);
}

/* ================================
   HERO SECTION
   ================================ */

.hero {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 6rem 2rem 4rem;
    background: linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-secondary) 100%);
}

.hero-container {
    max-width: 800px;
    text-align: center;
}

.hero-image {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    margin: 0 auto 2rem;
    object-fit: cover;
    border: 4px solid var(--primary);
    box-shadow: 0 8px 24px var(--shadow-lg);
}

.hero-title {
    font-size: 3rem;
    margin-bottom: 0.5rem;
    color: var(--text-primary);
}

.hero-subtitle {
    font-size: 1.25rem;
    color: var(--primary);
    font-weight: 600;
    margin-bottom: 1.5rem;
}

.hero-description {
    font-size: 1.125rem;
    color: var(--text-secondary);
    margin-bottom: 2.5rem;
    line-height: 1.8;
}

.hero-cta {
    display: flex;
    gap: 1rem;
    justify-content: center;
    margin-bottom: 2.5rem;
}

.hero-social {
    display: flex;
    gap: 1.5rem;
    justify-content: center;
}

.hero-social a {
    color: var(--text-secondary);
    transition: var(--transition-fast);
}

.hero-social a:hover {
    color: var(--primary);
    transform: translateY(-3px);
}

/* ================================
   ABOUT SECTION
   ================================ */

.about {
    padding: var(--section-padding);
    background-color: var(--bg-secondary);
}

.about-content {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 3rem;
    align-items: start;
}

.about-text p {
    font-size: 1.125rem;
    line-height: 1.8;
    margin-bottom: 1.5rem;
}

.about-stats {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.stat-card {
    background-color: var(--bg-primary);
    padding: 2rem;
    border-radius: 0.75rem;
    text-align: center;
    box-shadow: 0 2px 10px var(--shadow);
    transition: var(--transition);
}

.stat-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 20px var(--shadow-lg);
}

.stat-number {
    display: block;
    font-size: 2.5rem;
    font-weight: 700;
    color: var(--primary);
    margin-bottom: 0.5rem;
}

.stat-label {
    display: block;
    font-size: 0.875rem;
    color: var(--text-tertiary);
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
}

/* ================================
   PROJECTS SECTION
   ================================ */

.projects {
    padding: var(--section-padding);
    background-color: var(--bg-primary);
}

/* Featured Project */
.project-featured {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
    margin-bottom: 4rem;
    background-color: var(--bg-secondary);
    padding: 3rem;
    border-radius: 1rem;
    box-shadow: 0 4px 20px var(--shadow);
}

.project-image-wrapper {
    border-radius: 0.75rem;
    overflow: hidden;
    box-shadow: 0 4px 15px var(--shadow);
}

.project-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: var(--transition);
}

.project-image:hover {
    transform: scale(1.05);
}

.project-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.project-title {
    font-size: 1.75rem;
    margin-bottom: 1rem;
    color: var(--text-primary);
}

.project-description {
    font-size: 1.125rem;
    color: var(--text-secondary);
    margin-bottom: 1.5rem;
    line-height: 1.7;
}

.project-features {
    margin-bottom: 1.5rem;
}

.project-features li {
    position: relative;
    padding-left: 1.5rem;
    margin-bottom: 0.75rem;
    color: var(--text-secondary);
}

.project-features li::before {
    content: '▸';
    position: absolute;
    left: 0;
    color: var(--primary);
    font-weight: 700;
}

.project-tech {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 1.5rem;
}

.tech-tag {
    padding: 0.5rem 1rem;
    background-color: var(--bg-tertiary);
    color: var(--primary);
    border-radius: 2rem;
    font-size: 0.875rem;
    font-weight: 600;
    border: 1px solid var(--border);
}

.project-links {
    display: flex;
    gap: 1rem;
}

/* Projects Grid */
.projects-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
}

.project-card {
    background-color: var(--bg-secondary);
    padding: 2.5rem;
    border-radius: 0.75rem;
    box-shadow: 0 2px 10px var(--shadow);
    transition: var(--transition);
}

.project-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px var(--shadow-lg);
}

.project-card .project-title {
    font-size: 1.5rem;
}

.project-card .project-features {
    font-size: 0.95rem;
}

/* ================================
   SKILLS SECTION
   ================================ */

.skills {
    padding: var(--section-padding);
    background-color: var(--bg-secondary);
}

.skills-categories {
    display: grid;
    gap: 3rem;
}

.skills-category {
    background-color: var(--bg-primary);
    padding: 2.5rem;
    border-radius: 0.75rem;
    box-shadow: 0 2px 10px var(--shadow);
}

.category-title {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
    color: var(--primary);
}

.skills-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 1rem;
}

.skill-item {
    padding: 1rem;
    background-color: var(--bg-secondary);
    border: 2px solid var(--border);
    border-radius: 0.5rem;
    text-align: center;
    font-weight: 600;
    color: var(--text-primary);
    transition: var(--transition);
}

.skill-item:hover {
    border-color: var(--primary);
    background-color: var(--bg-tertiary);
    transform: translateY(-3px);
}

/* ================================
   EXPERIENCE SECTION
   ================================ */

.experience {
    padding: var(--section-padding);
    background-color: var(--bg-primary);
}

.timeline {
    max-width: 900px;
    margin: 0 auto;
    position: relative;
    padding-left: 2rem;
}

.timeline::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 2px;
    background-color: var(--border);
}

.timeline-item {
    position: relative;
    margin-bottom: 3rem;
    padding-left: 2rem;
}

.timeline-marker {
    position: absolute;
    left: -2rem;
    top: 0;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background-color: var(--primary);
    border: 3px solid var(--bg-primary);
    box-shadow: 0 0 0 4px var(--border);
}

.timeline-date {
    font-size: 0.875rem;
    font-weight: 700;
    color: var(--primary);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 0.5rem;
}

.timeline-title {
    font-size: 1.5rem;
    margin-bottom: 0.25rem;
}

.timeline-company {
    color: var(--text-tertiary);
    font-weight: 600;
    margin-bottom: 1rem;
}

.timeline-details {
    margin-left: 1.5rem;
}

.timeline-details li {
    position: relative;
    margin-bottom: 0.75rem;
    color: var(--text-secondary);
    line-height: 1.6;
}

.timeline-details li::before {
    content: '•';
    position: absolute;
    left: -1.5rem;
    color: var(--primary);
    font-weight: 700;
}

.experience-cta {
    text-align: center;
    margin-top: 3rem;
}

/* ================================
   CONTACT SECTION
   ================================ */

.contact {
    padding: var(--section-padding);
    background-color: var(--bg-secondary);
}

.contact-subtitle {
    text-align: center;
    font-size: 1.125rem;
    color: var(--text-secondary);
    margin-bottom: 3rem;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
}

.contact-methods {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
    max-width: 1000px;
    margin: 0 auto;
}

.contact-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    padding: 2.5rem;
    background-color: var(--bg-primary);
    border-radius: 0.75rem;
    box-shadow: 0 2px 10px var(--shadow);
    transition: var(--transition);
    text-align: center;
}

.contact-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px var(--shadow-lg);
}

.contact-card svg {
    color: var(--primary);
}

.contact-card strong {
    font-size: 1.125rem;
    color: var(--text-primary);
}

.contact-card span {
    color: var(--text-secondary);
}

/* ================================
   FOOTER
   ================================ */

.footer {
    padding: 3rem 2rem 2rem;
    background-color: var(--text-primary);
    color: white;
}

.footer-content {
    max-width: var(--container-width);
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
}

.footer-left p {
    color: rgba(255, 255, 255, 0.7);
}

.footer-social {
    display: flex;
    gap: 1.5rem;
}

.footer-social a {
    color: rgba(255, 255, 255, 0.7);
    transition: var(--transition-fast);
    font-weight: 500;
}

.footer-social a:hover {
    color: white;
}

.easter-egg-hint {
    text-align: center;
    opacity: 0;
    animation: fadeIn 1s ease-in 3s forwards;
}

.easter-egg-hint small {
    color: rgba(255, 255, 255, 0.5);
    font-size: 0.875rem;
}

@keyframes fadeIn {
    to {
        opacity: 1;
    }
}

/* ================================
   RESPONSIVE DESIGN
   ================================ */

@media (max-width: 1024px) {
    .project-featured {
        grid-template-columns: 1fr;
    }
    
    .about-content {
        grid-template-columns: 1fr;
    }
    
    .contact-methods {
        grid-template-columns: 1fr;
    }
}

@media (max-width: 768px) {
    html {
        font-size: 14px;
    }
    
    h1 { font-size: 2rem; }
    h2 { font-size: 1.75rem; }
    
    .section-title {
        font-size: 2rem;
    }
    
    /* Navigation */
    .nav-links {
        position: fixed;
        top: 70px;
        left: 0;
        right: 0;
        flex-direction: column;
        background-color: var(--bg-primary);
        padding: 2rem;
        gap: 1.5rem;
        box-shadow: 0 4px 20px var(--shadow-lg);
        transform: translateY(-100%);
        opacity: 0;
        visibility: hidden;
        transition: var(--transition);
    }
    
    .nav-links.active {
        transform: translateY(0);
        opacity: 1;
        visibility: visible;
    }
    
    .nav-mobile-toggle {
        display: flex;
    }
    
    .nav-cta {
        display: none;
    }
    
    /* Hero */
    .hero {
        padding: 5rem 1.5rem 3rem;
    }
    
    .hero-title {
        font-size: 2rem;
    }
    
    .hero-cta {
        flex-direction: column;
    }
    
    /* Projects */
    .projects-grid {
        grid-template-columns: 1fr;
    }
    
    .project-featured {
        padding: 2rem;
    }
    
    /* Skills */
    .skills-grid {
        grid-template-columns: repeat(2, 1fr);
    }
    
    /* Timeline */
    .timeline {
        padding-left: 1.5rem;
    }
    
    .timeline-item {
        padding-left: 1.5rem;
    }
}

@media (max-width: 480px) {
    .container {
        padding: 0 1rem;
    }
    
    .hero-image {
        width: 150px;
        height: 150px;
    }
    
    .skills-grid {
        grid-template-columns: 1fr;
    }
    
    .project-links {
        flex-direction: column;
    }
}

/* ================================
   MINECRAFT THEME (F3 MODE) - READY FOR WEEK 2
   ================================ */

body.minecraft-theme {
    /* We'll add Minecraft styling here in Week 2 */
    /* This class will be toggled by JavaScript when F3 is pressed */
}

/* Placeholder for future Minecraft textures */
/* body.minecraft-theme {
    --primary: #8B4513;
    --bg-primary: url('textures/stone.png');
    etc.
} */

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
