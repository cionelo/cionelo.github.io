/**
 * Marketing Intelligence Charts
 * Chart.js Animated Graphs
 * Version: 1.0
 * Date: 2025-11-19
 */

// ================================
// SALES CHART (Hang the Degree)
// ================================

function initSalesChart() {
    const ctx = document.getElementById('salesChart');
    if (!ctx) return;

    const salesData = {
        labels: ['Jan 2023', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        datasets: [
            {
                label: 'Revenue ($)',
                data: [0, 291.11, 418.86, 142.52, 81.81, 10.35, 0],
                borderColor: '#ff4757',
                backgroundColor: 'rgba(255, 71, 87, 0.1)',
                yAxisID: 'y',
                tension: 0.4,
                fill: true
            },
            {
                label: 'Units Sold',
                data: [0, 43, 79, 22, 12, 3, 0],
                borderColor: '#ffa502',
                backgroundColor: 'rgba(255, 165, 2, 0.1)',
                yAxisID: 'y1',
                tension: 0.4,
                fill: true
            }
        ]
    };

    // Video post date annotations
    const videoAnnotations = {
        'Dec 29, 2022': { x: 0, label: 'Original' },
        'Jan 21, 2023': { x: 1, label: 'Hype 1', small: true },
        'Feb 10, 2023': { x: 2, label: 'Hype 2', small: true },
        'Feb 14, 2023': { x: 2, label: 'Hype 3+4', small: true },
        'Feb 22, 2023': { x: 2, label: 'Repost 1 (Shop)' },
        'Mar 10, 2023': { x: 3, label: 'Repost 2' },
        'May 3, 2023': { x: 5, label: 'Repost 3' }
    };

    new Chart(ctx, {
        type: 'line',
        data: salesData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                mode: 'index',
                intersect: false,
            },
            plugins: {
                legend: {
                    labels: {
                        color: '#e7eaf0',
                        font: { size: 14 }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(18, 20, 24, 0.95)',
                    titleColor: '#ff4757',
                    bodyColor: '#e7eaf0',
                    borderColor: '#ff4757',
                    borderWidth: 1,
                    callbacks: {
                        title: function(context) {
                            return context[0].label;
                        },
                        afterBody: function(context) {
                            const index = context[0].dataIndex;
                            const videos = Object.entries(videoAnnotations)
                                .filter(([_, v]) => v.x === index)
                                .map(([date, v]) => `${date}: ${v.label}`);
                            return videos.length ? ['\nVideo Posts:', ...videos] : [];
                        }
                    }
                },
                annotation: {
                    annotations: Object.entries(videoAnnotations).map(([date, config], i) => ({
                        type: 'line',
                        xMin: config.x,
                        xMax: config.x,
                        borderColor: config.small ? 'rgba(255, 165, 2, 0.5)' : 'rgba(255, 71, 87, 0.8)',
                        borderWidth: config.small ? 1 : 2,
                        borderDash: config.small ? [5, 5] : [],
                        label: {
                            display: true,
                            content: config.label,
                            position: 'top',
                            backgroundColor: config.small ? 'rgba(255, 165, 2, 0.8)' : 'rgba(255, 71, 87, 0.8)',
                            color: 'white',
                            font: { size: config.small ? 9 : 11 }
                        }
                    }))
                }
            },
            scales: {
                x: {
                    grid: { color: 'rgba(255, 255, 255, 0.05)' },
                    ticks: { color: '#8b919d' }
                },
                y: {
                    type: 'linear',
                    position: 'left',
                    grid: { color: 'rgba(255, 255, 255, 0.05)' },
                    ticks: {
                        color: '#ff4757',
                        callback: function(value) {
                            return '$' + value.toFixed(0);
                        }
                    },
                    title: {
                        display: true,
                        text: 'Revenue ($)',
                        color: '#ff4757'
                    }
                },
                y1: {
                    type: 'linear',
                    position: 'right',
                    grid: { drawOnChartArea: false },
                    ticks: {
                        color: '#ffa502',
                        callback: function(value) {
                            return value + ' units';
                        }
                    },
                    title: {
                        display: true,
                        text: 'Units Sold',
                        color: '#ffa502'
                    }
                }
            },
            animation: {
                duration: 2000,
                easing: 'easeInOutQuart'
            }
        }
    });
}

// ================================
// #COCOTOK ENGAGEMENT COMPARISON
// ================================

