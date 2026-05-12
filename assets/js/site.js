const scrollProgress = document.querySelector('#scrollProgress');
    const header = document.querySelector('#header');
    const menuBtn = document.querySelector('#menuBtn');
    const navLinks = document.querySelector('#navLinks');

    function applyAOS(selector, animation, options = {}) {
      const {
        delay = 0,
        stagger = 0,
        duration,
        easing,
        offset,
        anchorPlacement,
        once,
        mirror
      } = options;

      document.querySelectorAll(selector).forEach((element, index) => {
        if (!element.hasAttribute('data-aos')) {
          element.setAttribute('data-aos', animation);
        }
        const finalDelay = delay + (stagger * index);
        if (finalDelay) element.setAttribute('data-aos-delay', String(finalDelay));
        if (duration) element.setAttribute('data-aos-duration', String(duration));
        if (easing) element.setAttribute('data-aos-easing', easing);
        if (offset) element.setAttribute('data-aos-offset', String(offset));
        if (anchorPlacement) element.setAttribute('data-aos-anchor-placement', anchorPlacement);
        if (typeof once === 'boolean') element.setAttribute('data-aos-once', String(once));
        if (typeof mirror === 'boolean') element.setAttribute('data-aos-mirror', String(mirror));
      });
    }

    function applyElegantAOS() {
      applyAOS('.hero .hero-badge', 'fade-down', { duration: 700, offset: 0, once: true });
      applyAOS('.hero h1', 'fade-up', { duration: 900, offset: 0, delay: 70, once: true });
      applyAOS('.hero .hero-date', 'soft-fade', { duration: 650, delay: 130, offset: 0, once: true });
      applyAOS('.hero .hero-copy', 'soft-fade', { duration: 700, delay: 180, offset: 0, once: true });
      applyAOS('.hero .hero-tagline', 'soft-fade', { duration: 700, delay: 240, offset: 0, once: true });
      applyAOS('.hero .hero-actions .btn', 'fade-up', { duration: 700, delay: 280, stagger: 80, offset: 0, once: true });

      applyAOS('.trust-item', 'soft-rise', { duration: 650, stagger: 90, offset: 60, once: true });
      applyAOS('.section-header', 'soft-rise', { duration: 700, offset: 90, once: true });
      applyAOS('.question-card', 'soft-rise', { duration: 650, stagger: 60, offset: 80, once: true });
      applyAOS('.questions-close', 'soft-fade', { duration: 700, offset: 80, once: true });

      applyAOS('.image-stack', 'fade-right', { duration: 800, offset: 90, once: true });
      applyAOS('.split > .reveal', 'fade-left', { duration: 800, offset: 90, once: true });
      applyAOS('.transform-card', 'soft-rise', { duration: 700, stagger: 100, offset: 90, once: true });
      applyAOS('.transform-note', 'soft-fade', { duration: 700, offset: 80, once: true });

      applyAOS('.experience-card', 'soft-rise', { duration: 700, stagger: 80, offset: 90, once: true });
      applyAOS('.location-band', 'zoom-in', { duration: 850, offset: 90, once: true });
      applyAOS('.guide-photo', 'fade-right', { duration: 850, offset: 90, once: true });
      applyAOS('.guide-card > div:last-child', 'fade-left', { duration: 850, offset: 90, once: true });

      applyAOS('.tabs', 'soft-fade', { duration: 650, offset: 80, once: true });
      applyAOS('.panels', 'soft-rise', { duration: 700, offset: 80, once: true });
      applyAOS('.note-box', 'soft-fade', { duration: 650, offset: 70, once: true });

      applyAOS('.price-card', 'fade-right', { duration: 800, offset: 90, once: true });
      applyAOS('.side-card', 'fade-left', { duration: 800, offset: 90, once: true });
      applyAOS('.faq-item', 'soft-fade', { duration: 600, stagger: 45, offset: 70, once: true });
      applyAOS('.final .container', 'zoom-in-up', { duration: 900, offset: 100, once: true });
      applyAOS('.footer-main > *', 'soft-fade', { duration: 650, stagger: 70, offset: 60, once: true });
      applyAOS('.footer-bottom', 'soft-fade', { duration: 650, offset: 40, once: true });

      applyAOS('.reveal', 'soft-rise', { duration: 700, offset: 85, once: true });
    }

    applyElegantAOS();

    if (window.AOS) {
      AOS.init({
        disable: false,
        startEvent: 'DOMContentLoaded',
        initClassName: 'aos-init',
        animatedClassName: 'aos-animate',
        useClassNames: false,
        disableMutationObserver: false,
        debounceDelay: 50,
        throttleDelay: 99,
        offset: 90,
        delay: 0,
        duration: 700,
        easing: 'ease-out-cubic',
        once: true,
        mirror: false,
        anchorPlacement: 'top-bottom'
      });
    }

    function updateScrollUI() {
      header.classList.toggle('is-scrolled', window.scrollY > 24);
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0;
      scrollProgress.style.width = `${progress}%`;
    }
    updateScrollUI();
    window.addEventListener('scroll', updateScrollUI, { passive: true });

    menuBtn.addEventListener('click', () => {
      const open = navLinks.classList.toggle('is-open');
      menuBtn.classList.toggle('is-open', open);
      menuBtn.setAttribute('aria-expanded', String(open));
      document.body.style.overflow = open ? 'hidden' : '';
    });

    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('is-open');
        menuBtn.classList.remove('is-open');
        menuBtn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    document.querySelectorAll('[data-scroll]').forEach((button) => {
      button.addEventListener('click', () => {
        document.querySelector(button.dataset.scroll)?.scrollIntoView({ behavior: 'smooth' });
      });
    });

    const tabs = document.querySelectorAll('.tab');
    const panels = document.querySelectorAll('.panel');
    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        const index = Number(tab.dataset.tab);
        tabs.forEach((item) => item.classList.remove('is-active'));
        panels.forEach((panel) => panel.classList.remove('is-active'));
        tab.classList.add('is-active');
        panels[index].classList.add('is-active');
        if (window.AOS) AOS.refresh();
      });
    });

    document.querySelectorAll('.faq-item').forEach((item) => {
      const button = item.querySelector('.faq-q');
      const answer = item.querySelector('.faq-a');
      button.addEventListener('click', () => {
        const open = item.classList.toggle('is-open');
        answer.style.maxHeight = open ? `${answer.scrollHeight}px` : '0px';
        if (window.AOS) AOS.refresh();
      });
    });
