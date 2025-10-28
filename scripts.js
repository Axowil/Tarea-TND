// Inicializar gráficos cuando la sección de análisis esté visible
const analysisObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            initializeCharts();
        }
    });
}, { threshold: 0.5 });

const analysisSlide = document.getElementById('analysis');
if (analysisSlide) {
    analysisObserver.observe(analysisSlide);
}

function initializeCharts() {
    // Solo inicializar si no existen
    if (window.chartsInitialized) return;
    window.chartsInitialized = true;
    
    // Datos de los juegos
    const games = [
        { name: 'BLACK MYTH: WUKONG', rating: 95, reviews: 1500000, players: 1000000, price: 59.99, achievements: 50 },
        { name: 'ELDEN RING', rating: 91, reviews: 680000, players: 953426, price: 59.99, achievements: 42 },
        { name: 'HELLDIVERS™ 2', rating: 87, reviews: 720000, players: 489000, price: 39.99, achievements: 35 },
        { name: 'PHASMOPHOBIA', rating: 94, reviews: 570000, players: 80000, price: 13.99, achievements: 15 },
        { name: 'BALDUR\'S GATE 3', rating: 96, reviews: 600000, players: 300000, price: 59.99, achievements: 75 },
        { name: 'CYBERPUNK 2077', rating: 82, reviews: 660000, players: 250000, price: 59.99, achievements: 45 }
    ];

    const colors = ['#ff6384', '#36a2eb', '#ffce56', '#4bc0c0', '#9966ff', '#ff9f40'];
    
    // Gráfico de Rating
    new Chart(document.getElementById('ratingChart'), {
        type: 'bar',
        data: {
            labels: games.map(g => g.name.split(':')[0]),
            datasets: [{
                label: 'Rating (%)',
                data: games.map(g => g.rating),
                backgroundColor: colors,
                borderColor: colors.map(c => c.replace('0.7', '1')),
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: false }
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
                        maxRotation: 45
                    },
                    grid: { color: 'rgba(255,255,255,0.1)' }
                }
            }
        }
    });

    // Gráfico de Jugadores
    new Chart(document.getElementById('playersChart'), {
        type: 'bar',
        data: {
            labels: games.map(g => g.name.split(':')[0]),
            datasets: [{
                label: 'Jugadores Máximos',
                data: games.map(g => g.players),
                backgroundColor: colors,
                borderColor: colors.map(c => c.replace('0.7', '1')),
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: false }
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
                        maxRotation: 45
                    },
                    grid: { color: 'rgba(255,255,255,0.1)' }
                }
            }
        }
    });

    // Gráfico de Precios
    new Chart(document.getElementById('priceChart'), {
        type: 'pie',
        data: {
            labels: games.map(g => g.name.split(':')[0]),
            datasets: [{
                data: games.map(g => g.price),
                backgroundColor: colors,
                borderColor: colors.map(c => c.replace('0.7', '1')),
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: { color: '#fff' }
                }
            }
        }
    });

    // Gráfico de Radar
    new Chart(document.getElementById('radarChart'), {
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
                backgroundColor: colors[i].replace(')', ', 0.2)'),
                borderColor: colors[i],
                borderWidth: 2
            }))
        },
        options: {
            responsive: true,
            scales: {
                r: {
                    angleLines: { color: 'rgba(255,255,255,0.1)' },
                    grid: { color: 'rgba(255,255,255,0.1)' },
                    pointLabels: { color: '#fff' },
                    ticks: { 
                        color: '#fff',
                        backdropColor: 'transparent'
                    }
                }
            },
            plugins: {
                legend: {
                    labels: { color: '#fff' }
                }
            }
        }
    });
}
// Observer mejorado
const observerOptions = {
    root: container,
    threshold: 0.6
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const index = Array.from(gameSlides).indexOf(entry.target);
            if (index !== currentSlide) {
                currentSlide = index;
                updateActiveIndicator(index);
            }
        }
    });
}, observerOptions);

gameSlides.forEach(slide => {
    observer.observe(slide);
});

// Agregar animación solo cuando el slide entra en vista
const contentObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const content = entry.target.querySelector('.game-content');
            if (content && !content.classList.contains('animate-in')) {
                content.classList.add('animate-in');
            }
        }
    });
}, { threshold: 0.5 });

gameSlides.forEach(slide => {
    contentObserver.observe(slide);
});
