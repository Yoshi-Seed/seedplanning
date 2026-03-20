import { siteConfig, navigation, whySeedPanels, workAccordions, voices, factSheets, reportSummaries, teamMembers, moderators } from './data.js';

const pageSlug = document.body.dataset.page || '';
const activeSlug = pageSlug === 'fact-detail' ? 'facts' : pageSlug;

renderShell();
renderWhySeed();
renderWorkAccordion();
renderVoices();
renderFactBrowser();
renderReportCarousel();
renderTeamCarousel();
renderModerators();
renderContactBlocks();
renderFactSheetDetail();
initMobileNav();
initHeaderState();
initReveal();
initSmoothAnchors();
prefillContactFromQuery();
initScrollCarousels();

function renderShell() {
  const headerRoot = document.querySelector('[data-site-header]');
  const footerRoot = document.querySelector('[data-site-footer]');
  if (headerRoot) {
    headerRoot.innerHTML = `
      <header class="site-header">
        <div class="header-inner">
          <a class="brand" href="index.html" aria-label="Seed Planning home"><img src="assets/img/seed_planning_logo.png" alt="Seed Planning logo"></a>
          <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav" aria-label="Open navigation"><span></span><span></span><span></span></button>
          <nav class="site-nav" id="site-nav" aria-label="Primary">${navigation.map(item => `<a href="${item.href}" ${item.slug === activeSlug ? 'aria-current="page"' : ''}>${item.label}</a>`).join('')}</nav>
        </div>
      </header>
    `;
  }
  if (footerRoot) {
    footerRoot.innerHTML = `
      <footer class="site-footer">
        <div class="footer-grid">
          <div class="footer-brand">
            <img src="assets/img/seed_planning_logo.png" alt="Seed Planning logo">
            <div class="footer-meta">© Seed Planning Co., Ltd.</div>
          </div>
          <div>
            <nav class="footer-links" aria-label="Footer">${navigation.filter(item => item.slug !== 'home').map(item => `<a href="${item.href}">${item.label}</a>`).join('')}</nav>
            <div class="footer-certifications">
              <img src="assets/img/esomar.png" alt="ESOMAR">
              <img src="assets/img/ephmra.png" alt="EphMRA">
              <img src="assets/img/iso27001.png" alt="ISO 27001">
              <img src="assets/img/jmra_member.png" alt="JMRA">
              <img src="assets/img/privacy_mark.png" alt="Privacy Mark">
            </div>
          </div>
        </div>
      </footer>
    `;
  }
}

function renderWhySeed() {
  const root = document.querySelector('[data-why-seed]');
  if (!root) return;
  root.innerHTML = `
    <div class="why-layout">
      <div class="why-list" role="tablist" aria-label="Why Seed Planning details">${whySeedPanels.map((item, index) => `<button class="why-tab" type="button" role="tab" aria-selected="${index === 0}" data-panel="${item.id}">${item.label}</button>`).join('')}</div>
      <div class="why-divider" aria-hidden="true"></div>
      <div class="why-detail">
        <div class="why-detail-head">
          <h2 class="section-title cocoa"><span class="word-italic">Why</span> Seed Planning</h2>
          <p class="section-copy cocoa">A clear, transparent approach to Japan healthcare research — built on ethics, nuance, and operational rigor.</p>
        </div>
        ${whySeedPanels.map((item, index) => `<div class="why-panel ${index === 0 ? 'is-active' : ''}" data-number="${item.id}" data-why-panel="${item.id}" role="tabpanel"><ul>${item.body.map(text => `<li>${text}</li>`).join('')}</ul></div>`).join('')}
      </div>
    </div>
  `;
  const tabs = [...root.querySelectorAll('.why-tab')];
  const panels = [...root.querySelectorAll('[data-why-panel]')];
  tabs.forEach(tab => tab.addEventListener('click', () => activateWhyPanel(tab.dataset.panel)));
  function activateWhyPanel(id) {
    tabs.forEach(tab => tab.setAttribute('aria-selected', String(tab.dataset.panel === id)));
    panels.forEach(panel => panel.classList.toggle('is-active', panel.dataset.whyPanel === id));
  }
}