function initCocotokEngagementChart() {
    const ctx = document.getElementById('cocotokEngagementChart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Industry Average', 'Your Performance'],
            datasets: [
                {
                    label: 'Likes',
                    data: [2.5, 13.1], // Industry ~2-5%, breakdown estimated
                    backgroundColor: 'rgba(255, 71, 87, 0.8)',
                    stack: 'Stack 0'
                },
                {
                    label: 'Saves',
                    data: [1.0, 3.2],
                    backgroundColor: 'rgba(255, 107, 122, 0.8)',
                    stack: 'Stack 0'
                },
                {
                    label: 'Comments',
                    data: [0.8, 1.8],
                    backgroundColor: 'rgba(255, 139, 148, 0.8)',
                    stack: 'Stack 0'
                },
                {
                    label: 'Shares',
                    data: [0.7, 1.24],
                    backgroundColor: 'rgba(255, 165, 2, 0.8)',
                    stack: 'Stack 0'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: { color: '#e7eaf0', font: { size: 14 } }
                },
                tooltip: {
                    backgroundColor: 'rgba(18, 20, 24, 0.95)',
                    titleColor: '#ff4757',
                    bodyColor: '#e7eaf0',
                    borderColor: '#ff4757',
                    borderWidth: 1,
                    callbacks: {
                        footer: function(items) {
                            const total = items.reduce((sum, item) => sum + item.parsed.y, 0);
                            return 'Total ER: ' + total.toFixed(2) + '%';
                        }
                    }
                }
            },
            scales: {
                x: {
                    stacked: true,
                    grid: { color: 'rgba(255, 255, 255, 0.05)' },
                    ticks: { color: '#8b919d', font: { size: 14 } }
                },
                y: {
                    stacked: true,
                    grid: { color: 'rgba(255, 255, 255, 0.05)' },
                    ticks: {
                        color: '#ff4757',
                        callback: function(value) {
                            return value + '%';
                        }
                    },
                    title: {
                        display: true,
                        text: 'Engagement Rate (%)',
                        color: '#ff4757'
                    }
                }
            },
            animation: {
                duration: 1500,
                delay: (context) => {
                    let delay = 0;
                    if (context.type === 'data' && context.mode === 'default') {
                        delay = context.dataIndex * 300;
                    }
                    return delay;
                }
            }
        }
    });
}

// ================================
// #COCOTOK TOP 5 PERFORMERS
// ================================

function initCocotokTop5Chart() {
    const ctx = document.getElementById('cocotokTop5Chart');
    if (!ctx) return;

    const top5Data = [
        { views: 32500, likes: 8000, comments: 73, saves: 653, shares: 177 },
        { views: 1600000, likes: 391200, comments: 1337, saves: 22100, shares: 1209 },
        { views: 1800, likes: 413, comments: 12, saves: 10, shares: 9 },
        { views: 19400, likes: 4300, comments: 70, saves: 64, shares: 2 },
        { views: 25300, likes: 5100, comments: 46, saves: 158, shares: 1 }
    ];

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Video 1\n(32.5K)', 'Video 2\n(1.6M)', 'Video 3\n(1.8K)', 'Video 4\n(19.4K)', 'Video 5\n(25.3K)'],
            datasets: [
                {
                    label: 'Likes',
                    data: top5Data.map(v => ((v.likes / v.views) * 100).toFixed(2)),
                    backgroundColor: 'rgba(255, 71, 87, 0.8)',
                    stack: 'Stack 0'
                },
                {
                    label: 'Saves',
                    data: top5Data.map(v => ((v.saves / v.views) * 100).toFixed(2)),
                    backgroundColor: 'rgba(255, 107, 122, 0.8)',
                    stack: 'Stack 0'
                },
                {
                    label: 'Comments',
                    data: top5Data.map(v => ((v.comments / v.views) * 100).toFixed(2)),
                    backgroundColor: 'rgba(255, 139, 148, 0.8)',
                    stack: 'Stack 0'
                },
                {
                    label: 'Shares',
                    data: top5Data.map(v => ((v.shares / v.views) * 100).toFixed(2)),
                    backgroundColor: 'rgba(255, 165, 2, 0.8)',
                    stack: 'Stack 0'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            indexAxis: 'y',
            plugins: {
                legend: {
                    labels: { color: '#e7eaf0', font: { size: 14 } }
                },
                tooltip: {
                    backgroundColor: 'rgba(18, 20, 24, 0.95)',
                    titleColor: '#ff4757',
                    bodyColor: '#e7eaf0',
                    borderColor: '#ff4757',
                    borderWidth: 1,
                    callbacks: {
                        footer: function(items) {
                            const total = items.reduce((sum, item) => sum + parseFloat(item.parsed.x), 0);
                            return 'Total ER: ' + total.toFixed(2) + '%';
                        }
                    }
                }
            },
            scales: {
                x: {
                    stacked: true,
                    grid: { color: 'rgba(255, 255, 255, 0.05)' },
                    ticks: {
                        color: '#ff4757',
                        callback: function(value) {
                            return value + '%';
                        }
                    },
                    title: {
                        display: true,
                        text: 'Engagement Rate (%)',
                        color: '#ff4757'
                    }
                },
                y: {
                    stacked: true,
                    grid: { color: 'rgba(255, 255, 255, 0.05)' },
                    ticks: { color: '#8b919d' }
                }
            },
            animation: {
                duration: 1500,
                delay: (context) => {
                    return context.dataIndex * 200;
                }
            }
        }
    });
}

