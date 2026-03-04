/* ──────────────────────── NAVBAR ──────────────────────── */
(function () {
    const nav = document.getElementById('navbar');
    const hamburger = document.querySelector('.nav-hamburger');
    const mobileMenu = document.getElementById('mobileMenu');

    window.addEventListener('scroll', () => {
        nav.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });

    hamburger.addEventListener('click', () => {
        const isOpen = hamburger.classList.toggle('open');
        mobileMenu.classList.toggle('open', isOpen);
        hamburger.setAttribute('aria-expanded', isOpen);
    });

    window.closeMobile = function () {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
    };

    // Close on outside click
    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && !mobileMenu.contains(e.target)) closeMobile();
    });
})();

/* ──────────────────────── SCROLL REVEAL ──────────────────────── */
(function () {
    const els = document.querySelectorAll('.reveal');
    if (!els.length) return;

    const io = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('visible');
                io.unobserve(e.target);
            }
        });
    }, { threshold: 0.12 });

    els.forEach(el => io.observe(el));
})();

/* ──────────────────────── COUNTER ANIMATION ──────────────────────── */
(function () {
    const counters = document.querySelectorAll('.counter');
    if (!counters.length) return;

    function animateCounter(el) {
        const target = parseInt(el.getAttribute('data-target'), 10);
        const duration = 1800;
        const start = performance.now();
        function step(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            // ease out cubic
            const ease = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.floor(ease * target);
            if (progress < 1) requestAnimationFrame(step);
            else el.textContent = target;
        }
        requestAnimationFrame(step);
    }

    const io = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                animateCounter(e.target);
                io.unobserve(e.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(c => io.observe(c));
})();

/* ──────────────────────── FAQ ACCORDION ──────────────────────── */
(function () {
    const items = document.querySelectorAll('.faq-item');
    items.forEach(item => {
        const btn = item.querySelector('.faq-question');
        const wrap = item.querySelector('.faq-answer-wrap');
        const answer = item.querySelector('.faq-answer');

        btn.addEventListener('click', () => {
            const isOpen = item.classList.contains('open');

            // close all
            items.forEach(i => {
                i.classList.remove('open');
                i.querySelector('.faq-answer-wrap').style.maxHeight = '0';
                i.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
            });

            // open clicked if it was closed
            if (!isOpen) {
                item.classList.add('open');
                wrap.style.maxHeight = answer.scrollHeight + 32 + 'px';
                btn.setAttribute('aria-expanded', 'true');
            }
        });
    });
})();

/* ──────────────────────── CONTACT FORM ──────────────────────── */
(function () {
    const form = document.getElementById('contactForm');
    const success = document.getElementById('formSuccess');
    if (!form) return;

    function showError(id, show) {
        const el = document.getElementById(id);
        const input = el && el.previousElementSibling;
        if (el) el.classList.toggle('visible', show);
        if (input) input.classList.toggle('error', show);
    }

    function validateEmail(v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let valid = true;

        const name = form.elements['name'].value.trim();
        const phone = form.elements['phone'].value.trim();
        const email = form.elements['email'].value.trim();

        showError('err-name', !name); if (!name) valid = false;
        showError('err-phone', !phone); if (!phone) valid = false;
        showError('err-email', !validateEmail(email)); if (!validateEmail(email)) valid = false;

        if (!valid) return;

        // Real submission to server
        const btn = form.querySelector('button[type=submit]');
        const originalHTML = btn.innerHTML;
        btn.textContent = 'Отправляем...';
        btn.disabled = true;

        const data = new URLSearchParams({
            name: form.elements['name'].value.trim(),
            phone: form.elements['phone'].value.trim(),
            email: form.elements['email'].value.trim(),
            message: form.elements['message'].value.trim()
        });

        fetch('/form', { method: 'POST', body: data })
            .then(r => r.json())
            .then(res => {
                if (res.ok) {
                    form.style.display = 'none';
                    success.classList.add('visible');
                } else {
                    btn.innerHTML = originalHTML;
                    btn.disabled = false;
                    alert('Ошибка при отправке. Попробуйте ещё раз.');
                }
            })
            .catch(() => {
                btn.innerHTML = originalHTML;
                btn.disabled = false;
                alert('Ошибка сети. Проверьте подключение и попробуйте снова.');
            });
    });

    // Clear error on input
    ['f-name', 'f-phone', 'f-email'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.addEventListener('input', () => {
            el.classList.remove('error');
            const errId = 'err-' + id.replace('f-', '');
            const err = document.getElementById(errId);
            if (err) err.classList.remove('visible');
        });
    });
})();

/* ──────────────────────── SMOOTH ANCHOR SCROLL ──────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (!target) return;
        e.preventDefault();
        const offset = 70;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
    });
});