function renderWorkAccordion() {
  const root = document.querySelector('[data-work-accordion]');
  if (!root) return;
  root.innerHTML = `<div class="workflow-list">${workAccordions.map((item, index) => `<div class="workflow-item"><button class="workflow-trigger" type="button" aria-expanded="${index === 0}" data-work-trigger="${item.key}"><span>${item.title}</span><span class="chevron" aria-hidden="true"></span></button><div class="workflow-panel" ${index === 0 ? '' : 'hidden'} data-work-panel="${item.key}">${renderWorkPanel(item)}</div></div>`).join('')}</div>`;
  root.querySelectorAll('[data-work-trigger]').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const key = trigger.dataset.workTrigger;
      root.querySelectorAll('[data-work-trigger]').forEach(btn => {
        const open = btn === trigger ? btn.getAttribute('aria-expanded') !== 'true' : false;
        btn.setAttribute('aria-expanded', String(open));
      });
      root.querySelectorAll('[data-work-panel]').forEach(panel => {
        panel.hidden = panel.dataset.workPanel !== key || trigger.getAttribute('aria-expanded') !== 'true';
      });
      const targetPanel = root.querySelector(`[data-work-panel="${key}"]`);
      if (targetPanel) targetPanel.hidden = trigger.getAttribute('aria-expanded') !== 'true';
    });
  });
}

function renderWorkPanel(item) {
  if (item.type === 'list') return `<article class="workflow-card"><h3>${item.title}</h3><ul>${item.items.map(text => `<li>${text}</li>`).join('')}</ul></article>`;
  if (item.type === 'timeline') return `<article class="workflow-card timeline-card"><h3>${item.title}</h3><img src="${item.image}" alt="Typical timeline graphic"><p class="timeline-note">${item.note}</p></article>`;
  return `<article class="workflow-card"><h3>${item.title}</h3><p>${item.text}</p></article>`;
}

function renderVoices() {
  const root = document.querySelector('[data-voices-grid]');
  if (!root) return;
  root.innerHTML = `<div class="voice-grid">${voices.map(voice => `<article class="voice-card"><img class="quote-glyph" src="assets/img/quotation_mark.png" alt="" aria-hidden="true"><p>${voice.quote}</p><p class="voice-name">${voice.name}</p></article>`).join('')}</div>`;
}

