/*
  Interactions (English version)
  - Home: topic buttons toggle the detail panel
  - Voice cards: Read more expands / collapses
  - Menu bar: mobile toggle
*/

function toggleMenu() {
  const nav = document.getElementById('menuNav');
  if (nav) {
    nav.classList.toggle('is-open');
  }
}

(function () {
  const COLLAPSED_LINES = 9;
  const READ_MORE_LABEL = 'Read more';
  const SHOW_LESS_LABEL = 'Show less';

  const initTopicPicker = () => {
    const topicButtons = document.querySelectorAll('[data-topic-button]');
    const topicPanels = document.querySelectorAll('[data-topic-panel]');

    if (!topicButtons.length || !topicPanels.length) return;

    const show = (topic) => {
      topicButtons.forEach((btn) => {
        btn.classList.toggle('is-active', btn.getAttribute('data-topic-button') === topic);
      });
      topicPanels.forEach((panel) => {
        panel.hidden = panel.getAttribute('data-topic-panel') !== topic;
      });
    };

    const initial = document.querySelector('[data-topic-button].is-active')?.getAttribute('data-topic-button')
      || topicButtons[0].getAttribute('data-topic-button');
    show(initial);

    topicButtons.forEach((btn) => {
      btn.addEventListener('click', () => show(btn.getAttribute('data-topic-button')));
    });
  };

  const createToggleButton = (card, text) => {
    const button = document.createElement('button');
    button.className = 'voice-card__toggle';
    button.type = 'button';
    button.setAttribute('data-voice-toggle', '');

    // Place the button immediately after the voice text so a truncated card never
    // appears without its Read more affordance. Existing spacer/name elements remain below it.
    text.insertAdjacentElement('afterend', button);
    return button;
  };

  const textExceedsCollapsedLines = (text) => {
    const computed = window.getComputedStyle(text);
    const lineHeight = parseFloat(computed.lineHeight);

    if (!Number.isFinite(lineHeight) || lineHeight <= 0) {
      return false;
    }

    const naturalHeight = text.scrollHeight;
    const collapsedHeight = lineHeight * COLLAPSED_LINES;
    return naturalHeight > collapsedHeight + 2;
  };

  const updateVoiceCards = () => {
    const cards = document.querySelectorAll('.voice-card');

    cards.forEach((card) => {
      const text = card.querySelector('.voice-card__text');
      if (!text) return;

      const wasExpanded = card.classList.contains('is-expanded');
      const hasManualHiddenText = Boolean(text.querySelector('.voice-card__more'));
      let toggle = card.querySelector('[data-voice-toggle]');

      // Measure the full English text first. The English CSS makes text un-clamped unless
      // this script explicitly marks the card as collapsible.
      card.classList.remove('is-collapsible', 'is-expanded');
      if (toggle) toggle.hidden = true;

      const shouldCollapse = hasManualHiddenText || textExceedsCollapsedLines(text);

      if (!shouldCollapse) {
        return;
      }

      card.classList.add('is-collapsible');
      if (wasExpanded) card.classList.add('is-expanded');

      if (!toggle) {
        toggle = createToggleButton(card, text);
      }

      const expanded = card.classList.contains('is-expanded');
      toggle.hidden = false;
      toggle.textContent = expanded ? SHOW_LESS_LABEL : READ_MORE_LABEL;
      toggle.setAttribute('aria-expanded', String(expanded));

      if (!toggle.dataset.voiceBound) {
        toggle.addEventListener('click', () => {
          const nowExpanded = card.classList.toggle('is-expanded');
          toggle.textContent = nowExpanded ? SHOW_LESS_LABEL : READ_MORE_LABEL;
          toggle.setAttribute('aria-expanded', String(nowExpanded));
        });
        toggle.dataset.voiceBound = 'true';
      }
    });
  };

  const init = () => {
    initTopicPicker();
    updateVoiceCards();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.addEventListener('load', updateVoiceCards);

  let resizeTimer;
  window.addEventListener('resize', () => {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(updateVoiceCards, 150);
  });
})();
