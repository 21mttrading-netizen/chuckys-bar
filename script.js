// ============================================
// CHUCKY'S BAR — Scripts
// ============================================

// Smooth scroll (Lenis)
if (typeof Lenis !== 'undefined') {
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smooth: true,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
}

// Nav scroll effect
const nav = document.getElementById('nav');

if (nav && !nav.classList.contains('scrolled')) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
}

// Mobile menu toggle
const burger = document.getElementById('navBurger');
const mobileMenu = document.getElementById('mobileMenu');

if (burger && mobileMenu) {
    burger.addEventListener('click', () => {
        burger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    document.querySelectorAll('.mobile-link, .mobile-cta').forEach(link => {
        link.addEventListener('click', () => {
            burger.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

// Scroll reveal with stagger
const revealElements = document.querySelectorAll(
    '.section-tag, .section-title, .about-desc, .about-stats, .about-images, ' +
    '.event-card, .menu-category, .menu-page-card, .contact-info, .contact-map, ' +
    '.teaser-text, .teaser-cards, .teaser-highlights, .carousel, .menu-page-list, ' +
    '.walkthrough-header, .walkthrough-panel, .menu-teaser-grid, .gallery-header'
);

revealElements.forEach((el, i) => {
    el.classList.add('reveal');
    // Stagger siblings
    if (el.classList.contains('walkthrough-panel') || el.classList.contains('teaser-card')) {
        el.style.transitionDelay = `${i * 0.1}s`;
    }
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
});

revealElements.forEach(el => observer.observe(el));

// ============================================
// Staggered section animations
// ============================================
const animElements = document.querySelectorAll('.anim-fade, .anim-slide, .s-venue__text, .s-gallery__header, .s-contact__left, .s-contact__right, .s-contact__block');

const animObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const delay = parseInt(entry.target.dataset.delay || 0);
            setTimeout(() => {
                entry.target.classList.add('in');
            }, delay);
            animObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.15, rootMargin: '0px 0px -30px 0px' });

animElements.forEach(el => animObserver.observe(el));

// ============================================
// Counting number animation
// ============================================
const countElements = document.querySelectorAll('[data-count]');

const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            const target = parseFloat(el.dataset.count);
            const isDecimal = target % 1 !== 0;
            const isLarge = target >= 1000;
            const duration = 1500;
            const start = performance.now();

            function tick(now) {
                const elapsed = now - start;
                const progress = Math.min(elapsed / duration, 1);
                // Ease out
                const eased = 1 - Math.pow(1 - progress, 3);
                const current = eased * target;

                if (isLarge) {
                    el.textContent = (current / 1000).toFixed(1) + 'K';
                } else if (isDecimal) {
                    el.textContent = current.toFixed(1);
                } else {
                    el.textContent = Math.floor(current) + '+';
                }

                if (progress < 1) requestAnimationFrame(tick);
            }
            requestAnimationFrame(tick);
            countObserver.unobserve(el);
        }
    });
}, { threshold: 0.5 });

countElements.forEach(el => countObserver.observe(el));

// ============================================
// Events section — drunk stumble-in
// ============================================
const eventsSection = document.querySelector('.s-events');
if (eventsSection) {
    const stumbleObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('stumble-in');
                stumbleObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    stumbleObserver.observe(eventsSection);
}

// ============================================
// Menu section — zoom/blur in
// ============================================
const menuSection = document.querySelector('.s-menu');
if (menuSection) {
    const menuObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('menu-in');
                menuObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    menuObserver.observe(menuSection);
}

// ============================================
// Collage — scatter in on scroll
// ============================================
const collage = document.querySelector('.s-collage');
if (collage) {
    const collageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('collage-in');
                collageObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });
    collageObserver.observe(collage);
}

// Smooth scroll for same-page anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        const href = anchor.getAttribute('href');
        if (href === '#') return;
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ============================================
// CAROUSEL — Smooth momentum-based gallery
// ============================================
const carousel = document.getElementById('carousel');
const track = document.getElementById('carouselTrack');
const prevBtn = document.getElementById('carouselPrev');
const nextBtn = document.getElementById('carouselNext');
const dotsContainer = document.getElementById('carouselDots');