function renderFactBrowser() {
  const root = document.querySelector('[data-facts-browser]');
  if (!root) return;
  const topics = [...new Set(factSheets.map(item => item.topic))].sort();
  const tags = [...new Set(factSheets.flatMap(item => item.tags))].sort();
  const state = { search: '', topics: new Set(), tags: new Set(), page: 1, pageSize: 4 };
  root.innerHTML = `
    <div class="fact-browser">
      <aside class="filter-side">
        <div class="search-box">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M21 21l-4.3-4.3m1.8-5.2a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" stroke="#5b1a06" stroke-width="1.7" stroke-linecap="round"/></svg>
          <input type="search" id="fact-search" placeholder="Search" aria-label="Search fact sheets">
          <div class="search-suggestions" data-search-suggestions></div>
        </div>
        <details class="filter-dropdown" open><summary>Topic Area</summary><div class="filter-options">${topics.map(topic => `<div class="filter-option"><label><input type="checkbox" value="${escapeAttribute(topic)}" data-filter-topic><span>${topic}</span></label><span>(${factSheets.filter(item => item.topic === topic).length})</span></div>`).join('')}</div></details>
        <details class="filter-dropdown"><summary>Tags</summary><div class="filter-options">${tags.map(tag => `<div class="filter-option"><label><input type="checkbox" value="${escapeAttribute(tag)}" data-filter-tag><span>${tag}</span></label><span>(${factSheets.filter(item => item.tags.includes(tag)).length})</span></div>`).join('')}</div></details>
        <button type="button" class="clear-filters" data-clear-filters>CLEAR FILTERS</button>
      </aside>
      <div class="browser-main">
        <div class="active-filter-row" data-active-filters></div>
        <div class="results-meta" data-results-meta></div>
        <div class="facts-grid" data-facts-grid></div>
        <div class="pagination" data-pagination></div>
      </div>
    </div>
  `;
  const searchInput = root.querySelector('#fact-search');
  const suggestionsRoot = root.querySelector('[data-search-suggestions]');
  const resultsMeta = root.querySelector('[data-results-meta]');
  const activeFilters = root.querySelector('[data-active-filters]');
  const factsGrid = root.querySelector('[data-facts-grid]');
  const pagination = root.querySelector('[data-pagination]');
  const searchableTerms = [...new Set(factSheets.flatMap(item => [item.title, item.topic, ...item.tags]))];
  searchInput.addEventListener('input', () => { state.search = searchInput.value.trim().toLowerCase(); state.page = 1; updateSuggestions(); render(); });
  root.querySelectorAll('[data-filter-topic]').forEach(input => input.addEventListener('change', () => { input.checked ? state.topics.add(input.value) : state.topics.delete(input.value); state.page = 1; render(); }));
  root.querySelectorAll('[data-filter-tag]').forEach(input => input.addEventListener('change', () => { input.checked ? state.tags.add(input.value) : state.tags.delete(input.value); state.page = 1; render(); }));
  root.querySelector('[data-clear-filters]').addEventListener('click', () => {
    state.search = ''; state.topics.clear(); state.tags.clear(); state.page = 1; searchInput.value = '';
    root.querySelectorAll('[data-filter-topic], [data-filter-tag]').forEach(input => input.checked = false);
    render(); updateSuggestions();
  });
  document.addEventListener('click', (event) => { if (!root.contains(event.target)) suggestionsRoot.style.display = 'none'; });
  function updateSuggestions() {
    const term = state.search;
    if (!term) { suggestionsRoot.style.display = 'none'; suggestionsRoot.innerHTML = ''; return; }
    const matches = searchableTerms.filter(item => item.toLowerCase().includes(term)).slice(0, 6);
    if (!matches.length) { suggestionsRoot.style.display = 'none'; suggestionsRoot.innerHTML = ''; return; }
    suggestionsRoot.innerHTML = matches.map(item => `<button type="button">${item}</button>`).join('');
    suggestionsRoot.style.display = 'block';
    suggestionsRoot.querySelectorAll('button').forEach(button => button.addEventListener('click', () => { state.search = button.textContent.toLowerCase(); searchInput.value = button.textContent; state.page = 1; render(); suggestionsRoot.style.display = 'none'; }));
  }
  function getFilteredItems() {
    return factSheets.filter(item => {
      const searchHaystack = `${item.title} ${item.topic} ${item.summary} ${item.tags.join(' ')}`.toLowerCase();
      const searchOk = !state.search || searchHaystack.includes(state.search);
      const topicOk = state.topics.size === 0 || state.topics.has(item.topic);
      const tagOk = state.tags.size === 0 || [...state.tags].some(tag => item.tags.includes(tag));
      return searchOk && topicOk && tagOk;
    });
  }
  function render() {
    const filtered = getFilteredItems();
    const pageCount = Math.max(1, Math.ceil(filtered.length / state.pageSize));
    if (state.page > pageCount) state.page = pageCount;
    const start = (state.page - 1) * state.pageSize;
    const visible = filtered.slice(start, start + state.pageSize);
    resultsMeta.textContent = `Showing ${filtered.length} item${filtered.length === 1 ? '' : 's'}`;
    const chips = [...[...state.topics].map(topic => `<span class="tag topic">${topic}</span>`), ...[...state.tags].map(tag => `<span class="tag dark">${tag}</span>`), ...(state.search ? [`<span class="tag">“${escapeHtml(searchInput.value || state.search)}”</span>`] : [])];
    activeFilters.innerHTML = chips.join('');
    factsGrid.innerHTML = visible.map(item => renderFactCard(item)).join('');
    pagination.innerHTML = Array.from({ length: pageCount }, (_, index) => `<button type="button" class="${state.page === index + 1 ? 'is-active' : ''}" data-page="${index + 1}">${index + 1}</button>`).join('');
    pagination.querySelectorAll('button').forEach(button => button.addEventListener('click', () => { state.page = Number(button.dataset.page); render(); root.scrollIntoView({ behavior: 'smooth', block: 'start' }); }));
  }
  render();
}

