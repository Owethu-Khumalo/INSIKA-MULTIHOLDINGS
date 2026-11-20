
/* ==========================================
   INSIKA MULTIHOLDINGS - PREMIUM INTERACTIONS
========================================== */

const reducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
).matches;

// CINEMATIC PAGE TRANSITION

const transition = document.createElement('div');
transition.id = 'page-transition';

transition.innerHTML = `
    <div class="transition-content">
        <span>IH</span>
        <div class="transition-line"></div>
        <small>INSIKA MULTIHOLDINGS</small>
    </div>
`;

document.body.appendChild(transition);

if (!reducedMotion) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            transition.classList.add('exit');
        }, 350);
    });
} else {
    transition.classList.add('exit');
}

// PAGE NAVIGATION ANIMATION

document.querySelectorAll('a[href]').forEach(link => {

    link.addEventListener('click', event => {

        const url = new URL(link.href, window.location.href);

        if (
            url.origin !== window.location.origin ||
            url.pathname === window.location.pathname ||
            link.target === '_blank' ||
            link.hasAttribute('download') ||
            link.getAttribute('href').startsWith('#')
        ) return;

        event.preventDefault();

        if (reducedMotion) {
            window.location.href = url.href;
            return;
        }

        transition.classList.remove('exit');

        setTimeout(() => {
            window.location.href = url.href;
        }, 850);

    });

});

// SCROLL REVEAL

const revealElements = document.querySelectorAll('.reveal');

if (!reducedMotion && 'IntersectionObserver' in window) {

    const observer = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target);
            }

        });

    }, {
        threshold: 0.12
    });

    revealElements.forEach(element => {
        observer.observe(element);
    });

} else {

    revealElements.forEach(element => {
        element.classList.add('show');
    });

}

// MAGNETIC BUTTON INTERACTION

if (!reducedMotion && window.matchMedia('(hover: hover)').matches) {

    document.querySelectorAll(
        '.primary-btn, .nav-button'
    ).forEach(button => {

        button.addEventListener('mousemove', event => {

            const rect = button.getBoundingClientRect();

            const x = event.clientX - rect.left - rect.width / 2;
            const y = event.clientY - rect.top - rect.height / 2;

            button.style.transform =
                `translate(${x * 0.08}px, ${y * 0.08}px)`;

        });

        button.addEventListener('mouseleave', () => {
            button.style.transform = '';
        });

    });

}

// SUBTLE PARALLAX

if (!reducedMotion) {

    const parallaxImages = document.querySelectorAll(
        '.parallax-image'
    );

    window.addEventListener('scroll', () => {

        parallaxImages.forEach(image => {

            const position = image.getBoundingClientRect();

            if (position.bottom > 0 && position.top < window.innerHeight) {

                const movement = (window.innerHeight - position.top) * 0.025;

                image.style.transform =
                    `translateY(${movement}px)`;

            }

        });

    }, { passive: true });

}