if (carousel && track) {
    const slides = track.querySelectorAll('.carousel-slide');
    let currentIndex = 0;
    let isDragging = false;
    let startX = 0;
    let startTime = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;

    function getSlideWidth() {
        return slides[0].offsetWidth + 24; // slide + gap
    }

    // Create dots
    slides.forEach((_, i) => {
        const dot = document.createElement('div');
        dot.classList.add('carousel-dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    });

    function updateSlides() {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === currentIndex);
        });
        const dots = dotsContainer.querySelectorAll('.carousel-dot');
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
    }

    function goToSlide(index, smooth = true) {
        currentIndex = Math.max(0, Math.min(index, slides.length - 1));
        const offset = -currentIndex * getSlideWidth();

        if (smooth) {
            track.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
        }

        track.style.transform = `translateX(${offset}px)`;
        prevTranslate = offset;
        currentTranslate = offset;
        updateSlides();
    }

    goToSlide(0);

    // Button controls
    if (prevBtn) prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));

    // Keyboard
    document.addEventListener('keydown', (e) => {
        if (!isElementInViewport(carousel)) return;
        if (e.key === 'ArrowLeft') goToSlide(currentIndex - 1);
        if (e.key === 'ArrowRight') goToSlide(currentIndex + 1);
    });

    // Drag with momentum
    function dragStart(e) {
        isDragging = true;
        startX = getPositionX(e);
        startTime = Date.now();
        track.style.transition = 'none';
    }

    function dragMove(e) {
        if (!isDragging) return;
        const currentX = getPositionX(e);
        const diff = currentX - startX;
        // Add resistance at edges
        const atEdge = (currentIndex === 0 && diff > 0) || (currentIndex === slides.length - 1 && diff < 0);
        const resistance = atEdge ? 0.3 : 1;
        currentTranslate = prevTranslate + diff * resistance;
        track.style.transform = `translateX(${currentTranslate}px)`;
    }

    function dragEnd() {
        if (!isDragging) return;
        isDragging = false;

        const movedBy = currentTranslate - prevTranslate;
        const elapsed = Date.now() - startTime;
        const velocity = Math.abs(movedBy / elapsed); // px per ms

        // Momentum: fast flick = lower threshold
        const threshold = velocity > 0.5 ? getSlideWidth() * 0.1 : getSlideWidth() * 0.25;

        if (movedBy < -threshold) {
            goToSlide(currentIndex + 1);
        } else if (movedBy > threshold) {
            goToSlide(currentIndex - 1);
        } else {
            goToSlide(currentIndex);
        }
    }

    function getPositionX(e) {
        return e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
    }

    // Mouse events
    carousel.addEventListener('mousedown', dragStart);
    carousel.addEventListener('mousemove', dragMove);
    carousel.addEventListener('mouseup', dragEnd);
    carousel.addEventListener('mouseleave', dragEnd);

    // Touch events
    carousel.addEventListener('touchstart', dragStart, { passive: true });
    carousel.addEventListener('touchmove', dragMove, { passive: true });
    carousel.addEventListener('touchend', dragEnd);

    // Resize
    window.addEventListener('resize', () => goToSlide(currentIndex, false));
}

function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return rect.top < window.innerHeight && rect.bottom > 0;
}

// ============================================
// Scroll-driven animations
// ============================================

// Statement text — scale + opacity based on scroll position
const statementEl = document.querySelector('.s-statement__text');
const fullImg = document.querySelector('.s-imgquote');

function lerp(start, end, t) {
    return start + (end - start) * t;
}

function getScrollProgress(el, offset = 0.5) {
    const rect = el.getBoundingClientRect();
    const windowH = window.innerHeight;
    // 0 = element just entered bottom, 1 = element passed center
    const raw = 1 - (rect.top / (windowH * offset));
    return Math.max(0, Math.min(1, raw));
}

window.addEventListener('scroll', () => {
    // Statement: zoom from 0.85 → 1, fade from 0.2 → 1
    if (statementEl) {
        const p = getScrollProgress(statementEl, 1.2);
        const scale = lerp(0.8, 1, p);
        const opacity = lerp(0.1, 1, p);
        statementEl.style.transform = `scale(${scale})`;
        statementEl.style.opacity = opacity;
    }

    // Full image: clip reveal from center
    if (fullImg) {
        const p = getScrollProgress(fullImg, 1.0);
        const clipAmount = lerp(40, 0, p); // starts clipped 40% from edges, opens to 0
        fullImg.style.clipPath = `inset(${clipAmount}% ${clipAmount * 0.5}% ${clipAmount}% ${clipAmount * 0.5}% round 8px)`;
        fullImg.style.opacity = lerp(0.3, 1, p);
    }

    // Parallax on walkthrough images
    const panels = document.querySelectorAll('.s-venue__img img');
    panels.forEach(img => {
        const rect = img.getBoundingClientRect();
        const speed = 0.08;
        const yPos = -(rect.top * speed);
        img.style.transform = `translateY(${yPos}px) scale(1.05)`;
    });
});
