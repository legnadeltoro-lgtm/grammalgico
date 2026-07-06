(function () {
    'use strict';

    function prepareStagger() {
        document.querySelectorAll('.fade-in-stagger').forEach((el, i) => {
            el.style.setProperty('--i', i + 1);
        });
    }
    prepareStagger();

    function isElementInViewport(el, offset) {
        const rect = el.getBoundingClientRect();
        return rect.top < (window.innerHeight - (offset || 100));
    }

    function revealElements() {
        document.querySelectorAll('.fade-in').forEach(el => {
            if (isElementInViewport(el, 80)) {
                el.classList.add('revealed');
            }
        });
    }

    function resetSectionAnimations(target) {
        if (!target) return;
        target.querySelectorAll('.fade-in.revealed').forEach(el => {
            el.classList.remove('revealed');
        });
        requestAnimationFrame(function () {
            requestAnimationFrame(function () {
                target.querySelectorAll('.fade-in').forEach(el => {
                    if (isElementInViewport(el, 80)) {
                        el.classList.add('revealed');
                    }
                });
            });
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                closeMobileMenu();
                setTimeout(function () { resetSectionAnimations(target); }, 400);
            }
        });
    });

    const navbar = document.getElementById('navbar');

    function updateOverlay() {
        var scrollY = window.pageYOffset;
        var windowH = window.innerHeight;
        var progress = Math.min(scrollY / (windowH * 0.6), 1);
        var eased = progress < 0.5 ? 2 * progress * progress : 1 - Math.pow(-2 * progress + 2, 2) / 2;
        var alpha = 0.05 + (eased * 0.7);
        document.documentElement.style.setProperty('--overlay-alpha', alpha);
    }

    var zoomed = false;

    window.addEventListener('scroll', function () {
        if (window.pageYOffset > 60) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        if (!zoomed && window.pageYOffset > 15) {
            zoomed = true;
            document.body.classList.add('bg-zoomed');
        }
        updateOverlay();
    }, { passive: true });

    window.addEventListener('resize', function () {
        updateOverlay();
    }, { passive: true });

    updateOverlay();

    window.addEventListener('scroll', revealElements, { passive: true });
    window.addEventListener('resize', revealElements, { passive: true });
    revealElements();

    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.createElement('div');
    mobileMenu.className = 'mobile-menu';

    const navLinks = [
        { text: 'Libros', href: '#libros' },
        { text: 'Sobre Mí', href: '#sobre-mi' },
        { text: 'Contactar', href: '#contactar' }
    ];

    navLinks.forEach(link => {
        const a = document.createElement('a');
        a.textContent = link.text;
        a.setAttribute('href', link.href);
        mobileMenu.appendChild(a);
    });

    document.body.appendChild(mobileMenu);

    hamburger.addEventListener('click', function () {
        this.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    function closeMobileMenu() {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    }

    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    /* --- EmailJS --- */
    emailjs.init('6lbairgGzunhw-8n-');

    /* --- Modern contact form --- */
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');
        const submitBtn = contactForm.querySelector('.submit-btn');

        function setError(input, hasError) {
            const group = input.closest('.form-group');
            if (hasError) {
                group.classList.add('has-error');
            } else {
                group.classList.remove('has-error');
            }
        }

        function validateField(input) {
            if (input === emailInput) {
                const val = input.value.trim();
                if (val && (!val.includes('@') || !val.includes('.'))) {
                    setError(input, true);
                    return false;
                }
            }
            if (input.hasAttribute('required')) {
                if (!input.value.trim()) {
                    setError(input, true);
                    return false;
                }
            }
            setError(input, false);
            return true;
        }

        [nameInput, emailInput, messageInput].forEach(input => {
            input.addEventListener('blur', function () {
                if (this.value.trim()) {
                    validateField(this);
                } else {
                    setError(this, false);
                }
            });

            input.addEventListener('input', function () {
                if (this.closest('.form-group').classList.contains('has-error')) {
                    validateField(this);
                }
            });
        });

        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const validName = validateField(nameInput);
            const validEmail = validateField(emailInput);
            const validMessage = validateField(messageInput);

            if (!validName || !validEmail || !validMessage) {
                return;
            }

            submitBtn.classList.add('is-sending');

            emailjs.send('service_rc0jrwh', 'template_b79qri9', {
                name: nameInput.value.trim(),
                title: emailInput.value.trim(),
                message: messageInput.value.trim(),
            }).then(function () {
                submitBtn.classList.remove('is-sending');
                submitBtn.classList.add('is-sent');

                setTimeout(function () {
                    submitBtn.classList.remove('is-sent');
                    contactForm.reset();
                    [nameInput, emailInput, messageInput].forEach(i => setError(i, false));
                }, 3000);
            }).catch(function (error) {
                console.error('EmailJS error:', error);
                submitBtn.classList.remove('is-sending');
                alert('Error al enviar. Intenta de nuevo.');
            });
        });
    }

})();