/**
 * PREMIUM GALLERY CARDS - Interactive JavaScript
 * Handles card stack interactions and lightbox functionality
 */

class GalleryCards {
    constructor() {
        this.stacks = document.querySelectorAll('.card-stack');
        this.lightbox = null;
        this.currentIndex = 0;
        this.currentImages = [];

        if (this.stacks.length > 0) {
            this.init();
        }
    }

    init() {
        this.createLightbox();
        this.setupStacks();
        this.setupKeyboardNavigation();
    }

    createLightbox() {
        // Create lightbox elements
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
                <img class="lightbox-image" src="" alt="">
                <div class="lightbox-caption"></div>
            </div>
            <button class="lightbox-nav lightbox-next" aria-label="Next">
                <i class="fas fa-chevron-right"></i>
            </button>
            <div class="lightbox-counter"></div>
        `;
        document.body.appendChild(lightbox);
        this.lightbox = lightbox;

        // Event listeners
        lightbox.querySelector('.lightbox-close').addEventListener('click', () => this.closeLightbox());
        lightbox.querySelector('.lightbox-prev').addEventListener('click', (e) => {
            e.stopPropagation();
            this.prevImage();
        });
        lightbox.querySelector('.lightbox-next').addEventListener('click', (e) => {
            e.stopPropagation();
            this.nextImage();
        });
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                this.closeLightbox();
            }
        });
    }

    setupStacks() {
        this.stacks.forEach((stack, stackIndex) => {
            const cards = stack.querySelectorAll('.gallery-card');

            // Assign random layout if not specified
            if (!stack.dataset.layout) {
                const layouts = ['fan', 'cascade', 'deck', 'arc'];
                stack.dataset.layout = layouts[stackIndex % layouts.length];
            }

            // Click on stack to spread/collapse
            stack.addEventListener('click', (e) => {
                // If clicking on a card when spread, open lightbox
                const clickedCard = e.target.closest('.gallery-card');

                if (stack.classList.contains('spread') && clickedCard) {
                    e.stopPropagation();
                    console.log('Opening lightbox for card:', clickedCard);
                    this.openLightbox(stack, cards, Array.from(cards).indexOf(clickedCard));
                } else {
                    // Toggle spread state
                    console.log('Toggling spread state. Currently spread:', stack.classList.contains('spread'));
                    stack.classList.toggle('spread');
                }
            });

            // Add card numbers and labels
            cards.forEach((card, index) => {
                // Add number badge if not exists
                if (!card.querySelector('.card-number')) {
                    const number = document.createElement('span');
                    number.className = 'card-number';
                    number.textContent = index + 1;
                    card.appendChild(number);
                }
            });
        });
    }

    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            if (!this.lightbox.classList.contains('active')) return;

            switch (e.key) {
                case 'Escape':
                    this.closeLightbox();
                    break;
                case 'ArrowLeft':
                    this.prevImage();
                    break;
                case 'ArrowRight':
                    this.nextImage();
                    break;
            }
        });
    }

    openLightbox(stack, cards, index) {
        this.currentImages = Array.from(cards).map(card => ({
            src: card.querySelector('img').src,
            label: card.querySelector('.card-label')?.textContent || ''
        }));
        this.currentIndex = index;

        this.updateLightboxImage();
        this.lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeLightbox() {
        this.lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    updateLightboxImage() {
        const image = this.lightbox.querySelector('.lightbox-image');
        const caption = this.lightbox.querySelector('.lightbox-caption');
        const counter = this.lightbox.querySelector('.lightbox-counter');

        const current = this.currentImages[this.currentIndex];
        image.src = current.src;
        image.alt = current.label;
        caption.textContent = current.label;
        counter.textContent = `${this.currentIndex + 1} / ${this.currentImages.length}`;
    }

    prevImage() {
        this.currentIndex = (this.currentIndex - 1 + this.currentImages.length) % this.currentImages.length;
        this.updateLightboxImage();
    }

    nextImage() {
        this.currentIndex = (this.currentIndex + 1) % this.currentImages.length;
        this.updateLightboxImage();
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.galleryCards = new GalleryCards();
});
