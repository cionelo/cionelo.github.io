/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * Marketing Intelligence Charts & Interactive Data Visualizations
 * Author: Nehemiah Cionelo
 * Last Updated: 2024-11-21
 * Version: 2.1.0
 * 
 * CHANGELOG:
 * - Added hover-only annotation labels for sales chart markers
 * - Implemented nested A/B test slideshow with touch swipe support
 * - Updated CocoTok growth chart with sharper phase transitions
 * - Fixed UNM growth chart baseline (10K starting point)
 * - Added initAbTestSlideshow() function for nested carousel
 * - Enhanced mobile touch interaction for slideshows
 * 
 * DEPENDENCIES:
 * - Chart.js v4.4.0 (must be loaded via CDN in HTML)
 * - chartjs-plugin-annotation v3.0.1 (must be loaded via CDN in HTML)
 * 
 * CHARTS INCLUDED:
 * 1. salesChart - "Hang the Degree" revenue & units sold (dual-axis line chart)
 * 2. cocotokEngagementChart - Engagement rate comparison (stacked bar)
 * 3. cocotokTop5Chart - Top 5 performing videos (horizontal stacked bar)
 * 4. cocotokGrowthChart - Follower growth trajectory (line chart with phase annotations)
 * 5. unmGrowthChart - UNM Instagram growth (line chart with data gap notation)
 * 
 * INTERACTIVE FEATURES:
 * - Main carousel system (initCarousel)
 * - Nested A/B test slideshow (initAbTestSlideshow)
 * - Modal system for detailed video metrics (initModals)
 * - Scroll-triggered chart animations (setupScrollAnimations)
 * - Touch swipe support for mobile devices
 * - Hover-triggered annotation labels on sales chart
 * 
 * INITIALIZATION:
 * All charts and interactive elements initialize on DOMContentLoaded or immediately
 * if document is already loaded. Call order:
 * 1. initAllCharts()
 * 2. initCarousel()
 * 3. initModals()
 * 4. initAbTestSlideshow()
 * 5. setupScrollAnimations()
 * 
 * COLOR SCHEME:
 * Marketing Red: #ff4757 (primary)
 * Marketing Red Dark: #c23444
 * Marketing Red Light: #ff6b7a
 * Orange Accent: #ffa502
 * Background: rgba(18, 20, 24, 0.95) for tooltips
 * 
 * NOTES:
 * - All charts use Inter font for labels, JetBrains Mono for data values
 * - Chart animations use easeInOutQuart easing
 * - Tooltips have custom styling with marketing red borders
 * - Annotations support enter/leave events for hover-triggered labels
 * ═══════════════════════════════════════════════════════════════════════════════
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
                fill: true,
                pointRadius: 5,
                pointHoverRadius: 7
            },
            {
                label: 'Units Sold',
                data: [0, 43, 79, 22, 12, 3, 0],
                borderColor: '#ffa502',
                backgroundColor: 'rgba(255, 165, 2, 0.1)',
                yAxisID: 'y1',
                tension: 0.4,
                fill: true,
                pointRadius: 5,
                pointHoverRadius: 7
            }
        ]
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
                        font: { size: 14, family: 'Inter' }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(18, 20, 24, 0.95)',
                    titleColor: '#ff4757',
                    titleFont: { size: 14, family: 'Inter', weight: '600' },
                    bodyColor: '#e7eaf0',
                    bodyFont: { size: 13, family: 'Inter' },
                    borderColor: '#ff4757',
                    borderWidth: 1,
                    padding: 12,
                    callbacks: {
                        title: function(context) {
                            return context[0].label;
                        },
                        afterBody: function(context) {
                            const index = context[0].dataIndex;
                            const videoMarkers = {
                                1: ['Jan 21: Hype 1', 'Feb 10: Hype 2', 'Feb 14: Hype 3+4'],
                                2: ['Feb 22: Repost 1 (Shop Launch)'],
                                3: ['Mar 10: Repost 2'],
                                5: ['May 3: Repost 3']
                            };
                            const videos = videoMarkers[index];
                            return videos ? ['\nVideo Posts:', ...videos] : [];
                        }
                    }
                },
                annotation: {
                    annotations: {
                        original: {
                            type: 'line',
                            xMin: 0,
                            xMax: 0,
                            borderColor: 'rgba(255, 71, 87, 0.6)',
                            borderWidth: 2,
                            borderDash: [5, 5],
                            label: {
                                display: true,
                                content: 'Original (Dec 29)',
                                position: 'start',
                                backgroundColor: 'rgba(255, 71, 87, 0.8)',
                                color: 'white',
                                font: { size: 10, family: 'Inter' }
                            }
                        },
                        hype1: {
                            type: 'line',
                            xMin: 1,
                            xMax: 1,
                            borderColor: 'rgba(255, 165, 2, 0.4)',
                            borderWidth: 1,
                            borderDash: [3, 3],
                            label: {
                                display: true,
                                content: 'Hype Videos',
                                position: 'start',
                                backgroundColor: 'rgba(255, 165, 2, 0.7)',
                                color: 'white',
                                font: { size: 9, family: 'Inter' }
                            }
                        },
                        repost1: {
                            type: 'line',
                            xMin: 2,
                            xMax: 2,
                            borderColor: 'rgba(255, 71, 87, 0.9)',
                            borderWidth: 3,
                            label: {
                                display: true,
                                content: 'Repost 1',
                                position: 'end',
                                backgroundColor: 'rgba(255, 71, 87, 0.9)',
                                color: 'white',
                                font: { size: 11, family: 'Inter', weight: 'bold' }
                            }
                        },
                        repost2: {
                            type: 'line',
                            xMin: 3,
                            xMax: 3,
                            borderColor: 'rgba(255, 71, 87, 0.8)',
                            borderWidth: 2,
                            label: {
                                display: true,
                                content: 'Repost 2',
                                position: 'end',
                                backgroundColor: 'rgba(255, 71, 87, 0.8)',
                                color: 'white',
                                font: { size: 10, family: 'Inter' }
                            }
                        },
                        repost3: {
                            type: 'line',
                            xMin: 5,
                            xMax: 5,
                            borderColor: 'rgba(255, 71, 87, 0.8)',
                            borderWidth: 2,
                            label: {
                                display: true,
                                content: 'Repost 3',
                                position: 'end',
                                backgroundColor: 'rgba(255, 71, 87, 0.8)',
                                color: 'white',
                                font: { size: 10, family: 'Inter' }
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
                        font: { family: 'Inter' }
                    }
                },
                y: {
                    type: 'linear',
                    position: 'left',
                    grid: { color: 'rgba(255, 255, 255, 0.05)' },
                    ticks: {
                        color: '#ff4757',
                        font: { family: 'JetBrains Mono' },
                        callback: function(value) {
                            return '$' + value.toFixed(0);
                        }
                    },
                    title: {
                        display: true,
                        text: 'Revenue ($)',
                        color: '#ff4757',
                        font: { family: 'Inter', weight: '600' }
                    }
                },
                y1: {
                    type: 'linear',
                    position: 'right',
                    grid: { drawOnChartArea: false },
                    ticks: {
                        color: '#ffa502',
                        font: { family: 'JetBrains Mono' },
                        callback: function(value) {
                            return value + ' units';
                        }
                    },
                    title: {
                        display: true,
                        text: 'Units Sold',
                        color: '#ffa502',
                        font: { family: 'Inter', weight: '600' }
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
                    data: [2.5, 13.1],
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
                    labels: { 
                        color: '#e7eaf0', 
                        font: { size: 14, family: 'Inter' }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(18, 20, 24, 0.95)',
                    titleColor: '#ff4757',
                    titleFont: { size: 14, family: 'Inter', weight: '600' },
                    bodyColor: '#e7eaf0',
                    bodyFont: { size: 13, family: 'Inter' },
                    borderColor: '#ff4757',
                    borderWidth: 1,
                    padding: 12,
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
                    ticks: { 
                        color: '#8b919d', 
                        font: { size: 14, family: 'Inter' }
                    }
                },
                y: {
                    stacked: true,
                    grid: { color: 'rgba(255, 255, 255, 0.05)' },
                    ticks: {
                        color: '#ff4757',
                        font: { family: 'JetBrains Mono' },
                        callback: function(value) {
                            return value + '%';
                        }
                    },
                    title: {
                        display: true,
                        text: 'Engagement Rate (%)',
                        color: '#ff4757',
                        font: { family: 'Inter', weight: '600' }
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
// #COCOTOK TOP 5 PERFORMERS (UPDATED)
// ================================

function initCocotokTop5Chart() {
    const ctx = document.getElementById('cocotokTop5Chart');
    if (!ctx) return;

    // Updated top 5 data for recruiter impact
    const top5Data = [
        { views: 1600000, likes: 391200, comments: 1337, saves: 22100, shares: 1209, er: 25.99 },
        { views: 1800000, likes: 297600, comments: 3700, saves: 9000, shares: 1622, er: 17.33 },
        { views: 240000, likes: 48000, comments: 148, saves: 1070, shares: 96, er: 20.55 },
        { views: 140000, likes: 23100, comments: 57, saves: 556, shares: 14, er: 16.95 },
        { views: 120000, likes: 19300, comments: 338, saves: 279, shares: 123, er: 16.70 }
    ];

    const labels = [
        'Video 1\n(1.6M)',
        'Video 2\n(1.8M)', 
        'Video 3\n(240K)',
        'Video 4\n(140K)',
        'Video 5\n(120K)'
    ];

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
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
                    labels: { 
                        color: '#e7eaf0', 
                        font: { size: 14, family: 'Inter' }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(18, 20, 24, 0.95)',
                    titleColor: '#ff4757',
                    titleFont: { size: 14, family: 'Inter', weight: '600' },
                    bodyColor: '#e7eaf0',
                    bodyFont: { size: 13, family: 'Inter' },
                    borderColor: '#ff4757',
                    borderWidth: 1,
                    padding: 12,
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
                        font: { family: 'JetBrains Mono' },
                        callback: function(value) {
                            return value + '%';
                        }
                    },
                    title: {
                        display: true,
                        text: 'Engagement Rate (%)',
                        color: '#ff4757',
                        font: { family: 'Inter', weight: '600' }
                    }
                },
                y: {
                    stacked: true,
                    grid: { color: 'rgba(255, 255, 255, 0.05)' },
                    ticks: { 
                        color: '#8b919d',
                        font: { family: 'Inter' }
                    }
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
// #COCOTOK GROWTH TRAJECTORY (UPDATED WITH SHARP TURNS)
// ================================

function initCocotokGrowthChart() {
    const ctx = document.getElementById('cocotokGrowthChart');
    if (!ctx) return;

    // Updated data with sharp phase transitions
    const growthData = {
        labels: [
            '2022-06', '2022-07', '2022-08', '2022-09', // Phase 1
            '2022-10', '2022-11', '2022-12', // Phase 2
            '2023-01', // Phase 3 (peak)
            '2023-03', '2023-06', '2023-09', '2023-12', // Phase 4
            '2024-03', '2024-06', '2024-09'
        ],
        followers: [
            170000, 173000, 177000, 180000, // Phase 1 growth
            183000, 195000, 209000, // Phase 2 sharp rise
            213200, // Phase 3 peak
            210000, 209000, 207000, 205000, // Phase 4 gradual decay
            204000, 203000, 202000
        ]
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
                tension: 0.2, // Reduced for sharper turns
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
                    titleFont: { size: 14, family: 'Inter', weight: '600' },
                    bodyColor: '#e7eaf0',
                    bodyFont: { size: 13, family: 'Inter' },
                    borderColor: '#ff4757',
                    borderWidth: 1,
                    padding: 12,
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
                            xMax: 3,
                            backgroundColor: 'rgba(255, 71, 87, 0.08)',
                            borderWidth: 0,
                            label: {
                                display: true,
                                content: 'Phase 1',
                                position: 'center',
                                color: '#ff4757',
                                font: { size: 12, weight: 'bold', family: 'Inter' }
                            }
                        },
                        phase2: {
                            type: 'box',
                            xMin: 3,
                            xMax: 6,
                            backgroundColor: 'rgba(255, 107, 122, 0.08)',
                            borderWidth: 0,
                            label: {
                                display: true,
                                content: 'Phase 2',
                                position: 'center',
                                color: '#ff6b7a',
                                font: { size: 12, weight: 'bold', family: 'Inter' }
                            }
                        },
                        phase3: {
                            type: 'box',
                            xMin: 6,
                            xMax: 7,
                            backgroundColor: 'rgba(255, 165, 2, 0.12)',
                            borderWidth: 0,
                            label: {
                                display: true,
                                content: 'Phase 3',
                                position: 'center',
                                color: '#ffa502',
                                font: { size: 12, weight: 'bold', family: 'Inter' }
                            }
                        },
                        phase4: {
                            type: 'box',
                            xMin: 7,
                            xMax: 14,
                            backgroundColor: 'rgba(139, 145, 157, 0.08)',
                            borderWidth: 0,
                            label: {
                                display: true,
                                content: 'Phase 4',
                                position: 'center',
                                color: '#8b919d',
                                font: { size: 12, weight: 'bold', family: 'Inter' }
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
                        font: { family: 'Inter' },
                        callback: function(value, index) {
                            const date = this.getLabelForValue(value);
                            const [year, month] = date.split('-');
                            const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                            // Show fewer labels on mobile
                            if (window.innerWidth < 768 && index % 2 !== 0) return '';
                            return monthNames[parseInt(month) - 1] + ' ' + year.slice(2);
                        }
                    }
                },
                y: {
                    grid: { color: 'rgba(255, 255, 255, 0.05)' },
                    ticks: {
                        color: '#ff4757',
                        font: { family: 'JetBrains Mono' },
                        callback: function(value) {
                            return (value / 1000) + 'K';
                        }
                    },
                    title: {
                        display: true,
                        text: 'Followers',
                        color: '#ff4757',
                        font: { family: 'Inter', weight: '600' }
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
// UNM GROWTH CHART (UPDATED WITH 10K BASELINE)
// ================================

function initUnmGrowthChart() {
    const ctx = document.getElementById('unmGrowthChart');
    if (!ctx) return;

    // Updated data showing growth from 10K baseline
    const unmData = {
        labels: [
            '2021-07', // Hired
            '2023-01', '2023-02', '2023-03', '2023-04', 
            '2023-05', '2023-06', '2023-07', '2023-08'
        ],
        followers: [
            10000, // Starting point
            27000, 27200, 27500, 27800, 
            28100, 28400, 28700, 29233
        ]
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
                pointBorderWidth: 2,
                segment: {
                    borderDash: ctx => {
                        // Dotted line between first two points (data gap)
                        return ctx.p0DataIndex === 0 ? [5, 5] : undefined;
                    }
                }
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
                    titleFont: { size: 14, family: 'Inter', weight: '600' },
                    bodyColor: '#e7eaf0',
                    bodyFont: { size: 13, family: 'Inter' },
                    borderColor: '#ff4757',
                    borderWidth: 1,
                    padding: 12,
                    callbacks: {
                        title: function(context) {
                            const [year, month] = context[0].label.split('-');
                            const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                            return monthNames[parseInt(month) - 1] + ' ' + year;
                        },
                        label: function(context) {
                            return context.parsed.y.toLocaleString() + ' followers';
                        },
                        afterLabel: function(context) {
                            if (context.dataIndex === 0) {
                                return '(Hired - Baseline)';
                            }
                            if (context.dataIndex === 1) {
                                return '(Social Blade Tracking Begins)';
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
                        font: { family: 'Inter' },
                        callback: function(value, index) {
                            const date = this.getLabelForValue(value);
                            const [year, month] = date.split('-');
                            const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'];
                            if (index === 0) return 'Jul 2021';
                            return monthNames[parseInt(month) - 1] + ' ' + year.slice(2);
                        }
                    }
                },
                y: {
                    grid: { color: 'rgba(255, 255, 255, 0.05)' },
                    ticks: {
                        color: '#ff4757',
                        font: { family: 'JetBrains Mono' },
                        callback: function(value) {
                            return (value / 1000) + 'K';
                        }
                    },
                    title: {
                        display: true,
                        text: 'Followers',
                        color: '#ff4757',
                        font: { family: 'Inter', weight: '600' }
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
        initAbTestSlideshow();
        setupScrollAnimations();
    });
} else {
    initAllCharts();
    initCarousel();
    initModals();
    initAbTestSlideshow();
    setupScrollAnimations();
}

// ================================
// NESTED A/B TEST SLIDESHOW
// ================================

function initAbTestSlideshow() {
    const slides = document.querySelectorAll('.ab-test-slide');
    const indicators = document.querySelectorAll('.ab-indicator');
    const prevBtn = document.querySelector('.ab-control.prev');
    const nextBtn = document.querySelector('.ab-control.next');
    
    if (!slides.length) return;
    
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
    
    prevBtn?.addEventListener('click', prevSlide);
    nextBtn?.addEventListener('click', nextSlide);
    
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => showSlide(index));
    });
    
    // Touch swipe support
    let touchStartX = 0;
    let touchEndX = 0;
    
    const slideshow = document.querySelector('.ab-test-slideshow');
    if (slideshow) {
        slideshow.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        slideshow.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            if (touchStartX - touchEndX > 50) nextSlide();
            if (touchEndX - touchStartX > 50) prevSlide();
        });
    }
}

console.log('📊 Marketing Intelligence Charts Loaded - v2.1');
console.log('🔥 Nested A/B slideshow initialized');