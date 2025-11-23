/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * Marketing Intelligence Charts & Interactive Data Visualizations
 * Author: Nehemiah Cionelo
 * Last Updated: 2024-11-23
 * Version: 2.2.0
 * 
 * CHANGELOG:
 * - Combined engagement charts into single unified visualization
 * - Rebuilt TikTok growth chart with complete timeline (May 2020 - May 2025)
 * - Added toggleable monthly gains overlay (Nov 2021 - Jan 2023)
 * - Implemented dotted line styling for pre-Social Blade data
 * - Fixed A/B testing layout (removed nested slideshow)
 * - Updated phase annotations for recruiter-focused narrative
 * 
 * DEPENDENCIES:
 * - Chart.js v4.4.0 (must be loaded via CDN in HTML)
 * - chartjs-plugin-annotation v3.0.1 (must be loaded via CDN in HTML)
 * 
 * CHARTS INCLUDED:
 * 1. salesChart - "Hang the Degree" revenue & units sold (dual-axis line chart)
 * 2. cocotokEngagementChart - Combined engagement vs industry with Top 5 breakdown
 * 3. cocotokGrowthChart - Complete follower growth trajectory with toggleable monthly gains
 * 4. unmGrowthChart - UNM Instagram growth (line chart with data gap notation)
 * 
 * INTERACTIVE FEATURES:
 * - Main carousel system (initCarousel)
 * - Modal system for detailed video metrics (initModals)
 * - Scroll-triggered chart animations (setupScrollAnimations)
 * - Toggleable dataset for monthly gains overlay
 * - Hover-triggered annotation labels on sales chart
 * 
 * INITIALIZATION:
 * All charts and interactive elements initialize on DOMContentLoaded or immediately
 * if document is already loaded. Call order:
 * 1. initAllCharts()
 * 2. initCarousel()
 * 3. initModals()
 * 4. setupScrollAnimations()
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
// COMBINED ENGAGEMENT CHART
// ================================

function initCocotokEngagementChart() {
    const ctx = document.getElementById('cocotokEngagementChart');
    if (!ctx) return;

    // Top 5 videos data for showing variability
    const top5Data = [
        { video: 'Video 1\n(1.6M views)', likes: 24.45, saves: 1.38, comments: 0.08, shares: 0.08, total: 25.99 },
        { video: 'Video 2\n(1.8M views)', likes: 16.53, saves: 0.5, comments: 0.21, shares: 0.09, total: 17.33 },
        { video: 'Video 3\n(240K views)', likes: 20.0, saves: 0.45, comments: 0.06, shares: 0.04, total: 20.55 },
        { video: 'Video 4\n(140K views)', likes: 16.5, saves: 0.4, comments: 0.04, shares: 0.01, total: 16.95 },
        { video: 'Video 5\n(120K views)', likes: 16.08, saves: 0.23, comments: 0.28, shares: 0.10, total: 16.70 }
    ];

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Industry Avg', ...top5Data.map(v => v.video)],
            datasets: [
                {
                    label: 'Likes',
                    data: [2.5, ...top5Data.map(v => v.likes)],
                    backgroundColor: 'rgba(255, 71, 87, 0.8)',
                    stack: 'Stack 0'
                },
                {
                    label: 'Saves',
                    data: [1.0, ...top5Data.map(v => v.saves)],
                    backgroundColor: 'rgba(255, 107, 122, 0.8)',
                    stack: 'Stack 0'
                },
                {
                    label: 'Comments',
                    data: [0.8, ...top5Data.map(v => v.comments)],
                    backgroundColor: 'rgba(255, 139, 148, 0.8)',
                    stack: 'Stack 0'
                },
                {
                    label: 'Shares',
                    data: [0.7, ...top5Data.map(v => v.shares)],
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
                title: {
                    display: true,
                    text: 'Engagement Performance: Industry vs. Top 5 Videos',
                    color: '#ff4757',
                    font: { size: 16, family: 'Inter', weight: '600' },
                    padding: { bottom: 20 }
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
                        font: { size: 12, family: 'Inter' }
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
                        delay = context.dataIndex * 150;
                    }
                    return delay;
                }
            }
        }
    });
}

