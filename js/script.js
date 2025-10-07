// --- FUNÇÕES GLOBAIS ---
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    navLinks.classList.toggle('mobile-active');
    mobileToggle.classList.toggle('active');
}

// --- LÓGICA PRINCIPAL DA PÁGINA ---
document.addEventListener('DOMContentLoaded', function () {

    // Scroll suave para links âncora
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetSection = document.querySelector(this.getAttribute('href'));
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
            }
        });
    });

    // Efeito de scroll no Header
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
    });

    // Adiciona estilos dinâmicos (animações, menu mobile)
    const style = document.createElement('style');
    style.textContent = `
        .nav-links.mobile-active { display: flex; flex-direction: column; position: absolute; top: 100%; left: 0; right: 0; background: white; padding: 20px 24px; border-top: 1px solid #e2e8f0; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1); gap: 20px; }
        .mobile-menu-toggle.active span:nth-child(1) { transform: rotate(45deg) translate(5px, 5px); }
        .mobile-menu-toggle.active span:nth-child(2) { opacity: 0; }
        .mobile-menu-toggle.active span:nth-child(3) { transform: rotate(-45deg) translate(7px, -6px); }
    `;
    document.head.appendChild(style);

    // LÓGICA DO CARROSSEL DE PALESTRANTES
    const sliderWrapper = document.querySelector('.slider-wrapper');
    if (sliderWrapper) {
        const slides = document.querySelectorAll('.slide');
        const prevArrow = document.querySelector('.slider-arrow.prev');
        const nextArrow = document.querySelector('.slider-arrow.next');
        const dotsContainer = document.querySelector('.slider-dots');
        
        let currentIndex = 0;
        const totalSlides = slides.length;
        const getVisibleSlides = () => window.innerWidth <= 992 ? 1 : 2;
        
        // Ajuste para criar os pontos do carrossel corretamente
        if(dotsContainer) {
            dotsContainer.innerHTML = ''; // Limpa pontos existentes
            for (let i = 0; i < totalSlides; i++) {
                const dot = document.createElement('span');
                dot.classList.add('slider-dot');
                dot.addEventListener('click', () => goToSlide(i));
                dotsContainer.appendChild(dot);
            }
        }
        const dots = dotsContainer.querySelectorAll('.slider-dot');

        function goToSlide(index) {
            const visibleSlides = getVisibleSlides();
            const maxIndex = totalSlides - visibleSlides;
            if (index > maxIndex) index = maxIndex;
            if (index < 0) index = 0;

            const slideWidth = slides[0].offsetWidth;
            sliderWrapper.style.transform = `translateX(-${index * slideWidth}px)`;
            currentIndex = index;
            updateUI();
        }

        function updateUI() {
            const visibleSlides = getVisibleSlides();
            const maxIndex = totalSlides - visibleSlides;
            prevArrow.disabled = currentIndex === 0;
            nextArrow.disabled = currentIndex >= maxIndex;
            dots.forEach((dot, index) => dot.classList.toggle('active', index === currentIndex));
        }

        nextArrow.addEventListener('click', () => goToSlide(currentIndex + 1));
        prevArrow.addEventListener('click', () => goToSlide(currentIndex - 1));
        
        goToSlide(0);
        window.addEventListener('resize', () => goToSlide(currentIndex));
    }

    // LÓGICA DO MODAL
    const modalOverlay = document.getElementById('storyModal');
    const storyButtons = document.querySelectorAll('.story-btn');

    if (modalOverlay && storyButtons.length > 0) {
        const modalCloseBtn = modalOverlay.querySelector('.modal-close-btn');
        const modalTitle = document.getElementById('modalTitle');
        const modalDate = document.getElementById('modalDate');
        const modalDescription = document.getElementById('modalDescription');

        storyButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const card = e.target.closest('.story-card');
                modalTitle.textContent = card.dataset.title;
                modalDate.textContent = card.dataset.date;
                modalDescription.textContent = card.dataset.fullDescription;
                modalOverlay.classList.add('active');
            });
        });

        const closeModal = () => modalOverlay.classList.remove('active');
        modalCloseBtn.addEventListener('click', closeModal);
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) closeModal();
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modalOverlay.classList.contains('active')) closeModal();
        });
    }

    // LÓGICA DO FAQ
    const faqItems = document.querySelectorAll('.faq-item');
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            question.addEventListener('click', () => {
                const wasActive = item.classList.contains('active');
                faqItems.forEach(otherItem => {
                    otherItem.classList.remove('active');
                });
                if(!wasActive) {
                   item.classList.add('active');
                }
            });
        });
    }
});