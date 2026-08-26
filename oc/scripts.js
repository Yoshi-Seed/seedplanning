(() => {
  'use strict';

  const documentElement = document.documentElement;
  documentElement.classList.add('js');

  // Mobile navigation
  const navToggle = document.querySelector('[data-nav-toggle]');
  const nav = document.querySelector('[data-site-nav]');

  const closeMenu = () => {
    if (!navToggle || !nav) return;
    navToggle.setAttribute('aria-expanded', 'false');
    nav.classList.remove('is-open');
    document.body.classList.remove('menu-open');
  };

  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      const open = navToggle.getAttribute('aria-expanded') !== 'true';
      navToggle.setAttribute('aria-expanded', String(open));
      nav.classList.toggle('is-open', open);
      document.body.classList.toggle('menu-open', open);
    });

    nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
    window.addEventListener('resize', () => {
      if (window.innerWidth > 980) closeMenu();
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeMenu();
    });
  }

  // Home topic switcher
  const tabList = document.querySelector('[data-topic-tabs]');
  if (tabList) {
    const tabs = Array.from(tabList.querySelectorAll('[role="tab"]'));
    const panels = Array.from(document.querySelectorAll('[role="tabpanel"]'));

    const activateTab = (tab, moveFocus = false) => {
      const targetId = tab.getAttribute('aria-controls');
      tabs.forEach((item) => {
        const active = item === tab;
        item.setAttribute('aria-selected', String(active));
        item.tabIndex = active ? 0 : -1;
      });
      panels.forEach((panel) => {
        panel.hidden = panel.id !== targetId;
      });
      if (moveFocus) tab.focus();
    };

    tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => activateTab(tab));
      tab.addEventListener('keydown', (event) => {
        const keys = ['ArrowLeft', 'ArrowRight', 'Home', 'End'];
        if (!keys.includes(event.key)) return;
        event.preventDefault();
        let nextIndex = index;
        if (event.key === 'ArrowLeft') nextIndex = (index - 1 + tabs.length) % tabs.length;
        if (event.key === 'ArrowRight') nextIndex = (index + 1) % tabs.length;
        if (event.key === 'Home') nextIndex = 0;
        if (event.key === 'End') nextIndex = tabs.length - 1;
        activateTab(tabs[nextIndex], true);
      });
    });
  }

  // Patient carousel
  const carousel = document.querySelector('[data-carousel]');
  if (carousel) {
    const viewport = carousel.querySelector('[data-carousel-viewport]');
    const track = carousel.querySelector('[data-carousel-track]');
    const cards = Array.from(carousel.querySelectorAll('[data-carousel-card]'));
    const previousButton = carousel.querySelector('[data-carousel-prev]');
    const nextButton = carousel.querySelector('[data-carousel-next]');
    const dotsContainer = carousel.querySelector('[data-carousel-dots]');
    let startIndex = 0;
    let visibleCount = 3;
    let pageStarts = [0];

    const getVisibleCount = () => {
      if (window.innerWidth < 700) return 1;
      if (window.innerWidth < 980) return 2;
      return 3;
    };

    const clampIndex = (value) => Math.max(0, Math.min(value, Math.max(0, cards.length - visibleCount)));

    const buildDots = () => {
      if (!dotsContainer) return;
      pageStarts = [];
      for (let index = 0; index < cards.length; index += visibleCount) {
        pageStarts.push(Math.min(index, Math.max(0, cards.length - visibleCount)));
      }
      pageStarts = [...new Set(pageStarts)];
      dotsContainer.innerHTML = '';
      pageStarts.forEach((pageStart, pageIndex) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'carousel-dot';
        button.setAttribute('aria-label', `患者さん紹介 ${pageIndex + 1}ページ目`);
        button.addEventListener('click', () => {
          startIndex = pageStart;
          updateCarousel();
        });
        dotsContainer.appendChild(button);
      });
    };

    const updateCarousel = () => {
      if (!track || !cards.length) return;
      startIndex = clampIndex(startIndex);
      const offset = cards[startIndex]?.offsetLeft ?? 0;
      track.style.transform = `translate3d(${-offset}px, 0, 0)`;
      if (previousButton) previousButton.disabled = startIndex <= 0;
      if (nextButton) nextButton.disabled = startIndex >= cards.length - visibleCount;
      const dots = Array.from(dotsContainer?.children ?? []);
      const activePage = pageStarts.reduce((best, pageStart, index) => {
        return Math.abs(pageStart - startIndex) < Math.abs(pageStarts[best] - startIndex) ? index : best;
      }, 0);
      dots.forEach((dot, index) => dot.setAttribute('aria-current', String(index === activePage)));
      carousel.setAttribute('aria-label', `患者さんAからFの紹介。現在 ${startIndex + 1}件目から表示中`);
    };

    const configureCarousel = () => {
      const nextVisibleCount = getVisibleCount();
      if (visibleCount !== nextVisibleCount) {
        visibleCount = nextVisibleCount;
        startIndex = clampIndex(startIndex);
      }
      carousel.style.setProperty('--carousel-visible', String(visibleCount));
      buildDots();
      requestAnimationFrame(updateCarousel);
    };

    previousButton?.addEventListener('click', () => {
      startIndex = clampIndex(startIndex - visibleCount);
      updateCarousel();
    });
    nextButton?.addEventListener('click', () => {
      startIndex = clampIndex(startIndex + visibleCount);
      updateCarousel();
    });
    viewport?.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowLeft') previousButton?.click();
      if (event.key === 'ArrowRight') nextButton?.click();
    });

    let resizeTimer = 0;
    window.addEventListener('resize', () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(configureCarousel, 120);
    });
    configureCarousel();
  }

  // Expandable patient stories
  document.querySelectorAll('[data-voice-toggle]').forEach((button) => {
    button.addEventListener('click', () => {
      const card = button.closest('[data-voice-card]');
      if (!card) return;
      const expanded = !card.classList.contains('is-expanded');
      card.classList.toggle('is-expanded', expanded);
      button.setAttribute('aria-expanded', String(expanded));
      button.textContent = expanded ? '閉じる' : '続きを読む';
    });
  });

  // Current year in footer
  document.querySelectorAll('[data-current-year]').forEach((element) => {
    element.textContent = String(new Date().getFullYear());
  });
})();
