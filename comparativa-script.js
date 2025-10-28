// ============================================
// DATOS DE LOS JUEGOS
// ============================================

const games = [
    { name: 'BLACK MYTH: WUKONG', rating: 95, reviews: 1500000, players: 1000000, price: 59.99, achievements: 50 },
    { name: 'ELDEN RING', rating: 91, reviews: 680000, players: 953426, price: 59.99, achievements: 42 },
    { name: 'HELLDIVERS 2', rating: 87, reviews: 720000, players: 489000, price: 39.99, achievements: 35 },
    { name: 'PHASMOPHOBIA', rating: 94, reviews: 570000, players: 80000, price: 13.99, achievements: 15 },
    { name: 'BALDUR\'S GATE 3', rating: 96, reviews: 600000, players: 300000, price: 59.99, achievements: 75 },
    { name: 'CYBERPUNK 2077', rating: 82, reviews: 660000, players: 250000, price: 59.99, achievements: 45 }
];

const colors = ['#ff6384', '#36a2eb', '#ffce56', '#4bc0c0', '#9966ff', '#ff9f40'];
const borderColors = ['#ff6384', '#36a2eb', '#ffce56', '#4bc0c0', '#9966ff', '#ff9f40'];

// ============================================
// GRÁFICO DE RATING Y RESEÑAS
// ============================================

const ratingCtx = document.getElementById('ratingChart').getContext('2d');
new Chart(ratingCtx, {
    type: 'bar',
    data: {
        labels: games.map(g => g.name.split(':')[0]),
        datasets: [{
            label: 'Rating (%)',
            data: games.map(g => g.rating),
            backgroundColor: colors,
            borderColor: borderColors,
            borderWidth: 2
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { 
                display: true,
                labels: { color: '#fff' }
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        return `Rating: ${context.raw}%`;
                    }
                }
            }
        },
        scales: {
            y: { 
                beginAtZero: true,
                max: 100,
                ticks: { color: '#fff' },
                grid: { color: 'rgba(255,255,255,0.1)' }
            },
            x: {
                ticks: { 
                    color: '#fff',
                    maxRotation: 45,
                    minRotation: 45
                },
                grid: { color: 'rgba(255,255,255,0.1)' }
            }
        }
    }
});

// ============================================
// GRÁFICO DE JUGADORES
// ============================================

const playersCtx = document.getElementById('playersChart').getContext('2d');
new Chart(playersCtx, {
    type: 'bar',
    data: {
        labels: games.map(g => g.name.split(':')[0]),
        datasets: [{
            label: 'Jugadores Máximos',
            data: games.map(g => g.players),
            backgroundColor: colors,
            borderColor: borderColors,
            borderWidth: 2
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { 
                display: true,
                labels: { color: '#fff' }
            }
        },
        scales: {
            y: { 
                beginAtZero: true,
                ticks: { 
                    color: '#fff',
                    callback: function(value) {
                        return value >= 1000000 ? (value/1000000).toFixed(1) + 'M' : 
                               value >= 1000 ? (value/1000).toFixed(0) + 'K' : value;
                    }
                },
                grid: { color: 'rgba(255,255,255,0.1)' }
            },
            x: {
                ticks: { 
                    color: '#fff',
                    maxRotation: 45,
                    minRotation: 45
                },
                grid: { color: 'rgba(255,255,255,0.1)' }
            }
        }
    }
});

// ============================================
// GRÁFICO DE PRECIOS (PIE)
// ============================================

const priceCtx = document.getElementById('priceChart').getContext('2d');
new Chart(priceCtx, {
    type: 'pie',
    data: {
        labels: games.map(g => g.name.split(':')[0]),
        datasets: [{
            data: games.map(g => g.price),
            backgroundColor: colors,
            borderColor: borderColors,
            borderWidth: 2
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom',
                labels: { 
                    color: '#fff',
                    padding: 15,
                    font: { size: 11 }
                }
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        return `${context.label}: $${context.raw}`;
                    }
                }
            }
        }
    }
});

// ============================================
// GRÁFICO DE RADAR
// ============================================

const radarCtx = document.getElementById('radarChart').getContext('2d');
new Chart(radarCtx, {
    type: 'radar',
    data: {
        labels: ['Rating', 'Reseñas', 'Jugadores', 'Precio', 'Logros'],
        datasets: games.map((game, i) => ({
            label: game.name.split(':')[0],
            data: [
                game.rating,
                game.reviews / 20000,
                game.players / 20000,
                game.price * 1.5,
                game.achievements
            ],
            backgroundColor: colors[i].replace(')', ', 0.2)').replace('rgb', 'rgba'),
            borderColor: colors[i],
            borderWidth: 2,
            pointBackgroundColor: colors[i],
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: colors[i]
        }))
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            r: {
                angleLines: { color: 'rgba(255,255,255,0.2)' },
                grid: { color: 'rgba(255,255,255,0.2)' },
                pointLabels: { 
                    color: '#fff',
                    font: { size: 12 }
                },
                ticks: { 
                    color: '#fff',
                    backdropColor: 'transparent'
                }
            }
        },
        plugins: {
            legend: {
                labels: { 
                    color: '#fff',
                    padding: 10,
                    font: { size: 10 }
                }
            }
        }
    }
});
