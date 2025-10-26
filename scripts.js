const gameSlides = document.querySelectorAll('.game-slide');
const dots = document.querySelectorAll('.dot');
const container = document.querySelector('.game-container');

let currentSlide = 0;
let isScrolling = false;
let scrollTimeout;

// Tiempo mínimo entre cambios de slide (en milisegundos)
const SCROLL_DELAY = 1000; // Aumenta este valor para más tiempo entre slides
let lastScrollTime = 0;

function updateActiveIndicator(index) {
    dots.forEach(dot => dot.classList.remove('active'));
    dots[index].classList.add('active');
    
    gameSlides.forEach(slide => slide.classList.remove('active'));
    gameSlides[index].classList.add('active');
}

// Función throttle mejorada
function throttle(func, delay) {
    let lastCall = 0;
    return function(...args) {
        const now = Date.now();
        if (now - lastCall < delay) {
            return;
        }
        lastCall = now;
        return func(...args);
    };
}

// Scroll handler con debounce aumentado
function handleScroll() {
    clearTimeout(scrollTimeout);
    
    scrollTimeout = setTimeout(() => {
        const scrollPosition = container.scrollTop;
        const slideHeight = window.innerHeight;
        const newSlide = Math.round(scrollPosition / slideHeight);
        
        if (newSlide !== currentSlide && newSlide >= 0 && newSlide < gameSlides.length) {
            currentSlide = newSlide;
            updateActiveIndicator(currentSlide);
        }
        
        isScrolling = false;
    }, ); // Aumentado de 100ms a 300ms
}

// Navegación controlada con delay
function navigateToSlide(index) {
    const now = Date.now();
    
    // Prevenir cambios demasiado rápidos
    if (now - lastScrollTime < SCROLL_DELAY) {
        return;
    }
    
    lastScrollTime = now;
    currentSlide = index;
    
    container.scrollTo({
        top: index * window.innerHeight,
        behavior: 'smooth'
    });
    
    updateActiveIndicator(index);
}

// Click en dots con delay
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        navigateToSlide(index);
    });
});

// Scroll con throttle
const throttledScroll = throttle(handleScroll, 150);
container.addEventListener('scroll', throttledScroll);

// Navegación con teclado con delay
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown' && currentSlide < gameSlides.length - 1) {
        e.preventDefault();
        navigateToSlide(currentSlide + 1);
    } else if (e.key === 'ArrowUp' && currentSlide > 0) {
        e.preventDefault();
        navigateToSlide(currentSlide - 1);
    }
});

// Gestos táctiles mejorados con threshold más alto
let touchStartY = 0;
let touchEndY = 0;
const SWIPE_THRESHOLD = 100; // Aumentado de 50 a 100

container.addEventListener('touchstart', (e) => {
    touchStartY = e.changedTouches[0].screenY;
}, { passive: true });

container.addEventListener('touchend', (e) => {
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
}, { passive: true });

function handleSwipe() {
    const diff = touchStartY - touchEndY;
    const now = Date.now();
    
    // Verificar delay mínimo entre swipes
    if (now - lastScrollTime < SCROLL_DELAY) {
        return;
    }
    
    if (Math.abs(diff) > SWIPE_THRESHOLD) {
        if (diff > 0 && currentSlide < gameSlides.length - 1) {
            navigateToSlide(currentSlide + 1);
        } else if (diff < 0 && currentSlide > 0) {
            navigateToSlide(currentSlide - 1);
        }
    }
}

// Prevenir scroll con rueda mientras está en transición
container.addEventListener('wheel', (e) => {
    const now = Date.now();
    if (now - lastScrollTime < SCROLL_DELAY) {
        e.preventDefault();
    }
}, { passive: false });

// Prevenir zoom en móviles
let lastTouchEnd = 0;
document.addEventListener('touchend', (e) => {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) {
        e.preventDefault();
    }
    lastTouchEnd = now;
}, false);

// Inicialización
window.addEventListener('load', () => {
    updateActiveIndicator(0);
    gameSlides[0].classList.add('active');
});

// Observer mejorado
const observerOptions = {
    root: container,
    threshold: 0.6 // Aumentado de 0.5 a 0.6 para mayor precisión
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