function renderFactCard(item, related = false) {
  return `<article class="card ${related ? 'related-card' : 'fact-card'}"><div class="fact-thumb"><img src="${item.image}" alt="${escapeAttribute(item.title)}"></div><div class="fact-body"><span class="tag topic">${item.topic}</span><h3 class="fact-title">${item.title}</h3><p class="fact-summary">${item.summary}</p><div class="fact-tags">${item.tags.map(tag => `<span class="tag ${related ? '' : 'dark'}">${tag}</span>`).join('')}</div><div class="fact-actions"><a class="text-link" href="fact-sheet.html?slug=${encodeURIComponent(item.slug)}">Learn more →</a>${related ? '' : `<a class="text-link" href="contact.html?category=Report%20request&topic=${encodeURIComponent(item.title)}">Request a full report →</a>`}</div></div></article>`;
}

function renderReportCarousel() {
  const root = document.querySelector('[data-report-carousel]');
  if (!root) return;
  root.innerHTML = renderSnapCarousel(reportSummaries.map(item => `<article class="report-card"><div><p class="eyebrow">${item.title}</p><h3>${item.subtitle}</h3><p>${item.description}</p></div><div class="report-thumb"><img src="${item.image}" alt="${escapeAttribute(item.subtitle)}"></div><div class="fact-actions"><a class="pill-button sand" href="fact-sheet.html?slug=${encodeURIComponent(item.slug)}">Learn more</a><a class="pill-button sand" href="contact.html?category=Report%20request&topic=${encodeURIComponent(item.subtitle)}">Request a full report</a></div></article>`));
}

function renderTeamCarousel() {
  const root = document.querySelector('[data-team-carousel]');
  if (!root) return;
  root.innerHTML = renderSnapCarousel(teamMembers.map(item => `<article class="team-card"><div class="team-meta"><h3>${item.name}</h3><p class="team-role">${item.role}</p></div><div class="team-photo"><img src="${item.image}" alt="${escapeAttribute(item.name)}"></div><div class="team-meta"><p class="team-bio">${item.bio}</p><div class="fact-tags">${item.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}</div></div></article>`));
}

function renderSnapCarousel(slides) {
  return `<div class="snap-carousel" data-carousel><div class="snap-viewport" data-carousel-viewport>${slides.map((slide, index) => `<div class="snap-slide" data-carousel-slide="${index}">${slide}</div>`).join('')}</div><div class="carousel-controls"><div class="carousel-arrows"><button type="button" class="carousel-arrow" data-carousel-prev aria-label="Previous">←</button><button type="button" class="carousel-arrow" data-carousel-next aria-label="Next">→</button></div><div class="carousel-dots" data-carousel-dots></div></div></div>`;
}

function initScrollCarousels() {
  document.querySelectorAll('[data-carousel]').forEach(root => {
    const viewport = root.querySelector('[data-carousel-viewport]');
    const slides = [...root.querySelectorAll('[data-carousel-slide]')];
    const dotsRoot = root.querySelector('[data-carousel-dots]');
    if (!viewport || !slides.length || !dotsRoot) return;
    dotsRoot.innerHTML = slides.map((_, index) => `<button type="button" aria-label="Go to slide ${index + 1}" data-dot="${index}"></button>`).join('');
    const dots = [...dotsRoot.querySelectorAll('[data-dot]')];
    const activateClosest = () => {
      const viewportLeft = viewport.scrollLeft;
      const closestIndex = slides.reduce((best, slide, index) => {
        const distance = Math.abs(slide.offsetLeft - viewportLeft);
        return distance < best.distance ? { index, distance } : best;
      }, { index: 0, distance: Number.POSITIVE_INFINITY }).index;
      dots.forEach((dot, index) => dot.classList.toggle('is-active', index === closestIndex));
    };
    dots.forEach(dot => dot.addEventListener('click', () => { const target = slides[Number(dot.dataset.dot)]; viewport.scrollTo({ left: target.offsetLeft, behavior: 'smooth' }); }));
    root.querySelector('[data-carousel-prev]')?.addEventListener('click', () => viewport.scrollBy({ left: -Math.max(viewport.clientWidth * 0.85, 320), behavior: 'smooth' }));
    root.querySelector('[data-carousel-next]')?.addEventListener('click', () => viewport.scrollBy({ left: Math.max(viewport.clientWidth * 0.85, 320), behavior: 'smooth' }));
    viewport.addEventListener('scroll', throttle(activateClosest, 80));
    activateClosest();
  });
}

