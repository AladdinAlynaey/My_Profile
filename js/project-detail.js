// ============================================
// PROJECT DETAIL PAGE - CARD FAN INTERACTION
// Fixed: No mouse following, click-only interaction
// ============================================

document.addEventListener('DOMContentLoaded', function () {
    initCardFan();
    initImagePlaceholders();
    initLightbox();
});

/**
 * Initialize the card fan interaction - CLICK ONLY (no hover spreading)
 */
function initCardFan() {
    const cardFan = document.getElementById('cardFan');
    if (!cardFan) return;

    // Click on stack to spread/collapse
    cardFan.addEventListener('click', function (e) {
        const clickedCard = e.target.closest('.card-fan-item');

        // If cards are spread and user clicks on a card, open the lightbox
        if (cardFan.classList.contains('spread') && clickedCard) {
            const img = clickedCard.querySelector('img');
            if (img && img.style.display !== 'none') {
                openLightbox(img.src, img.alt);
            }
            e.stopPropagation();
            return;
        }

        // Otherwise toggle spread state
        cardFan.classList.toggle('spread');
    });

    // Touch support for mobile - tap to toggle
    cardFan.addEventListener('touchend', function (e) {
        // Handled by click event
    }, { passive: true });
}

/**
 * Handle image loading and placeholder states
 */
function initImagePlaceholders() {
    const cards = document.querySelectorAll('.card-fan-item');

    cards.forEach(card => {
        const img = card.querySelector('img');
        if (!img) return;

        // If image loads successfully, remove placeholder class
        img.addEventListener('load', function () {
            if (this.naturalWidth > 0) {
                card.classList.remove('placeholder');
                this.style.display = 'block';
            }
        });

        // If image fails to load, keep placeholder
        img.addEventListener('error', function () {
            this.style.display = 'none';
            card.classList.add('placeholder');
        });

        // Check if image is already cached and loaded
        if (img.complete && img.naturalWidth > 0) {
            card.classList.remove('placeholder');
            img.style.display = 'block';
        }
    });
}

/**
 * Lightbox functionality for full-size image viewing
 */
let currentLightbox = null;
let currentImages = [];
let currentIndex = 0;

function initLightbox() {
    // Lightbox is initialized but clicks are handled in initCardFan
}

function openLightbox(src, alt) {
    // Collect all images from the card fan for navigation
    const cardFan = document.getElementById('cardFan');
    if (cardFan) {
        currentImages = [];
        const cards = cardFan.querySelectorAll('.card-fan-item');
        cards.forEach((card, index) => {
            const img = card.querySelector('img');
            if (img && img.style.display !== 'none') {
                currentImages.push({
                    src: img.src,
                    alt: img.alt || `Screenshot ${index + 1}`
                });
                if (img.src === src) {
                    currentIndex = currentImages.length - 1;
                }
            }
        });
    }

    const lightbox = document.createElement('div');
    lightbox.className = 'gallery-lightbox';
    lightbox.innerHTML = `
        <button class="lightbox-close" aria-label="Close">
            <i class="fas fa-times"></i>
        </button>
        <button class="lightbox-nav lightbox-prev" aria-label="Previous">
            <i class="fas fa-chevron-left"></i>
        </button>
        <div class="lightbox-content">
            <img class="lightbox-image" src="${src}" alt="${alt}">
            <div class="lightbox-caption">${alt}</div>
        </div>
        <button class="lightbox-nav lightbox-next" aria-label="Next">
            <i class="fas fa-chevron-right"></i>
        </button>
        <div class="lightbox-counter">${currentIndex + 1} / ${currentImages.length}</div>
    `;

    document.body.appendChild(lightbox);
    document.body.style.overflow = 'hidden';
    currentLightbox = lightbox;

    // Close on click
    lightbox.querySelector('.lightbox-close').addEventListener('click', () => closeLightbox(lightbox));
    lightbox.addEventListener('click', function (e) {
        if (e.target === lightbox) {
            closeLightbox(lightbox);
        }
    });

    // Navigation
    lightbox.querySelector('.lightbox-prev').addEventListener('click', (e) => {
        e.stopPropagation();
        navigateLightbox(-1);
    });
    lightbox.querySelector('.lightbox-next').addEventListener('click', (e) => {
        e.stopPropagation();
        navigateLightbox(1);
    });

    // Close on escape, navigate with arrows
    const keyHandler = function (e) {
        if (e.key === 'Escape') {
            closeLightbox(lightbox);
            document.removeEventListener('keydown', keyHandler);
        } else if (e.key === 'ArrowLeft') {
            navigateLightbox(-1);
        } else if (e.key === 'ArrowRight') {
            navigateLightbox(1);
        }
    };
    document.addEventListener('keydown', keyHandler);

    // Animate in
    requestAnimationFrame(() => {
        lightbox.classList.add('active');
    });
}

function navigateLightbox(direction) {
    if (!currentLightbox || currentImages.length === 0) return;

    currentIndex = (currentIndex + direction + currentImages.length) % currentImages.length;
    const current = currentImages[currentIndex];

    const img = currentLightbox.querySelector('.lightbox-image');
    const caption = currentLightbox.querySelector('.lightbox-caption');
    const counter = currentLightbox.querySelector('.lightbox-counter');

    img.src = current.src;
    img.alt = current.alt;
    caption.textContent = current.alt;
    counter.textContent = `${currentIndex + 1} / ${currentImages.length}`;
}

function closeLightbox(lightbox) {
    lightbox.classList.remove('active');
    setTimeout(() => {
        lightbox.remove();
        document.body.style.overflow = '';
        currentLightbox = null;
    }, 300);
}