// ================================
// #COCOTOK GROWTH TRAJECTORY
// ================================

function initCocotokGrowthChart() {
    const ctx = document.getElementById('cocotokGrowthChart');
    if (!ctx) return;

    // Data extracted from monthly_total_followers_for_nemo.png
    const growthData = {
        labels: ['2022-06', '2022-09', '2022-12', '2023-01', '2023-03', '2023-06', '2023-09', '2023-12', '2024-03', '2024-06', '2024-09'],
        followers: [170000, 180000, 200000, 213200, 210000, 212000, 210000, 208000, 206000, 204000, 202000]
    };

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: growthData.labels,
            datasets: [{
                label: 'Followers',
                data: growthData.followers,
                borderColor: '#ff4757',
                backgroundColor: 'rgba(255, 71, 87, 0.1)',
                tension: 0.4,
                fill: true,
                pointRadius: 6,
                pointHoverRadius: 8,
                pointBackgroundColor: '#ff4757',
                pointBorderColor: '#fff',
                pointBorderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: 'rgba(18, 20, 24, 0.95)',
                    titleColor: '#ff4757',
                    bodyColor: '#e7eaf0',
                    borderColor: '#ff4757',
                    borderWidth: 1,
                    callbacks: {
                        label: function(context) {
                            return context.parsed.y.toLocaleString() + ' followers';
                        }
                    }
                },
                annotation: {
                    annotations: {
                        phase1: {
                            type: 'box',
                            xMin: 0,
                            xMax: 2,
                            backgroundColor: 'rgba(255, 71, 87, 0.1)',
                            borderWidth: 0,
                            label: {
                                display: true,
                                content: 'Phase 1',
                                position: 'start',
                                color: '#ff4757',
                                font: { size: 12, weight: 'bold' }
                            }
                        },
                        phase2: {
                            type: 'box',
                            xMin: 2,
                            xMax: 4,
                            backgroundColor: 'rgba(255, 107, 122, 0.1)',
                            borderWidth: 0,
                            label: {
                                display: true,
                                content: 'Phase 2',
                                position: 'start',
                                color: '#ff6b7a',
                                font: { size: 12, weight: 'bold' }
                            }
                        },
                        phase3: {
                            type: 'box',
                            xMin: 4,
                            xMax: 7,
                            backgroundColor: 'rgba(255, 139, 148, 0.1)',
                            borderWidth: 0,
                            label: {
                                display: true,
                                content: 'Phase 3',
                                position: 'start',
                                color: '#ff8b94',
                                font: { size: 12, weight: 'bold' }
                            }
                        },
                        phase4: {
                            type: 'box',
                            xMin: 7,
                            xMax: 10,
                            backgroundColor: 'rgba(255, 165, 2, 0.1)',
                            borderWidth: 0,
                            label: {
                                display: true,
                                content: 'Phase 4',
                                position: 'start',
                                color: '#ffa502',
                                font: { size: 12, weight: 'bold' }
                            }
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: { color: 'rgba(255, 255, 255, 0.05)' },
                    ticks: {
                        color: '#8b919d',
                        callback: function(value, index) {
                            const date = this.getLabelForValue(value);
                            const [year, month] = date.split('-');
                            const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                            return monthNames[parseInt(month) - 1] + ' ' + year;
                        }
                    }
                },
                y: {
                    grid: { color: 'rgba(255, 255, 255, 0.05)' },
                    ticks: {
                        color: '#ff4757',
                        callback: function(value) {
                            return (value / 1000) + 'K';
                        }
                    },
                    title: {
                        display: true,
                        text: 'Followers',
                        color: '#ff4757'
                    }
                }
            },
            animation: {
                duration: 2000,
                easing: 'easeInOutQuart'
            }
        }
    });
}

// ================================
// UNM GROWTH CHART
// ================================