// ================================
// #COCOTOK GROWTH TRAJECTORY (COMPLETE TIMELINE)
// ================================

let cocotokGrowthChartInstance = null;

function initCocotokGrowthChart() {
    const ctx = document.getElementById('cocotokGrowthChart');
    if (!ctx) return;

    // Complete timeline data (May 2020 - May 2025)
    const growthData = {
        labels: [
            '2020-05', '2020-12', // Genesis
            '2021-03', '2021-06', '2021-07', '2021-08', '2021-09', '2021-10', '2021-11', // CocoTok 1.0 & Pivot
            '2021-12', '2022-01', '2022-02', '2022-03', '2022-04', '2022-05', // Plateau & Breakout
            '2023-01', // Peak
            '2023-05', '2023-08', '2023-12', '2024-05', '2024-08', '2024-12', '2025-05' // Retention
        ],
        followers: [
            1000, 3000, // Genesis (dotted)
            15000, 80000, 80000, 80000, 100000, 176800, 176800, // CocoTok 1.0 & Pivot (dotted until Nov 2021)
            172300, 178600, 179000, 187400, 203100, 203100, // Plateau & Breakout (solid line starts)
            213200, // Peak
            212100, 211000, 209500, 207200, 206000, 204000, 202200 // Retention
        ]
    };

    // Monthly gains overlay data (Nov 2021 - Jan 2023)
    const monthlyGainsData = {
        labels: [
            '2021-11', '2021-12', '2022-01', '2022-02', '2022-03', '2022-04', '2022-05',
            '2022-06', '2022-07', '2022-08', '2022-09', '2022-10', '2022-11', '2022-12', '2023-01'
        ],
        gains: [
            0, -4500, 6300, 400, 8400, 15700, 0,
            0, 0, 0, 0, 0, 0, 0, 10100
        ]
    };

    cocotokGrowthChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: growthData.labels,
            datasets: [
                {
                    label: 'Total Followers',
                    data: growthData.followers,
                    borderColor: '#ff4757',
                    backgroundColor: 'rgba(255, 71, 87, 0.1)',
                    tension: 0.3,
                    fill: true,
                    pointRadius: 4,
                    pointHoverRadius: 6,
                    pointBackgroundColor: '#ff4757',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    segment: {
                        borderDash: ctx => {
                            // Dotted line for data before Nov 2021 (index 9)
                            return ctx.p0DataIndex < 9 ? [5, 5] : undefined;
                        }
                    }
                },
                {
                    label: 'Monthly Gains',
                    data: monthlyGainsData.labels.map(label => {
                        const index = growthData.labels.indexOf(label);
                        return index !== -1 ? growthData.followers[index] : null;
                    }),
                    borderColor: 'rgba(101, 178, 255, 0.7)',
                    backgroundColor: 'rgba(101, 178, 255, 0.1)',
                    tension: 0.3,
                    fill: false,
                    pointRadius: 5,
                    pointHoverRadius: 7,
                    pointBackgroundColor: 'rgba(101, 178, 255, 0.9)',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    hidden: true, // Hidden by default, toggleable via legend
                    yAxisID: 'y'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                mode: 'index',
                intersect: false
            },
            plugins: {
                legend: {
                    labels: {
                        color: '#e7eaf0',
                        font: { size: 14, family: 'Inter' },
                        usePointStyle: true,
                        padding: 15
                    },
                    onClick: function(e, legendItem, legend) {
                        const index = legendItem.datasetIndex;
                        const ci = legend.chart;
                        const meta = ci.getDatasetMeta(index);
                        meta.hidden = meta.hidden === null ? !ci.data.datasets[index].hidden : null;
                        ci.update();
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
                        label: function(context) {
                            const label = context.dataset.label || '';
                            const value = context.parsed.y;
                            
                            if (context.datasetIndex === 1) {
                                // Monthly gains dataset
                                const monthLabel = context.label;
                                const gainIndex = monthlyGainsData.labels.indexOf(monthLabel);
                                if (gainIndex !== -1) {
                                    const gain = monthlyGainsData.gains[gainIndex];
                                    return [
                                        label + ': ' + value.toLocaleString() + ' followers',
                                        'Monthly Change: ' + (gain >= 0 ? '+' : '') + gain.toLocaleString()
                                    ];
                                }
                            }
                            
                            return label + ': ' + value.toLocaleString() + ' followers';
                        }
                    }
                },
                annotation: {
                    annotations: {
                        genesis: {
                            type: 'box',
                            xMin: 0,
                            xMax: 1,
                            backgroundColor: 'rgba(139, 145, 157, 0.08)',
                            borderWidth: 0,
                            label: {
                                display: true,
                                content: 'Genesis',
                                position: 'center',
                                color: '#8b919d',
                                font: { size: 11, weight: 'bold', family: 'Inter' }
                            }
                        },
                        cocotok1: {
                            type: 'box',
                            xMin: 2,
                            xMax: 5,
                            backgroundColor: 'rgba(255, 71, 87, 0.08)',
                            borderWidth: 0,
                            label: {
                                display: true,
                                content: 'CocoTok 1.0\n(77K gain)',
                                position: 'center',
                                color: '#ff4757',
                                font: { size: 11, weight: 'bold', family: 'Inter' }
                            }
                        },
                        pivot1: {
                            type: 'box',
                            xMin: 5,
                            xMax: 8,
                            backgroundColor: 'rgba(255, 107, 122, 0.08)',
                            borderWidth: 0,
                            label: {
                                display: true,
                                content: 'Pivot\n(CocoTok 2.0)',
                                position: 'center',
                                color: '#ff6b7a',
                                font: { size: 11, weight: 'bold', family: 'Inter' }
                            }
                        },
                        plateau: {
                            type: 'box',
                            xMin: 9,
                            xMax: 12,
                            backgroundColor: 'rgba(255, 214, 102, 0.08)',
                            borderWidth: 0,
                            label: {
                                display: true,
                                content: 'Plateau',
                                position: 'center',
                                color: '#ffd666',
                                font: { size: 11, weight: 'bold', family: 'Inter' }
                            }
                        },
                        cocotok3: {
                            type: 'box',
                            xMin: 12,
                            xMax: 16,
                            backgroundColor: 'rgba(255, 165, 2, 0.1)',
                            borderWidth: 0,
                            label: {
                                display: true,
                                content: 'CocoTok 3.0\n(34K to peak)',
                                position: 'center',
                                color: '#ffa502',
                                font: { size: 11, weight: 'bold', family: 'Inter' }
                            }
                        },
                        retention: {
                            type: 'box',
                            xMin: 16,
                            xMax: 23,
                            backgroundColor: 'rgba(92, 224, 163, 0.08)',
                            borderWidth: 0,
                            label: {
                                display: true,
                                content: 'Retention\n(95% maintained)',
                                position: 'center',
                                color: '#5ce0a3',
                                font: { size: 11, weight: 'bold', family: 'Inter' }
                            }
                        },
                        socialBlade: {
                            type: 'line',
                            xMin: 9,
                            xMax: 9,
                            borderColor: 'rgba(101, 178, 255, 0.6)',
                            borderWidth: 2,
                            borderDash: [3, 3],
                            label: {
                                display: true,
                                content: 'Social Blade tracking begins',
                                position: 'start',
                                backgroundColor: 'rgba(101, 178, 255, 0.8)',
                                color: 'white',
                                font: { size: 9, family: 'Inter' }
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
                            if (window.innerWidth < 768) {
                                if (index % 3 !== 0) return '';
                            }
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
                        text: 'Total Followers',
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

console.log('📊 Marketing Intelligence Charts Loaded - v2.2');
console.log('✅ Combined engagement chart initialized');
console.log('✅ Complete TikTok growth timeline with toggleable overlay');