function renderModerators() {
  const root = document.querySelector('[data-moderators-table]');
  if (!root) return;
  root.innerHTML = `<div class="moderators-wrap"><table class="moderators-table"><thead><tr><th></th><th>Language</th><th>Strengths</th><th>Therapy areas</th></tr></thead><tbody>${moderators.map(item => `<tr><td><strong>${item.name}</strong></td><td>${item.language}</td><td>${item.strengths}</td><td>${item.therapy}</td></tr>`).join('')}</tbody></table></div>`;
  const toggle = document.querySelector('[data-moderators-toggle]');
  if (!toggle) return;
  toggle.addEventListener('click', () => { const isOpen = toggle.getAttribute('aria-expanded') === 'true'; toggle.setAttribute('aria-expanded', String(!isOpen)); root.hidden = isOpen; });
}

function renderContactBlocks() {
  document.querySelectorAll('[data-contact-block]').forEach((root, index) => {
    const formId = `contact-form-${index + 1}`;
    root.innerHTML = `<div class="contact-block"><div class="contact-left"><img src="assets/img/get_in_touch_hero.png" alt="Leaf texture background"><div class="contact-left-inner"><div><h2>Get in touch</h2><p>Connect with our team to explore tailored research solutions for your goals.</p></div><div class="contact-details"><a class="contact-detail" href="mailto:${siteConfig.email}"><img src="assets/img/email_icon.png" alt=""> <span>${siteConfig.email}</span></a><a class="contact-detail" href="tel:${siteConfig.phone.replace(/[^+\d]/g, '')}"><img src="assets/img/phone_icon.png" alt=""> <span>${siteConfig.phone}</span></a><span class="contact-detail"><img src="assets/img/location_icon.png" alt=""> <span>${siteConfig.address}</span></span><a class="contact-detail" href="${siteConfig.linkedin}" target="_blank" rel="noopener"><img src="assets/img/linkedin_icon.png" alt=""> <span>LinkedIn</span></a></div></div></div><div class="contact-form-wrap"><form class="contact-form" id="${formId}" novalidate><div class="form-grid"><div class="form-field"><label for="company-${index}">Company name</label><input id="company-${index}" name="company" autocomplete="organization"></div><div class="form-field"><label for="name-${index}">Full name</label><input id="name-${index}" name="name" autocomplete="name" required></div><div class="form-field"><label for="email-${index}">Email address</label><input id="email-${index}" type="email" name="email" autocomplete="email" required></div><div class="form-field"><label for="category-${index}">What can we help you with?</label><select id="category-${index}" name="category" required><option value="">Select a category</option>${siteConfig.requestCategories.map(item => `<option value="${item}">${item}</option>`).join('')}</select></div><div class="form-field"><label for="message-${index}">Message</label><textarea id="message-${index}" name="message" placeholder="Share the topic, objective, timing, or any special request."></textarea></div></div><div class="form-foot"><p class="form-note">Please do not include sensitive personal health information in this form.</p><button class="pill-button cocoa" type="submit">Submit</button></div><p class="form-status" aria-live="polite"></p></form></div></div>`;
    const form = root.querySelector('form');
    const status = root.querySelector('.form-status');
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      status.className = 'form-status';
      if (!form.reportValidity()) return;
      const formData = new FormData(form);
      if (siteConfig.formEndpoint) {
        try {
          const response = await fetch(siteConfig.formEndpoint, { method: 'POST', body: formData, headers: { Accept: 'application/json' } });
          if (!response.ok) throw new Error('Request failed');
          form.reset();
          status.textContent = 'Thank you. Your message has been sent.';
          status.classList.add('is-success');
        } catch {
          status.textContent = 'Something went wrong while sending. Please try again or email us directly.';
          status.classList.add('is-error');
        }
        return;
      }
      const subject = `${formData.get('category') || 'Website inquiry'} | Seed Planning`;
      const body = [`Company: ${formData.get('company') || ''}`, `Name: ${formData.get('name') || ''}`, `Email: ${formData.get('email') || ''}`, `Category: ${formData.get('category') || ''}`, '', `${formData.get('message') || ''}`].join('
');
      window.location.href = `mailto:${siteConfig.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      status.textContent = 'Your email app is opening with the message prefilled.';
      status.classList.add('is-success');
    });
  });
}

function prefillContactFromQuery() {
  const params = new URLSearchParams(window.location.search);
  const topic = params.get('topic');
  const category = params.get('category');
  document.querySelectorAll('.contact-form').forEach(form => {
    if (topic) {
      const message = form.querySelector('textarea[name="message"]');
      if (message && !message.value) message.value = `Topic of interest: ${topic}

`;
    }
    if (category) {
      const select = form.querySelector('select[name="category"]');
      if (select) select.value = category;
    }
  });
}

function renderFactSheetDetail() {
  const root = document.querySelector('[data-fact-sheet-detail]');
  if (!root) return;
  const params = new URLSearchParams(window.location.search);
  const slug = params.get('slug');
  const item = factSheets.find(entry => entry.slug === slug) || factSheets[0];
  const relatedItems = item.related.map(key => factSheets.find(entry => entry.slug === key)).filter(Boolean);
  root.innerHTML = `<section class="fact-detail-hero"><div class="fact-detail-copy"><p class="eyebrow">${item.topic}</p><h1>${item.title}</h1><p>${item.intro}</p></div><div class="fact-detail-image"><img src="${item.image}" alt="${escapeAttribute(item.title)}"></div></section><section class="section"><div class="shell detail-stack reveal-up"><div class="detail-block"><h2>Key points</h2><ul>${item.keyPoints.map(point => `<li>${point}</li>`).join('')}</ul></div><div class="detail-block"><h2>Suggested questions for kickoff</h2><ul>${item.questions.map(point => `<li>${point}</li>`).join('')}</ul></div><div class="detail-block"><a class="pill-button olive" href="${item.pdf}" target="_blank" rel="noopener">Download now</a></div></div></section><section class="section related-section"><div class="shell reveal-up"><h2 class="section-title olive">You may also like</h2><div class="related-grid">${relatedItems.map(related => renderFactCard(related, true)).join('')}</div></div></section><section class="section request-band tone-sand"><div class="shell request-band-shell reveal-up"><div><h2 class="section-title cocoa">Navigating Japan’s market?</h2><p class="section-copy cocoa">Access deeper, topic-specific insights grounded in local expertise.</p></div><a class="pill-button cocoa" href="contact.html?category=Specific%20topic%20request&topic=${encodeURIComponent(item.title)}">Request specific topic</a></div></section>`;
}

function initMobileNav() {
  const toggle = document.querySelector('.nav-toggle');
  if (!toggle) return;
  toggle.addEventListener('click', () => { const isOpen = document.body.classList.toggle('nav-open'); toggle.setAttribute('aria-expanded', String(isOpen)); });
  document.querySelectorAll('.site-nav a').forEach(link => link.addEventListener('click', () => { document.body.classList.remove('nav-open'); toggle.setAttribute('aria-expanded', 'false'); }));
}

function initHeaderState() {
  const header = document.querySelector('.site-header');
  if (!header) return;
  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 24);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

function initReveal() {
  const items = [...document.querySelectorAll('.reveal-up')];
  if (!items.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); } });
  }, { threshold: 0.1 });
  items.forEach(item => observer.observe(item));
}

function initSmoothAnchors() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (event) => {
      const href = link.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

function throttle(fn, wait) {
  let lastTime = 0;
  let timeout;
  return (...args) => {
    const now = Date.now();
    const remaining = wait - (now - lastTime);
    if (remaining <= 0) {
      clearTimeout(timeout);
      lastTime = now;
      fn(...args);
    } else {
      clearTimeout(timeout);
      timeout = setTimeout(() => { lastTime = Date.now(); fn(...args); }, remaining);
    }
  };
}

function escapeHtml(value) { return String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#39;'); }
function escapeAttribute(value) { return escapeHtml(value); }