function initUnmGrowthChart() {
    const ctx = document.getElementById('unmGrowthChart');
    if (!ctx) return;

    // Data from UNM-Monthly-Total-Followers-tilAug2023.png
    const unmData = {
        labels: ['2023-01', '2023-02', '2023-03', '2023-04', '2023-05', '2023-06', '2023-07', '2023-08'],
        followers: [27000, 27200, 27500, 27800, 28100, 28400, 28700, 29233]
    };

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: unmData.labels,
            datasets: [{
                label: 'Instagram Followers',
                data: unmData.followers,
                borderColor: '#ff4757',
                backgroundColor: 'rgba(255, 71, 87, 0.1)',
                tension: 0.4,
                fill: true,
                pointRadius: 6,
                pointHoverRadius: 8,
                pointBackgroundColor: '#ff4757',
                pointBorderColor: '#fff',
                pointBorderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: 'rgba(18, 20, 24, 0.95)',
                    titleColor: '#ff4757',
                    bodyColor: '#e7eaf0',
                    borderColor: '#ff4757',
                    borderWidth: 1,
                    callbacks: {
                        title: function(context) {
                            const [year, month] = context[0].label.split('-');
                            const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                            return monthNames[parseInt(month) - 1] + ' ' + year;
                        },
                        label: function(context) {
                            return context.parsed.y.toLocaleString() + ' followers';
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: { color: 'rgba(255, 255, 255, 0.05)' },
                    ticks: {
                        color: '#8b919d',
                        callback: function(value, index) {
                            const date = this.getLabelForValue(value);
                            const [year, month] = date.split('-');
                            const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'];
                            return monthNames[parseInt(month) - 1];
                        }
                    }
                },
                y: {
                    grid: { color: 'rgba(255, 255, 255, 0.05)' },
                    ticks: {
                        color: '#ff4757',
                        callback: function(value) {
                            return (value / 1000) + 'K';
                        }
                    },
                    title: {
                        display: true,
                        text: 'Followers',
                        color: '#ff4757'
                    }
                }
            },
            animation: {
                duration: 2000,
                easing: 'easeInOutQuart'
            }
        }
    });
}

// ================================
// INITIALIZATION & SCROLL ANIMATIONS
// ================================

function initAllCharts() {
    // Initialize all charts when DOM is ready
    initSalesChart();
    initCocotokEngagementChart();
    initCocotokTop5Chart();
    initCocotokGrowthChart();
    initUnmGrowthChart();
}

// Intersection Observer for scroll-triggered animations
function setupScrollAnimations() {
    const chartContainers = document.querySelectorAll('.chart-container');
    
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);

    chartContainers.forEach(container => {
        observer.observe(container);
    });
}

// ================================
// CAROUSEL FUNCTIONALITY
// ================================

function initCarousel() {
    const carousels = document.querySelectorAll('.campaign-carousel');

    carousels.forEach(carousel => {
        const slides = carousel.querySelectorAll('.carousel-slide');
        const indicators = carousel.querySelectorAll('.indicator');
        const prevBtn = carousel.querySelector('.carousel-control.prev');
        const nextBtn = carousel.querySelector('.carousel-control.next');
        let currentSlide = 0;

        function showSlide(index) {
            slides.forEach((slide, i) => {
                slide.classList.toggle('active', i === index);
            });
            indicators.forEach((indicator, i) => {
                indicator.classList.toggle('active', i === index);
            });
            currentSlide = index;
        }

        function nextSlide() {
            const next = (currentSlide + 1) % slides.length;
            showSlide(next);
        }

        function prevSlide() {
            const prev = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(prev);
        }

        // Event listeners
        nextBtn?.addEventListener('click', nextSlide);
        prevBtn?.addEventListener('click', prevSlide);

        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => showSlide(index));
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') prevSlide();
            if (e.key === 'ArrowRight') nextSlide();
        });
    });
}

// ================================
// MODAL FUNCTIONALITY
// ================================

function initModals() {
    const clickableThumbnails = document.querySelectorAll('.video-thumbnail.clickable');
    const modalOverlay = document.getElementById('modalOverlay');

    clickableThumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            const modalId = this.dataset.modal;
            const modal = document.getElementById(modalId);
            if (modal && modalOverlay) {
                modalOverlay.classList.add('active');
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });
}

function closeModal() {
    const modalOverlay = document.getElementById('modalOverlay');
    const activeModal = document.querySelector('.modal.active');
    
    if (activeModal) {
        activeModal.classList.remove('active');
    }
    if (modalOverlay) {
        modalOverlay.classList.remove('active');
    }
    document.body.style.overflow = '';
}

// Close modal on overlay click
document.addEventListener('click', function(e) {
    if (e.target.id === 'modalOverlay') {
        closeModal();
    }
});

// Close modal on Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// ================================
// INITIALIZE ON PAGE LOAD
// ================================

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        initAllCharts();
        initCarousel();
        initModals();
        setupScrollAnimations();
    });
} else {
    initAllCharts();
    initCarousel();
    initModals();
    setupScrollAnimations();
}

console.log('📊 Marketing Intelligence Charts Loaded');