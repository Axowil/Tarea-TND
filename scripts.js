// ============================================
// NAVEGACIÓN CON SCROLL SNAP
// ============================================

const container = document.querySelector('.game-container');
const gameSlides = document.querySelectorAll('.game-slide');
const dots = document.querySelectorAll('.dot');
let currentSlide = 0;

// Actualizar indicador activo
function updateActiveIndicator(index) {
    dots.forEach(dot => dot.classList.remove('active'));
    if (dots[index]) {
        dots[index].classList.add('active');
    }
}

// Navegación con clicks en los puntos
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        gameSlides[index].scrollIntoView({ behavior: 'smooth' });
        currentSlide = index;
        updateActiveIndicator(index);
    });
});

// ============================================
// OBSERVER MEJORADO CON ANIMACIONES
// ============================================

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
            
            // Agregar clase active para activar animaciones
            entry.target.classList.add('active');
            
            // Agregar animación al contenido
            const content = entry.target.querySelector('.game-content, .final-content');
            if (content && !content.classList.contains('animate-in')) {
                content.classList.add('animate-in');
            }
        } else {
            // Remover clase active cuando sale de vista
            entry.target.classList.remove('active');
        }
    });
}, observerOptions);

gameSlides.forEach(slide => {
    observer.observe(slide);
});

// Activar la primera sección al cargar
window.addEventListener('load', () => {
    gameSlides[0].classList.add('active');
    const firstContent = gameSlides[0].querySelector('.game-content');
    if (firstContent) {
        firstContent.classList.add('animate-in');
    }
});

// ============================================
// NAVEGACIÓN CON TECLADO (OPCIONAL)
// ============================================ 

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown' && currentSlide < gameSlides.length - 1) {
        currentSlide++;
        gameSlides[currentSlide].scrollIntoView({ behavior: 'smooth' });
        updateActiveIndicator(currentSlide);
    } else if (e.key === 'ArrowUp' && currentSlide > 0) {
        currentSlide--;
        gameSlides[currentSlide].scrollIntoView({ behavior: 'smooth' });
        updateActiveIndicator(currentSlide);
    }
});
